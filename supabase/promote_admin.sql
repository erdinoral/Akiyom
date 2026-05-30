-- Mevcut hesabı admin yap (erdinoral31@gmail.com)
-- Supabase Dashboard → SQL Editor → bir kez çalıştırın.

update public.profiles
set role = 'admin', updated_at = now()
where lower(email) = 'erdinoral31@gmail.com';

-- Trigger'ı güncelle (yeni kayıtlar için)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_emails constant text[] := array['erdinoral31@gmail.com', 'akiyom.iletisim@gmail.com'];
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    case when lower(new.email) = any(admin_emails) then 'admin' else 'user' end
  );
  return new;
end;
$$;
