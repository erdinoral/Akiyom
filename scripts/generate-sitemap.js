/**
 * Sitemap.xml ve robots.txt Otomatik Oluşturucu
 * Bu script, projedeki route'ları tarayarak sitemap.xml ve robots.txt dosyalarını oluşturur
 */

const fs = require('fs');
const path = require('path');

// Site bilgileri
const SITE_URL = 'https://akiyom.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0]; // YYYY-MM-DD formatı

// Route'lar ve öncelikleri
const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: CURRENT_DATE
  },
  {
    path: '/gizlilik',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: CURRENT_DATE
  },
  {
    path: '/gizlilik/aki-finans',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: CURRENT_DATE
  },
  {
    path: '/gizlilik/akizen',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: CURRENT_DATE
  },
  {
    path: '/akiyom-ai',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: CURRENT_DATE
  },
  {
    path: '/biz-kimiz',
    changefreq: 'monthly',
    priority: '0.85',
    lastmod: CURRENT_DATE
  },
  {
    path: '/projeler',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: CURRENT_DATE
  },
  {
    path: '/projeler/aki',
    changefreq: 'monthly',
    priority: '0.85',
    lastmod: CURRENT_DATE
  },
  {
    path: '/projeler/enigma-atlas',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: CURRENT_DATE
  },
  {
    path: '/projeler/aki-finans',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: CURRENT_DATE
  },
  {
    path: '/projeler/akizen-pc',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: CURRENT_DATE
  },
  {
    path: '/projeler/akibeat',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: CURRENT_DATE
  },
  {
    path: '/projeler/akipos',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: CURRENT_DATE
  },
  {
    path: '/projeler/akifactory',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: CURRENT_DATE
  },
  {
    path: '/blog',
    changefreq: 'weekly',
    priority: '0.85',
    lastmod: CURRENT_DATE
  }
];

/**
 * Sitemap.xml oluştur
 */
function generateSitemap() {
  console.log('🗺️  Sitemap.xml oluşturuluyor...');

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  routes.forEach((route, index) => {
    const comment = index === 0
      ? '  <!-- Ana Sayfa -->'
      : route.path === '/gizlilik'
      ? '  <!-- Gizlilik Politikası -->'
      : route.path === '/gizlilik/aki-finans'
      ? '  <!-- Aki Finans Gizlilik Politikası -->'
      : route.path === '/gizlilik/akizen'
      ? '  <!-- Akizen PC Gizlilik Politikası -->'
      : `  <!-- ${route.path} -->`;
    
    sitemap += `${comment}
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('✅ Sitemap.xml başarıyla oluşturuldu:', sitemapPath);
}

/**
 * Robots.txt oluştur
 */
function generateRobotsTxt() {
  console.log('🤖 Robots.txt oluşturuluyor...');

  const robotsTxt = `# robots.txt - Akiyom Website
# Tüm arama motorlarına izin ver

User-agent: *
Allow: /
Disallow: /profil
Disallow: /giris
Disallow: /kayit-ol
Disallow: /panel

# Sitemap konumu
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay (isteğe bağlı - çok agresif botlar için)
# Crawl-delay: 1
`;

  const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
  console.log('✅ Robots.txt başarıyla oluşturuldu:', robotsPath);
}

/**
 * Ana fonksiyon
 */
function main() {
  console.log('🚀 Sitemap ve Robots.txt oluşturma başlatılıyor...\n');
  
  try {
    generateSitemap();
    console.log('');
    generateRobotsTxt();
    console.log('\n✨ Tüm dosyalar başarıyla oluşturuldu!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

// Script doğrudan çalıştırıldığında
if (require.main === module) {
  main();
}

module.exports = { generateSitemap, generateRobotsTxt };
