-- Blog kapak görselleri — Supabase Storage
-- Dashboard → SQL Editor → Run (blog_posts.sql sonrası)

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-covers',
  'blog-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "blog_covers_public_select" on storage.objects;
create policy "blog_covers_public_select"
  on storage.objects for select
  using (bucket_id = 'blog-covers');

drop policy if exists "blog_covers_author_insert" on storage.objects;
create policy "blog_covers_author_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-covers'
    and public.is_akiyom_content_author()
  );

drop policy if exists "blog_covers_author_update" on storage.objects;
create policy "blog_covers_author_update"
  on storage.objects for update
  using (
    bucket_id = 'blog-covers'
    and public.is_akiyom_content_author()
  );

drop policy if exists "blog_covers_author_delete" on storage.objects;
create policy "blog_covers_author_delete"
  on storage.objects for delete
  using (
    bucket_id = 'blog-covers'
    and public.is_akiyom_content_author()
  );

-- Bitti. Panelden kapak görseli yükleyebilirsiniz.
