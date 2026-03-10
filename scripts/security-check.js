/**
 * Güvenlik Kontrol Scripti
 * Proje güvenlik ayarlarını kontrol eder
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 Güvenlik Kontrolü Başlatılıyor...\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

// 1. .gitignore kontrolü
function checkGitignore() {
  console.log('1. .gitignore kontrolü...');
  const gitignorePath = path.join(__dirname, '..', '.gitignore');
  
  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf8');
    if (content.includes('.env') && content.includes('node_modules')) {
      console.log('   ✅ .gitignore doğru yapılandırılmış\n');
      checks.passed++;
    } else {
      console.log('   ⚠️  .gitignore eksik içerik içeriyor\n');
      checks.warnings++;
    }
  } else {
    console.log('   ❌ .gitignore dosyası bulunamadı\n');
    checks.failed++;
  }
}

// 2. vercel.json güvenlik headers kontrolü
function checkVercelConfig() {
  console.log('2. vercel.json güvenlik headers kontrolü...');
  const vercelPath = path.join(__dirname, '..', 'vercel.json');
  
  if (fs.existsSync(vercelPath)) {
    const content = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
    
    if (content.headers && content.headers.length > 0) {
      const headers = content.headers[0].headers || [];
      const requiredHeaders = [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'Content-Security-Policy',
        'Strict-Transport-Security'
      ];
      
      const foundHeaders = headers.map(h => h.key);
      const missing = requiredHeaders.filter(h => !foundHeaders.includes(h));
      
      if (missing.length === 0) {
        console.log('   ✅ Tüm gerekli güvenlik headers mevcut\n');
        checks.passed++;
      } else {
        console.log(`   ⚠️  Eksik headers: ${missing.join(', ')}\n`);
        checks.warnings++;
      }
    } else {
      console.log('   ❌ Güvenlik headers bulunamadı\n');
      checks.failed++;
    }
  } else {
    console.log('   ❌ vercel.json dosyası bulunamadı\n');
    checks.failed++;
  }
}

// 3. robots.txt kontrolü
function checkRobotsTxt() {
  console.log('3. robots.txt kontrolü...');
  const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
  
  if (fs.existsSync(robotsPath)) {
    console.log('   ✅ robots.txt mevcut\n');
    checks.passed++;
  } else {
    console.log('   ⚠️  robots.txt bulunamadı\n');
    checks.warnings++;
  }
}

// 4. Environment variables kontrolü
function checkEnvFiles() {
  console.log('4. Environment variables kontrolü...');
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', '.env.example');
  
  if (fs.existsSync(envPath)) {
    console.log('   ⚠️  .env dosyası mevcut - Git\'e commit edilmemeli!\n');
    checks.warnings++;
  } else {
    console.log('   ✅ .env dosyası yok (güvenli)\n');
    checks.passed++;
  }
  
  if (fs.existsSync(envExamplePath)) {
    console.log('   ✅ .env.example mevcut\n');
    checks.passed++;
  } else {
    console.log('   ⚠️  .env.example bulunamadı\n');
    checks.warnings++;
  }
}

// 5. Security.js utility kontrolü
function checkSecurityUtils() {
  console.log('5. Güvenlik utility fonksiyonları kontrolü...');
  const securityPath = path.join(__dirname, '..', 'src', 'utils', 'security.js');
  
  if (fs.existsSync(securityPath)) {
    const content = fs.readFileSync(securityPath, 'utf8');
    if (content.includes('sanitizeHTML') && content.includes('validateURL')) {
      console.log('   ✅ Güvenlik utility fonksiyonları mevcut\n');
      checks.passed++;
    } else {
      console.log('   ⚠️  Güvenlik fonksiyonları eksik\n');
      checks.warnings++;
    }
  } else {
    console.log('   ⚠️  security.js dosyası bulunamadı\n');
    checks.warnings++;
  }
}

// Tüm kontrolleri çalıştır
checkGitignore();
checkVercelConfig();
checkRobotsTxt();
checkEnvFiles();
checkSecurityUtils();

// Özet
console.log('\n📊 Güvenlik Kontrol Özeti:');
console.log(`   ✅ Başarılı: ${checks.passed}`);
console.log(`   ⚠️  Uyarılar: ${checks.warnings}`);
console.log(`   ❌ Hatalar: ${checks.failed}`);

if (checks.failed === 0 && checks.warnings === 0) {
  console.log('\n🎉 Tüm güvenlik kontrolleri başarılı!');
  process.exit(0);
} else if (checks.failed === 0) {
  console.log('\n⚠️  Bazı uyarılar var, kontrol edin.');
  process.exit(0);
} else {
  console.log('\n❌ Güvenlik sorunları tespit edildi!');
  process.exit(1);
}
