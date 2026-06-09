-- Tek seferlik: Panelde "Yanıt kaydedilemedi" hatası alıyorsanız çalıştırın
-- Supabase Dashboard → SQL Editor → New query → Run

alter table public.app_feedback
  add column if not exists admin_reply text,
  add column if not exists replied_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

-- "replied" durumu için status kısıtı (yoksa veya dar ise)
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

-- Admin güncelleme politikası (yoksa)
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

drop policy if exists "Admins can update app feedback" on public.app_feedback;

create policy "Admins can update app feedback"
  on public.app_feedback for update
  using (public.is_akiyom_admin())
  with check (public.is_akiyom_admin());

-- Bitti. Panelden yanıtı tekrar kaydedin.
