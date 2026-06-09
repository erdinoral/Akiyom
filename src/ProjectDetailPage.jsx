import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from './components/PageShell.jsx';
import projects from './data/projects.js';
import ProductDetailSections from './components/ProductDetailSections.jsx';
import { setPageSeo, injectJsonLd } from './utils/seo.js';
import '../AkiyomLanding.css';

const ease = [0.25, 0.1, 0.25, 1];

const IconAlertCircle = () => (
  <svg
    className="project-detail-card-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const IconBulb = () => (
  <svg
    className="project-detail-card-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 12h1m8 -9v1m8 8h1" />
    <path d="M5.6 5.6l.7 .7m12.1 -.7l-.7 .7" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 3a6 6 0 0 1 6 6c0 2.2 -1.2 4.1 -3 5.2l-.8 2.4h-4.4l-.8 -2.4c-1.8 -1.1 -3 -3 -3 -5.2a6 6 0 0 1 6 -6z" />
  </svg>
);

const IconTrophy = () => (
  <svg
    className="project-detail-card-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 21l4 -7l4 7" />
    <path d="M12 3a6 6 0 0 1 6 6c0 2.5 -1.5 4.7 -3.7 5.6l-.3 1.4h-3l-.3 -1.4a6 6 0 0 1 -3.7 -5.6a6 6 0 0 1 6 -6z" />
    <path d="M7 3h10" />
    <path d="M7 7h10" />
  </svg>
);

const contentCards = [
  { key: 'challenge', title: 'Sorun', Icon: IconAlertCircle },
  { key: 'solution', title: 'Çözüm', Icon: IconBulb },
  { key: 'result', title: 'Sonuç', Icon: IconTrophy },
];

const PROJECT_SCHEMA_ID = 'akiyom-project-schema';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) {
      navigate('/projeler', { replace: true });
    }
  }, [project, navigate]);

  useEffect(() => {
    if (!project) return;

    const resetSeo = setPageSeo({
      title: `${project.title} — Akiyom Studio`,
      description: project.summary,
      path: `/projeler/${project.slug}`,
    });

    const removeSchema = injectJsonLd(PROJECT_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.title,
      description: project.summary,
      applicationCategory: project.category,
      operatingSystem: project.category.includes('Windows') ? 'Windows' : 'Web',
      url: project.url,
      author: {
        '@type': 'Organization',
        name: 'Akiyom',
      },
    });

    return () => {
      resetSeo();
      removeSchema();
    };
  }, [project]);

  if (!project) {
    return null;
  }

  const isLive = project.status === 'Yayında';
  const hasUrl = Boolean(project.url?.startsWith('http'));
  const hasRichDetail = project.detailSections?.length > 0;

  return (
    <PageShell>
      <motion.section
        className="project-detail"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="project-detail-container">
          <Link to="/projeler" className="project-detail-back">
            ← Tüm Projeler
          </Link>

          {project.thumbnail && (
            <div className="project-detail-hero-image">
              <img src={project.thumbnail} alt={project.title} />
            </div>
          )}

          <header className="project-detail-hero">
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-subtitle">{project.subtitle}</p>

            <div className="project-detail-hero-meta">
              <span className="project-detail-category">{project.category}</span>
              <span
                className={`project-detail-status ${
                  isLive ? 'project-detail-status-live' : 'project-detail-status-dev'
                }`}
              >
                {project.status}
              </span>
              <span className="project-detail-duration">{project.duration}</span>
            </div>

            {hasUrl && (
              <a
                href={project.url}
                className="project-detail-live-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.linkLabel || 'Canlıya Git'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            )}
          </header>

          <div className="project-detail-tech">
            <span className="project-detail-tech-label">Kullanılan teknolojiler</span>
            <div className="project-detail-tech-pills">
              {project.tech.map((item) => (
                <span key={item} className="project-detail-tech-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {hasRichDetail ? (
            <ProductDetailSections sections={project.detailSections} />
          ) : (
            <>
              <div className="project-detail-cards">
                {contentCards.map(({ key, title, Icon }, index) => (
                  <motion.article
                    key={key}
                    className="project-detail-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease }}
                  >
                    <div className="project-detail-card-head">
                      <Icon />
                      <h2 className="project-detail-card-title">{title}</h2>
                    </div>
                    <p className="project-detail-card-text">{project[key]}</p>
                  </motion.article>
                ))}
              </div>

              <motion.div
                className="project-detail-summary"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
              >
                <p>{project.summary}</p>
              </motion.div>
            </>
          )}

          {project.screenshots?.length > 0 && (
            <div className="project-detail-screenshots">
              <h2 className="project-detail-screenshots-title">Ekran Görüntüleri</h2>
              <div className="project-detail-screenshots-grid">
                {project.screenshots.map((src, i) => (
                  <img key={i} src={src} alt={`${project.title} ekran ${i + 1}`} />
                ))}
              </div>
            </div>
          )}

          <motion.div
            className="project-detail-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="project-detail-cta-title">Bu tarz bir proje için</h2>
            <button
              type="button"
              className="project-detail-cta-button"
              onClick={() => navigate('/?form=open')}
            >
              Projenizi Anlatın
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.section>
    </PageShell>
  );
};

export default ProjectDetailPage;
