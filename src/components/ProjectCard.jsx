import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const ProjectCard = ({ project, index = 0 }) => {
  const [thumbFailed, setThumbFailed] = useState(false);
  const showPlaceholder = thumbFailed || !(project.cardThumbnail || project.thumbnail);
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
              src={project.cardThumbnail || project.thumbnail}
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
};

export default ProjectCard;
