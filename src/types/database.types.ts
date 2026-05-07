export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role?: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  timezone?: string;
  language?: string;
  created_at: string;
  updated_at: string;
}

export interface Schedule {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  start_time: string;
  end_time: string;
  is_recurring: boolean;
  recurrence_pattern?: 'daily' | 'weekly' | 'monthly';
  color?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScheduleEvent {
  id: string;
  schedule_id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  location?: string;
  attendees?: string[];
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'created_at' | 'updated_at'> & Partial<Pick<User, 'id'>>;
        Update: Partial<User>;
        Relationships: [];
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & { id: string };
        Update: Partial<Profile> & { id?: string };
        Relationships: [];
      };
      schedules: {
        Row: Schedule;
        Insert: Omit<Schedule, 'created_at' | 'updated_at' | 'is_recurring' | 'recurrence_pattern'> &
          Partial<Pick<Schedule, 'id' | 'is_recurring' | 'recurrence_pattern'>>;
        Update: Partial<Schedule>;
        Relationships: [];
      };
      schedule_events: {
        Row: ScheduleEvent;
        Insert: Omit<ScheduleEvent, 'created_at' | 'updated_at'> & Partial<Pick<ScheduleEvent, 'id'>>;
        Update: Partial<ScheduleEvent>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
