import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion';
import ProjectForm from './ProjectForm';
import CookieBanner from './CookieBanner';
import AkiyomAiPromo from './src/components/AkiyomAiPromo.jsx';
import SiteNavbar from './src/components/SiteNavbar.jsx';
import SiteFooter from './src/components/SiteFooter.jsx';
import VisionSection from './src/components/VisionSection.jsx';
import PriceVatNote from './src/components/PriceVatNote.jsx';
import { formatStudioStartPrice } from './src/utils/pricing.js';
import './AkiyomLanding.css';

const WHATSAPP_HREF = 'https://wa.me/90XXXXXXXXXX';

const WhatsAppLink = () => (
  <a
    href={WHATSAPP_HREF}
    target="_blank"
    rel="noopener noreferrer"
    className="footer-whatsapp-link"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
    WhatsApp ile Yaz
  </a>
);

const AkiyomLanding = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStudioPackage, setSelectedStudioPackage] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('form') === 'open') {
      setIsProjectFormOpen(true);
    }
  }, []);
  
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
      link: 'https://akibeat.akiyom.com',
      status: 'in-progress',
      statusText: 'Devam Eden Proje'
    },
    {
      id: 2,
      name: 'Aki Finans',
      tagline: 'Finansal analiz ve cüzdan yönetimi',
      description: 'Kişisel finanslarınızı yönetin, analiz edin ve optimize edin. Akıllı bütçeleme ve harcama takibi ile finansal hedeflerinize ulaşın.',
      image: '/akis.png',
      features: ['Bütçe Yönetimi', 'Harcama Analizi', 'Hedef Takibi', 'Güvenli Cüzdan'],
      link: 'https://apps.microsoft.com/detail/9PKRN1TB6RN5?hl=tr-tr&gl=TR&ocid=pdpshare',
      status: 'published',
      statusText: 'Microsoft Store\'da Yayında'
    },
    {
      id: 3,
      name: 'Enigma Atlas',
      tagline: 'Dünya gizemlerini keşfetme platformu',
      description: 'Dünyanın en büyük gizemlerini keşfedin. İnteraktif haritalar, derinlemesine analizler ve topluluk destekli araştırmalar.',
      image: '/enigmaatlas.png',
      features: ['İnteraktif Haritalar', 'Derinlemesine Analiz', 'Topluluk Araştırmaları', 'Multimedya İçerik'],
      link: 'https://enigma.akiyom.com/',
      status: 'published',
      statusText: 'Yayında',
      linkLabel: 'Siteye Git'
    },
    {
      id: 4,
      name: 'Akizen PC',
      tagline: 'Bilgisayar performans ve sağlığını görüntüleme uygulaması',
      description: 'Bilgisayar performansını ve sistem sağlığını tek panelden takip edin, yardımcı araçlara hızlıca ulaşın.',
      image: '/Akizenpc.png',
      features: ['Canlı Performans İzleme', 'Sistem Sağlığı Kontrolü', 'Yardımcı Araçlara Erişim', 'Tek Panel Yönetimi'],
      link: 'https://apps.microsoft.com/detail/9N7LNV11PWLP?hl=tr-tr&gl=TR&ocid=pdpshare',
      status: 'published',
      statusText: 'Microsoft Store\'da Yayında',
      linkLabel: 'Microsoft Store\'a Git'
    }
  ];

  const goals = [
    {
      title: 'Altyapı Güçlendirme',
      description: 'Supabase ve Firebase destekli ölçeklenebilir altyapı geliştirmeleri. Bu güncellemeler, tüm platformlarımızın daha hızlı, güvenli ve ölçeklenebilir olmasını sağlayacak. Veritabanı optimizasyonları, gerçek zamanlı senkronizasyon ve gelişmiş güvenlik önlemleri ile kullanıcı deneyimini üst seviyeye taşıyoruz.',
      status: 'in-progress'
    },
    {
      title: 'AI Model Geliştirme',
      description: 'Akibeat için gelişmiş yapay zeka modellerinin entegrasyonu. Müzik analizi ve mastering süreçlerinde kullanılan AI algoritmalarını sürekli geliştirerek, profesyonel kalitede sonuçlar üretmeyi hedefliyoruz. Makine öğrenmesi ve derin öğrenme teknikleri ile ses işleme kalitesini artırıyoruz.',
      status: 'planned'
    },
    {
      title: 'Performans Optimizasyonu',
      description: 'Tüm platformlarda hız ve kullanıcı deneyimi iyileştirmeleri. Sayfa yükleme sürelerini minimize ederek, kullanıcıların daha akıcı bir deneyim yaşamasını sağlıyoruz. Kod optimizasyonu, lazy loading ve caching stratejileri ile performans metriklerini sürekli iyileştiriyoruz.',
      status: 'planned'
    },
    {
      title: 'Global Erişim',
      description: 'Çoklu dil desteği ve uluslararası pazara açılım. Platformlarımızı dünya çapında erişilebilir kılmak için kapsamlı bir lokalizasyon çalışması yürütüyoruz. Farklı diller ve kültürler için optimize edilmiş arayüzler ve içerikler sunarak global kullanıcı tabanımızı genişletiyoruz.',
      status: 'planned'
    }
  ];

  const studioPackages = [
    {
      category: 'Kişisel',
      title: 'Kişisel Site Paketi',
      description: 'Portfolyo, blog, kişisel marka veya içerik üretimi odaklı hızlı ve modern web siteleri.',
      items: ['Tek sayfa veya çok sayfa yapı', 'Responsive tasarım', 'Temel SEO altyapısı'],
      duration: '1-3 hafta',
      priceFrom: 15000,
      details: ['Kurulum ve yayına alma', 'Temel içerik yerleşimi', 'Bakım için teslim sonrası destek']
    },
    {
      category: 'Kişisel',
      title: 'Kişisel Uygulama Paketi',
      description: 'Bireysel üretkenlik, takip ve otomasyon ihtiyaçlarına uygun web veya mobil uygulama çözümleri.',
      items: ['Kullanıcı hesap sistemi', 'Veri saklama ve raporlama', 'Özel özellik geliştirme'],
      duration: '3-6 hafta',
      priceFrom: 30000,
      details: ['MVP odaklı hızlı geliştirme', 'Kişisel kullanım senaryoları', 'İsteğe göre ek modül geliştirme']
    },
    {
      category: 'Ticari',
      title: 'Ticari Site Paketi',
      description: 'Marka, şirket ve e-ticaret süreçlerine uygun, dönüşüm odaklı kurumsal web çözümleri.',
      items: ['Kurumsal sayfa yapısı', 'Gelişmiş form ve entegrasyonlar', 'Performans ve güvenlik optimizasyonu'],
      duration: '3-8 hafta',
      priceFrom: 45000,
      details: ['Kurumsal kimliğe uygun tasarım dili', 'SEO ve performans optimizasyonu', 'CRM veya harici servis entegrasyonu']
    },
    {
      category: 'Ticari',
      title: 'Ticari Uygulama Paketi',
      description: 'ERP, CRM ve operasyon yönetimi dahil şirketlere yönelik süreç otomasyonu için ölçeklenebilir uygulamalar.',
      items: ['Yetkilendirme ve rol yönetimi', 'Panel ve raporlama ekranları', 'ERP/CRM modülleri ve entegrasyonlar'],
      duration: '6-12 hafta',
      priceFrom: 75000,
      details: ['İş akışına özel modüler mimari', 'Şirket ekiplerine göre rol bazlı ekranlar', 'Canlıya alma ve ölçeklenebilir altyapı']
    }
  ];

  const solutionAreas = [
    {
      title: 'Ticari Web Siteleri',
      description: 'Marka tanıtımı, e-ticaret akışları ve dönüşüm odaklı kurumsal web deneyimleri.',
      tags: ['Kurumsal', 'E-Ticaret', 'Lead Toplama'],
      icon: '🏢'
    },
    {
      title: 'Topluluk ve Forum Platformları',
      description: 'Üyelik, paylaşım, moderasyon ve etkileşim odaklı topluluk altyapıları.',
      tags: ['Topluluk', 'Forum', 'Moderasyon'],
      icon: '🌐'
    },
    {
      title: 'Vlog ve İçerik Siteleri',
      description: 'Video, blog ve medya odaklı yayın platformlarıyla içerik üreticilerine güçlü altyapı.',
      tags: ['Vlog', 'Blog', 'Medya'],
      icon: '🎬'
    },
    {
      title: 'Şirketlere Özel Uygulamalar',
      description: 'Operasyon, müşteri yönetimi ve süreç otomasyonu için ölçeklenebilir çözümler.',
      tags: ['CRM', 'Otomasyon', 'Panel'],
      icon: '⚙️'
    },
    {
      title: 'ERP ve Kurumsal Yazılımlar',
      description: 'Stok, muhasebe, satış, üretim ve insan kaynakları süreçlerini tek platformda yöneten özel ERP ve benzeri kurumsal yazılımlar.',
      tags: ['ERP', 'Stok', 'Muhasebe', 'CRM'],
      icon: '📊'
    }
  ];

  // JSON-LD Schema for Akiyom Studio Services
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": ["Service", "ProfessionalService"],
      "name": "Akiyom Studio",
      "description": "Hayalleri teknolojiyle buluşturan dijital inovasyon merkezi. Kişisel ve ticari site/uygulama geliştirme, UI/UX tasarım ve yapay zeka entegrasyonları ile potansiyelinizi ortaya çıkarın.",
      "provider": {
        "@type": "Organization",
        "name": "Akiyom",
        "url": "https://akiyom.com",
        "logo": "https://akiyom.com/og-image.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "akiyom.iletisim@gmail.com",
          "contactType": "customer service",
          "availableLanguage": ["Turkish", "English"]
        }
      },
      "serviceType": [
        "Web Sitesi Geliştirme",
        "Uygulama Geliştirme",
        "ERP ve Kurumsal Yazılım Geliştirme",
        "Yazılım Danışmanlığı",
        "Kurumsal Yerel AI Altyapısı"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Turkey"
      },
      "availableLanguage": "Turkish",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "offerCount": 5
      },
      "url": "https://akiyom.com",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Akiyom Studio Hizmetleri",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Kişisel Site Paketi",
              "description": "Portfolyo, blog ve kişisel marka odaklı web siteleri"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Kişisel Uygulama Paketi",
              "description": "Bireysel üretkenlik ve otomasyon için web veya mobil uygulamalar"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ticari Site Paketi",
              "description": "Kurumsal ve e-ticaret odaklı dönüşüm odaklı web çözümleri"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ticari Uygulama Paketi",
              "description": "Şirketlere yönelik ERP, CRM, panel ve süreç otomasyonu uygulamaları"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "ERP ve Kurumsal Yazılım",
              "description": "Stok, muhasebe, satış ve operasyon süreçleri için özel ERP ve kurumsal yazılım çözümleri"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Akiyom AI",
              "description": "Şirket içi yerel AI sunucu altyapısı, Graph-RAG ve modüler GPU paketleri",
              "url": "https://akiyom.com/akiyom-ai"
            }
          }
        ]
      }
    };

    // Remove existing schema if any
    const existingScript = document.getElementById('akiyom-studio-schema');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema
    const script = document.createElement('script');
    script.id = 'akiyom-studio-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById('akiyom-studio-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

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
      <SiteNavbar style={{ opacity: navbarOpacity }} variant="hash" />

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
            AKİYOM
          </motion.h1>
          <motion.p
            className="hero-slogan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Yazılım, Yapay Zeka ve Dijital Ürünler Adına Her Şey.
          </motion.p>
          <motion.button
            type="button"
            className="hero-cta"
            onClick={() => setIsProjectFormOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Projenizi Anlatın
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Vision Section */}
      <VisionSection />

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
          <p className="goals-intro">
            Akiyom olarak sürekli gelişim ve inovasyon odaklı bir yol haritası izliyoruz. Aşağıdaki 
            hedeflerimiz, ekosistemimizin geleceğini şekillendiren önemli kilometre taşlarını temsil 
            ediyor. Her bir hedef, kullanıcı deneyimini iyileştirmek ve teknolojik sınırları zorlamak 
            için tasarlandı.
          </p>
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
        
        <motion.p
          className="products-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Akiyom ekosistemi, farklı ihtiyaçlara yönelik özel olarak tasarlanmış dijital çözümlerden oluşuyor.
          Her ürün, kendi alanında derinlemesine uzmanlaşmış, ancak aynı zamanda birbirini destekleyen bir 
          yapıya sahip. Müzik ve finans uygulamalarından oyun rehberlerine ve sistem araçlarına kadar
          farklı alanlarda çözümler üretiyoruz. Aşağıdaki ürünler, günlük işleri kolaylaştırmak ve
          üretkenliği artırmak için geliştirildi.
        </motion.p>
        
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
                {product.status && (
                  <div className={`product-status-badge product-status-${product.status}`}>
                    <span className="product-status-text">{product.statusText}</span>
                    {product.status === 'in-progress' && (
                      <span className="product-status-pulse"></span>
                    )}
                  </div>
                )}
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
                      
                      {selectedProduct.link ? (
                        <a 
                          href={selectedProduct.link}
                          className="product-modal-button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedProduct.linkLabel ?? 'Uygulamaya Git'}
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M7 7h10v10"></path>
                          </svg>
                        </a>
                      ) : (
                        <div className="product-modal-coming-soon">Yakında Microsoft Store'da Yayında</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </section>

      {/* Solutions Showcase Section */}
      <section className="solutions-showcase-section">
        <motion.div
          className="solutions-showcase-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="section-title">Neler Geliştiriyoruz?</h2>
          <p className="solutions-showcase-intro">
            Ticari web sitelerinden topluluk ve forum platformlarına, vlog odaklı içerik sitelerinden ERP ve kurumsal
            yazılımlara kadar farklı ihtiyaçlara uygun dijital ürünler tasarlıyor ve geliştiriyoruz.
          </p>

          <div className="solutions-showcase-grid">
            {solutionAreas.map((area, index) => (
              <motion.article
                key={area.title}
                className={`solutions-showcase-card solutions-showcase-card-${index + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="solutions-showcase-visual" aria-hidden="true">
                  <span>{area.icon}</span>
                </div>
                <h3 className="solutions-showcase-title">{area.title}</h3>
                <p className="solutions-showcase-description">{area.description}</p>
                <div className="solutions-showcase-tags">
                  {area.tags.map((tag) => (
                    <span key={tag} className="solutions-showcase-tag">{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Akiyom AI Promo */}
      <AkiyomAiPromo />

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
            Akibeat, Aki Finans, Enigma Atlas ve Akizen PC gibi projelerde edindiğimiz mühendislik
            tecrübesini, artık sizin iş hedeflerinize taşıyoruz. Web sitesi ve uygulamalardan ERP, CRM ve kurumsal
            yazılımlara kadar; planlama, tasarım ve geliştirme adımlarını tek bir çatı altında yönetiyoruz.
          </p>
          
          <div className="studio-services">
            <div className="studio-service-item">
              <h3 className="studio-service-title">Site ve Uygulama Geliştirme</h3>
              <p className="studio-service-description">Kişisel ve ticari hedeflere uygun web/mobil çözümler.</p>
            </div>
            <div className="studio-service-item">
              <h3 className="studio-service-title">ERP ve Kurumsal Yazılımlar</h3>
              <p className="studio-service-description">Stok, muhasebe, satış ve operasyon süreçleri için ERP, CRM ve entegrasyon sistemleri.</p>
            </div>
          </div>

          <div className="studio-packages">
            {studioPackages.map((pkg) => (
              <div
                key={pkg.title}
                className="studio-package-card"
                onClick={() => setSelectedStudioPackage(pkg)}
              >
                <span className="studio-package-category">{pkg.category}</span>
                <h3 className="studio-package-title">{pkg.title}</h3>
                <p className="studio-package-description">{pkg.description}</p>
                <ul className="studio-package-list">
                  {pkg.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="studio-package-price">{formatStudioStartPrice(pkg.priceFrom)}</p>
                <p className="studio-package-note">Detayları görmek için tıklayın.</p>
              </div>
            ))}
          </div>

          <PriceVatNote className="studio-price-vat-note" />

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

      {/* Studio Package Detail Modal */}
      <AnimatePresence>
        {selectedStudioPackage && (
          <motion.div
            className="studio-package-modal-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setSelectedStudioPackage(null)}
          >
            <motion.div
              className="studio-package-modal"
              initial={{ opacity: 0, scale: 0.92, y: 32, rotateX: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16, rotateX: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedStudioPackage(null)}
                aria-label="Kapat"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <motion.div
                className="studio-package-modal-content"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
                }}
              >
                <motion.span
                  className="studio-package-category"
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                >
                  {selectedStudioPackage.category}
                </motion.span>
                <motion.h3
                  className="studio-package-modal-title"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  {selectedStudioPackage.title}
                </motion.h3>
                <motion.p
                  className="studio-package-modal-description"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  {selectedStudioPackage.description}
                </motion.p>

                <motion.div
                  className="studio-package-meta-grid"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <div className="studio-package-meta-item">
                    <span className="studio-package-meta-label">Tahmini Süre</span>
                    <span className="studio-package-meta-value">{selectedStudioPackage.duration}</span>
                  </div>
                  <div className="studio-package-meta-item">
                    <span className="studio-package-meta-label">Tahmini Ücret</span>
                    <span className="studio-package-meta-value">{formatStudioStartPrice(selectedStudioPackage.priceFrom)}</span>
                  </div>
                </motion.div>

                <PriceVatNote className="studio-price-vat-note studio-price-vat-note-modal" />

                <motion.div
                  className="studio-package-modal-list"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <h4>Paket İçeriği</h4>
                  <ul>
                    {selectedStudioPackage.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="studio-package-modal-list"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <h4>Detaylar</h4>
                  <ul>
                    {selectedStudioPackage.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter
        onContactClick={() => setSelectedPage('contact')}
        onTermsClick={() => setSelectedPage('terms')}
      />

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
                      Akiyom olarak; Akibeat, Aki Finans ve Enigma Atlas platformlarımızı kullanırken paylaştığınız verilerin mahremiyetini en üst düzeyde tutmayı taahhüt ediyoruz.
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
                        <strong>Adil Kullanım:</strong> Akibeat'in yapay zeka motoru veya Aki Finans'ın analiz araçları gibi sistemlerimiz, bireysel üretkenliği artırmak için tasarlanmıştır. Sistem bütünlüğünü riske atacak manipülatif kullanımlara izin verilmez.
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
                        <div className="page-modal-whatsapp">
                          <WhatsAppLink />
                        </div>
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

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
};

export default AkiyomLanding;
