import React from 'react';
import { formatDate } from '../../utils/adminStats';

const AdminMembers = ({ members }) => {
  const admins = members.filter((m) => m.is_admin === true);
  const users = members.filter((m) => !m.is_admin);

  return (
    <div className="admin-section">
      <header className="admin-section-header">
        <div>
          <p className="admin-eyebrow">Topluluk</p>
          <h1 className="admin-title">Üyeler</h1>
          <p className="admin-subtitle">Akiyom hesabı oluşturan tüm kullanıcılar.</p>
        </div>
      </header>

      <div className="admin-kpi-grid admin-kpi-grid-compact">
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Toplam üye</span>
          <strong className="admin-kpi-value">{members.length}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Yönetici</span>
          <strong className="admin-kpi-value">{admins.length}</strong>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-label">Standart üye</span>
          <strong className="admin-kpi-value">{users.length}</strong>
        </div>
      </div>

      <section className="admin-panel-card">
        <h2 className="admin-panel-title">Üye listesi</h2>
        {members.length === 0 ? (
          <p className="admin-muted">Henüz kayıtlı üye yok.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ad</th>
                  <th>E-posta</th>
                  <th>Rol</th>
                  <th>Kayıt</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.username || member.email?.split('@')[0] || '—'}</td>
                    <td>{member.email}</td>
                    <td>
                      {member.is_admin ? (
                        <span className="admin-status-pill admin-status-pill-contacted">Yönetici</span>
                      ) : (
                        <span className="admin-status-pill admin-status-pill-read">Üye</span>
                      )}
                    </td>
                    <td>{formatDate(member.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminMembers;
