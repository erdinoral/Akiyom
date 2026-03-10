import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AkiyomLanding.css';

const AkiFinansPrivacyPage = () => {
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
            <div className="privacy-breadcrumb">
              <Link to="/gizlilik" className="privacy-breadcrumb-link">Gizlilik Politikası</Link>
              <span className="privacy-breadcrumb-separator">/</span>
              <span className="privacy-breadcrumb-current">Aki Finans</span>
            </div>

            <h1 className="privacy-title">Gizlilik Politikası</h1>
            <p className="privacy-update-date"><strong>Son Güncelleme:</strong> 2026</p>
            
            <div className="privacy-content">
              <p>
                Aki Finansal Analiz ve Rapor ("Uygulama"), Akiyom Yazılım ve Geliştirme ("Biz", "Bizim") tarafından geliştirilmiştir. Bu gizlilik politikası, uygulamanın veri toplama, kullanma ve koruma uygulamalarını açıklar.
              </p>

              <h2 className="privacy-content-title">1. Veri Toplama ve Saklama</h2>

              <h3 className="privacy-content-subtitle">Yerel Veri Saklama</h3>
              <ul className="privacy-content-list">
                <li>Tüm finansal verileriniz, işlemleriniz, hedefleriniz ve notlarınız <strong>yalnızca sizin cihazınızda</strong> saklanır.</li>
                <li>Verileriniz hiçbir uzak sunucuya gönderilmez veya bulut servislerinde saklanmaz.</li>
                <li>Verileriniz, Electron'un güvenli kullanıcı veri klasöründe şifrelenmemiş JSON formatında saklanır.</li>
              </ul>

              <h3 className="privacy-content-subtitle">Toplanan Veri Türleri</h3>
              <p>Uygulama aşağıdaki veri türlerini yerel olarak saklar:</p>
              <ul className="privacy-content-list">
                <li>Finansal işlemler (gelir, gider)</li>
                <li>Hesap bilgileri ve bakiyeler</li>
                <li>Finansal hedefler</li>
                <li>Abonelik bilgileri</li>
                <li>Borç ve alacak kayıtları</li>
                <li>Kullanıcı tercihleri (para birimi, dil)</li>
              </ul>

              <h2 className="privacy-content-title">2. Veri Paylaşımı</h2>

              <h3 className="privacy-content-subtitle">Üçüncü Taraf Paylaşımı</h3>
              <ul className="privacy-content-list">
                <li><strong>Hiçbir kişisel veriniz üçüncü taraflarla paylaşılmaz.</strong></li>
                <li>Verileriniz satılmaz, kiralanmaz veya ticari amaçlarla kullanılmaz.</li>
                <li>Uygulama, reklam veya analitik amaçlı veri toplamaz.</li>
              </ul>

              <h3 className="privacy-content-subtitle">Dış API Kullanımı</h3>
              <p>Uygulama, yalnızca aşağıdaki amaçlar için dış API'lerle iletişim kurar:</p>
              <ul className="privacy-content-list">
                <li><strong>Canlı döviz kurları:</strong> Döviz kurları ve kıymetli maden fiyatları için güvenli API servisleri kullanılır.</li>
                <li>Bu işlemler sırasında <strong>hiçbir kişisel veri gönderilmez.</strong></li>
              </ul>

              <h2 className="privacy-content-title">3. Veri Güvenliği</h2>

              <h3 className="privacy-content-subtitle">Güvenlik Önlemleri</h3>
              <ul className="privacy-content-list">
                <li>Tüm veriler yerel cihazınızda saklanır.</li>
                <li>Verileriniz cihazınızın güvenlik özellikleriyle korunur.</li>
                <li>Uygulama, verilerinizi şifrelemek için cihazınızın yerel güvenlik mekanizmalarını kullanır.</li>
              </ul>

              <h3 className="privacy-content-subtitle">Veri Yedekleme</h3>
              <ul className="privacy-content-list">
                <li>Uygulama otomatik bulut yedekleme yapmaz.</li>
                <li>Verilerinizi yedeklemek isterseniz, manuel olarak veri tabanı dosyasını yedekleyebilirsiniz.</li>
              </ul>

              <h2 className="privacy-content-title">4. Veri Silme</h2>

              <h3 className="privacy-content-subtitle">Veri Silme Hakkı</h3>
              <ul className="privacy-content-list">
                <li>Uygulama içindeki "Veritabanını Sıfırla" özelliğini kullanarak tüm verilerinizi silebilirsiniz.</li>
                <li>Uygulamayı cihazınızdan kaldırdığınızda, tüm veriler kalıcı olarak silinir.</li>
                <li>Verileriniz silindiğinde, geri getirilemez.</li>
              </ul>

              <h2 className="privacy-content-title">5. Çocukların Gizliliği</h2>
              <p>Uygulama 13 yaş altındaki çocuklardan bilerek veri toplamaz. Eğer bir çocuğun veri topladığımızı fark edersek, bu verileri derhal sileriz.</p>

              <h2 className="privacy-content-title">6. Gizlilik Politikası Değişiklikleri</h2>
              <p>Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler için uygulama içinde bildirim yapılacaktır.</p>

              <h2 className="privacy-content-title">7. İletişim</h2>
              <p>Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:</p>
              <ul className="privacy-content-list">
                <li><strong>Web Sitesi:</strong> <a href="https://akiyom.com/" className="privacy-link">https://akiyom.com/</a></li>
                <li><strong>E-posta:</strong> <a href="mailto:akiyom.iletisim@gmail.com" className="privacy-link">akiyom.iletisim@gmail.com</a></li>
                <li><strong>Geliştirici:</strong> Akiyom Yazılım ve Geliştirme</li>
              </ul>

              <div className="privacy-footer-note">
                <p>
                  <em>Bu gizlilik politikası, uygulamanın kullanımı sırasında verilerinizin nasıl korunduğunu açıklar. Verileriniz tamamen yerel olarak saklanır ve gizliliğiniz bizim için önceliklidir.</em>
                </p>
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

export default AkiFinansPrivacyPage;
