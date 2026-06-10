-- Blog yazma yetkisi — mevcut hesabınız için
-- Supabase Dashboard → SQL Editor → e-postayı değiştirin → Run

-- 1) Önce kontrol edin (satır dönüyor mu, is_admin ne?)
select id, email, is_admin, is_editor
from public.profiles
where lower(email) = lower('erdinoral31@gmail.com');

-- 2) Admin yapın (e-postayı kendi adresinizle değiştirin)
update public.profiles
set is_admin = true
where lower(email) = lower('erdinoral31@gmail.com');

-- 3) Tekrar kontrol
select id, email, is_admin, is_editor
from public.profiles
where lower(email) = lower('erdinoral31@gmail.com');

-- Satır yoksa: önce siteye giriş yapıp kayıt olun, sonra 2. adımı tekrarlayın.
