import { supabase } from './supabase.js';

const BLOG_COVERS_BUCKET = 'blog-covers';
const MAX_COVER_BYTES = 5 * 1024 * 1024;
const ALLOWED_COVER_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function coverExtension(file) {
  const fromName = file.name.split('.').pop()?.toLowerCase();
  if (fromName && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fromName)) {
    return fromName === 'jpeg' ? 'jpg' : fromName;
  }
  if (file.type === 'image/jpeg') return 'jpg';
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  if (file.type === 'image/gif') return 'gif';
  return 'jpg';
}

export async function uploadBlogCoverImage(file) {
  if (!supabase) {
    return { url: null, error: { message: 'Supabase yapılandırması eksik.' } };
  }
  if (!file) {
    return { url: null, error: { message: 'Dosya seçilmedi.' } };
  }
  if (!ALLOWED_COVER_TYPES.has(file.type)) {
    return { url: null, error: { message: 'Yalnızca JPG, PNG, WebP veya GIF yükleyebilirsiniz.' } };
  }
  if (file.size > MAX_COVER_BYTES) {
    return { url: null, error: { message: 'Görsel en fazla 5 MB olabilir.' } };
  }

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    return { url: null, error: { message: 'Görsel yüklemek için giriş yapmalısınız.' } };
  }

  const ext = coverExtension(file);
  const path = `${authData.user.id}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(BLOG_COVERS_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });

  if (uploadError) {
    return { url: null, error: uploadError };
  }

  const { data } = supabase.storage.from(BLOG_COVERS_BUCKET).getPublicUrl(path);
  return { url: data?.publicUrl ?? null, path, error: null };
}

export async function fetchPublishedPosts({ postType } = {}) {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase yapılandırması eksik.' } };
  }

  let query = supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, cover_image_url, post_type, published_at, created_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (postType) {
    query = query.eq('post_type', postType);
  }

  return query;
}

export async function fetchPublishedPostBySlug(slug) {
  if (!supabase || !slug) {
    return { data: null, error: { message: 'Supabase veya slug eksik.' } };
  }

  return supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
}

export async function verifyBlogEditorAccess() {
  if (!supabase) {
    return { ok: false, error: { message: 'Supabase yapılandırması eksik.' } };
  }

  const { error } = await supabase.from('blog_posts').select('id').limit(1);
  if (!error) return { ok: true, error: null };

  const denied = error.code === '42501' || /permission|policy/i.test(error.message || '');
  return { ok: !denied, error };
}

export async function fetchAllPostsForEditor() {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase yapılandırması eksik.' } };
  }

  return supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
}

export async function saveBlogPost(payload, postId) {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase yapılandırması eksik.' } };
  }

  return postId
    ? supabase.from('blog_posts').update(payload).eq('id', postId).select('*').single()
    : supabase.from('blog_posts').insert(payload).select('*').single();
}

export async function deleteBlogPost(id) {
  if (!supabase) {
    return { error: { message: 'Supabase yapılandırması eksik.' } };
  }

  return supabase.from('blog_posts').delete().eq('id', id);
}
