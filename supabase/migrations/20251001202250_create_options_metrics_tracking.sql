/*
  # Options Metrics Tracking System

  1. New Tables
    - `options_metrics_snapshots`
      - `id` (uuid, primary key) - Unique identifier for each snapshot
      - `symbol` (text) - Stock symbol (e.g., AAPL, TSLA)
      - `total_options` (integer) - Total number of options available
      - `discounted_options` (integer) - Number of options trading below fair value
      - `avg_discount` (numeric) - Average discount percentage across all options
      - `max_discount` (numeric) - Largest discount opportunity found
      - `high_volume_options` (integer) - Number of options with volume > 1000
      - `avg_implied_volatility` (numeric) - Average implied volatility across options
      - `created_at` (timestamptz) - Timestamp when snapshot was taken

  2. Security
    - Enable RLS on `options_metrics_snapshots` table
    - Add policy for authenticated users to read all metrics
    - Add policy for authenticated users to insert metrics

  3. Indexes
    - Index on symbol for fast lookups
    - Index on created_at for time-based queries
    - Composite index on (symbol, created_at) for filtered historical queries
*/

CREATE TABLE IF NOT EXISTS options_metrics_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text NOT NULL,
  total_options integer NOT NULL DEFAULT 0,
  discounted_options integer NOT NULL DEFAULT 0,
  avg_discount numeric NOT NULL DEFAULT 0,
  max_discount numeric NOT NULL DEFAULT 0,
  high_volume_options integer NOT NULL DEFAULT 0,
  avg_implied_volatility numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE options_metrics_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read metrics snapshots"
  ON options_metrics_snapshots
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert metrics snapshots"
  ON options_metrics_snapshots
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_options_metrics_symbol 
  ON options_metrics_snapshots(symbol);

CREATE INDEX IF NOT EXISTS idx_options_metrics_created_at 
  ON options_metrics_snapshots(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_options_metrics_symbol_created_at 
  ON options_metrics_snapshots(symbol, created_at DESC);