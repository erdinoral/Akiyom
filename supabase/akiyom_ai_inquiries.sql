-- Akiyom AI — ödeme / teklif iletişim talepleri (website formu → admin panel)
-- Supabase Dashboard → SQL Editor → Run

create table if not exists public.akiyom_ai_inquiries (
  id uuid primary key default gen_random_uuid(),
  plan_name text,
  billing_period text check (billing_period is null or billing_period in ('monthly', 'annual')),
  full_name text not null,
  email text not null,
  company_name text,
  phone text,
  message text not null default '',
  status text not null default 'new' check (status in ('new', 'read', 'contacted', 'closed')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists akiyom_ai_inquiries_created_at_idx
  on public.akiyom_ai_inquiries (created_at desc);

create index if not exists akiyom_ai_inquiries_status_idx
  on public.akiyom_ai_inquiries (status);

alter table public.akiyom_ai_inquiries enable row level security;

drop trigger if exists akiyom_ai_inquiries_updated_at on public.akiyom_ai_inquiries;
create trigger akiyom_ai_inquiries_updated_at
  before update on public.akiyom_ai_inquiries
  for each row execute function public.set_akiyom_updated_at();

drop policy if exists "Admins can read akiyom ai inquiries" on public.akiyom_ai_inquiries;
create policy "Admins can read akiyom ai inquiries"
  on public.akiyom_ai_inquiries for select
  using (public.is_akiyom_admin());

drop policy if exists "Admins can update akiyom ai inquiries" on public.akiyom_ai_inquiries;
create policy "Admins can update akiyom ai inquiries"
  on public.akiyom_ai_inquiries for update
  using (public.is_akiyom_admin())
  with check (public.is_akiyom_admin());

-- Insert yalnızca API (service role) üzerinden; anon insert yok.
