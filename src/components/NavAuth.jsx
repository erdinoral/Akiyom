import React from 'react';
import { Link } from 'react-router-dom';
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
  const { user, profile, loading, isAuthenticated, isAdmin, isConfigured } = useAuth();
  const stacked = layout === 'stacked';

  if (!isConfigured) {
    return null;
  }

  if (loading) {
    return <div className={`nav-auth nav-auth-loading${stacked ? ' nav-auth-stacked' : ''}`} aria-hidden="true" />;
  }

  if (!isAuthenticated) {
    return (
      <div className={`nav-auth${stacked ? ' nav-auth-stacked' : ''}`}>
        <Link
          to="/giris"
          className={`nav-auth-link${stacked ? '' : ' nav-auth-link-muted'}`}
          onClick={onNavigate}
        >
          Giriş
        </Link>
        <Link to="/kayit-ol" className="nav-auth-button" onClick={onNavigate}>
          Kayıt Ol
        </Link>
      </div>
    );
  }

  const displayName = getProfileDisplayName(user, profile);

  return (
    <div className={`nav-auth${stacked ? ' nav-auth-stacked' : ''}`}>
      {isAdmin && (
        <Link to="/panel" className="nav-auth-panel-button" onClick={onNavigate}>
          Panel
        </Link>
      )}
      <Link
        to="/profil"
        className="nav-auth-profile"
        aria-label="Profil sayfasına git"
        onClick={onNavigate}
      >
        <span className="nav-auth-avatar">{getInitials(displayName, user?.email)}</span>
        <span className="nav-auth-name">{displayName}</span>
        {isAdmin && <span className="nav-auth-badge">Admin</span>}
      </Link>
    </div>
  );
};

export default NavAuth;
