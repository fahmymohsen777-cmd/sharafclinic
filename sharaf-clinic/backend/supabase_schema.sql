-- =============================================
-- SHARAF DENTAL CLINIC — Supabase SQL Schema
-- Run this in: Supabase Dashboard > SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE (extends Supabase auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile"   ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
-- Admins (service role) can see all via service key — no policy needed

-- =============================================
-- BOOKINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id                         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                       TEXT NOT NULL,
  phone                      TEXT NOT NULL,
  date                       DATE NOT NULL,
  time                       TEXT NOT NULL,  -- "HH:MM" e.g. "18:00"
  service                    TEXT NOT NULL,
  status                     TEXT NOT NULL DEFAULT 'confirmed'
                               CHECK (status IN ('pending','confirmed','completed','cancelled')),
  notes                      TEXT,
  whatsapp_confirmation_sent BOOLEAN DEFAULT FALSE,
  whatsapp_reminder_sent     BOOLEAN DEFAULT FALSE,
  cancelled_at               TIMESTAMPTZ,
  cancelled_by               TEXT,          -- 'user' | 'admin'
  created_at                 TIMESTAMPTZ DEFAULT NOW(),
  updated_at                 TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast date queries
CREATE INDEX IF NOT EXISTS idx_bookings_date   ON public.bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_user   ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Bookings: users see only their own
CREATE POLICY "Users can view own bookings"   ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings"     ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);
-- Note: backend uses service_role key → bypasses RLS for admin operations

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- SETTINGS TABLE (singleton row)
-- =============================================
CREATE TABLE IF NOT EXISTS public.settings (
  id                   SERIAL PRIMARY KEY,
  max_bookings_per_day INTEGER NOT NULL DEFAULT 10,
  reminder_enabled     BOOLEAN DEFAULT TRUE,
  clinic_phone         TEXT DEFAULT '+201008080358',
  available_time_slots TEXT[] DEFAULT ARRAY['18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
  working_days         INTEGER[] DEFAULT ARRAY[0,1,2,3,4,6],  -- 5=Friday (closed)
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default settings row
INSERT INTO public.settings (id, max_bookings_per_day)
VALUES (1, 10)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- MAKE FIRST USER AN ADMIN (run after signup)
-- Replace 'admin@sharafclinic.com' with your email
-- =============================================
-- UPDATE public.profiles SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@sharafclinic.com');
