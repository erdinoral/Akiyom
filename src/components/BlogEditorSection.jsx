import React, { useCallback, useEffect, useState } from 'react';
import AdminBlog from './admin/AdminBlog';
import { deleteBlogPost, fetchAllPostsForEditor, saveBlogPost } from '../lib/blogClient';
import { formatBlogLoadError } from '../utils/blogUtils';

const BlogEditorSection = ({ onPostsChanged, onAccessVerified, defaultExpanded = false }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(defaultExpanded);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    const { data, error: fetchError } = await fetchAllPostsForEditor();
    if (fetchError) {
      setError(formatBlogLoadError(fetchError));
      setPosts([]);
    } else {
      setPosts(data ?? []);
      onAccessVerified?.();
    }
    setLoaded(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (expanded && !loaded && !loading) {
      loadPosts();
    }
  }, [expanded, loaded, loading, loadPosts]);

  const handleSavePost = async (payload, postId) => {
    setSaving(true);
    setError('');
    const { data, error: saveError } = await saveBlogPost(payload, postId);
    setSaving(false);

    if (saveError) {
      setError(`Yazı kaydedilemedi: ${formatBlogLoadError(saveError)}`);
      return false;
    }

    setPosts((prev) => {
      if (postId) {
        return prev.map((post) => (post.id === postId ? data : post));
      }
      return [data, ...prev];
    });
    onPostsChanged?.();
    return true;
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Bu yazıyı silmek istiyor musunuz?')) return;
    setUpdatingId(id);
    const { error: deleteError } = await deleteBlogPost(id);
    setUpdatingId(null);
    if (deleteError) {
      setError(`Yazı silinemedi: ${formatBlogLoadError(deleteError)}`);
      return;
    }
    setPosts((prev) => prev.filter((post) => post.id !== id));
    onPostsChanged?.();
  };

  return (
    <section className="blog-editor-section" id="editor">
      <div className="blog-editor-toolbar">
        <div>
          <p className="blog-editor-eyebrow">İçerik yönetimi</p>
          <p className="blog-editor-hint">Blog ve haber yazılarını buradan ekleyebilir veya düzenleyebilirsiniz.</p>
        </div>
        <button
          type="button"
          className="blog-editor-toggle"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? 'Editörü gizle' : 'Yazı ekle / düzenle'}
        </button>
      </div>

      {expanded && (
        <div className="blog-editor-panel">
          {loading ? (
            <div className="blog-page-empty">
              <div className="profile-loading-spinner" aria-label="Yükleniyor" />
            </div>
          ) : (
            <AdminBlog
              posts={posts}
              onSavePost={handleSavePost}
              onDeletePost={handleDeletePost}
              saving={saving}
              updatingId={updatingId}
              error={error}
              embedded
            />
          )}
        </div>
      )}
    </section>
  );
};

export default BlogEditorSection;
