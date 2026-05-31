-- Tek seferlik: Görüş durumu "Kapandı" / "Yapım aşamasında" güncellenemiyorsa çalıştırın
-- Supabase Dashboard → SQL Editor → Run

do $$
declare
  r record;
begin
  for r in
    select c.conname
    from pg_constraint c
    join pg_class t on c.conrelid = t.oid
    join pg_namespace n on t.relnamespace = n.oid
    where n.nspname = 'public'
      and t.relname = 'app_feedback'
      and c.contype = 'c'
      and (
        pg_get_constraintdef(c.oid) ilike '%status%'
        or c.conname ilike '%status%'
      )
  loop
    execute format('alter table public.app_feedback drop constraint if exists %I', r.conname);
  end loop;
end $$;

alter table public.app_feedback drop constraint if exists app_feedback_status_check;

alter table public.app_feedback
  add constraint app_feedback_status_check
  check (status in ('new', 'read', 'in_progress', 'replied', 'closed'));

-- Bitti. Panelden tekrar "Kapandı" seçin.
