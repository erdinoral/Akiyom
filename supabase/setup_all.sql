-- ============================================================
-- AKIYOM — Sadece website tabloları (mevcut profiles'a dokunmaz)
-- Supabase Dashboard → SQL Editor → Run
--
-- NOT: profiles tablosu Enigma Atlas ile paylaşılıyor.
--      Admin kontrolü: profiles.is_admin = true
-- ============================================================

-- 1) Admin kontrol fonksiyonu (mevcut is_admin sütununu kullanır)
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

-- Geriye dönük uyumluluk (eski SQL dosyaları is_admin() çağırıyorsa)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_akiyom_admin();
$$;

-- 2) Proje talepleri tablosu
create table if not exists public.project_leads (
  id uuid primary key default gen_random_uuid(),
  project_type text not null,
  full_name text not null,
  company_name text,
  email text not null default '',
  project_description text not null,
  status text not null default 'new' check (status in ('new', 'read', 'contacted', 'closed')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_leads_created_at_idx on public.project_leads (created_at desc);
create index if not exists project_leads_status_idx on public.project_leads (status);

alter table public.project_leads enable row level security;

-- 3) Pazarlama metrikleri tablosu
create table if not exists public.marketing_metrics (
  id uuid primary key default gen_random_uuid(),
  recorded_date date not null,
  platform text not null check (platform in ('google_ads', 'meta', 'linkedin', 'organic', 'other')),
  campaign_name text not null default '',
  impressions integer not null default 0 check (impressions >= 0),
  clicks integer not null default 0 check (clicks >= 0),
  spend_try numeric(12, 2) not null default 0 check (spend_try >= 0),
  conversions integer not null default 0 check (conversions >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists marketing_metrics_date_idx on public.marketing_metrics (recorded_date desc);
create index if not exists marketing_metrics_platform_idx on public.marketing_metrics (platform);

alter table public.marketing_metrics enable row level security;

-- 4) updated_at trigger
create or replace function public.set_akiyom_updated_at()
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
  for each row execute function public.set_akiyom_updated_at();

drop trigger if exists marketing_metrics_updated_at on public.marketing_metrics;
create trigger marketing_metrics_updated_at
  before update on public.marketing_metrics
  for each row execute function public.set_akiyom_updated_at();

-- 5) RLS — project_leads
drop policy if exists "Admins can read project leads" on public.project_leads;
create policy "Admins can read project leads"
  on public.project_leads for select using (public.is_akiyom_admin());

drop policy if exists "Admins can update project leads" on public.project_leads;
create policy "Admins can update project leads"
  on public.project_leads for update
  using (public.is_akiyom_admin()) with check (public.is_akiyom_admin());

-- 6) RLS — marketing_metrics
drop policy if exists "Admins manage marketing metrics" on public.marketing_metrics;
create policy "Admins manage marketing metrics"
  on public.marketing_metrics for all
  using (public.is_akiyom_admin()) with check (public.is_akiyom_admin());

-- 7) Akiyom website admin (zaten true olabilir)
update public.profiles
set is_admin = true, updated_at = now()
where lower(email) = 'erdinoral31@gmail.com';

-- 8) app_feedback — admin panel erişimi (tablo zaten varsa sadece policy ekler)
-- Detay: supabase/app_feedback.sql

alter table public.app_feedback
  add column if not exists admin_reply text,
  add column if not exists replied_at timestamptz,
  add column if not exists client_ref text,
  add column if not exists updated_at timestamptz not null default now();

-- status check — panel: Kapandı, Yapım aşamasında vb. (app_feedback.sql ile aynı)
do $$
declare r record;
begin
  for r in
    select c.conname from pg_constraint c
    join pg_class t on c.conrelid = t.oid
    join pg_namespace n on t.relnamespace = n.oid
    where n.nspname = 'public' and t.relname = 'app_feedback' and c.contype = 'c'
      and (pg_get_constraintdef(c.oid) ilike '%status%' or c.conname ilike '%status%')
  loop
    execute format('alter table public.app_feedback drop constraint if exists %I', r.conname);
  end loop;
end $$;
alter table public.app_feedback drop constraint if exists app_feedback_status_check;
alter table public.app_feedback
  add constraint app_feedback_status_check
  check (status in ('new', 'read', 'in_progress', 'replied', 'closed'));

-- RPC ve trigger için supabase/app_feedback.sql dosyasının tamamını çalıştırın.

drop policy if exists "Admins can read app feedback" on public.app_feedback;
create policy "Admins can read app feedback"
  on public.app_feedback for select
  using (public.is_akiyom_admin());

drop policy if exists "Admins can update app feedback" on public.app_feedback;
create policy "Admins can update app feedback"
  on public.app_feedback for update
  using (public.is_akiyom_admin())
  with check (public.is_akiyom_admin());

drop policy if exists "feedback_images_admin_select" on storage.objects;
create policy "feedback_images_admin_select"
  on storage.objects for select
  using (
    bucket_id = 'feedback-images'
    and public.is_akiyom_admin()
  );

-- 9) Akiyom AI ödeme / teklif iletişimi — detay: supabase/akiyom_ai_inquiries.sql
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

create index if not exists akiyom_ai_inquiries_created_at_idx on public.akiyom_ai_inquiries (created_at desc);
create index if not exists akiyom_ai_inquiries_status_idx on public.akiyom_ai_inquiries (status);

alter table public.akiyom_ai_inquiries enable row level security;

drop trigger if exists akiyom_ai_inquiries_updated_at on public.akiyom_ai_inquiries;
create trigger akiyom_ai_inquiries_updated_at
  before update on public.akiyom_ai_inquiries
  for each row execute function public.set_akiyom_updated_at();

drop policy if exists "Admins can read akiyom ai inquiries" on public.akiyom_ai_inquiries;
create policy "Admins can read akiyom ai inquiries"
  on public.akiyom_ai_inquiries for select using (public.is_akiyom_admin());

drop policy if exists "Admins can update akiyom ai inquiries" on public.akiyom_ai_inquiries;
create policy "Admins can update akiyom ai inquiries"
  on public.akiyom_ai_inquiries for update
  using (public.is_akiyom_admin()) with check (public.is_akiyom_admin());

-- Bitti.
