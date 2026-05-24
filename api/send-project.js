import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map();

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

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS isteği için
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Sadece POST isteklerine izin ver
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { projectType, fullName, companyName, projectDescription, website } = req.body;

    // Honeypot — bot tuzağı (mail gönderme, başarılı gibi davran)
    if (website && String(website).trim()) {
      return res.status(200).json({
        success: true,
        message: 'Email başarıyla gönderildi',
      });
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        error: 'Çok fazla istek gönderildi. Lütfen birkaç dakika bekleyin.',
      });
    }

    // Validasyon
    if (!fullName || !projectType || !projectDescription) {
      return res.status(400).json({ error: 'Zorunlu alanlar eksik' });
    }

    // Proje tipi etiketleri
    const projectTypeLabels = {
      app: 'Uygulama',
      website: 'Web Sitesi',
      widget: 'Widget',
      other: 'Diğer'
    };

    const projectTypeLabel = projectTypeLabels[projectType] || projectType;

    // Email içeriği
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0D0D0D; color: #FFFFFF;">
        <h2 style="color: #FFFFFF; border-bottom: 2px solid rgba(255, 255, 255, 0.1); padding-bottom: 10px;">
          Yeni Proje Talebi
        </h2>
        
        <div style="margin-top: 30px;">
          <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 5px;"><strong style="color: #FFFFFF;">Proje Tipi:</strong></p>
          <p style="color: #FFFFFF; margin-bottom: 20px;">${projectTypeLabel}</p>
          
          <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 5px;"><strong style="color: #FFFFFF;">Ad Soyad:</strong></p>
          <p style="color: #FFFFFF; margin-bottom: 20px;">${fullName}</p>
          
          ${companyName ? `
            <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 5px;"><strong style="color: #FFFFFF;">Şirket İsmi:</strong></p>
            <p style="color: #FFFFFF; margin-bottom: 20px;">${companyName}</p>
          ` : ''}
          
          <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 5px;"><strong style="color: #FFFFFF;">Proje Detayları:</strong></p>
          <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 20px;">
            <p style="color: #FFFFFF; white-space: pre-wrap; line-height: 1.6;">${projectDescription}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <p style="color: rgba(255, 255, 255, 0.5); font-size: 12px;">
            Bu mesaj Akiyom web sitesi üzerinden gönderilmiştir.
          </p>
        </div>
      </div>
    `;

    // Email gönder
    const { data, error } = await resend.emails.send({
      from: 'Akiyom Web Sitesi <noreply@akiyom.com>',
      to: ['akiyom.iletisim@gmail.com'],
      replyTo: companyName ? `${fullName} <noreply@akiyom.com>` : fullName,
      subject: `Yeni Proje Talebi: ${projectTypeLabel} - ${fullName}`,
      html: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Email gönderilemedi' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email başarıyla gönderildi',
      data 
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
}
