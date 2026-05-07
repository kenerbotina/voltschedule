import { supabase } from '../lib/supabaseClient';

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

type SessionUser = {
  id: string;
  email?: string | null;
};

export async function signInWithPassword(
  email: string,
  password: string
): Promise<ApiResponse<{ user: SessionUser }>> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { success: false, error: error.message };

  const user = data.user;
  if (!user) return { success: false, error: 'No user returned by Supabase.' };

  return {
    success: true,
    data: { user: { id: user.id, email: user.email } },
  };
}

export async function signInWithGoogle(): Promise<ApiResponse<{ url?: string }>> {
  // Google sign-in in Supabase is typically handled as redirect.
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) return { success: false, error: error.message };

  // No podemos esperar un "usuario" inmediato porque ocurre redirect.
  return { success: true, data: { url: undefined } };
}

export async function signOut(): Promise<ApiResponse<null>> {
  const { error } = await supabase.auth.signOut();
  if (error) return { success: false, error: error.message };
  return { success: true, data: null };
}
