-- =========================================================
-- Supabase Schema for Oluwadamilola's Milestone Birthday Site
-- Run this in your Supabase SQL Editor:
-- =========================================================

-- 1. Create the Tributes table
CREATE TABLE IF NOT EXISTS public.tributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  relationship_category TEXT DEFAULT 'friends',
  three_words TEXT,
  appreciation TEXT,
  standout_quality TEXT,
  describe_to_stranger TEXT,
  birthday_wish TEXT,
  prayer TEXT,
  future_message TEXT,
  likes INTEGER DEFAULT 0,
  is_wife BOOLEAN DEFAULT FALSE,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.tributes ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anyone (guests) to read tributes
CREATE POLICY "Public tributes are viewable by everyone"
ON public.tributes
FOR SELECT
USING (true);

-- 4. Policy: Allow anyone (guests) to insert a tribute
CREATE POLICY "Anyone can submit a tribute"
ON public.tributes
FOR INSERT
WITH CHECK (true);

-- 5. Policy: Allow incrementing likes
CREATE POLICY "Anyone can like a tribute"
ON public.tributes
FOR UPDATE
USING (true)
WITH CHECK (true);

-- 6. Enable Realtime Replication
ALTER PUBLICATION supabase_realtime ADD TABLE public.tributes;
