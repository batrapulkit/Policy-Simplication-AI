-- Add password column to user_profiles (if not exists)
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS password text;

-- Allow users to INSERT their own profile
CREATE POLICY "Users can insert own profile"
ON public.user_profiles
FOR INSERT
WITH CHECK ( auth.uid() = id );

-- Allow users to UPDATE their own profile
CREATE POLICY "Users can update own profile"
ON public.user_profiles
FOR UPDATE
USING ( auth.uid() = id );
