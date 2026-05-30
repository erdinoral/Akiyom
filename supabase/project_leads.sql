-- Proje talepleri (Projenizi Anlatın formu)
-- Mevcut kurulumda schema.sql çalıştırdıysanız yalnızca bu dosyayı da çalıştırabilirsiniz.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create table if not exists public.project_leads (
  id uuid primary key default gen_random_uuid(),
  project_type text not null,
  full_name text not null,
  company_name text,
  email text not null,
  project_description text not null,
  status text not null default 'new' check (status in ('new', 'read', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_leads_created_at_idx on public.project_leads (created_at desc);
create index if not exists project_leads_status_idx on public.project_leads (status);

alter table public.project_leads enable row level security;

create or replace function public.set_project_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists project_leads_updated_at on public.project_leads;

create trigger project_leads_updated_at
  before update on public.project_leads
  for each row execute function public.set_project_leads_updated_at();

drop policy if exists "Admins can read project leads" on public.project_leads;
create policy "Admins can read project leads"
  on public.project_leads for select
  using (public.is_admin());

drop policy if exists "Admins can update project leads" on public.project_leads;
create policy "Admins can update project leads"
  on public.project_leads for update
  using (public.is_admin())
  with check (public.is_admin());

-- Insert yalnızca sunucu (service role) üzerinden yapılır; anon/authenticated insert yok.
