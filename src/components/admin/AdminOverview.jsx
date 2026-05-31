import React from 'react';
import { Link } from 'react-router-dom';
import {
  PROJECT_TYPE_LABELS,
  STATUS_LABELS,
  FEEDBACK_STATUS_LABELS,
  computeLeadStats,
  computeMarketingStats,
  computeFeedbackStats,
  computeAiInquiryStats,
  BILLING_PERIOD_LABELS,
  INQUIRY_STATUS_LABELS,
  formatCurrency,
  formatDate,
} from '../../utils/adminStats';

function StatCard({ label, value, hint, highlight }) {
  return (
    <div className={`admin-kpi-card${highlight ? ' admin-kpi-card-highlight' : ''}`}>
      <span className="admin-kpi-label">{label}</span>
      <strong className="admin-kpi-value">{value}</strong>
      {hint && <span className="admin-kpi-hint">{hint}</span>}
    </div>
  );
}

function MiniBarChart({ items, valueKey = 'count' }) {
  const max = Math.max(...items.map((i) => i[valueKey]), 1);
  return (
    <div className="admin-bar-chart">
      {items.map((item) => (
        <div key={item.label || item.date} className="admin-bar-row">
          <span className="admin-bar-label">{item.label}</span>
          <div className="admin-bar-track">
            <div
              className="admin-bar-fill"
              style={{ width: `${Math.max((item[valueKey] / max) * 100, item[valueKey] ? 8 : 0)}%` }}
            />
          </div>
          <span className="admin-bar-value">{item[valueKey]}</span>
        </div>
      ))}
    </div>
  );
}

const AdminOverview = ({ leads, members, marketing, feedback = [], aiInquiries = [] }) => {
  const leadStats = computeLeadStats(leads);
  const marketingStats = computeMarketingStats(marketing);
  const feedbackStats = computeFeedbackStats(feedback);
  const aiInquiryStats = computeAiInquiryStats(aiInquiries);

  return (
    <div className="admin-section">
      <header className="admin-section-header">
        <div>
          <p className="admin-eyebrow">Yönetim</p>
          <h1 className="admin-title">Genel Bakış</h1>
          <p className="admin-subtitle">Site, talepler ve pazarlama performansının özeti.</p>
        </div>
      </header>

      <div className="admin-kpi-grid">
        <StatCard label="Toplam talep" value={leadStats.total} hint={`${leadStats.new} yeni`} highlight />
        <StatCard
          label="AI ödeme iletişim"
          value={aiInquiryStats.total}
          hint={`${aiInquiryStats.new} yeni`}
        />
        <StatCard label="Görüş & öneri" value={feedbackStats.total} hint={`${feedbackStats.new} yeni`} />
        <StatCard label="Bu hafta" value={leadStats.thisWeek} hint="Son 7 gün" />
        <StatCard label="Kayıtlı üye" value={members.length} hint={`${members.filter((m) => m.is_admin).length} admin`} />
        <StatCard
          label="Reklam harcaması"
          value={formatCurrency(marketingStats.totals.spend)}
          hint={`${marketingStats.totals.conversions} dönüşüm`}
        />
        <StatCard label="Kapanma oranı" value={`%${leadStats.conversionRate}`} hint="Kapalı / toplam" />
        <StatCard label="Reklam CTR" value={`%${marketingStats.ctr}`} hint={`CPC: ${formatCurrency(marketingStats.cpc)}`} />
      </div>

      <div className="admin-two-col">
        <section className="admin-panel-card">
          <h2 className="admin-panel-title">Son 7 gün — talepler</h2>
          <MiniBarChart items={leadStats.last7Days} />
        </section>

        <section className="admin-panel-card">
          <h2 className="admin-panel-title">Talep durumları</h2>
          <MiniBarChart
            items={Object.entries(STATUS_LABELS).map(([key, label]) => ({
              label,
              count: leadStats.byStatus[key] || 0,
            }))}
          />
        </section>
      </div>

      <section className="admin-panel-card">
        <div className="admin-panel-card-head">
          <h2 className="admin-panel-title">Son proje talepleri</h2>
          <Link to="/panel?tab=leads" className="admin-text-link">
            Tümünü gör →
          </Link>
        </div>
        {leadStats.recent.length === 0 ? (
          <p className="admin-muted">Henüz talep yok.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ad</th>
                  <th>Tip</th>
                  <th>Durum</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {leadStats.recent.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.full_name}</td>
                    <td>{PROJECT_TYPE_LABELS[lead.project_type] || lead.project_type}</td>
                    <td>
                      <span className={`admin-status-pill admin-status-pill-${lead.status}`}>
                        {STATUS_LABELS[lead.status]}
                      </span>
                    </td>
                    <td>{formatDate(lead.created_at, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-panel-card">
        <div className="admin-panel-card-head">
          <h2 className="admin-panel-title">Son AI ödeme iletişimleri</h2>
          <Link to="/panel?tab=ai-inquiries" className="admin-text-link">
            Tümünü gör →
          </Link>
        </div>
        {aiInquiryStats.recent.length === 0 ? (
          <p className="admin-muted">Henüz Akiyom AI iletişim talebi yok.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ad</th>
                  <th>Paket</th>
                  <th>Durum</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {aiInquiryStats.recent.map((row) => (
                  <tr key={row.id}>
                    <td>{row.full_name}</td>
                    <td>
                      {row.plan_name || 'Genel'}
                      {row.billing_period
                        ? ` · ${BILLING_PERIOD_LABELS[row.billing_period] || row.billing_period}`
                        : ''}
                    </td>
                    <td>
                      <span className={`admin-status-pill admin-status-pill-${row.status}`}>
                        {INQUIRY_STATUS_LABELS[row.status]}
                      </span>
                    </td>
                    <td>{formatDate(row.created_at, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-panel-card">
        <div className="admin-panel-card-head">
          <h2 className="admin-panel-title">Son görüş & öneriler</h2>
          <Link to="/panel?tab=feedback" className="admin-text-link">
            Tümünü gör →
          </Link>
        </div>
        {feedbackStats.recent.length === 0 ? (
          <p className="admin-muted">Henüz görüş/öneri yok.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Uygulama</th>
                  <th>Başlık</th>
                  <th>Durum</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {feedbackStats.recent.map((item) => {
                  const status = item.status || 'new';
                  return (
                    <tr key={item.id}>
                      <td>{item.app_name || item.app_code}</td>
                      <td>{item.title || 'Başlıksız'}</td>
                      <td>
                        <span className={`admin-status-pill admin-status-pill-${status}`}>
                          {FEEDBACK_STATUS_LABELS[status] || status}
                        </span>
                      </td>
                      <td>{formatDate(item.created_at, true)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-panel-card admin-panel-card-info">
        <h2 className="admin-panel-title">Hızlı notlar</h2>
        <ul className="admin-checklist">
          <li>Görüş & öneriler uygulamalardan otomatik düşer — &quot;Görüş & Öneriler&quot; sekmesinden yönetilir.</li>
          <li>Proje talepleri formdan otomatik düşer — e-posta gönderilmez.</li>
          <li>Akiyom AI ödeme iletişimi &quot;AI Ödeme İletişim&quot; sekmesinde listelenir.</li>
          <li>Reklam metriklerini &quot;Reklam Analizi&quot; sekmesinden manuel ekleyebilirsiniz.</li>
          <li>Google Ads / GA4 API entegrasyonu ileride bu panele bağlanabilir.</li>
        </ul>
      </section>
    </div>
  );
};

export default AdminOverview;
