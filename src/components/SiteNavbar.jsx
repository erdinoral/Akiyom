import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AkiyomLogoMark from './AkiyomLogoMark';
import NavAuth from './NavAuth';
import '../../AkiyomLanding.css';

const WHATSAPP_HREF = 'https://wa.me/90XXXXXXXXXX';
const MOBILE_MENU_BREAKPOINT = 900;

const SiteNavbar = ({
  style,
  variant = 'router',
  onContactClick,
  onTermsClick,
  showWhatsApp = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const deferCloseMenu = useCallback(() => {
    window.setTimeout(closeMenu, 0);
  }, [closeMenu]);

  const handleLogoClick = (e) => {
    closeMenu();
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.hash, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${MOBILE_MENU_BREAKPOINT + 1}px)`);
    const handleChange = () => {
      if (media.matches) closeMenu();
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [closeMenu]);

  const NavLink = ({ hash, to, children, className = '' }) => {
    const linkClass = className ? ` ${className}` : '';

    if (variant === 'hash' && isHome && hash) {
      return (
        <a href={hash} className={`nav-mobile-link${linkClass}`} onClick={deferCloseMenu}>
          {children}
        </a>
      );
    }

    const destination = to || hash || '/';

    return (
      <a
        href={destination}
        className={`nav-mobile-link${linkClass}`}
        onClick={(event) => {
          event.preventDefault();
          navigate(destination);
        }}
      >
        {children}
      </a>
    );
  };

  const DesktopNavLink = ({ hash, to, children, className = '' }) => {
    if (variant === 'hash' && isHome) {
      return <a href={hash} className={className}>{children}</a>;
    }
    return <Link to={to} className={className}>{children}</Link>;
  };

  const mobileMenu =
    menuOpen &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        id="site-mobile-menu"
        className="nav-mobile nav-mobile-open"
        role="dialog"
        aria-modal="true"
        aria-label="Site menüsü"
      >
        <button type="button" className="nav-mobile-backdrop" aria-label="Menüyü kapat" onClick={closeMenu} />

        <div className="nav-mobile-panel">
          <div className="nav-mobile-head">
            <div className="nav-mobile-head-brand">
              <span className="nav-mobile-head-logo">A</span>
              <span className="nav-mobile-head-title">
                AK<span className="star-i-nav">İ</span>YOM
              </span>
            </div>
            <button type="button" className="nav-mobile-close" aria-label="Menüyü kapat" onClick={closeMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="nav-mobile-body">
            <div className="nav-mobile-section">
              <p className="nav-mobile-label">Keşfet</p>
              <div className="nav-mobile-links">
                <NavLink hash="#vizyon" to="/#vizyon">
                  Vizyon
                </NavLink>
                <NavLink hash="#projeler" to="/#projeler">
                  Projeler
                </NavLink>
                <NavLink to="/blog">Blog & Haberler</NavLink>
                <NavLink
                  to="/akiyom-ai"
                  className="nav-link--akiyom-ai akiyom-ai-gradient-text--animated"
                >
                  Akiyom AI
                </NavLink>
                <NavLink hash="#hedefler" to="/#hedefler">
                  Hedefler
                </NavLink>
                <NavLink to="/biz-kimiz">Biz Kimiz</NavLink>
              </div>
            </div>

            <div className="nav-mobile-section">
              <p className="nav-mobile-label">Hesap</p>
              <NavAuth layout="stacked" onNavigate={deferCloseMenu} />
            </div>

            <div className="nav-mobile-section">
              <p className="nav-mobile-label">Yasal & iletişim</p>
              <div className="nav-mobile-links nav-mobile-links-muted">
                <NavLink to="/gizlilik">Gizlilik Politikası</NavLink>
                {onTermsClick ? (
                  <a
                    href="#kullanim"
                    className="nav-mobile-link"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      onTermsClick();
                    }}
                  >
                    Kullanım Koşulları
                  </a>
                ) : (
                  <NavLink to="/#kullanim">Kullanım Koşulları</NavLink>
                )}
                {onContactClick ? (
                  <a
                    href="#iletisim"
                    className="nav-mobile-link"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      onContactClick();
                    }}
                  >
                    İletişim
                  </a>
                ) : (
                  <a href="mailto:akiyom.iletisim@gmail.com" className="nav-mobile-link" onClick={deferCloseMenu}>
                    İletişim
                  </a>
                )}
                {showWhatsApp && (
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-mobile-link nav-mobile-link-whatsapp"
                    onClick={deferCloseMenu}
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
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
                <AkiyomLogoMark size={40} />
              </motion.div>
              <span className="nav-brand-text">
                AK<span className="star-i-nav">İ</span>YOM
              </span>
            </Link>
          </div>

          <div className="nav-links nav-links--desktop">
            <DesktopNavLink hash="#vizyon" to="/#vizyon">
              Vizyon
            </DesktopNavLink>
            <DesktopNavLink hash="#projeler" to="/#projeler">
              Projeler
            </DesktopNavLink>
            <Link to="/blog">Blog & Haberler</Link>
            <Link to="/akiyom-ai" className="nav-link--akiyom-ai akiyom-ai-gradient-text--animated">
              Akiyom AI
            </Link>
            <DesktopNavLink hash="#hedefler" to="/#hedefler">
              Hedefler
            </DesktopNavLink>
            <Link to="/biz-kimiz">Biz Kimiz</Link>
          </div>

          <div className="nav-auth nav-auth--desktop">
            <NavAuth />
          </div>

          <button
            type="button"
            className={`nav-burger${menuOpen ? ' nav-burger-open' : ''}`}
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-burger-bar" aria-hidden="true" />
            <span className="nav-burger-bar" aria-hidden="true" />
            <span className="nav-burger-bar" aria-hidden="true" />
          </button>
        </div>
      </motion.nav>

      {mobileMenu}
    </>
  );
};

export default SiteNavbar;
