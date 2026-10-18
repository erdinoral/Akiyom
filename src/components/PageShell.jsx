import React from 'react';
import SiteNavbar from './SiteNavbar';
import SiteFooter from './SiteFooter';
import '../../AkiyomLanding.css';

const PageShell = ({ children }) => {
  return (
    <div className="akiyom-landing">
      <div className="background-base-layer" />
      <div className="background-effects-layer">
        <div className="light-refraction light-1" />
        <div className="light-refraction light-2" />
        <div className="light-refraction light-3" />
      </div>
      <div className="content-safety-layer" />
      <div className="content-layer">
        <SiteNavbar />
        {children}
        <SiteFooter showWhatsApp={false} />
      </div>
    </div>
  );
};

export default PageShell;
