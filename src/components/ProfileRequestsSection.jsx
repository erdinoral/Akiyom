import React, { useEffect, useState } from 'react';
import { fetchMyMemberRequests, MEMBER_REQUEST_STATUS_LABELS } from '../utils/memberRequests';

function formatDateTime(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

const ProfileRequestsSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    fetchMyMemberRequests().then(({ data, error: fetchError }) => {
      if (!mounted) return;
      if (fetchError) {
        setError('Talepler yüklenemedi. Supabase’de member_requests.sql dosyasını çalıştırdığınızdan emin olun.');
        setItems([]);
      } else {
        setItems(data ?? []);
        setError('');
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="profile-requests" aria-labelledby="profile-requests-title">
      <div className="profile-requests-header">
        <h2 id="profile-requests-title" className="profile-requests-title">
          Gönderilen Mesajlar ve Talepler
        </h2>
        <p className="profile-requests-subtitle">
          Projenizi Anlatın ve Akiyom AI iletişim formlarından gönderdiğiniz talepler burada listelenir.
        </p>
      </div>

      {loading ? (
        <div className="profile-requests-loading">
          <div className="profile-loading-spinner" aria-label="Talepler yükleniyor" />
        </div>
      ) : error ? (
        <p className="profile-requests-error" role="alert">
          {error}
        </p>
      ) : items.length === 0 ? (
        <p className="profile-requests-empty">
          Henüz kayıtlı bir talebiniz yok. Ana sayfadaki &quot;Projenizi Anlatın&quot; veya Akiyom AI sayfasından
          iletişim formu gönderdiğinizde burada görünür.
        </p>
      ) : (
        <div className="profile-requests-list">
          {items.map((item) => (
            <article key={`${item.kind}-${item.id}`} className="profile-request-card">
              <div className="profile-request-card-head">
                <div>
                  <span className={`profile-request-kind profile-request-kind--${item.kind}`}>
                    {item.kind === 'project' ? 'Proje talebi' : 'Akiyom AI'}
                  </span>
                  <h3 className="profile-request-card-title">{item.title}</h3>
                  {item.subtitle && <p className="profile-request-card-subtitle">{item.subtitle}</p>}
                </div>
                <span className={`profile-request-status profile-request-status--${item.status}`}>
                  {MEMBER_REQUEST_STATUS_LABELS[item.status] || item.status}
                </span>
              </div>

              <time className="profile-request-date" dateTime={item.createdAt}>
                {formatDateTime(item.createdAt)}
              </time>

              <div className="profile-request-message">
                <span className="profile-request-label">Gönderdiğiniz mesaj</span>
                <p>{item.message}</p>
              </div>

              {item.adminNotes?.trim() && (
                <div className="profile-request-reply">
                  <span className="profile-request-label">Ekibimizden not</span>
                  <p>{item.adminNotes.trim()}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProfileRequestsSection;
