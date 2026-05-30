-- Reklam / pazarlama metrikleri + lead notları
-- Supabase Dashboard → SQL Editor → bir kez çalıştırın.

alter table public.project_leads
  add column if not exists admin_notes text;

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

create or replace function public.set_marketing_metrics_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists marketing_metrics_updated_at on public.marketing_metrics;
create trigger marketing_metrics_updated_at
  before update on public.marketing_metrics
  for each row execute function public.set_marketing_metrics_updated_at();

drop policy if exists "Admins manage marketing metrics" on public.marketing_metrics;
create policy "Admins manage marketing metrics"
  on public.marketing_metrics for all
  using (public.is_admin())
  with check (public.is_admin());
