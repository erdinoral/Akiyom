import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './AkiyomLanding.css';

const ProjectForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    projectType: '',
    fullName: '',
    companyName: '',
    projectDescription: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState(null);

  const projectTypes = [
    { value: 'app', label: 'Uygulama' },
    { value: 'website', label: 'Web Sitesi' },
    { value: 'widget', label: 'Widget' },
    { value: 'other', label: 'Diğer' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasyon
    if (!formData.fullName.trim()) {
      setSubmitStatus('error');
      return;
    }

    if (!formData.projectType) {
      setSubmitStatus('error');
      return;
    }

    if (!formData.projectDescription.trim()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/send-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          projectType: '',
          fullName: '',
          companyName: '',
          projectDescription: '',
          website: ''
        });
        
        // 3 saniye sonra modal'ı kapat
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 3000);
      } else {
        const data = await response.json().catch(() => ({}));
        if (response.status === 429 && data.error) {
          setErrorMessage(data.error);
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form gönderim hatası:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="project-form-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
        <motion.div
          className="project-form-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="project-form-close"
            onClick={onClose}
            aria-label="Kapat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="project-form-content">
            <h2 className="project-form-title">Projenizi Anlatın</h2>
            <p className="project-form-subtitle">
              Dijital çözüm ihtiyacınızı bizimle paylaşın, size özel bir teklif hazırlayalım.
            </p>

            <form onSubmit={handleSubmit} className="project-form">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Proje Tipi */}
              <div className="project-form-group">
                <label className="project-form-label">
                  Proje Tipi <span className="required">*</span>
                </label>
                <div className="project-form-options">
                  {projectTypes.map((type) => (
                    <label key={type.value} className="project-form-option">
                      <input
                        type="radio"
                        name="projectType"
                        value={type.value}
                        checked={formData.projectType === type.value}
                        onChange={handleChange}
                        className="project-form-radio"
                      />
                      <span className="project-form-option-label">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ad Soyad */}
              <div className="project-form-group">
                <label htmlFor="fullName" className="project-form-label">
                  Ad Soyad <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="project-form-input"
                  placeholder="Adınız ve soyadınız"
                  required
                />
              </div>

              {/* Şirket İsmi */}
              <div className="project-form-group">
                <label htmlFor="companyName" className="project-form-label">
                  Şirket İsmi <span className="optional">(Opsiyonel)</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="project-form-input"
                  placeholder="Şirket adınız"
                />
              </div>

              {/* Proje Açıklaması */}
              <div className="project-form-group">
                <label htmlFor="projectDescription" className="project-form-label">
                  Proje Detayları <span className="required">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  className="project-form-textarea"
                  placeholder="Projenizi detaylı bir şekilde anlatın. İhtiyaçlarınız, hedefleriniz ve özel gereksinimleriniz hakkında bilgi verin..."
                  rows="6"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="project-form-actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="project-form-button project-form-button-secondary"
                  disabled={isSubmitting}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="project-form-button project-form-button-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="project-form-spinner"></span>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Gönder
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M7 7h10v10"></path>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="project-form-status project-form-status-success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="project-form-status project-form-status-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errorMessage || 'Bir hata oluştu. Lütfen tüm zorunlu alanları doldurduğunuzdan emin olun ve tekrar deneyin.'}
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectForm;
