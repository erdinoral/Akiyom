import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './AkiyomMain.css';

const AkiyomMain = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const projects = [
    {
      id: 1,
      name: 'Akibeat',
      description: 'Müzik üretim platformu',
      image: 'https://via.placeholder.com/600x400/8A2BE2/FFFFFF?text=Akibeat',
      color: '#8A2BE2'
    },
    {
      id: 2,
      name: 'Akış',
      description: 'Üretkenlik uygulaması',
      image: 'https://via.placeholder.com/600x400/FF00FF/FFFFFF?text=Akış',
      color: '#FF00FF'
    },
    {
      id: 3,
      name: 'Enigma',
      description: 'Gizemli deneyim',
      image: 'https://via.placeholder.com/600x400/8A2BE2/FFFFFF?text=Enigma',
      color: '#8A2BE2'
    },
    {
      id: 4,
      name: 'GamerConnect',
      description: 'Oyun topluluğu platformu',
      image: 'https://via.placeholder.com/600x400/FF00FF/FFFFFF?text=GamerConnect',
      color: '#FF00FF'
    }
  ];

  return (
    <div className="akiyom-container">
      {/* Navbar */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-a">A</span>
            <span className="logo-text">kiyom</span>
          </motion.div>
          <div className="nav-links">
            <a href="#projeler">Projeler</a>
            <a href="#destek">Destek</a>
            <a href="#hakkimizda">Hakkımızda</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="hero"
        style={{ opacity, scale }}
      >
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="hero-logo"
            animate={{
              boxShadow: [
                '0 0 20px #FF00FF, 0 0 40px #FF00FF, 0 0 60px #FF00FF',
                '0 0 30px #8A2BE2, 0 0 60px #8A2BE2, 0 0 90px #8A2BE2',
                '0 0 20px #FF00FF, 0 0 40px #FF00FF, 0 0 60px #FF00FF'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <span className="hero-logo-a">A</span>
          </motion.div>
          <motion.h1
            className="hero-slogan"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Müzik, Oyun ve Üretkenlik
          </motion.h1>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <section id="projeler" className="projects-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Projelerimiz
        </motion.h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="project-image-container">
                <img src={project.image} alt={project.name} className="project-image" />
                <div className="project-overlay" style={{ borderColor: project.color }}>
                  <h3 className="project-name" style={{ color: project.color }}>
                    {project.name}
                  </h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="hakkimizda" className="about-section">
        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Hakkımızda</h2>
          <p className="about-text">
            Akiyom, müzik, oyun ve üretkenlik alanlarında yenilikçi çözümler sunan bir platformdur.
            Kullanıcılarımıza en iyi deneyimi sunmak için sürekli gelişiyoruz.
          </p>
        </motion.div>
      </section>

      {/* Support Section */}
      <section id="destek" className="support-section">
        <motion.div
          className="support-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="support-content">
            <h2 className="support-title">Sunucu maliyetlerimize destek olun</h2>
            <p className="support-text">
              Projelerimizin devam edebilmesi için sunucu maliyetlerine ihtiyacımız var.
              Destekleriniz sayesinde daha iyi hizmetler sunabiliyoruz.
            </p>
            <div className="kreasus-container">
              {/* Kreosus modülü buraya entegre edilebilir */}
              <div className="kreasus-placeholder">
                <p>Kreasus Modülü</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AkiyomMain;
