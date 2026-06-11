import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfileDisplayName } from '../utils/profileDisplayName';

function getInitials(name, email) {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  return email?.slice(0, 2).toUpperCase() || 'AK';
}

const NavAuth = ({ layout = 'inline', onNavigate }) => {
  const navigate = useNavigate();
  const { user, profile, loading, isAuthenticated, isAdmin, isConfigured } = useAuth();
  const stacked = layout === 'stacked';

  const handleStackedNav = (to) => (event) => {
    event.preventDefault();
    navigate(to);
    onNavigate?.();
  };

  if (!isConfigured) {
    return null;
  }

  if (loading) {
    return <div className={`nav-auth nav-auth-loading${stacked ? ' nav-auth-stacked' : ''}`} aria-hidden="true" />;
  }

  if (!isAuthenticated) {
    return (
      <div className={`nav-auth${stacked ? ' nav-auth-stacked' : ''}`}>
        {stacked ? (
          <>
            <a href="/giris" className="nav-auth-link" onClick={handleStackedNav('/giris')}>
              Giriş
            </a>
            <a href="/kayit-ol" className="nav-auth-button" onClick={handleStackedNav('/kayit-ol')}>
              Kayıt Ol
            </a>
          </>
        ) : (
          <>
            <Link to="/giris" className="nav-auth-link nav-auth-link-muted">
              Giriş
            </Link>
            <Link to="/kayit-ol" className="nav-auth-button">
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    );
  }

  const displayName = getProfileDisplayName(user, profile);

  return (
    <div className={`nav-auth${stacked ? ' nav-auth-stacked' : ''}`}>
      {isAdmin &&
        (stacked ? (
          <a href="/panel" className="nav-auth-panel-button" onClick={handleStackedNav('/panel')}>
            Panel
          </a>
        ) : (
          <Link to="/panel" className="nav-auth-panel-button">
            Panel
          </Link>
        ))}
      {stacked ? (
        <a
          href="/profil"
          className="nav-auth-profile"
          aria-label="Profil sayfasına git"
          onClick={handleStackedNav('/profil')}
        >
          <span className="nav-auth-avatar">{getInitials(displayName, user?.email)}</span>
          <span className="nav-auth-name">{displayName}</span>
          {isAdmin && <span className="nav-auth-badge">Admin</span>}
        </a>
      ) : (
        <Link to="/profil" className="nav-auth-profile" aria-label="Profil sayfasına git">
          <span className="nav-auth-avatar">{getInitials(displayName, user?.email)}</span>
          <span className="nav-auth-name">{displayName}</span>
          {isAdmin && <span className="nav-auth-badge">Admin</span>}
        </Link>
      )}
    </div>
  );
};

export default NavAuth;
