import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    'Supabase yapılandırılmadı. .env dosyasına VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY ekleyin.'
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

const PROFILE_SELECTS = [
  'id, email, username, is_admin, is_editor, updated_at',
  'id, email, username, is_admin, updated_at',
  'id, email, username, is_admin, is_editor',
  'id, email, username, is_admin',
];

export async function fetchProfile(userId) {
  if (!supabase || !userId) return null;

  for (const select of PROFILE_SELECTS) {
    const { data, error } = await supabase.from('profiles').select(select).eq('id', userId).maybeSingle();

    if (!error && data) {
      return {
        ...data,
        is_editor: data.is_editor ?? false,
        updated_at: data.updated_at ?? null,
      };
    }

    if (error && !/column|does not exist/i.test(error.message)) {
      console.error('Profil yüklenemedi:', error.message);
      return null;
    }
  }

  console.error('Profil yüklenemedi: profiles tablosu beklenen sütunları içermiyor.');
  return null;
}
