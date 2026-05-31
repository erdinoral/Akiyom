import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FEEDBACK_STATUS_LABELS, formatDate, resolveFeedbackImageUrl } from '../../utils/adminStats';
import { getFeedbackPublicStatus } from '../../data/feedbackStatus';
import AdminSelect from './AdminSelect';

const STATUS_OPTIONS = Object.entries(FEEDBACK_STATUS_LABELS).map(([value, label]) => ({ value, label }));

const AdminFeedback = ({ feedback, onStatusChange, onReplyChange, updatingId, error }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [appFilter, setAppFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [replyDraft, setReplyDraft] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const appOptions = useMemo(() => {
    const map = new Map();
    feedback.forEach((item) => {
      const key = item.app_code || item.app_name || 'unknown';
      if (!map.has(key)) {
        map.set(key, item.app_name || item.app_code || 'Bilinmeyen uygulama');
      }
    });
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1], 'tr'));
  }, [feedback]);

  const appFilterOptions = useMemo(
    () => [
      { value: 'all', label: `Tümü (${feedback.length})` },
      ...appOptions.map(([code, name]) => ({ value: code, label: name })),
    ],
    [appOptions, feedback.length]
  );

  const statusFilterOptions = useMemo(
    () => [{ value: 'all', label: 'Tümü' }, ...STATUS_OPTIONS],
    []
  );

  const filtered = useMemo(() => {
    return feedback.filter((item) => {
      const status = item.status || 'new';
      const matchesStatus = statusFilter === 'all' || status === statusFilter;
      const appKey = item.app_code || item.app_name || 'unknown';
      const matchesApp = appFilter === 'all' || appKey === appFilter;
      return matchesStatus && matchesApp;
    });
  }, [feedback, statusFilter, appFilter]);

  useEffect(() => {
    let cancelled = false;

    async function loadImage() {
      if (!selectedItem?.image_path) {
        setImageUrl(null);
        return;
      }

      setImageLoading(true);
      const url = await resolveFeedbackImageUrl(selectedItem.image_path);
      if (!cancelled) {
        setImageUrl(url);
        setImageLoading(false);
      }
    }

    loadImage();
    return () => {
      cancelled = true;
    };
  }, [selectedItem]);

  const displayStatus = (item) => item.status || 'new';

  const openItem = (item) => {
    setSelectedItem(item);
    setReplyDraft(item.admin_reply || '');
  };

  const saveReply = async () => {
    if (!selectedItem) return;
    const saved = await onReplyChange(selectedItem.id, replyDraft);
    if (saved) {
      setSelectedItem({
        ...selectedItem,
        admin_reply: replyDraft.trim() || null,
        replied_at: replyDraft.trim() ? new Date().toISOString() : null,
        status: replyDraft.trim() ? 'replied' : selectedItem.status,
      });
    }
  };

  return (
    <div className="admin-section">
      <header className="admin-section-header">
        <div>
          <p className="admin-eyebrow">Geri bildirim</p>
          <h1 className="admin-title">Görüş & Öneriler</h1>
          <p className="admin-subtitle">Tüm Akiyom uygulamalarından gelen görüş ve öneriler.</p>
        </div>
        <div className="admin-filter-row">
          <label className="admin-filter">
            <span>Uygulama</span>
            <AdminSelect value={appFilter} onChange={setAppFilter} options={appFilterOptions} aria-label="Uygulama filtresi" />
          </label>
          <label className="admin-filter">
            <span>Durum</span>
            <AdminSelect value={statusFilter} onChange={setStatusFilter} options={statusFilterOptions} aria-label="Durum filtresi" />
          </label>
        </div>
      </header>

      {error && <p className="admin-error">{error}</p>}

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <p>Henüz görüş/öneri yok veya filtreye uygun kayıt bulunamadı.</p>
        </div>
      ) : (
        <div className="admin-leads-grid">
          {filtered.map((item) => {
            const status = displayStatus(item);
            return (
              <article key={item.id} className={`admin-lead-card admin-lead-card-${status}`}>
                <div className="admin-lead-card-top">
                  <span className={`admin-status-pill admin-status-pill-${status}`}>
                    {FEEDBACK_STATUS_LABELS[status] || status}
                  </span>
                  <time className="admin-lead-date">{formatDate(item.created_at, true)}</time>
                </div>
                <p className="admin-feedback-app">
                  {item.app_name || item.app_code}
                  {item.app_version ? ` · v${item.app_version}` : ''}
                </p>
                <h2 className="admin-lead-name">{item.title || 'Başlıksız'}</h2>
                <p className="admin-lead-meta">
                  {item.contact_name || 'Anonim'}
                  {item.company_name ? ` · ${item.company_name}` : ''}
                </p>
                <p className="admin-lead-preview">{item.body}</p>
                {item.admin_reply && <p className="admin-lead-note">Yanıt: {item.admin_reply}</p>}
                {status === 'in_progress' && (
                  <p className="admin-feedback-in-progress">Kullanıcı uygulamada &quot;Yapım aşamasında&quot; görür</p>
                )}
                {item.image_path && <p className="admin-feedback-attachment">📎 Ek görsel var</p>}
                <div className="admin-lead-actions">
                  <button type="button" className="admin-link-button" onClick={() => openItem(item)}>
                    Detay
                  </button>
                  <AdminSelect
                    className="admin-select-inline"
                    value={status}
                    disabled={updatingId === item.id}
                    onChange={(nextStatus) => onStatusChange(item.id, nextStatus)}
                    options={STATUS_OPTIONS}
                    aria-label="Durum değiştir"
                  />
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selectedItem && (
        <div className="admin-modal-overlay" onClick={() => setSelectedItem(null)}>
          <motion.div
            className="admin-modal admin-modal-wide"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="admin-modal-close" onClick={() => setSelectedItem(null)} aria-label="Kapat">
              ×
            </button>
            <p className="admin-eyebrow">Görüş / Öneri Detayı</p>
            <h2 className="admin-modal-title">{selectedItem.title || 'Başlıksız'}</h2>
            <div className="admin-modal-meta">
              <span>{selectedItem.app_name || selectedItem.app_code}</span>
              {selectedItem.app_version && <span>v{selectedItem.app_version}</span>}
              <span>{formatDate(selectedItem.created_at, true)}</span>
            </div>
            <dl className="admin-detail-list">
              <div>
                <dt>Gönderen</dt>
                <dd>{selectedItem.contact_name || 'Belirtilmedi'}</dd>
              </div>
              {selectedItem.company_name && (
                <div>
                  <dt>Şirket</dt>
                  <dd>{selectedItem.company_name}</dd>
                </div>
              )}
              <div>
                <dt>Mesaj</dt>
                <dd className="admin-detail-description">{selectedItem.body}</dd>
              </div>
            </dl>

            {selectedItem.image_path && (
              <div className="admin-feedback-image-block">
                <p className="admin-label">Ek görsel</p>
                {imageLoading ? (
                  <p className="admin-muted">Görsel yükleniyor…</p>
                ) : imageUrl ? (
                  <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                    <img src={imageUrl} alt="Görüş eki" className="admin-feedback-image" />
                  </a>
                ) : (
                  <p className="admin-muted">Görsel yüklenemedi: {selectedItem.image_path}</p>
                )}
              </div>
            )}

            <div className="admin-notes-block">
              <label htmlFor="adminFeedbackReply" className="admin-label">
                Yanıtınız
              </label>
              <p className="admin-muted admin-reply-hint">
                Kullanıcıya ileteceğiniz yanıtı buraya yazın. Kaydettiğinizde durum otomatik &quot;Yanıtlandı&quot; olur.
              </p>
              <textarea
                id="adminFeedbackReply"
                className="admin-textarea"
                rows={4}
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                placeholder="Teşekkürler, önerinizi değerlendiriyoruz..."
              />
              {selectedItem.replied_at && (
                <p className="admin-muted">Son yanıt: {formatDate(selectedItem.replied_at, true)}</p>
              )}
              <button
                type="button"
                className="admin-submit-button"
                onClick={saveReply}
                disabled={updatingId === selectedItem.id}
              >
                Yanıtı kaydet
              </button>
            </div>

            <div className="admin-modal-actions">
              <div className="admin-feedback-status-block">
                <AdminSelect
                  value={displayStatus(selectedItem)}
                  disabled={updatingId === selectedItem.id}
                  onChange={(nextStatus) => {
                    onStatusChange(selectedItem.id, nextStatus);
                    setSelectedItem({ ...selectedItem, status: nextStatus });
                  }}
                  options={STATUS_OPTIONS}
                  aria-label="Durum değiştir"
                />
                <p className="admin-muted admin-feedback-public-preview">
                  Kullanıcıda görünen: <strong>{getFeedbackPublicStatus(displayStatus(selectedItem)).publicLabel}</strong>
                  {' — '}
                  {getFeedbackPublicStatus(displayStatus(selectedItem)).publicMessage}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
