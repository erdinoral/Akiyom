import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/PageShell.jsx';
import BlogEditorSection from '../components/BlogEditorSection.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchPublishedPosts, verifyBlogEditorAccess } from '../lib/blogClient.js';
import { BLOG_TYPE_LABELS } from '../utils/blogUtils.js';
import { formatDate } from '../utils/adminStats.js';
import { setPageSeo } from '../utils/seo.js';
import '../../AkiyomLanding.css';

const ease = [0.25, 0.1, 0.25, 1];
const FILTERS = [
  { value: 'all', label: 'Tümü' },
  { value: 'blog', label: 'Blog' },
  { value: 'haber', label: 'Haberler' },
];

function BlogCard({ post, index }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease } }}
    >
      <Link to={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-media">
          <span className="blog-card-badge">{BLOG_TYPE_LABELS[post.post_type] || post.post_type}</span>
          {post.cover_image_url && !imageFailed ? (
            <img
              src={post.cover_image_url}
              alt=""
              className="blog-card-image"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="blog-card-placeholder" aria-hidden="true">
              {post.title.slice(0, 1)}
            </div>
          )}
        </div>
        <div className="blog-card-body">
          <time className="blog-card-date">{formatDate(post.published_at || post.created_at, true)}</time>
          <h2 className="blog-card-title">{post.title}</h2>
          {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
          <span className="blog-card-cta">Devamını oku →</span>
        </div>
      </Link>
    </motion.article>
  );
}

const BlogPage = () => {
  const { canManageBlog, needsBlogSetup, loading: authLoading, user, isAuthenticated, refreshProfile } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [reloadKey, setReloadKey] = useState(0);
  const [blogAccessOk, setBlogAccessOk] = useState(false);
  const [editorOpen, setEditorOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).has('edit');
  });

  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [isAuthenticated, refreshProfile]);

  useEffect(() => {
    if (!isAuthenticated || authLoading) {
      setBlogAccessOk(false);
      return undefined;
    }

    let cancelled = false;

    async function checkAccess() {
      const { ok } = await verifyBlogEditorAccess();
      if (!cancelled) setBlogAccessOk(ok);
    }

    checkAccess();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, authLoading, user?.id]);

  useEffect(() => {
    return setPageSeo({
      title: 'Blog & Haberler — Akiyom',
      description: 'Akiyom blog yazıları, ürün haberleri ve duyurular.',
      path: '/blog',
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      setLoading(true);
      setError('');
      const { data, error: fetchError } = await fetchPublishedPosts();
      if (cancelled) return;

      if (fetchError) {
        setError('Yazılar yüklenemedi. Daha sonra tekrar deneyin.');
        setPosts([]);
      } else {
        setPosts(data ?? []);
      }
      setLoading(false);
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') return posts;
    return posts.filter((post) => post.post_type === activeFilter);
  }, [posts, activeFilter]);

  return (
    <PageShell>
      <section className="blog-page">
        <div className="blog-page-container">
          <motion.header
            className="blog-page-header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h1 className="blog-page-title">Blog & Haberler</h1>
            <p className="blog-page-subtitle">
              Ürün güncellemeleri, duyurular ve Akiyom ekibinden yazılar.
            </p>

            <div className="blog-page-filters" role="tablist" aria-label="İçerik türü">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter.value}
                  className={`blog-page-filter${activeFilter === filter.value ? ' blog-page-filter-active' : ''}`}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.header>

          {needsBlogSetup && !blogAccessOk && (
            <section className="blog-editor-setup" aria-live="polite">
              <p className="blog-editor-setup-title">Supabase yazma yetkisi henüz tanımlı değil</p>
              <p className="blog-editor-setup-text">
                Giriş yaptığınız hesap: <strong>{user?.email || '—'}</strong>. SQL’de bu e-posta ile{' '}
                <code>is_admin=true</code> ayarlandığından emin olun, ardından sayfayı yenileyin veya çıkış yapıp tekrar
                giriş yapın.
              </p>
              <pre className="blog-editor-setup-code">{`update public.profiles
set is_admin = true
where lower(email) = '${(user?.email || 'sizin@email.com').toLowerCase()}';`}</pre>
            </section>
          )}

          {!authLoading && canManageBlog && (
            <BlogEditorSection
              defaultExpanded={editorOpen}
              onPostsChanged={() => setReloadKey((key) => key + 1)}
              onAccessVerified={() => setBlogAccessOk(true)}
            />
          )}

          {loading ? (
            <div className="blog-page-empty">
              <div className="profile-loading-spinner" aria-label="Yükleniyor" />
            </div>
          ) : error ? (
            <div className="blog-page-empty">
              <p>{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="blog-page-empty">
              <p>Henüz yayınlanmış yazı yok.</p>
            </div>
          ) : (
            <div className="blog-page-grid">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
};

export default BlogPage;
