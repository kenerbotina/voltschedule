import React, { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from './AuthContext';
import type { AuthContextValue, User } from './AuthContext';
import { getMyProfile, type Profile } from '../services/profile.service';
import {
  signInWithGoogle,
  signInWithPassword,
  signOut,
} from '../services/auth.service';
import { useAuthStore } from '../store/useStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeSetUser = useAuthStore((state) => state.setUser);
  const storeLogout = useAuthStore((state) => state.logout);

  useEffect(() => {
    let mounted = true;

    async function loadProfile(currentSession: Session | null) {
      if (!currentSession?.user) {
        setProfile(null);
        storeLogout();
        return;
      }

      const profileRes = await getMyProfile();
      if (!mounted) return;

      if (profileRes.success) {
        setProfile(profileRes.data);
        storeSetUser({
          id: profileRes.data?.id ?? currentSession.user.id,
          email: profileRes.data?.email ?? currentSession.user.email ?? '',
          name: profileRes.data?.full_name ?? undefined,
          avatar_url: profileRes.data?.avatar_url ?? undefined,
        });
      }
    }

    async function init() {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(currentSession);
      setUser(currentSession?.user ? { id: currentSession.user.id, email: currentSession.user.email } : null);
      await loadProfile(currentSession);
      setIsLoading(false);
    }

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ? { id: nextSession.user.id, email: nextSession.user.email } : null);
      loadProfile(nextSession);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [storeLogout, storeSetUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      profile,
      isLoading,
      signInWithPassword,
      signInWithGoogle,
      signOut,
    }),
    [session, user, profile, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
