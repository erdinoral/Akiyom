import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from './components/PageShell.jsx';
import projects from './data/projects.js';
import { setPageSeo } from './utils/seo.js';
import '../AkiyomLanding.css';

const CATEGORIES = ['Tümü', 'Web Uygulaması', 'Windows Uygulaması'];

const ease = [0.25, 0.1, 0.25, 1];

function getProjectInitials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ProjectCard({ project, index }) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const showPlaceholder = thumbFailed || !project.thumbnail;
  const isLive = project.status === 'Yayında';

  return (
    <motion.article
      className="projects-page-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      whileHover={{ y: -8, transition: { duration: 0.35, ease } }}
    >
      <Link to={`/projeler/${project.slug}`} className="projects-page-card-link">
        <div className="projects-page-card-media">
          <span className="projects-page-card-badge">{project.category}</span>
          {showPlaceholder ? (
            <div className="projects-page-card-placeholder" aria-hidden="true">
              {getProjectInitials(project.title)}
            </div>
          ) : (
            <img
              src={project.thumbnail}
              alt=""
              className="projects-page-card-image"
              onError={() => setThumbFailed(true)}
            />
          )}
        </div>

        <div className="projects-page-card-body">
          <h2 className="projects-page-card-title">{project.title}</h2>
          <p className="projects-page-card-subtitle">{project.subtitle}</p>

          <div className="projects-page-card-tech">
            {project.tech.map((item) => (
              <span key={item} className="projects-page-tech-tag">
                {item}
              </span>
            ))}
          </div>

          <div className="projects-page-card-footer">
            <div className="projects-page-card-meta">
              <span className="projects-page-card-duration">{project.duration}</span>
              <span
                className={`projects-page-status ${
                  isLive ? 'projects-page-status-live' : 'projects-page-status-dev'
                }`}
              >
                {project.status}
              </span>
            </div>
            <span className="projects-page-card-cta">İncele →</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tümü');

  useEffect(() => {
    return setPageSeo({
      title: 'Projelerimiz — Akiyom Studio',
      description:
        'Akiyom tarafından geliştirilen web ve masaüstü projeler: Enigma Atlas, Aki Finans, Akizen PC, Akibeat.',
      path: '/projeler',
    });
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Tümü') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageShell>
      <section className="projects-page">
        <div className="projects-page-container">
          <motion.header
            className="projects-page-header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h1 className="projects-page-title">Projelerimiz</h1>
            <p className="projects-page-subtitle">Geliştirdiğimiz ürünler ve çözümler</p>

            <div className="projects-page-filters" role="tablist" aria-label="Proje kategorileri">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={`projects-page-filter ${
                    activeCategory === category ? 'projects-page-filter-active' : ''
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.header>

          <motion.div
            className="projects-page-grid"
            layout
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </motion.div>

          <motion.div
            className="projects-page-cta"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="projects-page-cta-title">Benzer bir proje mi istiyorsunuz?</h2>
            <p className="projects-page-cta-text">
              Vizyonunuzu paylaşın; planlama, tasarım ve geliştirmeyi tek çatı altında yönetelim.
            </p>
            <button
              type="button"
              className="projects-page-cta-button"
              onClick={() => navigate('/?form=open')}
            >
              Projenizi Anlatın
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
};

export default ProjectsPage;
