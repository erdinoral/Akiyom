import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProfile, isSupabaseConfigured, supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || 'erdinoral31@gmail.com')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function isProfileFlagEnabled(value) {
  return value === true || value === 'true' || value === 1 || value === 't';
}

function resolveIsAdmin(user, profile) {
  if (isProfileFlagEnabled(profile?.is_admin)) return true;
  if (profile?.role === 'admin') return true;
  const email = user?.email?.toLowerCase();
  return Boolean(email && ADMIN_EMAILS.includes(email));
}

function resolveIsEditor(profile) {
  if (isProfileFlagEnabled(profile?.is_editor)) return true;
  if (profile?.role === 'editor') return true;
  return false;
}

function resolveCanManageBlogDb(profile) {
  if (!profile) return false;
  return isProfileFlagEnabled(profile.is_admin) || isProfileFlagEnabled(profile.is_editor);
}

function resolveCanManageBlog(user, profile) {
  if (resolveCanManageBlogDb(profile)) return true;
  if (resolveIsEditor(profile)) return true;
  return resolveIsAdmin(user, profile);
}

function resolveNeedsBlogSetup(user, profile) {
  if (!user || !profile) return false;
  if (resolveCanManageBlogDb(profile)) return false;
  return resolveIsAdmin(user, profile) || resolveIsEditor(profile);
}

export function isAdminEmail(email) {
  return Boolean(email && ADMIN_EMAILS.includes(String(email).trim().toLowerCase()));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (userId) => {
    const nextProfile = await fetchProfile(userId);
    setProfile(nextProfile);
    return nextProfile;
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        loadProfile(nextUser.id).finally(() => {
          if (mounted) setLoading(false);
        });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        loadProfile(nextUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !user?.id) return undefined;

    const refresh = () => loadProfile(user.id);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') refresh();
    };

    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', onVisibilityChange);

    const channel = supabase
      .channel(`profile-sync-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        refresh
      )
      .subscribe();

    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      supabase.removeChannel(channel);
    };
  }, [user?.id, loadProfile]);

  const signUp = useCallback(async ({ email, password, fullName }) => {
    if (!supabase) {
      return { error: { message: 'Supabase yapılandırması eksik.' } };
    }

    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    if (!supabase) {
      return { error: { message: 'Supabase yapılandırması eksik.' } };
    }

    return supabase.auth.signInWithPassword({ email, password });
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return { error: { message: 'Supabase yapılandırması eksik.' } };
    const result = await supabase.auth.signOut();
    setProfile(null);
    setUser(null);
    return result;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return null;
    return loadProfile(user.id);
  }, [loadProfile, user]);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: resolveIsAdmin(user, profile),
      isEditor: resolveIsEditor(profile),
      canManageBlog: resolveCanManageBlog(user, profile),
      needsBlogSetup: resolveNeedsBlogSetup(user, profile),
      isConfigured: isSupabaseConfigured,
      signUp,
      signIn,
      signOut,
      refreshProfile,
    }),
    [user, profile, loading, signUp, signIn, signOut, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth yalnızca AuthProvider içinde kullanılabilir.');
  }
  return context;
}
