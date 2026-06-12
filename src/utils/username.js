export function normalizeUsername(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function validateUsername(value) {
  const username = normalizeUsername(value);

  if (!username) {
    return { ok: false, username: '', message: 'Kullanıcı adı zorunludur.' };
  }

  if (username.length < 3) {
    return { ok: false, username, message: 'Kullanıcı adı en az 3 karakter olmalıdır.' };
  }

  if (username.length > 24) {
    return { ok: false, username, message: 'Kullanıcı adı en fazla 24 karakter olabilir.' };
  }

  if (!/^[a-z][a-z0-9_]*$/.test(username)) {
    return {
      ok: false,
      username,
      message: 'Kullanıcı adı harf ile başlamalı; yalnızca harf, rakam ve alt çizgi içerebilir.',
    };
  }

  return { ok: true, username, message: '' };
}
