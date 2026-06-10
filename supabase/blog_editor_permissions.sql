-- Blog & Haberler — editör yetkisi (mevcut kurulumlar için)
-- Supabase Dashboard → SQL Editor → Run

alter table public.profiles
  add column if not exists is_editor boolean not null default false;

create or replace function public.is_akiyom_content_author()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and (is_admin = true or is_editor = true)
  );
$$;

drop policy if exists "Admins manage blog posts" on public.blog_posts;
drop policy if exists "Content authors manage blog posts" on public.blog_posts;

create policy "Content authors manage blog posts"
  on public.blog_posts for all
  using (public.is_akiyom_content_author())
  with check (public.is_akiyom_content_author());

-- Editör atamak için (e-postayı değiştirin):
-- update public.profiles set is_editor = true where lower(email) = 'editor@example.com';

-- Admin hesabınız yazamıyorsa (e-postayı değiştirin):
-- update public.profiles set is_admin = true where lower(email) = 'erdinoral31@gmail.com';
