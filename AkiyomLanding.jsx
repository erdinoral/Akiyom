import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion';
import ProjectForm from './ProjectForm';
import './AkiyomLanding.css';

const AkiyomLanding = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Hero scroll animasyonları
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.3]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  // Navbar opacity: Sayfa başında da görünür olmalı (0.3), scroll yapıldıkça daha belirgin (1)
  const navbarOpacity = useTransform(scrollY, [0, 300], [0.3, 1]);

  const products = [
    {
      id: 1,
      name: 'Akibeat',
      tagline: 'Müzik analiz motoru ve mastering asistanı',
      description: 'Yapay zeka destekli müzik analizi ve profesyonel mastering çözümleri. Ses kalitesini optimize eden, müzisyenler için güçlü bir araç.',
      image: '/akibeat.png',
      features: ['AI Destekli Analiz', 'Otomatik Mastering', 'Gerçek Zamanlı İşleme', 'Profesyonel Çıktı'],
      link: 'https://akibeat.akiyom.com'
    },
    {
      id: 2,
      name: 'Akış',
      tagline: 'Finansal analiz ve cüzdan yönetimi',
      description: 'Kişisel finanslarınızı yönetin, analiz edin ve optimize edin. Akıllı bütçeleme ve harcama takibi ile finansal hedeflerinize ulaşın.',
      image: '/akis.png',
      features: ['Bütçe Yönetimi', 'Harcama Analizi', 'Hedef Takibi', 'Güvenli Cüzdan'],
      link: 'https://akis.akiyom.com'
    },
    {
      id: 3,
      name: 'Enigma Atlas',
      tagline: 'Dünya gizemlerini keşfetme platformu',
      description: 'Dünyanın en büyük gizemlerini keşfedin. İnteraktif haritalar, derinlemesine analizler ve topluluk destekli araştırmalar.',
      image: '/enigmaatlas.png',
      features: ['İnteraktif Haritalar', 'Derinlemesine Analiz', 'Topluluk Araştırmaları', 'Multimedya İçerik'],
      link: 'https://enigma.akiyom.com/'
    },
    {
      id: 4,
      name: 'GamerConnect',
      tagline: 'E-spor veri ve topluluk merkezi',
      description: 'E-spor dünyasının kalbi. Turnuva verileri, oyuncu istatistikleri ve canlı maç takibi. Oyun topluluğunuzu burada bulun.',
      image: '/gamerconnect.png',
      features: ['Canlı Maç Takibi', 'Oyuncu İstatistikleri', 'Turnuva Verileri', 'Topluluk Forumu'],
      link: 'https://gamerconnect.akiyom.com'
    }
  ];

  const goals = [
    {
      title: 'Altyapı Güçlendirme',
      description: 'Supabase ve Firebase destekli ölçeklenebilir altyapı geliştirmeleri',
      status: 'in-progress'
    },
    {
      title: 'AI Model Geliştirme',
      description: 'Akibeat için gelişmiş yapay zeka modellerinin entegrasyonu',
      status: 'planned'
    },
    {
      title: 'Performans Optimizasyonu',
      description: 'Tüm platformlarda hız ve kullanıcı deneyimi iyileştirmeleri',
      status: 'planned'
    },
    {
      title: 'Global Erişim',
      description: 'Çoklu dil desteği ve uluslararası pazara açılım',
      status: 'planned'
    }
  ];

  return (
    <div className="akiyom-landing">
      {/* Base Layer - Deep Space Grey Background */}
      <div className="background-base-layer"></div>
      
      {/* Effects Layer - Atmospheric Effects */}
      <div className="background-effects-layer">
        {/* Devasa Işık Kümeleri */}
        <div className="light-refraction light-1"></div>
        <div className="light-refraction light-2"></div>
        <div className="light-refraction light-3"></div>
      </div>
      
      {/* Safety Layer - Content Protection */}
      <div className="content-safety-layer"></div>
      
      {/* Content Layer */}
      <div className="content-layer">
      {/* Sticky Navbar */}
      <motion.nav 
        className="navbar"
        style={{ opacity: navbarOpacity }}
      >
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/" className="nav-logo-link">
              <motion.div 
                className="nav-logo"
              >
                <span className="nav-logo-a">A</span>
              </motion.div>
              <span className="nav-brand-text">AK<span className="star-i-nav">İ</span>YOM</span>
            </Link>
          </div>
          <div className="nav-links">
            <a href="#vizyon">Vizyon</a>
            <a href="#urunler">Ürünler</a>
            <a href="#hedefler">Hedefler</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="hero"
        style={{ 
          scale: heroScale,
          opacity: heroOpacity
        }}
      >
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            AK<span className="star-i">İ</span>YOM
          </motion.h1>
          <motion.p
            className="hero-slogan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Müzik, Oyun ve Üretkenlik Adına Her Şey.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Vision Section */}
      <section id="vizyon" className="vision-section">
        <motion.div
          className="vision-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="section-title">Vizyonumuz</h2>
          <p className="vision-text">
            Hayalleri teknolojiyle buluşturma misyonuyla yola çıktık. Akiyom, müzik, oyun ve üretkenlik 
            alanlarında yenilikçi çözümler sunarak kullanıcılarımızın potansiyelini ortaya çıkarmayı hedefliyor.
          </p>
        </motion.div>
      </section>

      {/* Goals/Roadmap Section */}
      <section id="hedefler" className="goals-section">
        <motion.div
          className="goals-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="section-title">Yol Haritası</h2>
          <div className="goals-timeline">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                className="goal-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="goal-line"></div>
                <div className="goal-content">
                  <div className="goal-status" data-status={goal.status}></div>
                  <div className="goal-text">
                    <h3 className="goal-title">{goal.title}</h3>
                    <p className="goal-description">{goal.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Products Grid Section */}
      <section id="urunler" className="products-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Ürünlerimiz
        </motion.h2>
        
        <LayoutGroup>
          <div className="products-grid">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="product-card"
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }}
                onClick={() => setSelectedProduct(product)}
              >
                <div 
                  className="product-card-background"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
                <div className="product-card-gradient"></div>
                <div className="product-card-inner">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-tagline">{product.tagline}</p>
                  <div className="product-hover-indicator">
                    <span>Detayları Gör</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Product Detail Modal */}
          <AnimatePresence>
            {selectedProduct && (
              <motion.div
                className="product-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
              >
                <motion.div
                  className="product-modal"
                  layoutId={`product-${selectedProduct.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="modal-close"
                    onClick={() => setSelectedProduct(null)}
                    aria-label="Kapat"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  
                  <div className="product-modal-content">
                    <div className="product-modal-image">
                      <img src={selectedProduct.image} alt={selectedProduct.name} />
                    </div>
                    <div className="product-modal-info">
                      <h2 className="product-modal-name">{selectedProduct.name}</h2>
                      <p className="product-modal-tagline">{selectedProduct.tagline}</p>
                      <p className="product-modal-description">{selectedProduct.description}</p>
                      
                      <div className="product-modal-features">
                        <h3>Özellikler</h3>
                        <ul>
                          {selectedProduct.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <a 
                        href={selectedProduct.link}
                        className="product-modal-button"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Uygulamaya Git
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M7 7h10v10"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </section>

      {/* Akiyom Studio Section */}
      <section className="studio-section">
        <motion.div
          className="studio-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="studio-title">Akiyom Studio</h2>
          <p className="studio-slogan">Sizin Vizyonunuz, Bizim Teknolojimiz.</p>
          <p className="studio-description">
            Akibeat, Akış ve Enigma Atlas gibi projelerimizde kullandığımız mühendislik ve tasarım tecrübesini şimdi sizin fikirleriniz için sunuyoruz. Modern web platformları veya yapay zeka destekli özel yazılımlar... İhtiyacınız olan dijital çözümü, alıştığınız Akiyom kalitesiyle hayata geçirelim.
          </p>
          
          <div className="studio-services">
            <div className="studio-service-item">
              <h3 className="studio-service-title">Özel Yazılım</h3>
              <p className="studio-service-description">Ölçeklenebilir web uygulamaları ve AI entegrasyonları.</p>
            </div>
            <div className="studio-service-item">
              <h3 className="studio-service-title">UI/UX Tasarım</h3>
              <p className="studio-service-description">Kullanıcı odaklı, premium arayüz deneyimleri.</p>
            </div>
          </div>

          <div className="studio-action">
            <button 
              onClick={() => setIsProjectFormOpen(true)}
              className="studio-button"
            >
              Projenizi Anlatın
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10"></path>
              </svg>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Support Section */}
      <section className="support-banner-section">
        <motion.div
          className="support-banner"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="support-banner-content">
            <div className="support-banner-text">
              <h2 className="support-banner-title">Bize Destek Olun</h2>
              <p className="support-banner-description">
                Akiyom olarak hayallerinizi teknolojiyle buluşturuyoruz. Artan sunucu ve AI maliyetlerimizi karşılamamıza destek olarak projelerimizin bağımsız kalmasına katkıda bulunabilirsiniz.
              </p>
            </div>
            <div className="support-banner-action">
              <a 
                href="https://kreosus.com/akiyom" 
                target="_blank"
                rel="noopener noreferrer"
                className="support-button"
              >
                Destek Ol
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M7 7h10v10"></path>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-copyright">
            © 2026 Akiyom. Tüm hakları saklıdır.
          </div>
          <div className="footer-links">
            <Link 
              to="/gizlilik" 
              className="footer-link"
            >
              Gizlilik Politikası
            </Link>
            <a 
              href="#kullanim" 
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPage('terms');
              }}
            >
              Kullanım Koşulları
            </a>
            <a 
              href="#iletisim" 
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPage('contact');
              }}
            >
              İletişim
            </a>
          </div>
        </div>
      </footer>

      {/* Page Modals */}
      <AnimatePresence>
        {selectedPage && (
          <motion.div
            className="page-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPage(null)}
          >
            <motion.div
              className="page-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedPage(null)}
                aria-label="Kapat"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {selectedPage === 'privacy' && (
                <div className="page-modal-content">
                  <h2 className="page-modal-title">Veri Gizliliği ve Güvenlik</h2>
                  <div className="page-modal-text">
                    <p>
                      Akiyom olarak; Akibeat, Akış, Enigma Atlas ve GamerConnect platformlarımızı kullanırken paylaştığınız verilerin mahremiyetini en üst düzeyde tutmayı taahhüt ediyoruz.
                    </p>
                    <ul className="page-modal-list">
                      <li>
                        <strong>Veri Toplama:</strong> Yalnızca size daha akıcı ve kişiselleştirilmiş bir deneyim sunmak için gereken temel kullanım verilerini topluyoruz.
                      </li>
                      <li>
                        <strong>Güvenlik:</strong> Altyapımız, verilerinizi korumak için en güncel şifreleme standartlarını kullanır. Bilgileriniz izniniz olmadan üçüncü taraf reklam şirketleriyle asla paylaşılmaz.
                      </li>
                      <li>
                        <strong>Şeffaflık:</strong> Ekosistemimizdeki dijital ayak izinizin kontrolü tamamen sizdedir.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedPage === 'terms' && (
                <div className="page-modal-content">
                  <h2 className="page-modal-title">Hizmet Şartları</h2>
                  <div className="page-modal-text">
                    <p>
                      Akiyom ekosistemine hoş geldiniz. Hizmetlerimizi deneyimleyerek aşağıdaki temel ilkeleri kabul etmiş olursunuz:
                    </p>
                    <ul className="page-modal-list">
                      <li>
                        <strong>Adil Kullanım:</strong> Akibeat'in yapay zeka motoru veya Akış'ın analiz araçları gibi sistemlerimiz, bireysel üretkenliği artırmak için tasarlanmıştır. Sistem bütünlüğünü riske atacak manipülatif kullanımlara izin verilmez.
                      </li>
                      <li>
                        <strong>Fikri Mülkiyet:</strong> Akiyom çatısı altındaki tüm yazılımlar, arayüz tasarımları ve markalar (Akiyom, Akibeat vb.) firmamıza aittir.
                      </li>
                      <li>
                        <strong>Sorumluluk:</strong> Algoritmalarımız ve sunduğumuz veriler size en iyi rehberliği sağlamak üzere optimize edilmiştir, ancak nihai kararlar ve sonuçlar kullanıcının kendi sorumluluğundadır.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedPage === 'contact' && (
                <div className="page-modal-content">
                  <h2 className="page-modal-title">Bizimle İletişime Geçin</h2>
                  <div className="page-modal-text">
                    <p>
                      Teknolojiyi sanatla buluşturma yolculuğumuzda fikirleriniz, geri bildirimleriniz ve destek talepleriniz bizim için çok değerli.
                    </p>
                    <ul className="page-modal-list">
                      <li>
                        <strong>Genel Sorular ve Destek:</strong>{' '}
                        <a href="mailto:akiyom.iletisim@gmail.com" className="page-modal-link">akiyom.iletisim@gmail.com</a>
                      </li>
                      <li>
                        <strong>İşbirlikleri ve Basın:</strong>{' '}
                        <a href="mailto:akiyom.iletisim@gmail.com" className="page-modal-link">akiyom.iletisim@gmail.com</a>
                      </li>
                    </ul>
                    <p>
                      Geliştirme sürecimizin bir parçası olmak ve güncellemeleri ilk öğrenenlerden olmak için topluluğumuza katılabilirsiniz. Mesajlarınıza en kısa sürede dönüş yapacağız.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Form Modal */}
      <ProjectForm 
        isOpen={isProjectFormOpen} 
        onClose={() => setIsProjectFormOpen(false)} 
      />
      </div>
      {/* End Content Layer */}
    </div>
  );
};

export default AkiyomLanding;
