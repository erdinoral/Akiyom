-- Eski talepleri üye profiline bağla (e-posta eşleşmesi)
-- member_requests.sql veya member_requests_fix.sql çalıştırdıktan sonra bir kez çalıştırın.

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
