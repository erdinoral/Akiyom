import React, { useState } from 'react';
import {
  PLATFORM_LABELS,
  computeMarketingStats,
  formatCurrency,
  formatDate,
} from '../../utils/adminStats';
import AdminSelect from './AdminSelect';

const PLATFORM_OPTIONS = Object.entries(PLATFORM_LABELS).map(([value, label]) => ({ value, label }));

const EMPTY_FORM = {
  recorded_date: new Date().toISOString().slice(0, 10),
  platform: 'google_ads',
  campaign_name: '',
  impressions: '',
  clicks: '',
  spend_try: '',
  conversions: '',
  notes: '',
};

const AdminMarketing = ({ marketing, onAddMetric, onDeleteMetric, saving, error }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const stats = computeMarketingStats(marketing);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onAddMetric({
      recorded_date: form.recorded_date,
      platform: form.platform,
      campaign_name: form.campaign_name.trim(),
      impressions: Number(form.impressions) || 0,
      clicks: Number(form.clicks) || 0,
      spend_try: Number(form.spend_try) || 0,
      conversions: Number(form.conversions) || 0,
      notes: form.notes.trim() || null,
    });
    if (ok) setForm(EMPTY_FORM);
  };

  return (
    <div className="admin-section">
      <header className="admin-section-header">
        <div>
          <p className="admin-eyebrow">Pazarlama</p>
          <h1 className="admin-title">Reklam Analizi</h1>
          <p className="admin-subtitle">
            Kampanya metriklerini takip edin. Google Ads API bağlanana kadar manuel giriş yapabilirsiniz.
          </p>
        </div>
      </header>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-kpi-grid">
        <div className="admin-kpi-card admin-kpi-card-highlight">
          <span className="admin-kpi-label">Toplam harcama</span>
          <strong className="admin-kpi-value">{formatCurrency(stats.totals.spend)}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Tıklama (CTR %{stats.ctr})</span>
          <strong className="admin-kpi-value">{stats.totals.clicks.toLocaleString('tr-TR')}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Gösterim</span>
          <strong className="admin-kpi-value">{stats.totals.impressions.toLocaleString('tr-TR')}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Dönüşüm / talep</span>
          <strong className="admin-kpi-value">{stats.totals.conversions}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Ort. tıklama maliyeti</span>
          <strong className="admin-kpi-value">{formatCurrency(stats.cpc)}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Dönüşüm maliyeti</span>
          <strong className="admin-kpi-value">
            {stats.costPerLead === '—' ? '—' : formatCurrency(stats.costPerLead)}
          </strong>
        </div>
      </div>

      <div className="admin-two-col">
        <section className="admin-panel-card">
          <h2 className="admin-panel-title">Platforma göre harcama</h2>
          {Object.keys(stats.byPlatform).length === 0 ? (
            <p className="admin-muted">Henüz reklam kaydı yok.</p>
          ) : (
            <div className="admin-distribution">
              {Object.entries(stats.byPlatform).map(([platform, data]) => (
                <div key={platform} className="admin-distribution-row">
                  <div className="admin-distribution-head">
                    <span>{PLATFORM_LABELS[platform] || platform}</span>
                    <span>{formatCurrency(data.spend)}</span>
                  </div>
                  <p className="admin-muted admin-muted-inline">
                    {data.clicks} tık · {data.conversions} dönüşüm
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="admin-panel-card">
          <h2 className="admin-panel-title">Yeni metrik ekle</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-row">
              <label className="admin-field">
                <span>Tarih</span>
                <input
                  type="date"
                  className="admin-input"
                  value={form.recorded_date}
                  onChange={(e) => setForm({ ...form, recorded_date: e.target.value })}
                  required
                />
              </label>
              <label className="admin-field">
                <span>Platform</span>
                <AdminSelect
                  value={form.platform}
                  onChange={(platform) => setForm({ ...form, platform })}
                  options={PLATFORM_OPTIONS}
                  aria-label="Platform seç"
                />
              </label>
            </div>
            <label className="admin-field">
              <span>Kampanya adı</span>
              <input
                type="text"
                className="admin-input"
                value={form.campaign_name}
                onChange={(e) => setForm({ ...form, campaign_name: e.target.value })}
                placeholder="Örn: ERP - Google Arama"
              />
            </label>
            <div className="admin-form-row admin-form-row-4">
              <label className="admin-field">
                <span>Gösterim</span>
                <input type="number" min="0" className="admin-input" value={form.impressions} onChange={(e) => setForm({ ...form, impressions: e.target.value })} />
              </label>
              <label className="admin-field">
                <span>Tıklama</span>
                <input type="number" min="0" className="admin-input" value={form.clicks} onChange={(e) => setForm({ ...form, clicks: e.target.value })} />
              </label>
              <label className="admin-field">
                <span>Harcama (₺)</span>
                <input type="number" min="0" step="0.01" className="admin-input" value={form.spend_try} onChange={(e) => setForm({ ...form, spend_try: e.target.value })} />
              </label>
              <label className="admin-field">
                <span>Dönüşüm</span>
                <input type="number" min="0" className="admin-input" value={form.conversions} onChange={(e) => setForm({ ...form, conversions: e.target.value })} />
              </label>
            </div>
            <label className="admin-field">
              <span>Not</span>
              <textarea className="admin-textarea" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </label>
            <button type="submit" className="admin-submit-button" disabled={saving}>
              {saving ? 'Kaydediliyor...' : 'Metrik kaydet'}
            </button>
          </form>
        </section>
      </div>

      <section className="admin-panel-card">
        <h2 className="admin-panel-title">Kayıt geçmişi</h2>
        {marketing.length === 0 ? (
          <p className="admin-muted">Reklam vermeye başladığınızda haftalık sonuçları buraya işleyin.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Platform</th>
                  <th>Kampanya</th>
                  <th>Gösterim</th>
                  <th>Tık</th>
                  <th>Harcama</th>
                  <th>Dönüşüm</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {marketing.map((row) => (
                  <tr key={row.id}>
                    <td>{formatDate(row.recorded_date)}</td>
                    <td>{PLATFORM_LABELS[row.platform] || row.platform}</td>
                    <td>{row.campaign_name || '—'}</td>
                    <td>{row.impressions}</td>
                    <td>{row.clicks}</td>
                    <td>{formatCurrency(row.spend_try)}</td>
                    <td>{row.conversions}</td>
                    <td>
                      <button type="button" className="admin-text-link admin-text-link-danger" onClick={() => onDeleteMetric(row.id)}>
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-panel-card admin-panel-card-info">
        <h2 className="admin-panel-title">İleride eklenecek entegrasyonlar</h2>
        <ul className="admin-checklist">
          <li>Google Analytics 4 — site trafiği ve kaynak analizi</li>
          <li>Google Ads API — otomatik kampanya verisi çekme</li>
          <li>Form dönüşümü ↔ reklam kampanyası eşleştirme</li>
        </ul>
      </section>
    </div>
  );
};

export default AdminMarketing;
