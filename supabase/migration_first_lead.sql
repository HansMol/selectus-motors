-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Adds first_lead_received_at to track when billing should be triggered

ALTER TABLE dealers
  ADD COLUMN IF NOT EXISTS first_lead_received_at timestamptz;
