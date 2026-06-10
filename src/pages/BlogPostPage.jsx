import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageShell from '../components/PageShell.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchPublishedPostBySlug } from '../lib/blogClient.js';
import { BLOG_TYPE_LABELS, splitBodyToParagraphs } from '../utils/blogUtils.js';
import { formatDate } from '../utils/adminStats.js';
import { injectJsonLd, setPageSeo } from '../utils/seo.js';
import '../../AkiyomLanding.css';

const ease = [0.25, 0.1, 0.25, 1];
const BLOG_SCHEMA_ID = 'akiyom-blog-post-schema';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { canManageBlog } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      setLoading(true);
      const { data, error } = await fetchPublishedPostBySlug(slug);
      if (cancelled) return;

      if (error || !data) {
        navigate('/blog', { replace: true });
        return;
      }

      setPost(data);
      setLoading(false);
    }

    loadPost();
    return () => {
      cancelled = true;
    };
  }, [slug, navigate]);

  useEffect(() => {
    if (!post) return;

    const description = post.excerpt || post.body.slice(0, 160);
    const resetSeo = setPageSeo({
      title: `${post.title} — Blog & Haberler — Akiyom`,
      description,
      path: `/blog/${post.slug}`,
    });

    const removeSchema = injectJsonLd(BLOG_SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description,
      datePublished: post.published_at,
      dateModified: post.updated_at,
      image: post.cover_image_url || undefined,
      author: {
        '@type': 'Organization',
        name: 'Akiyom',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Akiyom',
      },
    });

    return () => {
      resetSeo();
      removeSchema();
    };
  }, [post]);

  if (loading || !post) {
    return (
      <PageShell>
        <div className="blog-post-page blog-post-loading">
          <div className="profile-loading-spinner" aria-label="Yükleniyor" />
        </div>
      </PageShell>
    );
  }

  const paragraphs = splitBodyToParagraphs(post.body);

  return (
    <PageShell>
      <motion.article
        className="blog-post-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="blog-post-container">
          <Link to="/blog" className="blog-post-back">
            ← Blog & Haberler
          </Link>

          {canManageBlog && (
            <Link to={`/blog?edit=1#editor`} className="blog-post-edit-link">
              Bu yazıyı düzenle
            </Link>
          )}

          {post.cover_image_url && !imageFailed && (
            <div className="blog-post-hero">
              <img src={post.cover_image_url} alt={post.title} onError={() => setImageFailed(true)} />
            </div>
          )}

          <header className="blog-post-header">
            <div className="blog-post-meta">
              <span className="blog-post-type">{BLOG_TYPE_LABELS[post.post_type] || post.post_type}</span>
              <time>{formatDate(post.published_at || post.created_at, true)}</time>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            {post.excerpt && <p className="blog-post-lead">{post.excerpt}</p>}
          </header>

          <div className="blog-post-content">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.article>
    </PageShell>
  );
};

export default BlogPostPage;
