import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/PageShell.jsx';
import {
  ABOUT_COMPANY,
  ABOUT_CONTACT,
  ABOUT_FOUNDER,
  ABOUT_INTRO,
  ABOUT_MISSION,
  ABOUT_NAME_ORIGIN,
  ABOUT_PILLARS,
  ABOUT_PROCESS,
  ABOUT_SOCIAL,
  ABOUT_STATS,
  ABOUT_STORY,
  ABOUT_VALUES,
} from '../data/aboutAkiyom.js';
import { usePageSeo } from '../utils/seo.js';
import '../../AkiyomLanding.css';

const ease = [0.25, 0.1, 0.25, 1];

const AboutPage = () => {
  usePageSeo({
    title: 'Biz Kimiz — Akiyom',
    description:
      'Akiyom Yazılım ve Geliştirme — 2025\'te Erdin Oral tarafından kurulan İstanbul merkezli teknoloji stüdyosu. Ürünler, Akiyom Studio ve Akiyom AI.',
    path: '/biz-kimiz',
  });

  return (
    <PageShell>
      <motion.section
        className="about-page"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="about-container">
          <header className="about-hero">
            <p className="about-eyebrow">{ABOUT_COMPANY.legalName}</p>
            <h1 className="about-title">{ABOUT_INTRO.title}</h1>
            <p className="about-lead">{ABOUT_INTRO.lead}</p>
            <blockquote className="about-mission">{ABOUT_MISSION}</blockquote>
            <p className="about-meta-line">
              {ABOUT_COMPANY.location} · Kuruluş {ABOUT_COMPANY.foundedYear}
            </p>
          </header>

          <section className="about-block about-founder-section">
            <div className="about-founder-layout">
              <div className="about-founder-copy">
                <h2 className="about-section-title">Kurucu</h2>
                <h3 className="about-founder-name">{ABOUT_FOUNDER.name}</h3>
                <p className="about-founder-role">{ABOUT_FOUNDER.role}</p>
                <p className="about-text">{ABOUT_FOUNDER.bio}</p>
              </div>
              {ABOUT_FOUNDER.imagePlaceholder && (
                <div className="about-founder-visual" aria-hidden="true">
                  <span className="about-founder-visual-label">Görsel yakında</span>
                </div>
              )}
            </div>
          </section>

          <section className="about-block">
            <h2 className="about-section-title">{ABOUT_NAME_ORIGIN.title}</h2>
            {ABOUT_NAME_ORIGIN.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="about-text">
                {paragraph}
              </p>
            ))}
          </section>

          <section className="about-block">
            <h2 className="about-section-title">Hikayemiz</h2>
            {ABOUT_STORY.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="about-text">
                {paragraph}
              </p>
            ))}
          </section>

          <section className="about-block">
            <h2 className="about-section-title">Rakamlarla Akiyom</h2>
            <p className="about-text about-stats-intro">
              Yeni bir marka olmamıza rağmen canlı ürünler, yayın süreçleri ve mühendislik pratiğimizle tutarlı bir
              ekosistem kuruyoruz.
            </p>
            <div className="about-stats-grid">
              {ABOUT_STATS.map((stat) => (
                <article key={stat.label} className="about-stat-card">
                  <strong className="about-stat-value">{stat.value}</strong>
                  <span className="about-stat-label">{stat.label}</span>
                  <span className="about-stat-hint">{stat.hint}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="about-block">
            <h2 className="about-section-title">Ne sunuyoruz?</h2>
            <div className="about-pillars">
              {ABOUT_PILLARS.map((pillar, index) => (
                <motion.article
                  key={pillar.id}
                  className="about-pillar-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease }}
                >
                  <h3 className="about-pillar-title">{pillar.title}</h3>
                  <p className="about-pillar-desc">{pillar.description}</p>
                  <ul className="about-pillar-list">
                    {pillar.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="about-block">
            <h2 className="about-section-title">Değerlerimiz</h2>
            <div className="about-values-grid">
              {ABOUT_VALUES.map((value) => (
                <article key={value.title} className="about-value-card">
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-text">{value.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-block">
            <h2 className="about-section-title">Nasıl çalışıyoruz?</h2>
            <div className="about-process">
              {ABOUT_PROCESS.map((item) => (
                <article key={item.step} className="about-process-step">
                  <span className="about-process-num">{item.step}</span>
                  <div>
                    <h3 className="about-process-title">{item.title}</h3>
                    <p className="about-text">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="about-cta">
            <h2 className="about-section-title">Birlikte çalışalım</h2>
            <p className="about-text">{ABOUT_CONTACT.note}</p>
            <div className="about-cta-meta">
              <span>
                <strong>E-posta:</strong>{' '}
                <a href={`mailto:${ABOUT_CONTACT.email}`} className="about-link">
                  {ABOUT_CONTACT.email}
                </a>
              </span>
              <span>
                <strong>Konum:</strong> {ABOUT_CONTACT.location}
              </span>
            </div>
            {ABOUT_SOCIAL.length > 0 && (
              <div className="about-social">
                {ABOUT_SOCIAL.map((item) => (
                  <a key={item.label} href={item.href} className="about-link" target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                ))}
              </div>
            )}
            <div className="about-cta-actions">
              <Link to="/?form=open" className="about-cta-btn primary">
                Projenizi Anlatın
              </Link>
              <Link to="/projeler" className="about-cta-btn outline">
                Projelerimizi görün
              </Link>
              <Link to="/akiyom-ai" className="about-cta-btn outline">
                Akiyom AI
              </Link>
            </div>
          </section>
        </div>
      </motion.section>
    </PageShell>
  );
};

export default AboutPage;
