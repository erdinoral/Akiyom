import React from 'react';
import { Link } from 'react-router-dom';

const FormMemberNotice = ({ isAuthenticated }) => (
  <div
    className={`form-member-notice${isAuthenticated ? ' form-member-notice--member' : ' form-member-notice--guest'}`}
  >
    {isAuthenticated ? (
      <>
        Üye olarak gönderdiğiniz talep{' '}
        <Link to="/profil" className="form-member-notice-link">
          Profilim → Gönderilen Mesajlar ve Talepler
        </Link>{' '}
        bölümünden takip edilir; ekibimiz yanıtladığında not burada görünür.
      </>
    ) : (
      <>
        E-posta ile de bilgilendirilirsiniz. Hızlı takip için{' '}
        <Link to="/kayit-ol" className="form-member-notice-link">
          üye olun
        </Link>
        ; gönderdiğiniz talepler profilinizden izlenebilir.
      </>
    )}
  </div>
);

export default FormMemberNotice;
