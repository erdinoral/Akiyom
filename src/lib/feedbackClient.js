import { supabase } from './supabase.js';

/** Tek görüş kaydının güncel durumu (insert sonrası dönen id ile) */
export async function fetchFeedbackStatus(feedbackId) {
  if (!supabase || !feedbackId) {
    return { data: null, error: { message: 'Supabase veya feedback id eksik.' } };
  }

  return supabase.rpc('get_feedback_status', { p_feedback_id: feedbackId }).maybeSingle();
}

/** Cihaz/oturum bazlı tüm görüşler (client_ref + app_code ile) */
export async function fetchMyAppFeedback(clientRef, appCode) {
  if (!supabase || !clientRef || !appCode) {
    return { data: null, error: { message: 'Supabase, client_ref veya app_code eksik.' } };
  }

  return supabase.rpc('list_app_feedback', {
    p_client_ref: clientRef,
    p_app_code: appCode,
  });
}

/**
 * Uygulama gönderiminde kullanılacak client_ref — localStorage'da sakla.
 * Windows/macOS/web: ilk açılışta oluştur, sonra aynısını kullan.
 */
export function getOrCreateClientRef(storageKey = 'akiyom_feedback_client_ref') {
  if (typeof localStorage === 'undefined') {
    return crypto.randomUUID?.() ?? `ref-${Date.now()}`;
  }

  let ref = localStorage.getItem(storageKey);
  if (!ref) {
    ref = crypto.randomUUID?.() ?? `ref-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(storageKey, ref);
  }
  return ref;
}
