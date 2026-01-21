-- Create Clients Table
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Clients Policies
DROP POLICY IF EXISTS "Users can view own clients" ON public.clients;
CREATE POLICY "Users can view own clients"
  ON public.clients FOR SELECT
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can insert own clients" ON public.clients;
CREATE POLICY "Users can insert own clients"
  ON public.clients FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can update own clients" ON public.clients;
CREATE POLICY "Users can update own clients"
  ON public.clients FOR UPDATE
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can delete own clients" ON public.clients;
CREATE POLICY "Users can delete own clients"
  ON public.clients FOR DELETE
  USING ( auth.uid() = user_id );

-- Ensure User Profiles has password column
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS password text;

-- Fix User Profiles RLS (Allow Insert/Update for signup)
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Ensure Policies Table Exists (and has new columns)
CREATE TABLE IF NOT EXISTS public.policies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  client_id uuid REFERENCES public.clients(id),
  policy_number text,
  carrier text,
  effective_date timestamp with time zone,
  expiry_date timestamp with time zone,
  pdf_url text, 
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add columns if table already existed but columns were missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'policies' AND column_name = 'client_id') THEN
        ALTER TABLE public.policies ADD COLUMN client_id uuid REFERENCES public.clients(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'policies' AND column_name = 'effective_date') THEN
        ALTER TABLE public.policies ADD COLUMN effective_date timestamp with time zone;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'policies' AND column_name = 'expiry_date') THEN
        ALTER TABLE public.policies ADD COLUMN expiry_date timestamp with time zone;
    END IF;
END $$;

-- Fix Policies RLS
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own policies" ON public.policies;
CREATE POLICY "Users can view own policies"
  ON public.policies FOR SELECT
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can insert own policies" ON public.policies;
CREATE POLICY "Users can insert own policies"
  ON public.policies FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can update own policies" ON public.policies;
CREATE POLICY "Users can update own policies"
  ON public.policies FOR UPDATE
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can delete own policies" ON public.policies;
CREATE POLICY "Users can delete own policies"
  ON public.policies FOR DELETE
  USING ( auth.uid() = user_id );

-- Ensure Extractions Table Exists
CREATE TABLE IF NOT EXISTS public.policy_extractions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users,
    policy_id uuid REFERENCES public.policies, -- Can be null for direct uploads
    file_name text,
    raw_text text,
    summary jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Fix Extractions RLS
ALTER TABLE public.policy_extractions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own extractions" ON public.policy_extractions;
CREATE POLICY "Users can view own extractions"
  ON public.policy_extractions FOR SELECT
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can insert own extractions" ON public.policy_extractions;
CREATE POLICY "Users can insert own extractions"
  ON public.policy_extractions FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can delete own extractions" ON public.policy_extractions;
CREATE POLICY "Users can delete own extractions"
  ON public.policy_extractions FOR DELETE
  USING ( auth.uid() = user_id );

-- Create Company Settings Table
CREATE TABLE IF NOT EXISTS public.company_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  company_name text,
  website text,
  logo_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Company Settings
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own settings" ON public.company_settings;
CREATE POLICY "Users can view own settings"
  ON public.company_settings FOR SELECT
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can insert own settings" ON public.company_settings;
CREATE POLICY "Users can insert own settings"
  ON public.company_settings FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can update own settings" ON public.company_settings;
CREATE POLICY "Users can update own settings"
  ON public.company_settings FOR UPDATE
  USING ( auth.uid() = user_id );
