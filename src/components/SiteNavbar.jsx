import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavAuth from './NavAuth';
import '../../AkiyomLanding.css';

const SiteNavbar = ({ style, variant = 'router' }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const NavLink = ({ hash, to, children }) => {
    if (variant === 'hash' && isHome) {
      return <a href={hash}>{children}</a>;
    }
    return <Link to={to}>{children}</Link>;
  };

  return (
    <motion.nav className="navbar" style={style}>
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
          <NavLink hash="#vizyon" to="/#vizyon">
            Vizyon
          </NavLink>
          <NavLink hash="#urunler" to="/#urunler">
            Ürünler
          </NavLink>
          <Link to="/projeler">Projeler</Link>
          <Link to="/akiyom-ai" className="nav-link--akiyom-ai akiyom-ai-gradient-text--animated">
            Akiyom AI
          </Link>
          <NavLink hash="#hedefler" to="/#hedefler">
            Hedefler
          </NavLink>
          <Link to="/biz-kimiz">Biz Kimiz</Link>
        </div>

        <NavAuth />
      </div>
    </motion.nav>
  );
};

export default SiteNavbar;
