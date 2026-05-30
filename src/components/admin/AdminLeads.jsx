import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECT_TYPE_LABELS, STATUS_LABELS, formatDate } from '../../utils/adminStats';

const AdminLeads = ({ leads, onStatusChange, onNotesChange, updatingId, error }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');

  const filtered =
    statusFilter === 'all' ? leads : leads.filter((lead) => lead.status === statusFilter);

  const openLead = (lead) => {
    setSelectedLead(lead);
    setNotesDraft(lead.admin_notes || '');
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    await onNotesChange(selectedLead.id, notesDraft);
    setSelectedLead((prev) => (prev ? { ...prev, admin_notes: notesDraft } : prev));
  };

  return (
    <div className="admin-section">
      <header className="admin-section-header">
        <div>
          <p className="admin-eyebrow">Talepler</p>
          <h1 className="admin-title">Proje Talepleri</h1>
          <p className="admin-subtitle">&quot;Projenizi Anlatın&quot; formundan gelen tüm talepler.</p>
        </div>
        <label className="admin-filter">
          <span>Durum filtresi</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="admin-select">
            <option value="all">Tümü ({leads.length})</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </header>

      {error && <p className="admin-error">{error}</p>}

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <p>Henüz talep yok veya filtreye uygun kayıt bulunamadı.</p>
        </div>
      ) : (
        <div className="admin-leads-grid">
          {filtered.map((lead) => (
            <article key={lead.id} className={`admin-lead-card admin-lead-card-${lead.status}`}>
              <div className="admin-lead-card-top">
                <span className={`admin-status-pill admin-status-pill-${lead.status}`}>
                  {STATUS_LABELS[lead.status]}
                </span>
                <time className="admin-lead-date">{formatDate(lead.created_at, true)}</time>
              </div>
              <h2 className="admin-lead-name">{lead.full_name}</h2>
              <p className="admin-lead-meta">
                {PROJECT_TYPE_LABELS[lead.project_type] || lead.project_type}
                {lead.company_name ? ` · ${lead.company_name}` : ''}
              </p>
              <p className="admin-lead-email">{lead.email}</p>
              <p className="admin-lead-preview">{lead.project_description}</p>
              {lead.admin_notes && <p className="admin-lead-note">Not: {lead.admin_notes}</p>}
              <div className="admin-lead-actions">
                <button type="button" className="admin-link-button" onClick={() => openLead(lead)}>
                  Detay
                </button>
                <select
                  className="admin-select admin-select-inline"
                  value={lead.status}
                  disabled={updatingId === lead.id}
                  onChange={(e) => onStatusChange(lead.id, e.target.value)}
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedLead && (
        <div className="admin-modal-overlay" onClick={() => setSelectedLead(null)}>
          <motion.div
            className="admin-modal admin-modal-wide"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="admin-modal-close" onClick={() => setSelectedLead(null)} aria-label="Kapat">
              ×
            </button>
            <p className="admin-eyebrow">Talep Detayı</p>
            <h2 className="admin-modal-title">{selectedLead.full_name}</h2>
            <div className="admin-modal-meta">
              <span>{PROJECT_TYPE_LABELS[selectedLead.project_type]}</span>
              <span>{formatDate(selectedLead.created_at, true)}</span>
            </div>
            <dl className="admin-detail-list">
              <div>
                <dt>E-posta</dt>
                <dd>
                  <a href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a>
                </dd>
              </div>
              {selectedLead.company_name && (
                <div>
                  <dt>Şirket</dt>
                  <dd>{selectedLead.company_name}</dd>
                </div>
              )}
              <div>
                <dt>Proje detayı</dt>
                <dd className="admin-detail-description">{selectedLead.project_description}</dd>
              </div>
            </dl>

            <div className="admin-notes-block">
              <label htmlFor="adminNotes" className="admin-label">
                Dahili not
              </label>
              <textarea
                id="adminNotes"
                className="admin-textarea"
                rows={4}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Teklif notları, görüşme özeti..."
              />
              <button type="button" className="admin-submit-button" onClick={saveNotes} disabled={updatingId === selectedLead.id}>
                Notu kaydet
              </button>
            </div>

            <div className="admin-modal-actions">
              <select
                className="admin-select"
                value={selectedLead.status}
                disabled={updatingId === selectedLead.id}
                onChange={(e) => {
                  onStatusChange(selectedLead.id, e.target.value);
                  setSelectedLead({ ...selectedLead, status: e.target.value });
                }}
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <a href={`mailto:${selectedLead.email}`} className="admin-submit-button">
                E-posta gönder
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
