import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { id: 'overview', label: 'Genel Bakış', icon: '◈' },
  { id: 'leads', label: 'Proje Talepleri', icon: '✉' },
  { id: 'members', label: 'Üyeler', icon: '👤' },
  { id: 'statistics', label: 'İstatistikler', icon: '▤' },
  { id: 'marketing', label: 'Reklam Analizi', icon: '◎' },
];

const AdminLayout = ({ activeTab, onTabChange, newLeadsCount, children, onRefresh, refreshing }) => {
  const { profile, user } = useAuth();
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Admin';

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
              <p className="admin-sidebar-title">Akiyom Panel</p>
              <p className="admin-sidebar-user">{displayName}</p>
            </div>
          </div>

          <nav className="admin-sidebar-nav" aria-label="Admin menü">
            {NAV_ITEMS.map((item) => (
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
