import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProfile, isSupabaseConfigured, supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || 'erdinoral31@gmail.com')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function resolveIsAdmin(user, profile) {
  if (profile?.is_admin === true) return true;
  if (profile?.role === 'admin') return true;
  const email = user?.email?.toLowerCase();
  return Boolean(email && ADMIN_EMAILS.includes(email));
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
