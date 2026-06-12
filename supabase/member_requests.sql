-- Üye talepleri — user_id + profilden okuma
-- Supabase Dashboard → SQL Editor → Run

alter table public.project_leads
  add column if not exists user_id uuid references auth.users(id) on delete set null;

alter table public.akiyom_ai_inquiries
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists project_leads_user_id_idx on public.project_leads (user_id);
create index if not exists akiyom_ai_inquiries_user_id_idx on public.akiyom_ai_inquiries (user_id);

drop policy if exists "Users read own project leads" on public.project_leads;
create policy "Users read own project leads"
  on public.project_leads for select
  using (auth.uid() = user_id);

drop policy if exists "Users read own ai inquiries" on public.akiyom_ai_inquiries;
create policy "Users read own ai inquiries"
  on public.akiyom_ai_inquiries for select
  using (auth.uid() = user_id);

-- Bitti. API service role ile user_id yazar; üye profilden kendi taleplerini okur.
