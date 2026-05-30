import React from 'react';
import {
  PROJECT_TYPE_LABELS,
  STATUS_LABELS,
  computeLeadStats,
  computeMarketingStats,
  formatCurrency,
} from '../../utils/adminStats';

function DistributionCard({ title, entries, labels }) {
  const total = Object.values(entries).reduce((a, b) => a + b, 0) || 1;
  return (
    <section className="admin-panel-card">
      <h2 className="admin-panel-title">{title}</h2>
      <div className="admin-distribution">
        {Object.entries(labels).map(([key, label]) => {
          const count = entries[key] || 0;
          const pct = Math.round((count / total) * 100);
          return (
            <div key={key} className="admin-distribution-row">
              <div className="admin-distribution-head">
                <span>{label}</span>
                <span>
                  {count} ({pct}%)
                </span>
              </div>
              <div className="admin-bar-track">
                <div className="admin-bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const AdminStatistics = ({ leads, members, marketing }) => {
  const leadStats = computeLeadStats(leads);
  const marketingStats = computeMarketingStats(marketing);

  return (
    <div className="admin-section">
      <header className="admin-section-header">
        <div>
          <p className="admin-eyebrow">Analiz</p>
          <h1 className="admin-title">İstatistikler</h1>
          <p className="admin-subtitle">Talep, üyelik ve dönüşüm metrikleri.</p>
        </div>
      </header>

      <div className="admin-kpi-grid">
        <div className="admin-kpi-card admin-kpi-card-highlight">
          <span className="admin-kpi-label">Toplam talep</span>
          <strong className="admin-kpi-value">{leadStats.total}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Bu ay</span>
          <strong className="admin-kpi-value">{leadStats.thisMonth}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Aktif pipeline</span>
          <strong className="admin-kpi-value">{leadStats.new + leadStats.read + leadStats.contacted}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Üye / talep oranı</span>
          <strong className="admin-kpi-value">
            {leadStats.total ? (members.length / leadStats.total).toFixed(1) : '—'}
          </strong>
        </div>
      </div>

      <div className="admin-two-col">
        <DistributionCard title="Proje tipine göre" entries={leadStats.byType} labels={PROJECT_TYPE_LABELS} />
        <DistributionCard title="Duruma göre" entries={leadStats.byStatus} labels={STATUS_LABELS} />
      </div>

      <section className="admin-panel-card">
        <h2 className="admin-panel-title">Haftalık talep trendi</h2>
        <div className="admin-trend-chart">
          {leadStats.last7Days.map((day) => {
            const max = Math.max(...leadStats.last7Days.map((d) => d.count), 1);
            const height = Math.max((day.count / max) * 100, day.count ? 12 : 4);
            return (
              <div key={day.date} className="admin-trend-col">
                <div className="admin-trend-bar-wrap">
                  <div className="admin-trend-bar" style={{ height: `${height}%` }} title={`${day.count} talep`} />
                </div>
                <span className="admin-trend-label">{day.label}</span>
                <span className="admin-trend-value">{day.count}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="admin-panel-card admin-panel-card-info">
        <h2 className="admin-panel-title">Pazarlama özeti (kayıtlı metrikler)</h2>
        <div className="admin-kpi-grid admin-kpi-grid-compact">
          <div className="admin-kpi-card">
            <span className="admin-kpi-label">Gösterim</span>
            <strong className="admin-kpi-value">{marketingStats.totals.impressions.toLocaleString('tr-TR')}</strong>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-label">Tıklama</span>
            <strong className="admin-kpi-value">{marketingStats.totals.clicks.toLocaleString('tr-TR')}</strong>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-label">Harcama</span>
            <strong className="admin-kpi-value">{formatCurrency(marketingStats.totals.spend)}</strong>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-label">Talep başı maliyet</span>
            <strong className="admin-kpi-value">
              {marketingStats.costPerLead === '—' ? '—' : formatCurrency(marketingStats.costPerLead)}
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminStatistics;
