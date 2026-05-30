import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setPageSeo } from './src/utils/seo.js';
import './AkiyomLanding.css';

const PrivacyPage = () => {
  const location = useLocation();

  useEffect(() => {
    return setPageSeo({
      title: 'Gizlilik Politikası ve KVKK — Akiyom',
      description:
        'Akiyom web sitesi, iletişim formu, çerezler ve Akiyom AI hizmetleri için gizlilik ve KVKK aydınlatma metni.',
      path: '/gizlilik',
    });
  }, []);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="akiyom-landing">
      <div className="background-base-layer" />
      <div className="background-effects-layer">
        <div className="light-refraction light-1" />
        <div className="light-refraction light-2" />
        <div className="light-refraction light-3" />
      </div>
      <div className="content-safety-layer" />

      <div className="content-layer">
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
                <span className="nav-brand-text">
                  AK<span className="star-i-nav">İ</span>YOM
                </span>
              </Link>
            </div>
            <div className="nav-links">
              <Link to="/#vizyon">Vizyon</Link>
              <Link to="/#urunler">Ürünler</Link>
              <Link to="/projeler">Projeler</Link>
              <Link to="/akiyom-ai">Akiyom AI</Link>
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
            <h1 className="privacy-title">Gizlilik Politikası ve KVKK Aydınlatması</h1>
            <p className="privacy-update-date">
              <strong>Son güncelleme:</strong> Mayıs 2026
            </p>

            <div className="privacy-intro">
              <p>
                <strong>Veri sorumlusu:</strong> Akiyom Yazılım ve Geliştirme (&quot;Akiyom&quot;, &quot;biz&quot;).
                Bu metin, <a href="https://akiyom.com">akiyom.com</a> web sitesi, iletişim kanallarımız ve
                hizmetlerimiz kapsamında kişisel verilerinizin 6698 sayılı Kişisel Verilerin Korunması Kanunu
                (KVKK) uyarınca işlenmesine ilişkin bilgilendirme amaçlıdır.
              </p>
            </div>

            <div className="privacy-content">
              <h2 className="privacy-content-title">1. İşlenen Veriler ve Amaçlar</h2>

              <h3 className="privacy-content-subtitle">Web sitesi ve &quot;Projenizi Anlatın&quot; formu</h3>
              <p>
                Studio hizmetleri için gönderdiğiniz ad, e-posta, şirket adı (isteğe bağlı), proje tipi ve proje
                açıklaması; talebinizi değerlendirmek, size dönüş yapmak ve teklif sürecini yürütmek amacıyla
                işlenir. Form verileri güvenli veritabanı altyapısında (Supabase) saklanır; spam önleme için
                teknik oran sınırlaması ve bot koruması uygulanabilir.
              </p>

              <h3 className="privacy-content-subtitle">Akiyom AI — ödeme ve teklif iletişimi</h3>
              <p>
                Akiyom AI kurumsal yerel AI altyapısı için &quot;Ödeme için iletişime geçin&quot; ve benzeri
                butonlar, cihazınızda e-posta uygulamanızı açar; bu aşamada ödeme kartı bilgisi web sitemiz
                üzerinden toplanmaz. E-posta ile paylaştığınız şirket adı, iletişim bilgileri ve talep
                içeriği yalnızca teklif, sözleşme ve faturalama süreçleri için kullanılır. Kurulum sonrası
                AI iş yükü ve şirket verileri müşteri lokasyonundaki sunucuda kalır; bu veriler Akiyom
                tarafından bulut ortamında işlenmez (sözleşmede aksi kararlaştırılmadıkça).
              </p>

              <h3 className="privacy-content-subtitle">Çerezler</h3>
              <p>
                Sitede yalnızca gerekli teknik çerezler ve tarayıcıda saklanan çerez tercihi
                (<code>localStorage</code>: onay durumu) kullanılır. Reklam veya üçüncü taraf izleme çerezi
                kullanılmaz. Ayrıntılar için sitedeki çerez bildirimine bakınız.
              </p>

              <h2 className="privacy-content-title">2. Hukuki Sebep ve Aktarım</h2>
              <p>
                Verileriniz; sözleşmenin kurulması veya ifası, meşru menfaat (iş geliştirme ve güvenlik) ve
                açık rızanız (form gönderimi) kapsamında işlenebilir. Yurt içi/yurt dışı hizmet sağlayıcılarına
                (ör. barındırma, veritabanı) yalnızca hizmetin sunulması için gerekli ölçüde aktarım yapılabilir.
              </p>

              <h2 className="privacy-content-title">3. Saklama Süresi</h2>
              <ul className="privacy-content-list">
                <li>İletişim ve teklif kayıtları: ticari ilişki + yasal zamanaşımı süresince</li>
                <li>Form/e-posta logları: güvenlik ve kötüye kullanım önleme için sınırlı süre</li>
                <li>Çerez tercihi: tarayıcınızda siz silene kadar veya yerel depolama temizlenene kadar</li>
              </ul>

              <h2 className="privacy-content-title">4. KVKK Kapsamındaki Haklarınız</h2>
              <p>
                Kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltme, silme,
                itiraz ve zararın giderilmesini talep etme haklarına sahipsiniz. Başvuru:
              </p>
              <ul className="privacy-content-list">
                <li>
                  <strong>E-posta:</strong>{' '}
                  <a href="mailto:akiyom.iletisim@gmail.com" className="privacy-link">
                    akiyom.iletisim@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Web:</strong>{' '}
                  <a href="https://akiyom.com" className="privacy-link">
                    https://akiyom.com
                  </a>
                </li>
              </ul>
              <p>
                Başvurularınız en geç 30 gün içinde yanıtlanır. Şikâyet için Kişisel Verileri Koruma Kurumu
                nezdinde başvuru hakkınız saklıdır.
              </p>
            </div>

            <div className="privacy-principles">
              <h2 className="privacy-section-title">Genel Gizlilik İlkelerimiz</h2>
              <div className="privacy-principle-item">
                <h3 className="privacy-principle-title">Şeffaflık</h3>
                <p>Verilerinizin nasıl işlendiği konusunda açık bilgi sağlıyoruz.</p>
              </div>
              <div className="privacy-principle-item">
                <h3 className="privacy-principle-title">Güvenlik</h3>
                <p>Güncel şifreleme ve erişim kontrolleri uyguluyoruz.</p>
              </div>
              <div className="privacy-principle-item">
                <h3 className="privacy-principle-title">Kontrol</h3>
                <p>Verileriniz üzerinde mümkün olan en geniş kontrolü size bırakıyoruz.</p>
              </div>
            </div>

            <div className="privacy-apps">
              <h2 className="privacy-section-title">Ürün Gizlilik Politikaları</h2>
              <div className="privacy-app-list">
                <Link to="/gizlilik/aki-finans" className="privacy-app-link">
                  <div className="privacy-app-card">
                    <h3 className="privacy-app-name">Aki Finans</h3>
                    <p className="privacy-app-description">Uygulama gizlilik politikası</p>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </Link>
                <Link to="/gizlilik/akizen" className="privacy-app-link">
                  <div className="privacy-app-card">
                    <h3 className="privacy-app-name">Akizen PC</h3>
                    <p className="privacy-app-description">Uygulama gizlilik politikası</p>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </Link>
                <Link to="/akiyom-ai" className="privacy-app-link">
                  <div className="privacy-app-card">
                    <h3 className="privacy-app-name">Akiyom AI</h3>
                    <p className="privacy-app-description">Yerel AI altyapısı ve ödeme süreci</p>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-copyright">© 2026 Akiyom. Tüm hakları saklıdır.</div>
            <div className="footer-links">
              <Link to="/gizlilik" className="footer-link">
                Gizlilik Politikası
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
