import { createClient } from '@supabase/supabase-js';

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map();

const VALID_PLANS = new Set(['Mikro', 'Profesyonel', 'Kurumsal', 'Holding']);
const VALID_BILLING = new Set(['monthly', 'annual']);

function getSupabaseAdmin() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return String(forwarded).split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  let entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

function sanitizeText(value, maxLength) {
  if (value == null) return '';
  return String(value).trim().slice(0, maxLength);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { planName, billingPeriod, fullName, email, companyName, phone, message, website } = req.body;

    if (website && String(website).trim()) {
      return res.status(200).json({ success: true, message: 'Talebiniz alındı.' });
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        error: 'Çok fazla istek gönderildi. Lütfen birkaç dakika bekleyin.',
      });
    }

    const cleanFullName = sanitizeText(fullName, 120);
    const cleanEmail = sanitizeText(email, 254);
    const cleanCompany = sanitizeText(companyName, 160) || null;
    const cleanPhone = sanitizeText(phone, 40) || null;
    const cleanMessage = sanitizeText(message, 3000);
    const cleanPlan = sanitizeText(planName, 80) || null;
    const cleanBilling = sanitizeText(billingPeriod, 20) || null;

    if (!cleanFullName || !cleanEmail) {
      return res.status(400).json({ error: 'Ad soyad ve e-posta zorunludur.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ error: 'Geçerli bir e-posta adresi girin.' });
    }

    if (cleanPlan && !VALID_PLANS.has(cleanPlan)) {
      return res.status(400).json({ error: 'Geçersiz paket seçimi.' });
    }

    if (cleanBilling && !VALID_BILLING.has(cleanBilling)) {
      return res.status(400).json({ error: 'Geçersiz ödeme dönemi.' });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      console.error('Supabase admin yapılandırması eksik');
      return res.status(500).json({ error: 'Sunucu yapılandırması eksik' });
    }

    const { data, error } = await supabase
      .from('akiyom_ai_inquiries')
      .insert({
        plan_name: cleanPlan,
        billing_period: cleanBilling,
        full_name: cleanFullName,
        email: cleanEmail,
        company_name: cleanCompany,
        phone: cleanPhone,
        message: cleanMessage || 'Ödeme koşulları ve teklif hakkında bilgi almak istiyorum.',
        status: 'new',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Talep kaydedilemedi' });
    }

    return res.status(200).json({
      success: true,
      message: 'Talebiniz alındı. En kısa sürede size dönüş yapacağız.',
      id: data.id,
    });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
}
