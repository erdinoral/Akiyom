/**
 * Güvenlik Utility Fonksiyonları
 * XSS ve diğer güvenlik tehditlerine karşı koruma
 */

/**
 * HTML içeriğini temizler (XSS koruması)
 * @param {string} html - Temizlenecek HTML içeriği
 * @returns {string} - Temizlenmiş içerik
 */
export const sanitizeHTML = (html) => {
  if (!html) return '';
  
  // Tehlikeli tag'leri kaldır
  const dangerousTags = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const dangerousAttributes = /on\w+\s*=\s*["'][^"']*["']/gi;
  
  let sanitized = html
    .replace(dangerousTags, '')
    .replace(dangerousAttributes, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '');
  
  return sanitized;
};

/**
 * URL'yi doğrular ve güvenli hale getirir
 * @param {string} url - Doğrulanacak URL
 * @returns {string|null} - Güvenli URL veya null
 */
export const validateURL = (url) => {
  if (!url) return null;
  
  try {
    const parsedUrl = new URL(url);
    
    // Sadece http ve https protokollerine izin ver
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return null;
    }
    
    // Tehlikeli protokolleri engelle
    if (parsedUrl.protocol === 'javascript:' || parsedUrl.protocol === 'data:') {
      return null;
    }
    
    return parsedUrl.toString();
  } catch (e) {
    return null;
  }
};

/**
 * Email adresini doğrular
 * @param {string} email - Doğrulanacak email
 * @returns {boolean} - Geçerli email ise true
 */
export const validateEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Input string'i güvenli hale getirir (SQL injection ve XSS koruması)
 * @param {string} input - Temizlenecek input
 * @returns {string} - Temizlenmiş input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // HTML tag karakterlerini kaldır
    .replace(/['"]/g, '') // Tırnak işaretlerini kaldır
    .replace(/[;\\]/g, '') // SQL injection karakterlerini kaldır
    .trim();
};

/**
 * Rate limiting için basit bir kontrol (client-side)
 * @param {string} key - Rate limit anahtarı
 * @param {number} maxRequests - Maksimum istek sayısı
 * @param {number} windowMs - Zaman penceresi (milisaniye)
 * @returns {boolean} - İstek yapılabilir mi?
 */
export const checkRateLimit = (key, maxRequests = 10, windowMs = 60000) => {
  const storageKey = `rate_limit_${key}`;
  const now = Date.now();
  
  try {
    const stored = localStorage.getItem(storageKey);
    
    if (!stored) {
      localStorage.setItem(storageKey, JSON.stringify({
        count: 1,
        resetTime: now + windowMs
      }));
      return true;
    }
    
    const data = JSON.parse(stored);
    
    if (now > data.resetTime) {
      localStorage.setItem(storageKey, JSON.stringify({
        count: 1,
        resetTime: now + windowMs
      }));
      return true;
    }
    
    if (data.count >= maxRequests) {
      return false;
    }
    
    data.count++;
    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
  } catch (e) {
    // LocalStorage hatası durumunda izin ver
    return true;
  }
};
