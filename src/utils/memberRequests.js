import { supabase } from '../lib/supabase.js';

export const MEMBER_REQUEST_STATUS_LABELS = {
  new: 'Alındı',
  read: 'İnceleniyor',
  contacted: 'Yanıtlandı',
  closed: 'Tamamlandı',
};

export const PROJECT_TYPE_LABELS = {
  app: 'Uygulama',
  website: 'Web Sitesi',
  erp: 'ERP / Kurumsal Yazılım',
  widget: 'Widget',
  other: 'Diğer',
};

export const BILLING_PERIOD_LABELS = {
  monthly: 'Aylık ödeme',
  annual: 'Yıllık ödeme',
};

export async function getAccessToken() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function fetchMyMemberRequests() {
  if (!supabase) {
    return { data: [], error: { message: 'Supabase yapılandırması eksik.' } };
  }

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    return { data: [], error: { message: 'Talepleri görmek için giriş yapmalısınız.' } };
  }

  const [leadsRes, inquiriesRes] = await Promise.all([
    supabase
      .from('project_leads')
      .select('id, project_type, project_description, status, admin_notes, created_at, updated_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('akiyom_ai_inquiries')
      .select('id, plan_name, billing_period, message, status, admin_notes, created_at, updated_at')
      .order('created_at', { ascending: false }),
  ]);

  const error = leadsRes.error || inquiriesRes.error;
  if (error) {
    console.error('[ProfileRequests]', leadsRes.error || inquiriesRes.error);
    return { data: [], error };
  }

  const items = [
    ...(leadsRes.data ?? []).map((row) => ({
      id: row.id,
      kind: 'project',
      title: PROJECT_TYPE_LABELS[row.project_type] || row.project_type || 'Proje talebi',
      message: row.project_description,
      status: row.status,
      adminNotes: row.admin_notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
    ...(inquiriesRes.data ?? []).map((row) => ({
      id: row.id,
      kind: 'ai',
      title: row.plan_name ? `Akiyom AI · ${row.plan_name}` : 'Akiyom AI teklif talebi',
      subtitle: row.billing_period ? BILLING_PERIOD_LABELS[row.billing_period] : null,
      message: row.message,
      status: row.status,
      adminNotes: row.admin_notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return { data: items, error: null };
}
