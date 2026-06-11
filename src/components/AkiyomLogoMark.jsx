import React from 'react';

const AkiyomLogoMark = ({ className = '', size = 40, alt = 'Akiyom' }) => (
  <img
    src="/akiyom-logo.png"
    alt={alt}
    className={`akiyom-logo-mark${className ? ` ${className}` : ''}`}
    width={size}
    height={size}
    loading="eager"
    decoding="async"
  />
);

export default AkiyomLogoMark;
