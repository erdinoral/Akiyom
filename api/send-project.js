import { createClient } from '@supabase/supabase-js';

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map();

const PROJECT_TYPE_LABELS = {
  app: 'Uygulama',
  website: 'Web Sitesi',
  erp: 'ERP / Kurumsal Yazılım',
  widget: 'Widget',
  other: 'Diğer',
};

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
    const { projectType, fullName, companyName, email, projectDescription, website } = req.body;

    if (website && String(website).trim()) {
      return res.status(200).json({
        success: true,
        message: 'Talebiniz alındı.',
      });
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        error: 'Çok fazla istek gönderildi. Lütfen birkaç dakika bekleyin.',
      });
    }

    const cleanFullName = sanitizeText(fullName, 120);
    const cleanCompanyName = sanitizeText(companyName, 160);
    const cleanEmail = sanitizeText(email, 254);
    const cleanDescription = sanitizeText(projectDescription, 5000);
    const cleanProjectType = sanitizeText(projectType, 40);

    if (!cleanFullName || !cleanProjectType || !cleanDescription || !cleanEmail) {
      return res.status(400).json({ error: 'Zorunlu alanlar eksik' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ error: 'Geçerli bir e-posta adresi girin' });
    }

    if (!PROJECT_TYPE_LABELS[cleanProjectType]) {
      return res.status(400).json({ error: 'Geçersiz proje tipi' });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      console.error('Supabase admin yapılandırması eksik');
      return res.status(500).json({ error: 'Sunucu yapılandırması eksik' });
    }

    const { data, error } = await supabase
      .from('project_leads')
      .insert({
        project_type: cleanProjectType,
        full_name: cleanFullName,
        company_name: cleanCompanyName || null,
        email: cleanEmail,
        project_description: cleanDescription,
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
      message: 'Talebiniz alındı',
      id: data.id,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
}
