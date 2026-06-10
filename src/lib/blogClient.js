import { supabase } from './supabase.js';

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
