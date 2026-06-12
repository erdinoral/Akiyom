import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import FormMemberNotice from './FormMemberNotice';
import { getAccessToken } from '../utils/memberRequests';
import { getProfileDisplayName } from '../utils/profileDisplayName';
import '../../AkiyomLanding.css';

const BILLING_LABELS = { monthly: 'Aylık ödeme', annual: 'Yıllık ödeme' };

const AkiyomAiInquiryModal = ({ isOpen, onClose, planName = null, billingPeriod = 'monthly' }) => {
  const { user, profile, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    const defaultMsg = planName
      ? `${planName} paketi için ödeme koşulları ve teklif hakkında bilgi almak istiyorum.`
      : 'Akiyom AI için ödeme koşulları ve teklif hakkında bilgi almak istiyorum.';
    setFormData((prev) => ({
      ...prev,
      fullName: isAuthenticated ? prev.fullName || getProfileDisplayName(user, profile) || '' : prev.fullName,
      email: isAuthenticated ? prev.email || user?.email || '' : prev.email,
      message: prev.message || defaultMsg,
    }));
    setSubmitStatus(null);
    setErrorMessage(null);
  }, [isOpen, planName, isAuthenticated, user, profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Ad soyad ve e-posta zorunludur.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);

    try {
      const token = await getAccessToken();
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch('/api/send-akiyom-ai-inquiry', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          planName: planName || null,
          billingPeriod: billingPeriod || null,
          fullName: formData.fullName,
          email: formData.email,
          companyName: formData.companyName,
          phone: formData.phone,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          companyName: '',
          phone: '',
          message: '',
          website: '',
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 2800);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof window === 'undefined') return null;

  const billingLabel = BILLING_LABELS[billingPeriod] || null;

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
            className="project-form-modal akiyom-ai-inquiry-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="project-form-close" onClick={onClose} aria-label="Kapat">
              ×
            </button>

            <div className="project-form-content">
              <span className="akiyom-ai-inquiry-modal-badge">Akiyom AI</span>
              <h2 className="project-form-title">Ödeme ve Teklif İletişimi</h2>
              <p className="project-form-subtitle">
                {planName ? (
                  <>
                    <strong>{planName}</strong>
                    {billingLabel ? ` · ${billingLabel}` : ''} — talebiniz panele düşer; ekibimiz size döner.
                  </>
              ) : (
                'Talebiniz doğrudan yönetim panelimize iletilir; en kısa sürede dönüş yapılır.'
              )}
              </p>

              <FormMemberNotice isAuthenticated={isAuthenticated} />

              {submitStatus === 'success' ? (
                <div className="project-form-status project-form-status-success">
                  <p>
                    Talebiniz alındı. Teşekkürler — en kısa sürede iletişime geçeceğiz.
                    {isAuthenticated && ' Profilim sekmesinden durumunu takip edebilirsiniz.'}
                  </p>
                </div>
              ) : (
                <form className="project-form akiyom-ai-inquiry-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  />

                  <div className="project-form-group">
                    <label htmlFor="aiInquiryName" className="project-form-label">
                      Ad Soyad <span className="required">*</span>
                    </label>
                    <input
                      id="aiInquiryName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="project-form-input"
                      placeholder="Adınız Soyadınız"
                      autoComplete="name"
                    />
                  </div>

                  <div className="project-form-group">
                    <label htmlFor="aiInquiryEmail" className="project-form-label">
                      E-posta <span className="required">*</span>
                    </label>
                    <input
                      id="aiInquiryEmail"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="project-form-input"
                      placeholder="ornek@sirket.com"
                      autoComplete="email"
                    />
                  </div>

                  <div className="project-form-row">
                    <div className="project-form-group">
                      <label htmlFor="aiInquiryCompany" className="project-form-label">
                        Şirket <span className="optional">(Opsiyonel)</span>
                      </label>
                      <input
                        id="aiInquiryCompany"
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="project-form-input"
                        placeholder="Şirket adınız"
                        autoComplete="organization"
                      />
                    </div>
                    <div className="project-form-group">
                      <label htmlFor="aiInquiryPhone" className="project-form-label">
                        Telefon <span className="optional">(Opsiyonel)</span>
                      </label>
                      <input
                        id="aiInquiryPhone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="project-form-input"
                        placeholder="05xx xxx xx xx"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="project-form-group">
                    <label htmlFor="aiInquiryMessage" className="project-form-label">
                      Mesajınız
                    </label>
                    <textarea
                      id="aiInquiryMessage"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="project-form-textarea"
                      placeholder="Ödeme planı, donanım veya kurulum hakkında notlarınız..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <p className="project-form-status project-form-status-error" role="alert">
                      {errorMessage || 'Lütfen zorunlu alanları doldurun.'}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="project-form-button project-form-button-primary akiyom-ai-inquiry-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Talebi gönder'}
                  </button>

                  <p className="akiyom-ai-inquiry-modal-hint">
                    İsterseniz{' '}
                    <a href="mailto:akiyom.iletisim@gmail.com">akiyom.iletisim@gmail.com</a> adresine de yazabilirsiniz.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AkiyomAiInquiryModal;
