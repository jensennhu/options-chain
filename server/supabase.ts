import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export interface MetricsSnapshot {
  id?: string;
  symbol: string;
  total_options: number;
  discounted_options: number;
  avg_discount: number;
  max_discount: number;
  high_volume_options: number;
  avg_implied_volatility: number;
  created_at?: string;
}
