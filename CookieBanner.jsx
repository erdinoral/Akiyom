import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AkiyomLanding.css';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // localStorage'dan çerez onayını kontrol et
    const cookieConsent = localStorage.getItem('akiyom-cookie-consent');
    
    // Eğer daha önce onay verilmemişse banner'ı göster
    if (!cookieConsent) {
      // Kısa bir gecikme ile banner'ı göster (sayfa yüklendikten sonra)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Kullanıcı tercihini localStorage'a kaydet
    localStorage.setItem('akiyom-cookie-consent', 'accepted');
    localStorage.setItem('akiyom-cookie-consent-date', new Date().toISOString());
    
    // Banner'ı kapat
    setIsVisible(false);
  };

  const handleClose = () => {
    // X butonuna tıklandığında da aynı işlemi yap
    handleAccept();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="cookie-banner-content">
            <div className="cookie-banner-text">
              <p className="cookie-banner-message">
                Sitemizde deneyiminizi iyileştirmek için teknik çerezler kullanıyoruz.
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button
                className="cookie-banner-button"
                onClick={handleAccept}
                aria-label="Çerez kullanımını kabul et"
              >
                Anladım
              </button>
              <button
                className="cookie-banner-close"
                onClick={handleClose}
                aria-label="Çerez bilgilendirmesini kapat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
