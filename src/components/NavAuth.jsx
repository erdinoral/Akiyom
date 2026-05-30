import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

const NavAuth = () => {
  const { user, profile, loading, isAuthenticated, isAdmin, isConfigured } = useAuth();

  if (!isConfigured) {
    return null;
  }

  if (loading) {
    return <div className="nav-auth nav-auth-loading" aria-hidden="true" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="nav-auth">
        <Link to="/giris" className="nav-auth-link nav-auth-link-muted">
          Giriş
        </Link>
        <Link to="/kayit-ol" className="nav-auth-button">
          Kayıt Ol
        </Link>
      </div>
    );
  }

  const displayName =
    profile?.username ||
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Üye';

  return (
    <div className="nav-auth">
      {isAdmin && (
        <Link to="/panel" className="nav-auth-panel-button">
          Panel
        </Link>
      )}
      <Link to="/profil" className="nav-auth-profile" aria-label="Profil sayfasına git">
        <span className="nav-auth-avatar">{getInitials(displayName, user?.email)}</span>
        <span className="nav-auth-name">{displayName}</span>
        {isAdmin && <span className="nav-auth-badge">Admin</span>}
      </Link>
    </div>
  );
};

export default NavAuth;
