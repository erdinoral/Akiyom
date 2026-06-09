import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AkiyomLanding.css';

const AkizenPrivacyPage = () => {
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="akiyom-landing">
      <div className="background-base-layer"></div>
      <div className="background-effects-layer">
        <div className="light-refraction light-1"></div>
        <div className="light-refraction light-2"></div>
        <div className="light-refraction light-3"></div>
      </div>
      <div className="content-safety-layer"></div>

      <div className="content-layer">
        <motion.nav className="navbar" style={{ opacity: 1 }}>
          <div className="nav-container">
            <div className="nav-brand">
              <Link to="/" className="nav-logo-link" onClick={handleLogoClick} aria-label="Ana sayfaya dön">
                <motion.div className="nav-logo">
                  <span className="nav-logo-a">A</span>
                </motion.div>
                <span className="nav-brand-text">AK<span className="star-i-nav">İ</span>YOM</span>
              </Link>
            </div>
            <div className="nav-links">
              <Link to="/#vizyon">Vizyon</Link>
              <Link to="/#projeler">Projeler</Link>
              <Link to="/#hedefler">Hedefler</Link>
            </div>
          </div>
        </motion.nav>

        <motion.section
          className="privacy-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="privacy-container">
            <div className="privacy-breadcrumb">
              <Link to="/gizlilik" className="privacy-breadcrumb-link">Gizlilik Politikası</Link>
              <span className="privacy-breadcrumb-separator">/</span>
              <span className="privacy-breadcrumb-current">Akizen PC</span>
            </div>

            <h1 className="privacy-title">Gizlilik Politikası</h1>
            <p className="privacy-update-date"><strong>Son Güncelleme:</strong> 2026</p>

            <div className="privacy-content">
              <p>
                Akizen PC ("Uygulama"), Akiyom Yazılım ve Geliştirme tarafından geliştirilmiştir. Bu metin, uygulamanın
                veri toplama, kullanma ve koruma süreçlerini açıklar.
              </p>

              <h2 className="privacy-content-title">1. Veri Toplama ve Saklama</h2>
              <h3 className="privacy-content-subtitle">Yerel Veri Saklama</h3>
              <ul className="privacy-content-list">
                <li>Performans ve sistem sağlığına ait veriler öncelikli olarak cihazınızda işlenir.</li>
                <li>Uygulama tercihleri (tema, ayarlar, izleme seçenekleri) yerel yapılandırma dosyalarında tutulur.</li>
                <li>Kişisel kimlik verileri (ad, soyad, TC kimlik no vb.) talep edilmez.</li>
              </ul>

              <h3 className="privacy-content-subtitle">Toplanan Veri Türleri</h3>
              <ul className="privacy-content-list">
                <li>Sistem performans verileri (CPU, RAM, disk, sıcaklık, kaynak kullanımı)</li>
                <li>Uygulama ayarları ve kullanıcı tercihleri</li>
                <li>Tanılama/araç kullanım kayıtları (hata ayıklama amaçlı teknik veriler)</li>
              </ul>

              <h2 className="privacy-content-title">2. Veri Paylaşımı</h2>
              <ul className="privacy-content-list">
                <li><strong>Kişisel verileriniz üçüncü taraflarla paylaşılmaz.</strong></li>
                <li>Veriler reklam veya pazarlama hedeflemesi için kullanılmaz.</li>
                <li>Uygulama, yalnızca gerekli teknik servis çağrılarında minimum veri prensibiyle hareket eder.</li>
              </ul>

              <h2 className="privacy-content-title">3. Veri Güvenliği</h2>
              <ul className="privacy-content-list">
                <li>Verileriniz cihazınızın güvenlik katmanları ve işletim sistemi izin modeli ile korunur.</li>
                <li>Uygulama içi işlemlerde yetkisiz erişimi azaltacak güvenli kodlama pratikleri uygulanır.</li>
              </ul>

              <h2 className="privacy-content-title">4. Veri Silme</h2>
              <ul className="privacy-content-list">
                <li>Uygulama ayarlarını sıfırlayarak yerel kayıtları temizleyebilirsiniz.</li>
                <li>Uygulamayı kaldırdığınızda ilgili yerel veriler cihazınızdan silinir.</li>
              </ul>

              <h2 className="privacy-content-title">5. Çocukların Gizliliği</h2>
              <p>Uygulama 13 yaş altındaki çocuklara yönelik tasarlanmamıştır ve bilerek kişisel veri toplamaz.</p>

              <h2 className="privacy-content-title">6. Gizlilik Politikası Değişiklikleri</h2>
              <p>Gizlilik politikası, uygulama özellikleri veya yasal gereklilikler doğrultusunda güncellenebilir.</p>

              <h2 className="privacy-content-title">7. İletişim</h2>
              <ul className="privacy-content-list">
                <li><strong>Web Sitesi:</strong> <a href="https://akiyom.com/" className="privacy-link">https://akiyom.com/</a></li>
                <li><strong>E-posta:</strong> <a href="mailto:akiyom.iletisim@gmail.com" className="privacy-link">akiyom.iletisim@gmail.com</a></li>
                <li><strong>Geliştirici:</strong> Akiyom Yazılım ve Geliştirme</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-copyright">
              © 2026 Akiyom. Tüm hakları saklıdır.
            </div>
            <div className="footer-links">
              <Link to="/gizlilik" className="footer-link">
                Gizlilik Politikası
              </Link>
              <Link to="/#kullanim" className="footer-link">
                Kullanım Koşulları
              </Link>
              <Link to="/#iletisim" className="footer-link">
                İletişim
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AkizenPrivacyPage;
