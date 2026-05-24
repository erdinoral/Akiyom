# AKÄ°YOM Web Sitesi â€” Proje Rehberi (AI & GeliÅŸtirici DokÃ¼mantasyonu)

> **AmaÃ§:** Bu dosya, siteyi geliÅŸtirecek insanlar ve AI asistanlarÄ±nÄ±n projeyi hÄ±zlÄ±ca anlamasÄ±, tutarlÄ± deÄŸiÅŸiklik yapmasÄ± ve **mÃ¼ÅŸteri / iÅŸ ortaÄŸÄ± Ã§ekmeye** odaklanmasÄ± iÃ§in yazÄ±lmÄ±ÅŸtÄ±r.  
> **CanlÄ± site:** https://akiyom.com  
> **Ä°letiÅŸim:** akiyom.iletisim@gmail.com

---

## 1. Marka ve Ä°ÅŸ Hedefi (Ã–nce Bunu Oku)

### Akiyom kimdir?

**Akiyom**, mÃ¼zik, Ã¼retkenlik ve yazÄ±lÄ±m geliÅŸtirme alanÄ±nda kendi Ã¼rÃ¼nlerini Ã¼reten; aynÄ± zamanda **Akiyom Studio** markasÄ±yla dÄ±ÅŸ mÃ¼ÅŸterilere web sitesi ve uygulama geliÅŸtiren bir dijital stÃ¼dyo / Ã¼rÃ¼n ekosistemidir.

**Slogan:** *MÃ¼zik, Ãœretkenlik ve GeliÅŸtirme AdÄ±na Her Åey.*

### Sitenin asÄ±l iÅŸ hedefi

Site yalnÄ±zca bir portfolyo deÄŸil; **lead (mÃ¼ÅŸteri adayÄ±) toplama ve gÃ¼ven oluÅŸturma** aracÄ±dÄ±r:

| Hedef | Sitedeki karÅŸÄ±lÄ±ÄŸÄ± |
|--------|-------------------|
| Kendi Ã¼rÃ¼nlerini tanÄ±tmak | ÃœrÃ¼nler bÃ¶lÃ¼mÃ¼, modal detaylar, Store / harici linkler |
| **Freelance / ajans iÅŸi almak** | Akiyom Studio, paket kartlarÄ±, â€œProjenizi AnlatÄ±nâ€ formu |
| GÃ¼venilirlik | YayÄ±nda olan Ã¼rÃ¼nler (Microsoft Store), yol haritasÄ±, gizlilik sayfalarÄ± |
| SEO & keÅŸfedilebilirlik | Meta etiketler, JSON-LD, sitemap, robots.txt |

### Hedef kitle

- Bireysel iÃ§erik Ã¼reticileri, mÃ¼zisyenler, KOBÄ°â€™ler (kiÅŸisel site / uygulama)
- Åirketler (kurumsal site, panel, CRM, otomasyon)
- Microsoft Store kullanÄ±cÄ±larÄ± (Aki Finans, Akizen PC)

### Rakiplerden ayrÄ±ÅŸma mesajlarÄ± (iÃ§erikte vurgulanmalÄ±)

1. **Kendi Ã¼rÃ¼nlerini de geliÅŸtiriyorlar** â€” sadece ajans deÄŸil, canlÄ± Ã¼rÃ¼n ekosistemi (Akibeat, Enigma Atlas vb.)
2. **Premium karanlÄ±k UI** â€” Apple benzeri sade, animasyonlu, â€œuzay / derin griâ€ estetik
3. **UÃ§tan uca hizmet** â€” planlama, tasarÄ±m, geliÅŸtirme, yayÄ±na alma
4. **AI & modern stack** â€” Akibeat AI, Supabase/Firebase yol haritasÄ±

---

## 2. Teknoloji Ã–zeti

| Katman | Teknoloji |
|--------|-----------|
| Framework | React 18 |
| Build | Vite 5 |
| Routing | react-router-dom v6 |
| Animasyon | Framer Motion 10 |
| Stil | Vanilla CSS (tek bÃ¼yÃ¼k dosya: `AkiyomLanding.css`) |
| Backend (form) | Vercel Serverless Function + Resend (e-posta) |
| Deploy | Vercel |
| Dil | TÃ¼rkÃ§e (`lang="tr"`) |

### Komutlar

```bash
npm install          # baÄŸÄ±mlÄ±lÄ±klar
npm run dev          # geliÅŸtirme (Vite, varsayÄ±lan :5173)
npm run build        # production build (Ã¶nce sitemap Ã¼retir)
npm run preview      # build Ã¶nizleme
npm run generate:sitemap
npm run security:check
npm audit
```

### Ortam deÄŸiÅŸkenleri (Vercel)

| DeÄŸiÅŸken | KullanÄ±m |
|----------|----------|
| `RESEND_API_KEY` | `/api/send-project` â€” proje formu e-postasÄ± |

---

## 3. Dosya YapÄ±sÄ±

```
akiyom-website/
â”œâ”€â”€ main.jsx                 # Uygulama giriÅŸi + React Router
â”œâ”€â”€ index.html               # SEO meta, OG, Twitter, canonical
â”œâ”€â”€ index.css                # Global reset (minimal)
â”‚
â”œâ”€â”€ AkiyomLanding.jsx        # â˜… ANA SAYFA â€” tÃ¼m landing iÃ§eriÄŸi
â”œâ”€â”€ AkiyomLanding.css        # â˜… ANA STÄ°L â€” ~2700+ satÄ±r, tÃ¼m UI
â”œâ”€â”€ ProjectForm.jsx          # â€œProjenizi AnlatÄ±nâ€ modal formu
â”œâ”€â”€ CookieBanner.jsx         # Ã‡erez onay bannerâ€™Ä±
â”‚
â”œâ”€â”€ PrivacyPage.jsx          # /gizlilik â€” genel gizlilik
â”œâ”€â”€ AkiFinansPrivacyPage.jsx # /gizlilik/aki-finans
â”œâ”€â”€ AkizenPrivacyPage.jsx    # /gizlilik/akizen
â”‚
â”œâ”€â”€ AkiyomMain.jsx           # âš ï¸ KULLANILMIYOR â€” eski prototip
â”œâ”€â”€ AkiyomMain.css           # âš ï¸ KULLANILMIYOR
â”‚
â”œâ”€â”€ api/
â”‚   â””â”€â”€ send-project.js      # Vercel serverless â€” form â†’ e-posta
â”‚
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ utils/security.js    # XSS sanitize, URL validate (form iÃ§in hazÄ±r)
â”‚   â””â”€â”€ Privacy.jsx          # âš ï¸ ROUTEâ€™A BAÄLI DEÄÄ°L â€” baÅŸka projeden kalma (Tremor/Tailwind)
â”‚
â”œâ”€â”€ public/                  # Statik assetâ€™ler (rootâ€™tan /dosya.png)
â”‚   â”œâ”€â”€ sitemap.xml          # build Ã¶ncesi script ile Ã¼retilir
â”‚   â”œâ”€â”€ robots.txt
â”‚   â”œâ”€â”€ Akizenpc.png, crimsondesert.png, ...
â”‚   â””â”€â”€ thumb_cache/
â”‚
â”œâ”€â”€ scripts/
â”‚   â”œâ”€â”€ generate-sitemap.js  # prebuild hook
â”‚   â””â”€â”€ security-check.js
â”‚
â”œâ”€â”€ vercel.json              # SPA rewrite + gÃ¼venlik headerâ€™larÄ±
â”œâ”€â”€ SECURITY.md              # GÃ¼venlik detaylarÄ±
â””â”€â”€ SITE_GUIDE.md            # Bu dosya
```

### Ã–nemli notlar

- **Flat yapÄ±:** Ã‡oÄŸu component proje kÃ¶kÃ¼nde; `src/` altÄ±nda sadece utils ve kullanÄ±lmayan `Privacy.jsx` var.
- **Tek CSS dosyasÄ±:** Yeni bÃ¶lÃ¼m eklerken `AkiyomLanding.css` iÃ§inde mevcut class isimlendirme ve CSS deÄŸiÅŸkenlerine uy.
- **GÃ¶rsel yollarÄ±:** `public/` kÃ¶kÃ¼nden servis edilir â†’ Ã¶rn. `image: '/akibeat.png'` (dosya `public/akibeat.png` olmalÄ±).

---

## 4. Routing (Sayfa HaritasÄ±)

| Path | Component | AÃ§Ä±klama |
|------|-----------|----------|
| `/` | `AkiyomLanding` | Ana landing â€” tÃ¼m iÅŸ mantÄ±ÄŸÄ± burada |
| `/gizlilik` | `PrivacyPage` | Genel gizlilik politikasÄ± |
| `/gizlilik/aki-finans` | `AkiFinansPrivacyPage` | Aki Finans uygulamasÄ± gizliliÄŸi |
| `/gizlilik/akizen` | `AkizenPrivacyPage` | Akizen PC gizliliÄŸi |

TanÄ±m: `main.jsx`

Footerâ€™daki **KullanÄ±m KoÅŸullarÄ±** ve **Ä°letiÅŸim** ayrÄ± route deÄŸil; `AkiyomLanding` iÃ§inde `selectedPage` state ile modal aÃ§Ä±lÄ±r.

---

## 5. Ana Sayfa BÃ¶lÃ¼mleri (`AkiyomLanding.jsx`)

Sayfa yukarÄ±dan aÅŸaÄŸÄ± ÅŸu sÄ±rayla akar:

```
[Navbar - sticky, scroll ile opacity artar]
    â†“
[Hero - AKÄ°YOM + slogan, scroll'da kÃ¼Ã§Ã¼lÃ¼p solar]
    â†“
#vizyon â€” Vizyonumuz (3 paragraf metin)
    â†“
#hedefler â€” Yol HaritasÄ± (timeline)
    â†“
#urunler â€” ÃœrÃ¼nlerimiz (4 kart + modal)
    â†“
Neler GeliÅŸtiriyoruz? â€” solutionAreas (4 kart)
    â†“
Akiyom Studio â€” hizmetler, paketler, CTA
    â†“
[Footer â€” gizlilik linkleri, modal tetikleyiciler]
[CookieBanner]
[ProjectForm modal]
```

### Arka plan katmanlarÄ± (CSS)

1. `background-base-layer` â€” siyah zemin  
2. `background-effects-layer` â€” blurâ€™lu Ä±ÅŸÄ±k kÃ¼meleri (`light-1/2/3`)  
3. `content-safety-layer` â€” okunabilirlik  
4. `content-layer` â€” gerÃ§ek iÃ§erik  

### State yÃ¶netimi

| State | AmaÃ§ |
|-------|------|
| `selectedProduct` | ÃœrÃ¼n detay modalÄ± |
| `selectedStudioPackage` | Studio paket detay modalÄ± |
| `selectedPage` | `'terms'` \| `'contact'` \| `'privacy'` (footer modallarÄ±) |
| `isProjectFormOpen` | Proje formu |

Framer Motion: `useScroll`, `useTransform`, `AnimatePresence`, `LayoutGroup` (Ã¼rÃ¼n kartlarÄ±).

### Veri dizileri (iÃ§erik gÃ¼ncellemek iÃ§in)

TÃ¼m iÃ§erik **component iÃ§inde sabit array** olarak tanÄ±mlÄ± â€” ayrÄ± CMS yok.

#### `products` (4 Ã¼rÃ¼n)

| id | name | status | link |
|----|------|--------|------|
| 1 | Akibeat | in-progress | https://akibeat.akiyom.com |
| 2 | Aki Finans | published | Microsoft Store |
| 3 | Enigma Atlas | published | https://enigma.akiyom.com/ |
| 4 | Akizen PC | published | Microsoft Store |

`status`: `'in-progress'` \| `'published'` â€” badge stili deÄŸiÅŸir.

#### `goals` (yol haritasÄ±)

`status`: `'in-progress'` \| `'planned'`

#### `studioPackages` (4 paket)

KiÅŸisel Site, KiÅŸisel Uygulama, Ticari Site, Ticari Uygulama â€” fiyat ve sÃ¼re modalâ€™da.

#### `solutionAreas` (4 alan)

Ticari web, topluluk/forum, vlog/iÃ§erik, ÅŸirket uygulamalarÄ±.

### JSON-LD (SEO)

`useEffect` ile `akiyom-studio-schema` script tag eklenir â€” Schema.org `Service` + `Organization`. GÃ¼ncellerken `provider`, `serviceType`, `offers` alanlarÄ±nÄ± senkron tut.

---

## 6. Proje Formu AkÄ±ÅŸÄ±

```
[KullanÄ±cÄ±] "Projenizi AnlatÄ±n" â†’ ProjectForm modal
    â†’ POST /api/send-project
    â†’ api/send-project.js (Resend)
    â†’ akiyom.iletisim@gmail.com
```

**Form alanlarÄ±:** `projectType`, `fullName`, `companyName` (opsiyonel), `projectDescription`

**projectType deÄŸerleri:** `app` | `website` | `widget` | `other`

Validasyon hem client (`ProjectForm.jsx`) hem server (`api/send-project.js`) tarafÄ±nda.

---

## 7. TasarÄ±m Sistemi

### CSS deÄŸiÅŸkenleri (`:root` in `AkiyomLanding.css`)

```css
--bg-primary: #0D0D0D;
--text-primary: #FFFFFF;
--text-secondary: rgba(255, 255, 255, 0.7);
--border-color: rgba(255, 255, 255, 0.1);
--hover-bg: rgba(255, 255, 255, 0.05);
```

### Tipografi

- Font: **Inter** (Google Fonts) â€” 300, 500, 700, 900
- Marka yazÄ±mÄ±: **AKÄ°YOM** â€” â€œÄ°â€ harfinde Ã¶zel yÄ±ldÄ±z efekti (`.star-i-nav`)

### Estetik kurallarÄ±

- KaranlÄ±k, minimal, â€œpremium techâ€ hissi
- Kartlar: cam efekti, ince border, hoverâ€™da hafif yukarÄ± kayma
- Animasyonlar: yavaÅŸ, `ease: [0.25, 0.1, 0.25, 1]` cubic-bezier
- Placeholder / neon mor-pembe **kullanÄ±lmÄ±yor** (eski `AkiyomMain` Ã¶yleydi)

### Responsive

`AkiyomLanding.css` iÃ§inde media queryâ€™ler mevcut; yeni bÃ¶lÃ¼m eklerken mobil kÄ±rÄ±lÄ±mlarÄ± test et.

---

## 8. ÃœrÃ¼n Ekosistemi (DÄ±ÅŸ Linkler)

| ÃœrÃ¼n | AÃ§Ä±klama | Durum |
|------|----------|-------|
| **Akibeat** | AI mÃ¼zik analiz & mastering | GeliÅŸtirme devam |
| **Aki Finans** | KiÅŸisel finans / cÃ¼zdan | Microsoft Storeâ€™da |
| **Enigma Atlas** | DÃ¼nya gizemleri keÅŸif platformu | YayÄ±nda (enigma.akiyom.com) |
| **Akizen PC** | PC performans & sistem saÄŸlÄ±ÄŸÄ± | Microsoft Storeâ€™da |

Alt domainâ€™ler: `akibeat.akiyom.com`, `enigma.akiyom.com` â€” ana site bunlara link verir, ayrÄ± repoâ€™lar olabilir.

---

## 9. SEO & GÃ¼venlik

### SEO

- `index.html`: title, description, keywords, OG, Twitter, canonical
- `scripts/generate-sitemap.js` â†’ `public/sitemap.xml` + `robots.txt`
- Build: `prebuild` â†’ sitemap otomatik
- Yeni **public route** eklersen `scripts/generate-sitemap.js` iÃ§indeki `routes` dizisini gÃ¼ncelle

### GÃ¼venlik

- `vercel.json`: CSP, HSTS, X-Frame-Options, vb.
- `SECURITY.md`: detaylÄ± politika
- `src/utils/security.js`: sanitizeHTML, validateURL â€” form/API geniÅŸletilirken kullan
- `.env` asla commit edilmez

---

## 10. Bilinen Eksikler ve Teknik BorÃ§

| Konu | Detay | Ã–ncelik |
|------|-------|---------|
| Büyük görseller | `public/` altında PNG dosyaları mevcut; bazıları MB seviyesinde — WebP veya thumb_cache ile optimize edilebilir | Orta — sayfa hızı |
| `AkiyomMain.jsx` | Routeâ€™a baÄŸlÄ± deÄŸil, silinebilir veya arÅŸivlenebilir | DÃ¼ÅŸÃ¼k |
| `src/Privacy.jsx` | Tremor/Tailwind baÄŸÄ±mlÄ±, bu projede kullanÄ±lmÄ±yor | DÃ¼ÅŸÃ¼k â€” sil veya entegre etme |
| KullanÄ±m KoÅŸullarÄ± | Modal iÃ§inde; ayrÄ± `/kullanim` sayfasÄ± yok | Orta â€” SEO iÃ§in sayfa eklenebilir |
| Ã‡oklu dil | Sadece TR | Orta â€” yol haritasÄ±nda â€œGlobal EriÅŸimâ€ hedefi var |
| Analytics | GÃ¶rÃ¼nÃ¼r entegrasyon yok | Orta â€” conversion Ã¶lÃ§Ã¼mÃ¼ iÃ§in |
| Rate limiting | APIâ€™de sÄ±nÄ±rlÄ± koruma | Orta |
| Kreasus / baÄŸÄ±ÅŸ | Eski `AkiyomMain`â€™de placeholder vardÄ±; landingâ€™de yok | Ä°stenirse eklenebilir |

---

## 11. GeliÅŸtirme Ã–ncelikleri (Ä°ÅŸ Ã‡ekmek Ä°Ã§in)

AI veya geliÅŸtirici bu siteye dokunurken **Ã¶nce conversion**, sonra polish dÃ¼ÅŸÃ¼nmeli:

### P0 â€” Hemen yapÄ±lmalÄ±

1. **Hero CTA:** â€œProjenizi AnlatÄ±nâ€ veya â€œTeklif AlÄ±nâ€ heroâ€™da gÃ¶rÃ¼nÃ¼r olsun (ÅŸu an sadece Studio bÃ¶lÃ¼mÃ¼nde)  
2. **Sosyal kanÄ±t:** Store yorumlarÄ±, indirme sayÄ±sÄ±, â€œX projede Ã§alÄ±ÅŸtÄ±kâ€ â€” Studio bÃ¶lÃ¼mÃ¼ne kÄ±sa blok  
3. **Ä°letiÅŸim alternatifleri:** WhatsApp / LinkedIn (footer veya contact modal)

### P1 â€” KÄ±sa vadede

5. **Case study / referans** bÃ¶lÃ¼mÃ¼ â€” Enigma Atlas, Aki Finans ekran gÃ¶rÃ¼ntÃ¼leri  
6. **FiyatlandÄ±rma ÅŸeffaflÄ±ÄŸÄ±** â€” paket modalâ€™larÄ± iyi; ana sayfada Ã¶zet tablo  
7. **Blog veya â€œNeler yaptÄ±k?â€** â€” SEO long-tail (â€œkurumsal web sitesi fiyatlarÄ±â€ vb.)  
8. **`/studio` veya `/hizmetler`** ayrÄ± landing â€” Studio iÃ§in derinlemesine sayfa  

### P2 â€” Orta vadede

9. i18n (EN) â€” uluslararasÄ± mÃ¼ÅŸteri  
10. Lighthouse / Core Web Vitals optimizasyonu  
11. `products` / `studioPackages` verisini `data/` JSONâ€™a taÅŸÄ± â€” iÃ§erik dÃ¼zenlemesi kolaylaÅŸÄ±r  
12. Componentâ€™leri `components/` altÄ±na bÃ¶l â€” `AkiyomLanding.jsx` 900 satÄ±r, bakÄ±m zor  

### Ä°Ã§erik tonu (yazarken)

- AbartÄ±lÄ± startup jargonundan kaÃ§Ä±n  
- Somut Ã§Ä±ktÄ±: sÃ¼re, fiyat aralÄ±ÄŸÄ±, teknoloji (React, Vercel, AI)  
- â€œBizâ€ dili, gÃ¼ven veren, kÄ±sa cÃ¼mleler  
- Her CTA tek bir eylem: form aÃ§, mail at, Storeâ€™a git  

---

## 12. Yeni Ã–zellik Eklerken Checklist

- [ ] Route eklendi mi? â†’ `main.jsx` + `scripts/generate-sitemap.js`
- [ ] Stil `AkiyomLanding.css`â€™e mi eklendi? (yeni global CSS dosyasÄ± aÃ§ma)
- [ ] Framer `viewport={{ once: true }}` tutarlÄ± mÄ±?
- [ ] Mobil menÃ¼ / navbar linkleri gÃ¼ncel mi?
- [ ] Form varsa â†’ `/api/` + Vercel env
- [ ] Gizlilik / yasal metin gerekliyse ayrÄ± sayfa veya modal
- [ ] `npm run build` hatasÄ±z mÄ±?

---

## 13. AI AsistanlarÄ± Ä°Ã§in KÄ±sa Prompt Åablonu

AÅŸaÄŸÄ±daki metni baÅŸka bir AI oturumuna yapÄ±ÅŸtÄ±rabilirsin:

```
Sen Akiyom (akiyom.com) web sitesini geliÅŸtiriyorsun. React 18 + Vite + react-router-dom.
Ana dosya: AkiyomLanding.jsx + AkiyomLanding.css. Deploy: Vercel.
Ä°ÅŸ hedefi: Akiyom Studio ile mÃ¼ÅŸteri Ã§ekmek â€” "Projenizi AnlatÄ±n" formu kritik.
Marka: karanlÄ±k premium UI, Inter font, TÃ¼rkÃ§e.
ÃœrÃ¼nler: Akibeat, Aki Finans, Enigma Atlas, Akizen PC.
Detaylar iÃ§in proje kÃ¶kÃ¼ndeki SITE_GUIDE.md dosyasÄ±nÄ± oku.
DeÄŸiÅŸiklik yaparken: minimal diff, mevcut animasyon/CSS pattern'lerine uy, conversion Ã¶ncelikli.
KullanÄ±lmayan: AkiyomMain.jsx, src/Privacy.jsx (route yok).
```

---

## 14. Ä°letiÅŸim ve Sahiplik

| | |
|--|--|
| E-posta | akiyom.iletisim@gmail.com |
| Domain | akiyom.com |
| Telif | Â© 2026 Akiyom |

---

*Son gÃ¼ncelleme: MayÄ±s 2026 â€” Bu dosyayÄ± mimari veya iÅŸ hedefi deÄŸiÅŸince gÃ¼ncelleyin.*
