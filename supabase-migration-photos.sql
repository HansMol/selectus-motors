-- Run this in Supabase Dashboard → SQL Editor
-- Adds photos column to listings table

ALTER TABLE listings
  ADD COLUMN IF NOT EXISTS photos text[] NOT NULL DEFAULT '{}';

-- Also create the storage bucket for listing photos
-- (Do this via Supabase Dashboard → Storage → New bucket)
-- Bucket name: listing-photos
-- Public bucket: YES (car photos are public)
