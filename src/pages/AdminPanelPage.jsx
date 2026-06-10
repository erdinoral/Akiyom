import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminOverview from '../components/admin/AdminOverview';
import AdminLeads from '../components/admin/AdminLeads';
import AdminMembers from '../components/admin/AdminMembers';
import AdminStatistics from '../components/admin/AdminStatistics';
import AdminMarketing from '../components/admin/AdminMarketing';
import AdminFeedback from '../components/admin/AdminFeedback';
import AdminAiInquiries from '../components/admin/AdminAiInquiries';
import AdminBlog from '../components/admin/AdminBlog';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { usePageSeo } from '../utils/seo.js';

const VALID_TABS = ['overview', 'leads', 'ai-inquiries', 'feedback', 'members', 'statistics', 'marketing', 'blog'];

const AdminPanelPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, isAuthenticated, isAdmin, isEditor, needsBlogSetup, isConfigured, refreshProfile, user } = useAuth();

  const canAccessPanel = isAdmin || isEditor;
  const editorOnly = isEditor && !isAdmin;

  const tabParam = searchParams.get('tab') || 'overview';
  const activeTab = VALID_TABS.includes(tabParam) ? tabParam : 'overview';

  const [leads, setLeads] = useState([]);
  const [members, setMembers] = useState([]);
  const [marketing, setMarketing] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [aiInquiries, setAiInquiries] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');

  usePageSeo({
    title: 'Admin Panel — Akiyom',
    description: 'Akiyom yönetim paneli.',
    path: '/panel',
  });

  useEffect(() => {
    if (!loading && (!isAuthenticated || !canAccessPanel)) {
      navigate('/giris', { replace: true, state: { from: '/panel' } });
    }
  }, [isAuthenticated, canAccessPanel, loading, navigate]);

  useEffect(() => {
    if (editorOnly && activeTab !== 'blog') {
      setSearchParams({ tab: 'blog' });
    }
  }, [editorOnly, activeTab, setSearchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [isAuthenticated, refreshProfile]);

  const loadAll = useCallback(async () => {
    if (!supabase) return;

    setFetching(true);
    setError('');

    if (editorOnly) {
      const blogRes = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (blogRes.error) {
        const code = blogRes.error.code;
        if (code === '42501' || blogRes.error.message?.includes('permission')) {
          setError('Blog yazılarına erişim reddedildi. is_editor veya is_admin yetkisi gerekir.');
        } else if (code !== 'PGRST205') {
          setError(`Blog yazıları yüklenemedi: ${blogRes.error.message}`);
        }
        setBlogPosts([]);
      } else {
        setBlogPosts(blogRes.data ?? []);
      }
      setFetching(false);
      return;
    }

    const [leadsRes, membersRes, marketingRes, feedbackRes, aiInquiriesRes, blogRes] = await Promise.all([
      supabase.from('project_leads').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id, email, username, is_admin, is_editor, updated_at').order('updated_at', { ascending: false }),
      supabase.from('marketing_metrics').select('*').order('recorded_date', { ascending: false }),
      supabase.from('app_feedback').select('*').order('created_at', { ascending: false }),
      supabase.from('akiyom_ai_inquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
    ]);

    if (leadsRes.error) {
      const code = leadsRes.error.code;
      if (code === 'PGRST205' || leadsRes.error.message?.includes('project_leads')) {
        setError(
          'project_leads tablosu bulunamadı. Supabase → SQL Editor → supabase/setup_all.sql dosyasını çalıştırın.'
        );
      } else if (code === '42501' || leadsRes.error.message?.includes('permission')) {
        setError(
          'Taleplere erişim reddedildi. profiles tablosunda is_admin=true olduğunuzdan emin olun.'
        );
      } else {
        setError(`Talepler yüklenemedi: ${leadsRes.error.message}`);
      }
    } else {
      setLeads(leadsRes.data ?? []);
    }

    if (!membersRes.error) setMembers(membersRes.data ?? []);

    if (!marketingRes.error) {
      setMarketing(marketingRes.data ?? []);
    } else if (marketingRes.error.code === 'PGRST205') {
      setMarketing([]);
    }

    if (aiInquiriesRes.error) {
      const code = aiInquiriesRes.error.code;
      if (code === 'PGRST205' || aiInquiriesRes.error.message?.includes('akiyom_ai_inquiries')) {
        setError((prev) =>
          prev ||
          'akiyom_ai_inquiries tablosu yok. Supabase → SQL Editor → supabase/akiyom_ai_inquiries.sql dosyasını çalıştırın.'
        );
      } else if (code === '42501' || aiInquiriesRes.error.message?.includes('permission')) {
        setError((prev) => prev || 'Akiyom AI iletişim taleplerine erişim reddedildi.');
      } else if (code !== 'PGRST205') {
        setError((prev) => prev || `AI iletişim yüklenemedi: ${aiInquiriesRes.error.message}`);
      }
      setAiInquiries([]);
    } else {
      setAiInquiries(aiInquiriesRes.data ?? []);
    }

    if (blogRes.error) {
      const code = blogRes.error.code;
      if (code === 'PGRST205' || blogRes.error.message?.includes('blog_posts')) {
        setBlogPosts([]);
      } else if (code === '42501' || blogRes.error.message?.includes('permission')) {
        setError((prev) => prev || 'Blog yazılarına erişim reddedildi.');
        setBlogPosts([]);
      } else if (code !== 'PGRST205') {
        setError((prev) => prev || `Blog yazıları yüklenemedi: ${blogRes.error.message}`);
        setBlogPosts([]);
      }
    } else {
      setBlogPosts(blogRes.data ?? []);
    }

    if (feedbackRes.error) {
      const code = feedbackRes.error.code;
      if (code === '42501' || feedbackRes.error.message?.includes('permission')) {
        setError((prev) =>
          prev ||
          'Görüş/önerilere erişim reddedildi. supabase/app_feedback.sql dosyasındaki admin policy\'lerini çalıştırın.'
        );
      } else if (code !== 'PGRST205') {
        setError((prev) => prev || `Görüş/öneriler yüklenemedi: ${feedbackRes.error.message}`);
      }
      setFeedback([]);
    } else {
      setFeedback(feedbackRes.data ?? []);
    }

    setFetching(false);
  }, [editorOnly]);

  useEffect(() => {
    if (canAccessPanel) loadAll();
  }, [canAccessPanel, loadAll]);

  const newLeadsCount = useMemo(() => leads.filter((l) => l.status === 'new').length, [leads]);
  const newFeedbackCount = useMemo(
    () => feedback.filter((f) => (f.status || 'new') === 'new').length,
    [feedback]
  );
  const newAiInquiriesCount = useMemo(
    () => aiInquiries.filter((row) => row.status === 'new').length,
    [aiInquiries]
  );

  const setTab = (tab) => {
    setSearchParams(tab === 'overview' ? {} : { tab });
  };

  const handleStatusChange = async (leadId, nextStatus) => {
    if (!supabase) return;
    setUpdatingId(leadId);
    const { error: updateError } = await supabase.from('project_leads').update({ status: nextStatus }).eq('id', leadId);
    if (updateError) {
      setError('Durum güncellenemedi.');
    } else {
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: nextStatus } : l)));
    }
    setUpdatingId(null);
  };

  const handleAiInquiryStatusChange = async (id, nextStatus) => {
    if (!supabase) return;
    setUpdatingId(id);
    const { error: updateError } = await supabase
      .from('akiyom_ai_inquiries')
      .update({ status: nextStatus })
      .eq('id', id);
    if (updateError) {
      setError('AI iletişim durumu güncellenemedi.');
    } else {
      setAiInquiries((prev) => prev.map((row) => (row.id === id ? { ...row, status: nextStatus } : row)));
    }
    setUpdatingId(null);
  };

  const handleAiInquiryNotesChange = async (id, notes) => {
    if (!supabase) return;
    setUpdatingId(id);
    const { error: updateError } = await supabase
      .from('akiyom_ai_inquiries')
      .update({ admin_notes: notes || null })
      .eq('id', id);
    if (updateError) {
      setError('Not kaydedilemedi.');
    } else {
      setAiInquiries((prev) => prev.map((row) => (row.id === id ? { ...row, admin_notes: notes } : row)));
    }
    setUpdatingId(null);
  };

  const handleNotesChange = async (leadId, notes) => {
    if (!supabase) return;
    setUpdatingId(leadId);
    const { error: updateError } = await supabase.from('project_leads').update({ admin_notes: notes || null }).eq('id', leadId);
    if (updateError) {
      setError('Not kaydedilemedi.');
    } else {
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, admin_notes: notes } : l)));
    }
    setUpdatingId(null);
  };

  const handleAddMetric = async (payload) => {
    if (!supabase) return false;
    setSaving(true);
    const { data, error: insertError } = await supabase.from('marketing_metrics').insert(payload).select('*').single();
    setSaving(false);
    if (insertError) {
      setError('Metrik kaydedilemedi. marketing_metrics.sql dosyasını çalıştırın.');
      return false;
    }
    setMarketing((prev) => [data, ...prev]);
    return true;
  };

  const handleFeedbackStatusChange = async (feedbackId, nextStatus) => {
    if (!supabase) return;
    setUpdatingId(feedbackId);
    const { error: updateError } = await supabase
      .from('app_feedback')
      .update({ status: nextStatus })
      .eq('id', feedbackId);
    if (updateError) {
      const hint =
        updateError.code === '23514'
          ? ' Geçersiz durum: Supabase’de supabase/app_feedback.sql dosyasını (status check bölümü) çalıştırın.'
          : '';
      setError(`Görüş durumu güncellenemedi: ${updateError.message}${hint}`);
    } else {
      setFeedback((prev) => prev.map((f) => (f.id === feedbackId ? { ...f, status: nextStatus } : f)));
    }
    setUpdatingId(null);
  };

  const handleFeedbackReplyChange = async (feedbackId, reply) => {
    if (!supabase) return false;
    setUpdatingId(feedbackId);
    const trimmed = reply.trim();
    const payload = {
      admin_reply: trimmed || null,
      replied_at: trimmed ? new Date().toISOString() : null,
      ...(trimmed ? { status: 'replied' } : {}),
    };
    const { data, error: updateError } = await supabase
      .from('app_feedback')
      .update(payload)
      .eq('id', feedbackId)
      .select('*')
      .single();
    setUpdatingId(null);
    if (updateError) {
      const missingColumn = /admin_reply|replied_at|column/i.test(updateError.message);
      const invalidStatus = updateError.code === '23514';
      const hint = missingColumn
        ? ' Supabase SQL Editor’da supabase/app_feedback_admin_reply.sql dosyasını çalıştırın.'
        : invalidStatus
          ? ' Geçersiz durum: supabase/app_feedback_admin_reply.sql veya app_feedback.sql dosyasını çalıştırın.'
          : '';
      setError(`Yanıt kaydedilemedi: ${updateError.message}${hint}`);
      return false;
    }
    setFeedback((prev) => prev.map((f) => (f.id === feedbackId ? { ...f, ...data } : f)));
    return true;
  };

  const handleDeleteMetric = async (id) => {
    if (!supabase || !window.confirm('Bu metrik kaydını silmek istiyor musunuz?')) return;
    const { error: deleteError } = await supabase.from('marketing_metrics').delete().eq('id', id);
    if (deleteError) {
      setError('Kayıt silinemedi.');
    } else {
      setMarketing((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const handleSaveBlogPost = async (payload, postId) => {
    if (!supabase) return false;
    setSaving(true);
    setError('');

    const request = postId
      ? supabase.from('blog_posts').update(payload).eq('id', postId).select('*').single()
      : supabase.from('blog_posts').insert(payload).select('*').single();

    const { data, error: saveError } = await request;
    setSaving(false);

    if (saveError) {
      const hint =
        saveError.code === 'PGRST205' || saveError.message?.includes('blog_posts')
          ? ' Supabase SQL Editor’da supabase/blog_posts.sql dosyasını çalıştırın.'
          : saveError.code === '23505'
            ? ' Bu slug zaten kullanılıyor; farklı bir slug deneyin.'
            : '';
      setError(`Yazı kaydedilemedi: ${saveError.message}${hint}`);
      return false;
    }

    setBlogPosts((prev) => {
      if (postId) {
        return prev.map((post) => (post.id === postId ? data : post));
      }
      return [data, ...prev];
    });
    return true;
  };

  const handleDeleteBlogPost = async (id) => {
    if (!supabase || !window.confirm('Bu yazıyı silmek istiyor musunuz?')) return;
    const { error: deleteError } = await supabase.from('blog_posts').delete().eq('id', id);
    if (deleteError) {
      setError('Yazı silinemedi.');
    } else {
      setBlogPosts((prev) => prev.filter((post) => post.id !== id));
    }
  };

  if (!isConfigured) {
    return (
      <section className="admin-page">
        <div className="admin-card"><h1>Panel kullanılamıyor</h1><p>Supabase yapılandırması eksik.</p></div>
      </section>
    );
  }

  if (loading || !canAccessPanel) {
    return (
      <div className="akiyom-landing admin-layout-root">
        <div className="background-base-layer" />
        <section className="admin-page">
          <div className="admin-card admin-card-loading">
            <div className="profile-loading-spinner" aria-label="Yükleniyor" />
          </div>
        </section>
      </div>
    );
  }

  const renderTab = () => {
    if (fetching && blogPosts.length === 0 && !editorOnly && leads.length === 0 && members.length === 0) {
      return (
        <div className="admin-empty">
          <div className="profile-loading-spinner" aria-label="Yükleniyor" />
        </div>
      );
    }

    switch (activeTab) {
      case 'leads':
        return (
          <AdminLeads
            leads={leads}
            onStatusChange={handleStatusChange}
            onNotesChange={handleNotesChange}
            updatingId={updatingId}
            error={error}
          />
        );
      case 'ai-inquiries':
        return (
          <AdminAiInquiries
            inquiries={aiInquiries}
            onStatusChange={handleAiInquiryStatusChange}
            onNotesChange={handleAiInquiryNotesChange}
            updatingId={updatingId}
            error={error}
          />
        );
      case 'feedback':
        return (
          <AdminFeedback
            feedback={feedback}
            onStatusChange={handleFeedbackStatusChange}
            onReplyChange={handleFeedbackReplyChange}
            updatingId={updatingId}
            error={error}
          />
        );
      case 'members':
        return <AdminMembers members={members} />;
      case 'statistics':
        return <AdminStatistics leads={leads} members={members} marketing={marketing} />;
      case 'marketing':
        return (
          <AdminMarketing
            marketing={marketing}
            onAddMetric={handleAddMetric}
            onDeleteMetric={handleDeleteMetric}
            saving={saving}
            error={error}
          />
        );
      case 'blog':
        return (
          <div className="admin-section">
            {needsBlogSetup && (
              <div className="blog-editor-setup" style={{ marginBottom: '1.5rem' }}>
                <p className="blog-editor-setup-title">Profilde admin bayrağı görünmüyor</p>
                <p className="blog-editor-setup-text">
                  Giriş hesabı: <strong>{user?.email || '—'}</strong>. SQL’i bu e-posta ile çalıştırın, sonra çıkış yapıp
                  tekrar giriş yapın.
                </p>
                <pre className="blog-editor-setup-code">{`update public.profiles
set is_admin = true
where lower(email) = '${(user?.email || 'sizin@email.com').toLowerCase()}';`}</pre>
              </div>
            )}
            <AdminBlog
              posts={blogPosts}
              onSavePost={handleSaveBlogPost}
              onDeletePost={handleDeleteBlogPost}
              saving={saving}
              updatingId={updatingId}
              error={error}
            />
          </div>
        );
      default:
        return (
          <AdminOverview
            leads={leads}
            members={members}
            marketing={marketing}
            feedback={feedback}
            aiInquiries={aiInquiries}
          />
        );
    }
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setTab}
      newLeadsCount={newLeadsCount}
      newFeedbackCount={newFeedbackCount}
      newAiInquiriesCount={newAiInquiriesCount}
      onRefresh={loadAll}
      refreshing={fetching}
      editorOnly={editorOnly}
    >
      {renderTab()}
    </AdminLayout>
  );
};

export default AdminPanelPage;
