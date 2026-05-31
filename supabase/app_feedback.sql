-- ============================================================

-- app_feedback — admin panel + uygulama durum senkronu

-- Supabase Dashboard → SQL Editor → Run

-- ============================================================



create or replace function public.is_akiyom_admin()

returns boolean

language sql

stable

security definer

set search_path = public

as $$

  select exists (

    select 1 from public.profiles

    where id = auth.uid() and is_admin = true

  );

$$;



-- Ek sütunlar

alter table public.app_feedback

  add column if not exists admin_reply text,

  add column if not exists replied_at timestamptz,

  add column if not exists client_ref text,

  add column if not exists updated_at timestamptz not null default now();

-- Panel durumları: new, read, in_progress, replied, closed
-- Eski tabloda dar check varsa (ör. sadece new/read) güncelleme reddedilir — kısıtı yenile
do $$
declare
  r record;
begin
  for r in
    select c.conname
    from pg_constraint c
    join pg_class t on c.conrelid = t.oid
    join pg_namespace n on t.relnamespace = n.oid
    where n.nspname = 'public'
      and t.relname = 'app_feedback'
      and c.contype = 'c'
      and (
        pg_get_constraintdef(c.oid) ilike '%status%'
        or c.conname ilike '%status%'
      )
  loop
    execute format('alter table public.app_feedback drop constraint if exists %I', r.conname);
  end loop;
end $$;

alter table public.app_feedback drop constraint if exists app_feedback_status_check;

alter table public.app_feedback
  add constraint app_feedback_status_check
  check (status in ('new', 'read', 'in_progress', 'replied', 'closed'));

alter table public.app_feedback alter column status set default 'new';

create index if not exists app_feedback_client_ref_idx

  on public.app_feedback (app_code, client_ref, created_at desc);



-- updated_at trigger

create or replace function public.set_app_feedback_updated_at()

returns trigger

language plpgsql

as $$

begin

  new.updated_at = now();

  return new;

end;

$$;



drop trigger if exists app_feedback_updated_at on public.app_feedback;

create trigger app_feedback_updated_at

  before update on public.app_feedback

  for each row execute function public.set_app_feedback_updated_at();



-- Kullanıcıya gösterilecek durum metinleri (uygulamalar RPC ile alır)

create or replace function public.feedback_status_label(p_status text)

returns text

language sql

immutable

as $$

  select case coalesce(nullif(trim(p_status), ''), 'new')

    when 'new' then 'Alındı'

    when 'read' then 'İnceleniyor'

    when 'in_progress' then 'Yapım aşamasında'

    when 'replied' then 'Yanıtlandı'

    when 'closed' then 'Tamamlandı'

    else 'Alındı'

  end;

$$;



create or replace function public.feedback_status_message(p_status text)

returns text

language sql

immutable

as $$

  select case coalesce(nullif(trim(p_status), ''), 'new')

    when 'new' then 'Görüşünüz bize ulaştı. En kısa sürede incelenecek.'

    when 'read' then 'Ekibimiz görüşünüzü inceliyor.'

    when 'in_progress' then 'Öneriniz geliştirme sürecine alındı. Üzerinde çalışıyoruz.'

    when 'replied' then 'Görüşünüze yanıt verildi.'

    when 'closed' then 'Bu görüş kapatıldı.'

    else 'Görüşünüz bize ulaştı.'

  end;

$$;



-- Tek kayıt durumu (uygulama insert sonrası dönen id ile sorgular)

create or replace function public.get_feedback_status(p_feedback_id uuid)

returns table (

  id uuid,

  app_code text,

  title text,

  status text,

  status_label text,

  status_message text,

  admin_reply text,

  replied_at timestamptz,

  created_at timestamptz,

  updated_at timestamptz

)

language sql

security definer

set search_path = public

stable

as $$

  select

    f.id,

    f.app_code,

    f.title,

    coalesce(nullif(trim(f.status), ''), 'new') as status,

    public.feedback_status_label(f.status),

    public.feedback_status_message(f.status),

    f.admin_reply,

    f.replied_at,

    f.created_at,

    f.updated_at

  from public.app_feedback f

  where f.id = p_feedback_id;

$$;



-- Cihaz/oturum bazlı liste (uygulama gönderirken client_ref eklemeli)

create or replace function public.list_app_feedback(p_client_ref text, p_app_code text)

returns table (

  id uuid,

  app_code text,

  title text,

  status text,

  status_label text,

  status_message text,

  admin_reply text,

  replied_at timestamptz,

  created_at timestamptz,

  updated_at timestamptz

)

language sql

security definer

set search_path = public

stable

as $$

  select

    f.id,

    f.app_code,

    f.title,

    coalesce(nullif(trim(f.status), ''), 'new') as status,

    public.feedback_status_label(f.status),

    public.feedback_status_message(f.status),

    f.admin_reply,

    f.replied_at,

    f.created_at,

    f.updated_at

  from public.app_feedback f

  where f.client_ref = p_client_ref

    and f.app_code = p_app_code

  order by f.created_at desc;

$$;



grant execute on function public.get_feedback_status(uuid) to anon, authenticated;

grant execute on function public.list_app_feedback(text, text) to anon, authenticated;



-- RLS — admin

drop policy if exists "Admins can read app feedback" on public.app_feedback;

create policy "Admins can read app feedback"

  on public.app_feedback for select

  using (public.is_akiyom_admin());



drop policy if exists "Admins can update app feedback" on public.app_feedback;

create policy "Admins can update app feedback"

  on public.app_feedback for update

  using (public.is_akiyom_admin())

  with check (public.is_akiyom_admin());



-- Storage — admin görsel okuma

drop policy if exists "feedback_images_admin_select" on storage.objects;

create policy "feedback_images_admin_select"

  on storage.objects for select

  using (

    bucket_id = 'feedback-images'

    and public.is_akiyom_admin()

  );



-- ============================================================

-- UYGULAMA ENTEGRASYONU (örnek)

--

-- 1) Gönderirken client_ref ekle (cihazda sabit UUID tut):

--    insert into app_feedback (..., client_ref) values (..., 'device-uuid')

--

-- 2) Durum sorgula:

--    select * from get_feedback_status('FEEDBACK-UUID');

--    select * from list_app_feedback('device-uuid', 'aki_finans');

--

-- 3) Panelde "Yapım aşamasında" seçildiğinde status = in_progress olur;

--    uygulama RPC ile status_label = 'Yapım aşamasında' görür.

-- ============================================================



-- Bitti.

