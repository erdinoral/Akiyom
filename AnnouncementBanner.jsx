import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AkiyomLanding.css';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // localStorage'dan banner durumunu kontrol et
    const announcementDismissed = localStorage.getItem('akiyom-announcement-dismissed');
    
    // Eğer daha önce kapatılmamışsa banner'ı göster
    if (!announcementDismissed) {
      // Kısa bir gecikme ile banner'ı göster
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Body'ye class ekle (navbar positioning için)
        document.body.classList.add('has-announcement-banner');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    // Kullanıcı tercihini localStorage'a kaydet
    localStorage.setItem('akiyom-announcement-dismissed', 'true');
    localStorage.setItem('akiyom-announcement-dismissed-date', new Date().toISOString());
    
    // Body'den class'ı kaldır
    document.body.classList.remove('has-announcement-banner');
    
    // Banner'ı kapat
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="announcement-banner"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="announcement-banner-content">
            <div className="announcement-banner-text">
              <span className="announcement-icon">🚀</span>
              <p className="announcement-message">
                Akibeat AI Model Güncellemesi Yayınlandı!{' '}
                <a href="https://akibeat.akiyom.com" target="_blank" rel="noopener noreferrer" className="announcement-link">
                  Detayları Gör →
                </a>
              </p>
            </div>
            <button
              className="announcement-close"
              onClick={handleClose}
              aria-label="Duyuruyu kapat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="announcement-glow-line"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
