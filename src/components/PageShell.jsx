import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../AkiyomLanding.css';

const PageShell = ({ children }) => {
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isFullWidthPage = location.pathname === '/akiyom-ai';

  return (
    <div className={`akiyom-landing${isFullWidthPage ? ' akiyom-landing--full-width' : ''}`}>
      <div className="background-base-layer" />
      <div className="background-effects-layer">
        <div className="light-refraction light-1" />
        <div className="light-refraction light-2" />
        <div className="light-refraction light-3" />
      </div>
      <div className="content-safety-layer" />
      <div className={`content-layer${isFullWidthPage ? ' content-layer--full-width' : ''}`}>
        <motion.nav className="navbar" style={{ opacity: 1 }}>
          <div className="nav-container">
            <div className="nav-brand">
              <Link
                to="/"
                className="nav-logo-link"
                onClick={handleLogoClick}
                aria-label="Ana sayfaya dön"
              >
                <motion.div className="nav-logo">
                  <span className="nav-logo-a">A</span>
                </motion.div>
                <span className="nav-brand-text">
                  AK<span className="star-i-nav">İ</span>YOM
                </span>
              </Link>
            </div>
            <div className="nav-links">
              <Link to="/#vizyon">Vizyon</Link>
              <Link to="/#urunler">Ürünler</Link>
              <Link to="/projeler">Projeler</Link>
              <Link to="/akiyom-ai">Akiyom AI</Link>
              <Link to="/#hedefler">Hedefler</Link>
            </div>
          </div>
        </motion.nav>
        {children}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-copyright">© 2026 Akiyom. Tüm hakları saklıdır.</div>
            <div className="footer-links">
              <Link to="/gizlilik" className="footer-link">
                Gizlilik Politikası
              </Link>
              <Link to="/projeler" className="footer-link">
                Projeler
              </Link>
              <Link to="/akiyom-ai" className="footer-link">
                Akiyom AI
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PageShell;
