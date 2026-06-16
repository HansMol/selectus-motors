-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Adds Stripe subscription fields to the dealers table

ALTER TABLE dealers
  ADD COLUMN IF NOT EXISTS plan text CHECK (plan IN ('solo', 'pro')),
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
  ADD COLUMN IF NOT EXISTS subscription_status text NOT NULL DEFAULT 'free'
    CHECK (subscription_status IN ('free', 'active', 'cancelled', 'past_due')),
  ADD COLUMN IF NOT EXISTS billing_starts_at timestamptz;
