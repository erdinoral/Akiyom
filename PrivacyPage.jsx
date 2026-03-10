import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AkiyomLanding.css';

const PrivacyPage = () => {
  const location = useLocation();

  const handleLogoClick = (e) => {
    // Eğer zaten ana sayfadaysa, sayfayı en üste kaydır
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="akiyom-landing">
      {/* Base Layer - Deep Space Grey Background */}
      <div className="background-base-layer"></div>
      
      {/* Effects Layer - Atmospheric Effects */}
      <div className="background-effects-layer">
        <div className="light-refraction light-1"></div>
        <div className="light-refraction light-2"></div>
        <div className="light-refraction light-3"></div>
      </div>
      
      {/* Safety Layer - Content Protection */}
      <div className="content-safety-layer"></div>
      
      {/* Content Layer */}
      <div className="content-layer">
        {/* Navbar */}
        <motion.nav className="navbar" style={{ opacity: 1 }}>
          <div className="nav-container">
            <div className="nav-brand">
              <Link 
                to="/" 
                className="nav-logo-link"
                onClick={handleLogoClick}
                aria-label="Ana sayfaya dön"
              >
                <motion.div className="nav-logo">
                  <span className="nav-logo-a">A</span>
                </motion.div>
                <span className="nav-brand-text">AK<span className="star-i-nav">İ</span>YOM</span>
              </Link>
            </div>
            <div className="nav-links">
              <Link to="/#vizyon">Vizyon</Link>
              <Link to="/#urunler">Ürünler</Link>
              <Link to="/#hedefler">Hedefler</Link>
            </div>
          </div>
        </motion.nav>

        {/* Privacy Content */}
        <motion.section 
          className="privacy-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="privacy-container">
            <h1 className="privacy-title">Gizlilik Politikası</h1>
            
            <div className="privacy-intro">
              <p>
                Akiyom Studio olarak, ekosistemimizdeki tüm dijital çözümlerde gizliliği bir özellik değil, temel bir hak olarak kabul ediyoruz. Hangi ürünümüzü kullanırsanız kullanın, verilerinizin mahremiyeti bizim için en yüksek önceliktir.
              </p>
            </div>

            <div className="privacy-principles">
              <h2 className="privacy-section-title">Genel Gizlilik İlkelerimiz</h2>
              
              <div className="privacy-principle-item">
                <h3 className="privacy-principle-title">Şeffaflık</h3>
                <p>Verilerinizin nasıl işlendiği konusunda her zaman açık ve net bilgi sağlıyoruz.</p>
              </div>

              <div className="privacy-principle-item">
                <h3 className="privacy-principle-title">Güvenlik</h3>
                <p>Altyapımızda en güncel şifreleme ve koruma standartlarını uyguluyoruz.</p>
              </div>

              <div className="privacy-principle-item">
                <h3 className="privacy-principle-title">Kontrol</h3>
                <p>Dijital ayak izinizin kontrolü tamamen sizin elinizdedir.</p>
              </div>
            </div>

            <div className="privacy-apps">
              <h2 className="privacy-section-title">Uygulama Gizlilik Politikaları</h2>
              
              <div className="privacy-app-list">
                <Link to="/gizlilik/aki-finans" className="privacy-app-link">
                  <div className="privacy-app-card">
                    <h3 className="privacy-app-name">Aki Finans</h3>
                    <p className="privacy-app-description">Gizlilik Politikası</p>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
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

export default PrivacyPage;
