-- Blog & Haberler — admin panel + public sayfa
-- Supabase Dashboard → SQL Editor → Run

alter table public.profiles
  add column if not exists is_editor boolean not null default false;

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

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  cover_image_url text,
  post_type text not null default 'blog' check (post_type in ('blog', 'haber')),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_idx
  on public.blog_posts (status, published_at desc nulls last);

create index if not exists blog_posts_type_idx
  on public.blog_posts (post_type, published_at desc nulls last);

create index if not exists blog_posts_slug_idx
  on public.blog_posts (slug);

alter table public.blog_posts enable row level security;

create or replace function public.set_blog_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_blog_posts_updated_at();

drop policy if exists "Admins manage blog posts" on public.blog_posts;
drop policy if exists "Content authors manage blog posts" on public.blog_posts;
create policy "Content authors manage blog posts"
  on public.blog_posts for all
  using (public.is_akiyom_content_author())
  with check (public.is_akiyom_content_author());

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts for select
  using (
    status = 'published'
    and published_at is not null
    and published_at <= now()
  );

-- Bitti. Panel → Blog & Haberler sekmesinden yazı ekleyin.
--
-- Admin hesabınız için (e-postayı değiştirin):
-- update public.profiles set is_admin = true where lower(email) = 'erdinoral31@gmail.com';
