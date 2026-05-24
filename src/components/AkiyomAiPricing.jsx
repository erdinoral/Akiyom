import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { basePlans as initialPlans } from '../data/akiyomAiPlans.js';
import './AkiyomAiPricing.css';

const ease = [0.25, 0.1, 0.25, 1];

const fmt = (n) => n.toLocaleString('tr-TR');
const AKIYOM_AI_EMAIL = 'akiyom.iletisim@gmail.com';

const openAkiyomAiInquiry = (planName) => {
  const subject = planName
    ? `Akiyom AI — ${planName} — Ödeme ve Teklif`
    : 'Akiyom AI — Ödeme ve Teklif';
  const params = new URLSearchParams({
    subject,
    body: 'Merhaba,\n\nÖdeme koşulları ve teklif hakkında bilgi almak istiyorum.\n\n',
  });
  window.location.href = `mailto:${AKIYOM_AI_EMAIL}?${params.toString()}`;
};

const AkiyomAiPricing = ({ isPage = false }) => {
  const [annual, setAnnual] = useState(false);
  const [plans, setPlans] = useState(initialPlans);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleGpuChange = useCallback((planId, gpuIdx) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, selectedGpuIdx: gpuIdx } : p))
    );
  }, []);

  const faqs = [
    {
      q: 'Donanım modülleri ve yükseltme sistemi nasıl çalışıyor?',
      a: 'Akiyom AI tamamen esnek bir mimariye sahiptir. İhtiyacınıza göre kart sayısını artırabilir veya yeni nesil tepe model RTX 5090 (32GB VRAM) seçeneğine geçiş yapabilirsiniz. Değişen konfigürasyona göre anahtar teslim tek seferlik sunucu yatırım maliyeti anlık olarak güncellenir.',
    },
  ];

  return (
    <section id="akiyom-ai" className={`akiyom-ai${isPage ? ' akiyom-ai--page' : ''}`}>
      <motion.div
        className="akiyom-ai-wrap"
        initial={{ opacity: 0, y: 40 }}
        animate={isPage ? { opacity: 1, y: 0 } : undefined}
        whileInView={!isPage ? { opacity: 1, y: 0 } : undefined}
        viewport={!isPage ? { once: true, margin: '-80px' } : undefined}
        transition={{ duration: 0.8, ease }}
      >
        <div className="akiyom-ai-header">
          <span className="akiyom-ai-badge">Akiyom AI</span>
          <h2 className="akiyom-ai-section-title">Şirketiniz İçin Güvenli Yerel AI</h2>
          <p className="akiyom-ai-section-sub">
            Verileriniz asla dışarı çıkmaz. Donanımı modüler olarak özelleştirin, kontrolü tamamen elinizde tutun.
          </p>
        </div>

        <div className="akiyom-ai-toggle-row">
          <span className={`akiyom-ai-toggle-label ${!annual ? 'active' : ''}`}>Aylık Ödeme</span>
          <label className="akiyom-ai-toggle-wrap">
            <input
              type="checkbox"
              checked={annual}
              onChange={(e) => setAnnual(e.target.checked)}
              aria-label="Yıllık ödeme"
            />
            <span className="akiyom-ai-toggle-knob" />
          </label>
          <span className={`akiyom-ai-toggle-label ${annual ? 'active' : ''}`}>Yıllık Ödeme</span>
          <span className="akiyom-ai-save-pill">%15 İndirim</span>
        </div>

        <div className="akiyom-ai-grid">
          {plans.map((p, index) => {
            const fee = annual ? p.annualFee : p.monthlyFee;
            const isHolding = p.id === 'holding';

            let totalSetup = null;
            if (!isHolding && p.gpuOptions && p.specs) {
              const gpu = p.gpuOptions[p.selectedGpuIdx];
              totalSetup = p.setupBase + p.baseChassisPrice + gpu.gpuPrice;
            }

            return (
              <motion.article
                key={p.id}
                className={`akiyom-ai-card${p.featured ? ' featured' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06, ease }}
              >
                {p.featured && <div className="akiyom-ai-popular-badge">En Çok Tercih Edilen</div>}
                <div className="akiyom-ai-plan-icon" style={{ background: p.iconBg }}>
                  {p.icon}
                </div>
                <div className="akiyom-ai-plan-name">{p.name}</div>
                <div className="akiyom-ai-plan-desc">{p.desc}</div>

                {fee != null ? (
                  <>
                    <div className="akiyom-ai-plan-price">
                      <span className="akiyom-ai-price-main">{fmt(fee)} ₺</span>
                    </div>
                    <div className="akiyom-ai-price-sub">
                      Aylık Lisans Ücreti{annual ? ' (Yıllık Fat.)' : ''}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="akiyom-ai-plan-price">
                      <span className="akiyom-ai-price-main akiyom-ai-price-main-sm">Proje Bazlı</span>
                    </div>
                    <div className="akiyom-ai-price-sub">Holdinglere özel fiyatlandırma</div>
                  </>
                )}

                {isHolding ? (
                  <>
                    <div className="akiyom-ai-price-setup-block">
                      <div className="akiyom-ai-setup-label">Sunucu Altyapısı</div>
                      <div className="akiyom-ai-setup-value akiyom-ai-setup-value-sm">Özel Projelendirme</div>
                    </div>
                    <div className="akiyom-ai-hw-config-box">
                      <div className="akiyom-ai-hw-title">Mimari Detay</div>
                      <p className="akiyom-ai-hw-note">Veri merkezi tipi sunucu mimarisi kurulur.</p>
                    </div>
                  </>
                ) : (
                  p.gpuOptions &&
                  p.specs && (
                    <>
                      <div className="akiyom-ai-price-setup-block">
                        <div className="akiyom-ai-setup-label">Tek Seferlik Sunucu ve Kurulum</div>
                        <div className="akiyom-ai-setup-value">{fmt(totalSetup)} ₺</div>
                      </div>
                      <div className="akiyom-ai-hw-config-box">
                        <div className="akiyom-ai-hw-title">Cihaz Ana Özellikleri</div>
                        <ul className="akiyom-ai-hw-spec-list">
                          <li>
                            İşlemci Mimarisi: <span>{p.specs.cpu}</span>
                          </li>
                          <li>
                            Sistem Belleği: <span>{p.specs.ram}</span>
                          </li>
                          <li>
                            Depolama Havuzu: <span>{p.specs.storage}</span>
                          </li>
                          <li>
                            Güç Ünitesi: <span>{p.specs.psu}</span>
                          </li>
                        </ul>
                        <div className="akiyom-ai-hw-select-group">
                          <div className="akiyom-ai-hw-title">GPU Kapasite Seçimi</div>
                          <select
                            className="akiyom-ai-hw-select"
                            value={p.selectedGpuIdx}
                            onChange={(e) => handleGpuChange(p.id, parseInt(e.target.value, 10))}
                          >
                            {p.gpuOptions.map((opt, idx) => (
                              <option key={opt.id} value={idx}>
                                {opt.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )
                )}

                <ul className="akiyom-ai-features">
                  {p.features.map((f) => (
                    <li key={f.text} className={f.ok ? '' : 'muted'}>
                      <span className="akiyom-ai-v-icon">{f.ok ? '✓' : '✗'}</span> {f.text}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`akiyom-ai-btn${p.featured ? ' primary' : ''}`}
                  onClick={() => openAkiyomAiInquiry(p.name)}
                >
                  Ödeme için iletişime geçin ↗
                </button>
              </motion.article>
            );
          })}
        </div>

        <div className="akiyom-ai-compare">
          <div className="akiyom-ai-compare-title">Paket Donanım ve Özellik Karşılaştırması</div>
          <div className="akiyom-ai-compare-scroll">
            <div className="akiyom-ai-compare-grid-layout">
              <div className="akiyom-ai-compare-head">Özellik / Altyapı</div>
              <div className="akiyom-ai-compare-head">Mikro</div>
              <div className="akiyom-ai-compare-head accent">Profesyonel</div>
              <div className="akiyom-ai-compare-head">Kurumsal</div>
              <div className="akiyom-ai-compare-head">Holding</div>

              {[
                ['Varsayılan Temel GPU', '1x RTX 4090 (24GB)', '2x RTX 4090 (48GB)', '4x RTX 4090 (96GB)', '8x RTX 4090 / H100'],
                ['Eş Zamanlı Kullanıcı', '5 Kullanıcı', '15 Kullanıcı', '30 Kullanıcı', '75+ Kullanıcı'],
                ['Görsel Üretim (FLUX)', 'check', 'check', 'check', 'check'],
                ['Gelişmiş Web Arama', 'check', 'check', 'check', 'check'],
                ['Doküman Analizi (Graph-RAG)', 'check', 'check', 'check', 'check'],
                ['Sektörel Model Eğitimi', 'no', 'no', 'check', 'check'],
                ['Teknik Destek Kapsamı', 'E-Posta', 'Mesai Saatleri / Telefon', '7/24 Kesintisiz', 'Özel Atanmış Mühendis'],
              ].map(([label, ...cells]) => (
                <React.Fragment key={label}>
                  <div className="akiyom-ai-compare-cell">{label}</div>
                  {cells.map((cell, i) => (
                    <div
                      key={i}
                      className={`akiyom-ai-compare-cell${i === 1 && label !== 'Sektörel Model Eğitimi' && label !== 'Teknik Destek Kapsamı' ? ' highlight-cell' : ''}${i === 1 && label === 'Teknik Destek Kapsamı' ? ' highlight-cell' : ''}`}
                    >
                      {cell === 'check' ? (
                        <span className="akiyom-ai-check-icon">✓</span>
                      ) : cell === 'no' ? (
                        <span className="muted">✗</span>
                      ) : (
                        cell
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="akiyom-ai-faq">
          <div className="akiyom-ai-faq-title">Sık Sorulan Sorular</div>
          {faqs.map((item, index) => (
            <div
              key={index}
              className="akiyom-ai-faq-item"
              role="button"
              tabIndex={0}
              onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpenFaqIndex(openFaqIndex === index ? null : index);
                }
              }}
            >
              <div className="akiyom-ai-faq-q">
                {item.q}
                <span className={`akiyom-ai-faq-chevron${openFaqIndex === index ? ' open' : ''}`}>▼</span>
              </div>
              {openFaqIndex === index && <div className="akiyom-ai-faq-a">{item.a}</div>}
            </div>
          ))}
        </div>

        <div className="akiyom-ai-cta-row">
          <div className="akiyom-ai-cta-text">
            <h3>Özel Bir Donanım Mimarisi mi İstiyorsunuz?</h3>
            <p>Mevcut sunucu kabinlerinize veya bütçenize göre en uygun ekran kartı konfigürasyonunu birlikte planlayalım.</p>
          </div>
          <div className="akiyom-ai-cta-btns">
            <button
              type="button"
              className="akiyom-ai-cta-btn solid"
              onClick={() => openAkiyomAiInquiry()}
            >
              Ödeme için iletişime geçin ↗
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AkiyomAiPricing;
