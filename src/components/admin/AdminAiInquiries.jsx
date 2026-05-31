import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  INQUIRY_STATUS_LABELS,
  BILLING_PERIOD_LABELS,
  formatDate,
} from '../../utils/adminStats';
import AdminSelect from './AdminSelect';

const STATUS_OPTIONS = Object.entries(INQUIRY_STATUS_LABELS).map(([value, label]) => ({ value, label }));

const AdminAiInquiries = ({ inquiries, onStatusChange, onNotesChange, updatingId, error }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');

  const statusFilterOptions = useMemo(
    () => [{ value: 'all', label: `Tümü (${inquiries.length})` }, ...STATUS_OPTIONS],
    [inquiries.length]
  );

  const filtered =
    statusFilter === 'all' ? inquiries : inquiries.filter((row) => row.status === statusFilter);

  const openDetail = (row) => {
    setSelected(row);
    setNotesDraft(row.admin_notes || '');
  };

  const saveNotes = async () => {
    if (!selected) return;
    await onNotesChange(selected.id, notesDraft);
    setSelected((prev) => (prev ? { ...prev, admin_notes: notesDraft } : prev));
  };

  return (
    <div className="admin-section">
      <header className="admin-section-header">
        <div>
          <p className="admin-eyebrow">Akiyom AI</p>
          <h1 className="admin-title">Ödeme & Teklif İletişimi</h1>
          <p className="admin-subtitle">
            Akiyom AI sayfasındaki &quot;Ödeme için iletişime geçin&quot; formundan gelen talepler.
          </p>
        </div>
        <label className="admin-filter">
          <span>Durum filtresi</span>
          <AdminSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusFilterOptions}
            aria-label="Durum filtresi"
          />
        </label>
      </header>

      {error && <p className="admin-error">{error}</p>}

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <p>Henüz Akiyom AI iletişim talebi yok veya filtreye uygun kayıt bulunamadı.</p>
        </div>
      ) : (
        <div className="admin-leads-grid">
          {filtered.map((row) => (
            <article key={row.id} className={`admin-lead-card admin-lead-card-${row.status}`}>
              <div className="admin-lead-card-top">
                <span className={`admin-status-pill admin-status-pill-${row.status}`}>
                  {INQUIRY_STATUS_LABELS[row.status]}
                </span>
                <time className="admin-lead-date">{formatDate(row.created_at, true)}</time>
              </div>
              <h2 className="admin-lead-name">{row.full_name}</h2>
              <p className="admin-lead-meta">
                {row.plan_name || 'Genel teklif'}
                {row.billing_period
                  ? ` · ${BILLING_PERIOD_LABELS[row.billing_period] || row.billing_period}`
                  : ''}
                {row.company_name ? ` · ${row.company_name}` : ''}
              </p>
              <p className="admin-lead-email">{row.email}</p>
              {row.phone && <p className="admin-lead-preview">Tel: {row.phone}</p>}
              <p className="admin-lead-preview">{row.message}</p>
              {row.admin_notes && <p className="admin-lead-note">Not: {row.admin_notes}</p>}
              <div className="admin-lead-actions">
                <button type="button" className="admin-link-button" onClick={() => openDetail(row)}>
                  Detay
                </button>
                <AdminSelect
                  className="admin-select-inline"
                  value={row.status}
                  disabled={updatingId === row.id}
                  onChange={(nextStatus) => onStatusChange(row.id, nextStatus)}
                  options={STATUS_OPTIONS}
                  aria-label="Durum değiştir"
                />
              </div>
            </article>
          ))}
        </div>
      )}

      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <motion.div
            className="admin-modal admin-modal-wide"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Kapat"
            >
              ×
            </button>
            <p className="admin-eyebrow">Akiyom AI İletişim</p>
            <h2 className="admin-modal-title">{selected.full_name}</h2>
            <div className="admin-modal-meta">
              <span>{selected.plan_name || 'Genel teklif'}</span>
              {selected.billing_period && (
                <span>{BILLING_PERIOD_LABELS[selected.billing_period]}</span>
              )}
              <span>{formatDate(selected.created_at, true)}</span>
            </div>
            <dl className="admin-detail-list">
              <div>
                <dt>E-posta</dt>
                <dd>
                  <a href={`mailto:${selected.email}`}>{selected.email}</a>
                </dd>
              </div>
              {selected.phone && (
                <div>
                  <dt>Telefon</dt>
                  <dd>
                    <a href={`tel:${selected.phone.replace(/\s/g, '')}`}>{selected.phone}</a>
                  </dd>
                </div>
              )}
              {selected.company_name && (
                <div>
                  <dt>Şirket</dt>
                  <dd>{selected.company_name}</dd>
                </div>
              )}
              <div>
                <dt>Mesaj</dt>
                <dd className="admin-detail-description">{selected.message}</dd>
              </div>
            </dl>

            <div className="admin-notes-block">
              <label htmlFor="adminAiInquiryNotes" className="admin-label">
                Dahili not
              </label>
              <textarea
                id="adminAiInquiryNotes"
                className="admin-textarea"
                rows={4}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Teklif, ödeme planı, görüşme notları..."
              />
              <button
                type="button"
                className="admin-submit-button"
                onClick={saveNotes}
                disabled={updatingId === selected.id}
              >
                Notu kaydet
              </button>
            </div>

            <div className="admin-modal-actions">
              <AdminSelect
                value={selected.status}
                disabled={updatingId === selected.id}
                onChange={(nextStatus) => {
                  onStatusChange(selected.id, nextStatus);
                  setSelected({ ...selected, status: nextStatus });
                }}
                options={STATUS_OPTIONS}
                aria-label="Durum değiştir"
              />
              <a href={`mailto:${selected.email}`} className="admin-submit-button">
                E-posta gönder
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminAiInquiries;
