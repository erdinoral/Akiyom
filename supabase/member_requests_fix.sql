-- Profil talepleri — tam kurulum / hata düzeltme
-- Supabase Dashboard → SQL Editor → bir kez çalıştırın.

alter table public.project_leads
  add column if not exists user_id uuid references auth.users(id) on delete set null;

alter table public.project_leads
  add column if not exists admin_notes text;

alter table public.akiyom_ai_inquiries
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists project_leads_user_id_idx on public.project_leads (user_id);
create index if not exists akiyom_ai_inquiries_user_id_idx on public.akiyom_ai_inquiries (user_id);

-- RLS içinde auth.users doğrudan sorgulanınca "permission denied" olabiliyor; security definer kullan.
create or replace function public.current_user_email()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select lower(trim(email))
  from auth.users
  where id = auth.uid();
$$;

grant execute on function public.current_user_email() to authenticated;

-- Geçmiş kayıtlara user_id yaz (e-posta aynıysa)
update public.project_leads pl
set user_id = u.id
from auth.users u
where pl.user_id is null
  and lower(trim(pl.email)) = lower(trim(u.email));

update public.akiyom_ai_inquiries ai
set user_id = u.id
from auth.users u
where ai.user_id is null
  and lower(trim(ai.email)) = lower(trim(u.email));

drop policy if exists "Users read own project leads" on public.project_leads;
create policy "Users read own project leads"
  on public.project_leads for select
  to authenticated
  using (
    auth.uid() = user_id
    or (
      public.current_user_email() is not null
      and lower(trim(email)) = public.current_user_email()
    )
  );

drop policy if exists "Users read own ai inquiries" on public.akiyom_ai_inquiries;
create policy "Users read own ai inquiries"
  on public.akiyom_ai_inquiries for select
  to authenticated
  using (
    auth.uid() = user_id
    or (
      public.current_user_email() is not null
      and lower(trim(email)) = public.current_user_email()
    )
  );
