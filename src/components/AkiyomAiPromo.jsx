import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1];

const valueProps = [
  {
    title: 'Sıfır Veri Sızıntısı (Tam Güvenlik)',
    text: 'KVKK ve GDPR uyumlu. Tüm analizler, yazışmalar ve dosya işlemeleri internete ihtiyaç duymadan, şirketinizin fiziksel odasındaki izole sunucularda gerçekleşir.',
  },
  {
    title: 'Sabit Maliyet, Sınırsız Özgürlük',
    text: 'Personel başına her ay katlanarak artan fahiş bulut abonelik ücretlerine son verin. Tek seferlik donanım yatırımıyla altyapıya sahip olun, bütçenizi kilitleyin.',
  },
  {
    title: 'Çoklu Uzman Mimarisi',
    text: 'Akıllı görev yönlendirici sayesinde ekibiniz mod seçmekle uğraşmaz. Tek arayüzden gelişmiş metin yazımı, Türkçe web araştırması, Graph-RAG destekli doküman analizi ve yerel görsel üretimi otomatik tetiklenir.',
  },
];

const hiddenRisks = [
  {
    title: 'Sürekli Artan Fahiş Maliyetler (Abonelik Tuzağı)',
    text: '50 kişilik bir ekip için bulut servislerine ödenen kişi başı aylık ortalama 650 ₺ abonelik ücreti, şirketinize yılda 390.000 ₺ kalıcı ve çöpe giden maliyet yaratır. Akiyom AI\'da ise donanım bir kez alınır ve sunucu şirketinize kalır; personel sayınız arttıkça ek maliyetiniz sıfır olur.',
  },
  {
    title: 'Değerli Doküman ve Veri Sızıntısı Riski',
    text: 'Çalışanlarınızın bulut sistemlerine yüklediği her şirket içi rapor, kaynak kod, müşteri datası veya mali veri, harici sunucularda işlenir ve o modellerin eğitilmesi için dışarı sızdırılır. Ticari sırlarınızın rakiplerin eline geçme veya KVKK cezalarıyla karşılaşma riskinin maddi bir karşılığı yoktur.',
  },
  {
    title: 'İnternet ve Bant Genişliği Bağımlılığı',
    text: 'Şirketinizdeki onlarca personelin aynı anda buluta devasa PDF dokümanları gönderip analiz ettirmesi yerel internet hattınızı felç eder, harici sunucularda kuyruklar (rate-limit) oluşmasına ve zaman kaybına yol açar. Akiyom AI yerel ağınızda çalıştığı için internet hattınızı işgal etmez, saniyeler içinde lokal veri tabanınızdan yanıt döner.',
  },
  {
    title: 'Geliştirme Özgürlüğünün Kısıtlanması',
    text: 'Dışarıdan aldığınız API servislerine her ay binlerce dolar ödeseniz bile, o modelleri kendi şirket kültürünüze veya sektörünüze göre derinlemesine eğitemezsiniz. Sizi sıradan bir kullanıcı olarak sınırlandırırlar.',
  },
];

const AkiyomAiPromo = () => {
  return (
    <section id="akiyom-ai" className="akiyom-ai-promo-section">
      <motion.div
        className="akiyom-ai-promo"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="akiyom-ai-promo-glow" aria-hidden="true" />

        <header className="akiyom-ai-promo-hero">
          <span className="akiyom-ai-promo-badge">Akiyom AI</span>
          <h2 className="akiyom-ai-promo-title">
            Şirketinizin Verileri İçeride Kalsın, Yerel Yapay Zeka Gücü Ofisinize Gelsin.
          </h2>
          <p className="akiyom-ai-promo-lead">
            Akiyom AI ile bulut servislerine bağımlı kalmadan, tamamen kendi sunucularınızda çalışan
            kurumsal yapay zeka altyapısını keşfedin. Müşteri verileriniz, ticari sırlarınız ve
            dokümanlarınız ağınızdan asla dışarı çıkmasın.
          </p>
        </header>

        <div className="akiyom-ai-promo-values">
          <h3 className="akiyom-ai-promo-values-heading">Neden Akiyom AI?</h3>
          <div className="akiyom-ai-promo-values-grid">
            {valueProps.map((item, index) => (
              <motion.article
                key={item.title}
                className="akiyom-ai-promo-value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease }}
              >
                <h4 className="akiyom-ai-promo-value-title">{item.title}</h4>
                <p className="akiyom-ai-promo-value-text">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="akiyom-ai-promo-risks">
          <div className="akiyom-ai-promo-risks-header">
            <span className="akiyom-ai-promo-risks-icon" aria-hidden="true">⚠️</span>
            <h3 className="akiyom-ai-promo-risks-title">
              Şu An Farkında Olmadığınız Gizli Kayıplarınız ve Riskler
            </h3>
          </div>
          <p className="akiyom-ai-promo-risks-intro">
            Mevcut bulut tabanlı AI servislerini (ChatGPT, Claude vb.) kurumsal olarak kullanırken
            şirketinize verdiğiniz zararları hiç hesapladınız mı?
          </p>
          <div className="akiyom-ai-promo-risks-grid">
            {hiddenRisks.map((item, index) => (
              <motion.article
                key={item.title}
                className="akiyom-ai-promo-risk-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: index * 0.06, ease }}
              >
                <h4 className="akiyom-ai-promo-risk-title">{item.title}</h4>
                <p className="akiyom-ai-promo-risk-text">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="akiyom-ai-promo-footer">
          <div className="akiyom-ai-promo-price-hint">
            <span className="akiyom-ai-promo-price-label">Aylık lisans</span>
            <span className="akiyom-ai-promo-price-value">5.000 ₺&apos;den başlayan paketler</span>
          </div>
          <div className="akiyom-ai-promo-actions">
            <Link to="/akiyom-ai" className="akiyom-ai-promo-btn primary">
              Paketleri ve Fiyatları Gör
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
            <Link to="/akiyom-ai" className="akiyom-ai-promo-btn outline">
              Altyapıyı İncele →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AkiyomAiPromo;
