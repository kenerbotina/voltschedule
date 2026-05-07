import { supabase } from '../lib/supabaseClient';
import type { Database } from '../types/database.types';
import type { ApiResponse } from './auth.service';

export type Schedule = Database['public']['Tables']['schedules']['Row'];

export async function listMySchedules(): Promise<ApiResponse<Schedule[]>> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return { success: false, error: 'Not authenticated.' };

  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('user_id', user.id)
    .order('start_time', { ascending: true });

  if (error) return { success: false, error: error.message };
  return { success: true, data: data ?? [] };
}

export async function upsertMySchedule(input: {
  id?: string;
  title: string;
  description?: string | null;
  start_time: string;
  end_time: string;
  color?: string | null;
}): Promise<ApiResponse<Schedule>> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return { success: false, error: 'Not authenticated.' };

  const payload = {
    id: input.id,
    user_id: user.id,
    title: input.title,
    description: input.description ?? null,
    start_time: input.start_time,
    end_time: input.end_time,
    color: input.color ?? null,
  };

  // Supabase Postgrest type inference for upsert payloads is unreliable here,
  // so we keep the return type strong while bypassing the local generic mismatch.
  const { data, error } = await supabase
    .from('schedules')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .upsert(payload as any)
    .select('*')
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data: data as Schedule };
}

export async function deleteMySchedule(id: string): Promise<ApiResponse<null>> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return { success: false, error: 'Not authenticated.' };

  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return { success: false, error: error.message };
  return { success: true, data: null };
}
