# Güvenlik Politikası ve Önlemleri

Bu dokümantasyon, Akiyom web sitesi için uygulanan güvenlik önlemlerini açıklar.

## Uygulanan Güvenlik Önlemleri

### 1. HTTP Güvenlik Başlıkları (Security Headers)

Vercel.json dosyasında aşağıdaki güvenlik başlıkları yapılandırılmıştır:

- **X-Content-Type-Options: nosniff** - MIME type sniffing saldırılarını önler
- **X-Frame-Options: DENY** - Clickjacking saldırılarını önler
- **X-XSS-Protection: 1; mode=block** - XSS saldırılarına karşı koruma
- **Referrer-Policy: strict-origin-when-cross-origin** - Referrer bilgilerinin sızmasını önler
- **Permissions-Policy** - Gereksiz tarayıcı özelliklerini devre dışı bırakır
- **Strict-Transport-Security (HSTS)** - HTTPS zorunluluğu ve güvenli bağlantı
- **Content-Security-Policy (CSP)** - XSS ve veri enjeksiyon saldırılarını önler

### 2. Content Security Policy (CSP)

CSP politikası şu şekilde yapılandırılmıştır:

- **default-src 'self'** - Varsayılan olarak sadece aynı kaynaktan içerik
- **script-src** - Sadece güvenli script kaynakları
- **style-src** - Sadece güvenli stil kaynakları (Google Fonts dahil)
- **font-src** - Sadece güvenli font kaynakları
- **img-src** - Güvenli görsel kaynakları
- **frame-ancestors 'none'** - Iframe gömme engellendi

### 3. XSS (Cross-Site Scripting) Koruması

- React'in otomatik XSS koruması (dangerouslySetInnerHTML kullanılmıyor)
- HTML sanitization utility fonksiyonları (`src/utils/security.js`)
- Input validation ve sanitization

### 4. Güvenli Environment Variables

- `.env` dosyaları `.gitignore`'da
- Hassas bilgiler environment variables olarak saklanıyor
- Public olmayan API key'ler client-side'da expose edilmiyor

### 5. HTTPS Zorunluluğu

- HSTS header ile HTTPS zorunlu
- Tüm HTTP istekleri HTTPS'e yönlendiriliyor

### 6. Rate Limiting

- Client-side rate limiting utility fonksiyonları
- Vercel otomatik rate limiting sağlıyor

## Güvenlik Best Practices

### Geliştirme Sırasında

1. **Environment Variables**: Hassas bilgileri asla kod içine yazmayın
2. **Dependencies**: Düzenli olarak `npm audit` çalıştırın
3. **Input Validation**: Tüm kullanıcı inputlarını validate edin
4. **HTTPS**: Her zaman HTTPS kullanın

### Deployment Öncesi Kontrol Listesi

- [ ] Tüm environment variables güvenli şekilde ayarlandı
- [ ] `.env` dosyaları commit edilmedi
- [ ] Güvenlik headers test edildi
- [ ] CSP politikası doğru çalışıyor
- [ ] HTTPS zorunlu
- [ ] Rate limiting aktif
- [ ] Dependencies güncel ve güvenli

## Güvenlik Açığı Bildirimi

Güvenlik açığı bulursanız, lütfen doğrudan **akiyom.iletisim@gmail.com** adresine bildirin.

**ÖNEMLİ**: Güvenlik açıklarını public olarak paylaşmayın. Önce bizimle iletişime geçin.

## Güvenlik Güncellemeleri

- **2026-02-23**: İlk güvenlik önlemleri uygulandı
  - HTTP Security Headers eklendi
  - CSP politikası yapılandırıldı
  - XSS koruma utility'leri oluşturuldu
  - Environment variables güvenliği sağlandı

## Kaynaklar

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Mozilla Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Vercel Security Best Practices](https://vercel.com/docs/security)
