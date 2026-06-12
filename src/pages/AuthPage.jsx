import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/PageShell';
import { useAuth, isAdminEmail } from '../context/AuthContext';
import { isUsernameAvailable } from '../lib/supabase';
import { normalizeUsername, validateUsername } from '../utils/username';
import { usePageSeo } from '../utils/seo.js';

const AuthPage = ({ mode = 'register' }) => {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, isAuthenticated, isAdmin, isConfigured, loading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  usePageSeo({
    title: isLogin
      ? 'Giriş Yap — Akiyom'
      : 'Kayıt Ol — Akiyom',
    description: isLogin
      ? 'Akiyom hesabınıza giriş yapın. Tek hesapla tüm Akiyom ürün ve hizmetlerine erişin.'
      : 'Akiyom hesabı oluşturun. Tek üyelikle tüm Akiyom ekosistemine katılın.',
    path: location.pathname,
  });

  useEffect(() => {
    if (!loading && isAuthenticated) {
      const target = location.state?.from || (isAdmin ? '/panel' : '/profil');
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, isAdmin, loading, navigate, location.state?.from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('E-posta ve şifre zorunludur.');
      return;
    }

    if (!isLogin && password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    if (!isLogin && !fullName.trim()) {
      setError('Ad soyad zorunludur.');
      return;
    }

    let normalizedUsername = '';
    if (!isLogin) {
      const usernameCheck = validateUsername(username);
      if (!usernameCheck.ok) {
        setError(usernameCheck.message);
        return;
      }
      normalizedUsername = usernameCheck.username;

      const { available, error: availabilityError } = await isUsernameAvailable(normalizedUsername);
      if (availabilityError) {
        setError('Kullanıcı adı kontrol edilemedi. Lütfen tekrar deneyin.');
        return;
      }
      if (!available) {
        setError('Bu kullanıcı adı zaten alınmış.');
        return;
      }
    }

    setSubmitting(true);

    try {
      if (isLogin) {
        const { error: signInError } = await signIn({ email: email.trim(), password });
        if (signInError) {
          setError(
            signInError.message === 'Invalid login credentials'
              ? 'E-posta veya şifre hatalı.'
              : signInError.message
          );
          return;
        }
        navigate(location.state?.from || (isAdminEmail(email) ? '/panel' : '/profil'), { replace: true });
        return;
      }

      const { data, error: signUpError } = await signUp({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        username: normalizedUsername,
      });

      if (signUpError) {
        setError(
          /duplicate|unique/i.test(signUpError.message || '')
            ? 'Bu kullanıcı adı zaten alınmış.'
            : signUpError.message
        );
        return;
      }

      if (data?.session) {
        navigate('/profil', { replace: true });
        return;
      }

      setSuccess('Hesabınız oluşturuldu. E-posta doğrulaması gerekiyorsa gelen kutunuzu kontrol edin.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isConfigured) {
    return (
      <PageShell>
        <section className="auth-page">
          <div className="auth-card">
            <h1 className="auth-title">Üyelik henüz aktif değil</h1>
            <p className="auth-subtitle">
              Supabase bağlantı bilgileri eksik. Vercel veya .env dosyasında{' '}
              <code>VITE_SUPABASE_URL</code> ve <code>VITE_SUPABASE_ANON_KEY</code> tanımlayın.
            </p>
            <Link to="/" className="auth-submit-button">
              Ana Sayfaya Dön
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="auth-page">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="auth-card-header">
            <p className="auth-eyebrow">Akiyom Hesabı</p>
            <h1 className="auth-title">{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h1>
            <p className="auth-subtitle">
              {isLogin
                ? 'Tek hesapla Akiyom ürün ve hizmetlerine devam edin.'
                : 'Tek üyelikle tüm Akiyom ekosistemine katılın.'}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="fullName" className="auth-label">
                  Ad Soyad
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="auth-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  autoComplete="name"
                />
              </div>
            )}

            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="username" className="auth-label">
                  Kullanıcı adı
                </label>
                <input
                  id="username"
                  type="text"
                  className="auth-input"
                  value={username}
                  onChange={(e) => setUsername(normalizeUsername(e.target.value))}
                  placeholder="ornek_kullanici"
                  autoComplete="username"
                  spellCheck={false}
                />
                <p className="auth-field-hint">3–24 karakter; harf, rakam ve alt çizgi. Harf ile başlamalı.</p>
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="email" className="auth-label">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isLogin ? 'Şifreniz' : 'En az 6 karakter'}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
            </div>

            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="confirmPassword" className="auth-label">
                  Şifre Tekrar
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="auth-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Şifrenizi tekrar girin"
                  autoComplete="new-password"
                />
              </div>
            )}

            {error && (
              <p className="auth-message auth-message-error" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="auth-message auth-message-success" role="status">
                {success}
              </p>
            )}

            <button type="submit" className="auth-submit-button" disabled={submitting}>
              {submitting ? 'İşleniyor...' : isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? (
              <>
                Hesabınız yok mu? <Link to="/kayit-ol">Kayıt olun</Link>
              </>
            ) : (
              <>
                Zaten hesabınız var mı? <Link to="/giris">Giriş yapın</Link>
              </>
            )}
          </p>
        </motion.div>
      </section>
    </PageShell>
  );
};

export default AuthPage;
