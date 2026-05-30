import React from 'react';

const SITE_URL = 'https://akiyom.com';

const DEFAULT = {
  title: 'Akiyom Studio | Web Sitesi & Uygulama Geliştirme — İstanbul',
  description:
    "İstanbul'da web sitesi, mobil uygulama ve ERP geliştirme. Kişisel site, kurumsal yazılım, CRM ve stok yönetimi. Akiyom Studio ile projenizi hayata geçirin.",
  path: '/',
};
function setMeta(attr, name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function canonicalUrl(path) {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Sayfa başlığı, açıklama, canonical ve sosyal meta günceller.
 * Cleanup fonksiyonu döner (unmount'ta varsayılanlara dönmek için).
 */
export function setPageSeo({ title, description, path = '/' }) {
  const prev = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? SITE_URL,
  };

  const url = canonicalUrl(path);

  document.title = title;
  setMeta('name', 'title', title);
  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', url);
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:url', url);

  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;

  return () => {
    document.title = prev.title;
    setMeta('name', 'description', prev.description);
    setMeta('name', 'title', prev.title);
    setMeta('property', 'og:title', prev.title);
    setMeta('property', 'og:description', prev.description);
    setMeta('property', 'og:url', prev.canonical);
    setMeta('name', 'twitter:title', prev.title);
    setMeta('name', 'twitter:description', prev.description);
    setMeta('name', 'twitter:url', prev.canonical);
    if (link) link.href = prev.canonical;
  };
}

export function injectJsonLd(id, data) {
  document.getElementById(id)?.remove();
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
  return () => document.getElementById(id)?.remove();
}

export { SITE_URL, DEFAULT };

/**
 * React hook — mount'ta SEO günceller, unmount'ta geri alır.
 */
export function usePageSeo({ title, description, path = '/' }) {
  React.useEffect(() => {
    return setPageSeo({ title, description, path });
  }, [title, description, path]);
}
