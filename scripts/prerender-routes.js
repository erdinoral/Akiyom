/**
 * Vercel static hosting: her route için dist altında index.html kopyalar.
 * Route bazlı title/description/canonical enjekte edilir (botlar ve paylaşım önizlemesi).
 */
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://akiyom.com';

const ROUTE_META = {
  '/gizlilik': {
    title: 'Gizlilik Politikası ve KVKK — Akiyom',
    description:
      'Akiyom web sitesi, iletişim formu, çerezler ve Akiyom AI hizmetleri için gizlilik ve KVKK aydınlatma metni.',
  },
  '/gizlilik/aki-finans': {
    title: 'Aki Finans Gizlilik Politikası — Akiyom',
    description: 'Aki Finans uygulaması veri toplama, yerel saklama ve gizlilik uygulamaları.',
  },
  '/gizlilik/akizen': {
    title: 'Akizen PC Gizlilik Politikası — Akiyom',
    description: 'Akizen PC uygulaması gizlilik politikası ve veri işleme bilgileri.',
  },
  '/akiyom-ai': {
    title: 'Akiyom AI | Kurumsal Yerel AI Altyapısı — Akiyom',
    description:
      "Verileriniz şirket dışına çıkmadan yerel AI sunucu çözümleri. Mikro'dan Holding'e modüler paketler, Graph-RAG, FLUX ve özelleştirilebilir GPU altyapısı.",
  },
  '/biz-kimiz': {
    title: 'Biz Kimiz — Akiyom Yazılım ve Geliştirme',
    description:
      '2025\'te Erdin Oral tarafından kurulan Akiyom; İstanbul merkezli ürün, Studio ve Akiyom AI ekosistemi.',
  },
  '/projeler': {
    title: 'Projelerimiz — Akiyom Studio',
    description: 'Akiyom tarafından geliştirilen web ve masaüstü projeler: AKİPos, Enigma Atlas, Aki Finans, Akizen PC, Akibeat.',
  },
  '/projeler/enigma-atlas': {
    title: 'Enigma Atlas — Akiyom Projeler',
    description: 'Enigma Atlas oyun rehberi ve topluluk platformu projesi.',
  },
  '/projeler/aki-finans': {
    title: 'Aki Finans — Akiyom Projeler',
    description: 'Aki Finans kişisel finans analiz uygulaması.',
  },
  '/projeler/akizen-pc': {
    title: 'Akizen PC — Akiyom Projeler',
    description: 'Akizen PC sistem optimizasyon uygulaması.',
  },
  '/projeler/akibeat': {
    title: 'Akibeat — Akiyom Projeler',
    description: 'Akibeat müzik üretkenliği uygulaması.',
  },
  '/projeler/akipos': {
    title: 'AKİPos — Akiyom Projeler',
    description: 'AKİPos satış, stok ve raporlama otomasyonu POS uygulaması.',
  },
  '/blog': {
    title: 'Blog & Haberler — Akiyom',
    description: 'Akiyom blog yazıları, ürün haberleri ve duyurular.',
  },
};

const ROUTES = Object.keys(ROUTE_META);

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function injectRouteMeta(html, route, meta) {
  const canonical = `${SITE_URL}${route}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta name="title" content="[^"]*">/,
    `<meta name="title" content="${title}">`
  );
  out = out.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${description}">`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${title}">`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${description}">`
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${canonical}">`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${title}">`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${description}">`
  );
  out = out.replace(
    /<meta name="twitter:url" content="[^"]*">/,
    `<meta name="twitter:url" content="${canonical}">`
  );
  out = out.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`);

  return out;
}

function main() {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error('❌ dist/index.html bulunamadı. Önce npm run build çalıştırın.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_PATH, 'utf8');

  ROUTES.forEach((route) => {
    const dir = path.join(DIST_DIR, route.replace(/^\//, ''));
    const meta = ROUTE_META[route];
    const html = injectRouteMeta(baseHtml, route, meta);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    console.log(`✅ Prerender: ${route} → dist${route}/index.html`);
  });

  console.log('\n✨ Route prerender tamamlandı.');
}

main();
