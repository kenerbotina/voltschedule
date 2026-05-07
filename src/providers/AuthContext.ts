import { createContext } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Profile } from '../services/profile.service';

export type User = {
  id: string;
  email?: string | null;
};

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null; 
  isLoading: boolean;

  signInWithPassword: (email: string, password: string) => Promise<ApiResponse<{ user: User }>>;
  signInWithGoogle: () => Promise<ApiResponse<{ url?: string }>>;
  signOut: () => Promise<ApiResponse<null>>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
