-- Kayıt sırasında username alanını profiles tablosuna yaz
-- Supabase Dashboard → SQL Editor → Run

alter table public.profiles
  add column if not exists username text;

create unique index if not exists profiles_username_lower_idx
  on public.profiles (lower(username))
  where username is not null and username <> '';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_emails constant text[] := array['erdinoral31@gmail.com', 'akiyom.iletisim@gmail.com'];
  v_username text := nullif(lower(trim(new.raw_user_meta_data->>'username')), '');
begin
  insert into public.profiles (id, email, username, is_admin, is_editor)
  values (
    new.id,
    new.email,
    v_username,
    lower(new.email) = any(admin_emails),
    false
  )
  on conflict (id) do update
    set email = excluded.email,
        username = coalesce(excluded.username, public.profiles.username),
        updated_at = now();

  return new;
end;
$$;

-- Bitti. Kayıt formundan gelen username auth metadata ile profiles.username alanına yazılır.

create or replace function public.is_username_available(p_username text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select not exists (
    select 1 from public.profiles
    where lower(username) = lower(trim(p_username))
      and trim(p_username) <> ''
  );
$$;

grant execute on function public.is_username_available(text) to anon, authenticated;
