import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProfileDisplayName } from '../../utils/profileDisplayName';

const NAV_ITEMS = [
  { id: 'overview', label: 'Genel Bakış', icon: '◈' },
  { id: 'leads', label: 'Proje Talepleri', icon: '✉' },
  { id: 'ai-inquiries', label: 'AI Ödeme İletişim', icon: '◇' },
  { id: 'feedback', label: 'Görüş & Öneriler', icon: '💬' },
  { id: 'members', label: 'Üyeler', icon: '👤' },
  { id: 'statistics', label: 'İstatistikler', icon: '▤' },
  { id: 'marketing', label: 'Reklam Analizi', icon: '◎' },
  { id: 'blog', label: 'Blog & Haberler', icon: '✎' },
];

const AdminLayout = ({
  activeTab,
  onTabChange,
  newLeadsCount,
  newAiInquiriesCount = 0,
  newFeedbackCount,
  children,
  onRefresh,
  refreshing,
  editorOnly = false,
}) => {
  const { profile, user } = useAuth();
  const displayName = getProfileDisplayName(user, profile) || 'Admin';
  const navItems = editorOnly ? NAV_ITEMS.filter((item) => item.id === 'blog') : NAV_ITEMS;

  return (
    <div className="akiyom-landing admin-layout-root">
      <div className="background-base-layer" />
      <div className="background-effects-layer">
        <div className="light-refraction light-1" />
        <div className="light-refraction light-2" />
      </div>
      <div className="content-safety-layer" />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">
            <Link to="/" className="admin-sidebar-logo">
              <span className="nav-logo-a">A</span>
            </Link>
            <div>
              <p className="admin-sidebar-title">{editorOnly ? 'İçerik Paneli' : 'Akiyom Panel'}</p>
              <p className="admin-sidebar-user">{displayName}</p>
            </div>
          </div>

          <nav className="admin-sidebar-nav" aria-label="Admin menü">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-sidebar-link${activeTab === item.id ? ' admin-sidebar-link-active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <span className="admin-sidebar-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
                {item.id === 'leads' && newLeadsCount > 0 && (
                  <span className="admin-sidebar-badge">{newLeadsCount}</span>
                )}
                {item.id === 'ai-inquiries' && newAiInquiriesCount > 0 && (
                  <span className="admin-sidebar-badge">{newAiInquiriesCount}</span>
                )}
                {item.id === 'feedback' && newFeedbackCount > 0 && (
                  <span className="admin-sidebar-badge">{newFeedbackCount}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <button type="button" className="admin-sidebar-link" onClick={onRefresh} disabled={refreshing}>
              {refreshing ? 'Yenileniyor...' : '↻ Verileri yenile'}
            </button>
            <Link to="/profil" className="admin-sidebar-link admin-sidebar-link-muted">
              Profil
            </Link>
            <Link to="/" className="admin-sidebar-link admin-sidebar-link-muted">
              Siteye dön
            </Link>
          </div>
        </aside>

        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
};

export { NAV_ITEMS };
export default AdminLayout;
