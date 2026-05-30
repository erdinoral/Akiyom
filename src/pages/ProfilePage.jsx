import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/PageShell';
import { useAuth } from '../context/AuthContext';
import { usePageSeo } from '../utils/seo.js';

function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

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

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, profile, loading, isAuthenticated, isAdmin, signOut, refreshProfile, isConfigured } =
    useAuth();
  const [signingOut, setSigningOut] = useState(false);

  usePageSeo({
    title: 'Profil — Akiyom',
    description: 'Akiyom hesap profilinizi görüntüleyin ve yönetin.',
    path: '/profil',
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/giris', { replace: true, state: { from: '/profil' } });
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [isAuthenticated, refreshProfile]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    navigate('/', { replace: true });
  };

  if (!isConfigured) {
    return (
      <PageShell>
        <section className="profile-page">
          <div className="profile-card">
            <h1>Profil kullanılamıyor</h1>
            <p>Supabase yapılandırması eksik.</p>
          </div>
        </section>
      </PageShell>
    );
  }

  if (loading || !user) {
    return (
      <PageShell>
        <section className="profile-page">
          <div className="profile-card profile-card-loading">
            <div className="profile-loading-spinner" aria-label="Yükleniyor" />
          </div>
        </section>
      </PageShell>
    );
  }

  const displayName =
    profile?.username ||
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Akiyom Üyesi';

  return (
    <PageShell>
      <section className="profile-page">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="profile-header">
            <div className="profile-avatar-large">{getInitials(displayName, user.email)}</div>
            <div>
              <p className="profile-eyebrow">Hesabım</p>
              <h1 className="profile-title">{displayName}</h1>
              <p className="profile-email">{user.email}</p>
              {isAdmin && <span className="profile-admin-badge">Yönetici</span>}
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-detail-item">
              <span className="profile-detail-label">Üyelik durumu</span>
              <span className="profile-detail-value">Aktif</span>
            </div>
            <div className="profile-detail-item">
              <span className="profile-detail-label">Kayıt tarihi</span>
              <span className="profile-detail-value">
                {formatDate(profile?.updated_at || user.created_at)}
              </span>
            </div>
            <div className="profile-detail-item">
              <span className="profile-detail-label">Hesap türü</span>
              <span className="profile-detail-value">{isAdmin ? 'Yönetici' : 'Standart üye'}</span>
            </div>
          </div>

          <div className="profile-actions">
            {isAdmin && (
              <Link to="/panel" className="profile-button profile-button-primary">
                Yönetim Paneli
              </Link>
            )}
            <Link to="/" className="profile-button profile-button-secondary">
              Ana Sayfa
            </Link>
            <button
              type="button"
              className={`profile-button ${isAdmin ? 'profile-button-secondary' : 'profile-button-primary'}`}
              onClick={handleSignOut}
              disabled={signingOut}
            >
              {signingOut ? 'Çıkış yapılıyor...' : 'Çıkış Yap'}
            </button>
          </div>

          <p className="profile-note">
            Bu hesap tüm Akiyom ürün ve hizmetlerinde kullanılabilir.
            {isAdmin && ' Proje taleplerini admin panelinden yönetebilirsiniz.'}
          </p>
        </motion.div>
      </section>
    </PageShell>
  );
};

export default ProfilePage;
