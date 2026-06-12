import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/adminStats';
import { uploadBlogCoverImage } from '../../lib/blogClient';
import {
  BLOG_STATUS_LABELS,
  BLOG_TYPE_LABELS,
  formatBlogLoadError,
  hasCoverImage,
  slugifyTitle,
} from '../../utils/blogUtils';
import AdminSelect from './AdminSelect';

const TYPE_OPTIONS = Object.entries(BLOG_TYPE_LABELS).map(([value, label]) => ({ value, label }));
const STATUS_OPTIONS = Object.entries(BLOG_STATUS_LABELS).map(([value, label]) => ({ value, label }));

const EMPTY_FORM = {
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  cover_image_url: '',
  post_type: 'blog',
  status: 'draft',
  published_at: '',
};

function toDatetimeLocalValue(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const AdminBlog = ({ posts, onSavePost, onDeletePost, saving, updatingId, error, embedded = false }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [filter, setFilter] = useState('all');
  const [coverImageMode, setCoverImageMode] = useState('upload');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState('');
  const coverFileInputRef = useRef(null);

  const filteredPosts = useMemo(() => {
    if (filter === 'all') return posts;
    return posts.filter((post) => post.post_type === filter);
  }, [posts, filter]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setSlugTouched(false);
    setCoverImageMode('upload');
    setCoverUploadError('');
    if (coverFileInputRef.current) coverFileInputRef.current.value = '';
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setSlugTouched(true);
    const coverUrl = post.cover_image_url || '';
    setCoverImageMode(/supabase\.co\/storage\//i.test(coverUrl) ? 'upload' : coverUrl ? 'link' : 'upload');
    setCoverUploadError('');
    if (coverFileInputRef.current) coverFileInputRef.current.value = '';
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      body: post.body || '',
      cover_image_url: post.cover_image_url || '',
      post_type: post.post_type || 'blog',
      status: post.status || 'draft',
      published_at: toDatetimeLocalValue(post.published_at),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCoverFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    setCoverUploadError('');

    const { url, error: uploadError } = await uploadBlogCoverImage(file);
    setUploadingCover(false);

    if (uploadError || !url) {
      setCoverUploadError(formatBlogLoadError(uploadError));
      return;
    }

    setForm((prev) => ({ ...prev, cover_image_url: url }));
  };

  const clearCoverImage = () => {
    setForm((prev) => ({ ...prev, cover_image_url: '' }));
    setCoverUploadError('');
    if (coverFileInputRef.current) coverFileInputRef.current.value = '';
  };

  const handleTitleChange = (title) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugTouched ? prev.slug : slugifyTitle(title),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const slug = (form.slug.trim() || slugifyTitle(title)).slice(0, 120);

    if (!title || !slug) return;

    const payload = {
      title,
      slug,
      excerpt: form.excerpt.trim() || null,
      body: form.body.trim(),
      cover_image_url: form.cover_image_url.trim() || null,
      post_type: form.post_type,
      status: form.status,
      published_at:
        form.status === 'published'
          ? form.published_at
            ? new Date(form.published_at).toISOString()
            : new Date().toISOString()
          : form.published_at
            ? new Date(form.published_at).toISOString()
            : null,
    };

    const ok = await onSavePost(payload, editingId);
    if (ok) resetForm();
  };

  const showImagePreview = hasCoverImage(form.cover_image_url);

  return (
    <div className={`admin-section${embedded ? ' admin-section-embedded' : ''}`}>
      {!embedded && (
        <header className="admin-section-header">
          <div>
            <p className="admin-eyebrow">İçerik</p>
            <h1 className="admin-title">Blog & Haberler</h1>
            <p className="admin-subtitle">
              Yazılarınızı buradan ekleyin. Kapak görselini yükleyin veya link yapıştırın; makale metnini alttaki alana yazın.
            </p>
          </div>
        </header>
      )}

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-two-col admin-blog-layout">
        <section className="admin-panel-card">
          <h2 className="admin-panel-title">{editingId ? 'Yazıyı düzenle' : 'Yeni yazı'}</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-row">
              <label className="admin-field">
                <span>Tür</span>
                <AdminSelect
                  value={form.post_type}
                  onChange={(post_type) => setForm({ ...form, post_type })}
                  options={TYPE_OPTIONS}
                  aria-label="Yazı türü"
                />
              </label>
              <label className="admin-field">
                <span>Durum</span>
                <AdminSelect
                  value={form.status}
                  onChange={(status) => setForm({ ...form, status })}
                  options={STATUS_OPTIONS}
                  aria-label="Yayın durumu"
                />
              </label>
            </div>

            <label className="admin-field">
              <span>Başlık</span>
              <input
                type="text"
                className="admin-input"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Yazı başlığı"
                required
              />
            </label>

            <label className="admin-field">
              <span>URL slug</span>
              <input
                type="text"
                className="admin-input"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setForm({ ...form, slug: e.target.value });
                }}
                placeholder="ornek-yazi-basligi"
                required
              />
            </label>

            <div className="admin-field">
              <span>Kapak görseli</span>
              <div className="admin-blog-cover-mode" role="tablist" aria-label="Kapak görseli kaynağı">
                <button
                  type="button"
                  className={`admin-blog-cover-mode-btn${coverImageMode === 'upload' ? ' active' : ''}`}
                  onClick={() => setCoverImageMode('upload')}
                  role="tab"
                  aria-selected={coverImageMode === 'upload'}
                >
                  Yükle
                </button>
                <button
                  type="button"
                  className={`admin-blog-cover-mode-btn${coverImageMode === 'link' ? ' active' : ''}`}
                  onClick={() => setCoverImageMode('link')}
                  role="tab"
                  aria-selected={coverImageMode === 'link'}
                >
                  Link
                </button>
              </div>

              {coverImageMode === 'upload' ? (
                <div className="admin-blog-cover-upload">
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="admin-blog-cover-file"
                    onChange={handleCoverFileChange}
                    disabled={uploadingCover}
                  />
                  <span className="admin-muted admin-field-hint">
                    JPG, PNG, WebP veya GIF — en fazla 5 MB. Yükleme sonrası link otomatik dolar.
                  </span>
                  {uploadingCover && <p className="admin-muted">Görsel yükleniyor...</p>}
                  {coverUploadError && <p className="admin-error admin-blog-cover-error">{coverUploadError}</p>}
                </div>
              ) : (
                <>
                  <input
                    type="url"
                    className="admin-input"
                    value={form.cover_image_url}
                    onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                    placeholder="https://..."
                  />
                  <span className="admin-muted admin-field-hint">Doğrudan görsel linki yapıştırın.</span>
                </>
              )}

              {showImagePreview && (
                <div className="admin-blog-image-preview">
                  <img
                    src={form.cover_image_url.trim()}
                    alt="Kapak önizleme"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {showImagePreview && (
                <button type="button" className="admin-link-button admin-blog-cover-clear" onClick={clearCoverImage}>
                  Görseli kaldır
                </button>
              )}
            </div>

            <label className="admin-field">
              <span>Kısa özet</span>
              <textarea
                className="admin-textarea"
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Liste kartlarında görünecek kısa açıklama"
              />
            </label>

            <label className="admin-field">
              <span>Makale / yazı</span>
              <textarea
                className="admin-textarea admin-textarea-tall"
                rows={14}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="Ana metin. Paragraflar arasında boş satır bırakın."
                required
              />
            </label>

            {form.status === 'published' && (
              <label className="admin-field">
                <span>Yayın tarihi</span>
                <input
                  type="datetime-local"
                  className="admin-input"
                  value={form.published_at}
                  onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                />
              </label>
            )}

            <div className="admin-form-actions">
              <button type="submit" className="admin-submit-button" disabled={saving || updatingId}>
                {saving ? 'Kaydediliyor...' : editingId ? 'Güncelle' : 'Yayınla / kaydet'}
              </button>
              {editingId && (
                <button type="button" className="admin-link-button" onClick={resetForm}>
                  İptal
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="admin-panel-card">
          <div className="admin-blog-list-header">
            <h2 className="admin-panel-title">Yazılar ({filteredPosts.length})</h2>
            <AdminSelect
              className="admin-select-inline"
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: 'Tümü' },
                ...TYPE_OPTIONS,
              ]}
              aria-label="Yazı filtresi"
            />
          </div>

          {filteredPosts.length === 0 ? (
            <p className="admin-muted">Henüz yazı yok. Soldaki formdan ilk paylaşımınızı oluşturun.</p>
          ) : (
            <div className="admin-blog-list">
              {filteredPosts.map((post) => (
                <article key={post.id} className={`admin-blog-list-item${editingId === post.id ? ' admin-blog-list-item-active' : ''}`}>
                  {post.cover_image_url && (
                    <div className="admin-blog-list-thumb">
                      <img src={post.cover_image_url} alt="" />
                    </div>
                  )}
                  <div className="admin-blog-list-body">
                    <div className="admin-blog-list-meta">
                      <span className={`admin-status-pill admin-status-pill-${post.status}`}>
                        {BLOG_STATUS_LABELS[post.status] || post.status}
                      </span>
                      <span className="admin-muted">{BLOG_TYPE_LABELS[post.post_type] || post.post_type}</span>
                      <time className="admin-muted">{formatDate(post.published_at || post.created_at, true)}</time>
                    </div>
                    <h3 className="admin-blog-list-title">{post.title}</h3>
                    {post.excerpt && <p className="admin-blog-list-excerpt">{post.excerpt}</p>}
                    <div className="admin-blog-list-actions">
                      <button type="button" className="admin-link-button" onClick={() => startEdit(post)}>
                        Düzenle
                      </button>
                      {post.status === 'published' && (
                        <Link to={`/blog/${post.slug}`} className="admin-link-button" target="_blank" rel="noopener noreferrer">
                          Görüntüle
                        </Link>
                      )}
                      <button
                        type="button"
                        className="admin-text-link admin-text-link-danger"
                        onClick={() => onDeletePost(post.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminBlog;
