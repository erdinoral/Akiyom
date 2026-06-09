import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from './components/PageShell.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import projects from './data/projects.js';
import { setPageSeo } from './utils/seo.js';
import '../AkiyomLanding.css';

const CATEGORIES = ['Tümü', 'Web Uygulaması', 'Windows Uygulaması'];

const ease = [0.25, 0.1, 0.25, 1];

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tümü');

  useEffect(() => {
    return setPageSeo({
      title: 'Projelerimiz — Akiyom Studio',
      description:
        'Akiyom tarafından geliştirilen web ve masaüstü projeler: AKİPos, Enigma Atlas, Aki Finans, Akizen PC, Akibeat.',
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
