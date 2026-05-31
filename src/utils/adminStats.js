import { supabase } from '../lib/supabase.js';
import { FEEDBACK_STATUS_LABELS } from '../data/feedbackStatus.js';

const PROJECT_TYPE_LABELS = {
  app: 'Uygulama',
  website: 'Web Sitesi',
  erp: 'ERP / Kurumsal Yazılım',
  widget: 'Widget',
  other: 'Diğer',
};

const STATUS_LABELS = {
  new: 'Yeni',
  read: 'Okundu',
  contacted: 'İletişim kuruldu',
  closed: 'Kapandı',
};

const PLATFORM_LABELS = {
  google_ads: 'Google Ads',
  meta: 'Meta (Instagram/Facebook)',
  linkedin: 'LinkedIn',
  organic: 'Organik',
  other: 'Diğer',
};

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return startOfDay(d);
}

export function computeLeadStats(leads) {
  const now = new Date();
  const weekAgo = daysAgo(7);
  const monthAgo = daysAgo(30);

  const byStatus = {};
  const byType = {};
  const byDay = {};

  leads.forEach((lead) => {
    byStatus[lead.status] = (byStatus[lead.status] || 0) + 1;
    byType[lead.project_type] = (byType[lead.project_type] || 0) + 1;

    const dayKey = startOfDay(lead.created_at).toISOString().slice(0, 10);
    byDay[dayKey] = (byDay[dayKey] || 0) + 1;
  });

  const last7Days = [];
  for (let i = 6; i >= 0; i -= 1) {
    const d = daysAgo(i);
    const key = d.toISOString().slice(0, 10);
    last7Days.push({ date: key, label: d.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' }), count: byDay[key] || 0 });
  }

  return {
    total: leads.length,
    new: byStatus.new || 0,
    read: byStatus.read || 0,
    contacted: byStatus.contacted || 0,
    closed: byStatus.closed || 0,
    thisWeek: leads.filter((l) => new Date(l.created_at) >= weekAgo).length,
    thisMonth: leads.filter((l) => new Date(l.created_at) >= monthAgo).length,
    byStatus,
    byType,
    last7Days,
    conversionRate: leads.length ? Math.round(((byStatus.closed || 0) / leads.length) * 100) : 0,
    recent: [...leads].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5),
  };
}

export function computeMarketingStats(metrics) {
  const totals = metrics.reduce(
    (acc, row) => ({
      impressions: acc.impressions + (row.impressions || 0),
      clicks: acc.clicks + (row.clicks || 0),
      spend: acc.spend + Number(row.spend_try || 0),
      conversions: acc.conversions + (row.conversions || 0),
    }),
    { impressions: 0, clicks: 0, spend: 0, conversions: 0 }
  );

  const byPlatform = {};
  metrics.forEach((row) => {
    if (!byPlatform[row.platform]) {
      byPlatform[row.platform] = { spend: 0, clicks: 0, conversions: 0, impressions: 0, count: 0 };
    }
    byPlatform[row.platform].spend += Number(row.spend_try || 0);
    byPlatform[row.platform].clicks += row.clicks || 0;
    byPlatform[row.platform].conversions += row.conversions || 0;
    byPlatform[row.platform].impressions += row.impressions || 0;
    byPlatform[row.platform].count += 1;
  });

  return {
    totals,
    byPlatform,
    ctr: totals.impressions ? ((totals.clicks / totals.impressions) * 100).toFixed(2) : '0.00',
    cpc: totals.clicks ? (totals.spend / totals.clicks).toFixed(2) : '0.00',
    costPerLead: totals.conversions ? (totals.spend / totals.conversions).toFixed(2) : '—',
  };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(
    Number(value || 0)
  );
}

export function formatDate(value, withTime = false) {
  if (!value) return '—';
  const opts = withTime
    ? { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('tr-TR', opts).format(new Date(value));
}

export async function resolveFeedbackImageUrl(imagePath) {
  if (!imagePath || !supabase) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;

  const path = imagePath.replace(/^feedback-images\//, '');
  const { data, error } = await supabase.storage.from('feedback-images').createSignedUrl(path, 3600);
  if (!error && data?.signedUrl) return data.signedUrl;

  const { data: publicData } = supabase.storage.from('feedback-images').getPublicUrl(path);
  return publicData?.publicUrl ?? null;
}

export const INQUIRY_STATUS_LABELS = STATUS_LABELS;

export const BILLING_PERIOD_LABELS = {
  monthly: 'Aylık ödeme',
  annual: 'Yıllık ödeme',
};

export function computeAiInquiryStats(inquiries) {
  const byStatus = {};
  inquiries.forEach((row) => {
    byStatus[row.status] = (byStatus[row.status] || 0) + 1;
  });
  return {
    total: inquiries.length,
    new: byStatus.new || 0,
    byStatus,
    recent: [...inquiries]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5),
  };
}

export function computeFeedbackStats(feedback) {
  const byStatus = {};
  const byApp = {};

  feedback.forEach((item) => {
    const status = item.status || 'new';
    byStatus[status] = (byStatus[status] || 0) + 1;
    const app = item.app_name || item.app_code || 'Diğer';
    byApp[app] = (byApp[app] || 0) + 1;
  });

  return {
    total: feedback.length,
    new: byStatus.new || 0,
    byStatus,
    byApp,
    recent: [...feedback].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5),
  };
}

export { PROJECT_TYPE_LABELS, STATUS_LABELS, PLATFORM_LABELS, FEEDBACK_STATUS_LABELS };
