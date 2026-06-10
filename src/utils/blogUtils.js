export const BLOG_TYPE_LABELS = {
  blog: 'Blog',
  haber: 'Haber',
};

export const BLOG_STATUS_LABELS = {
  draft: 'Taslak',
  published: 'Yayında',
  archived: 'Arşiv',
};

export function slugifyTitle(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

export function splitBodyToParagraphs(body) {
  if (!body?.trim()) return [];
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export function isValidImageUrl(url) {
  if (!url?.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function formatBlogLoadError(error) {
  if (!error) return 'Bilinmeyen hata.';
  const code = error.code;
  const message = error.message || '';

  if (code === 'PGRST205' || message.includes('blog_posts')) {
    return 'blog_posts tablosu bulunamadı. Supabase SQL Editor’da supabase/blog_posts.sql dosyasını çalıştırın.';
  }
  if (code === '42501' || message.includes('permission') || message.includes('policy')) {
    return 'Veritabanı yazma yetkisi reddedildi. profiles tablosunda is_admin=true veya is_editor=true olmalı. Supabase’de supabase/blog_editor_permissions.sql dosyasını çalıştırın.';
  }
  if (/is_editor|column/i.test(message)) {
    return 'profiles.is_editor sütunu eksik. Supabase’de supabase/blog_editor_permissions.sql dosyasını çalıştırın.';
  }
  return message || 'Yazılar yüklenemedi.';
}
