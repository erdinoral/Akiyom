import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SiteFooter from './SiteFooter';
import '../../AkiyomLanding.css';

const PageShell = ({ children }) => {
  const location = useLocation();
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
        <SiteNavbar />
        {children}
        <SiteFooter showWhatsApp={false} />
      </div>
    </div>
  );
};

export default PageShell;
