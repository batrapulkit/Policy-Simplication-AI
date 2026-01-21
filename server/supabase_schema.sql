-- Link to Supabase Auth Users
-- We do NOT store passwords here; Supabase Auth handles that securely.
create table public.user_profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table to store uploaded Policy PDF metadata
create table public.policies (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  policy_number text,
  carrier text,
  pdf_url text not null, -- URL to the file in Supabase Storage
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table to store AI responses/extractions
create table public.policy_extractions (
  id uuid default gen_random_uuid() primary key,
  policy_id uuid references public.policies not null,
  raw_text text,
  summary_json jsonb, -- Stores the structured AI response
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.user_profiles enable row level security;
alter table public.policies enable row level security;
alter table public.policy_extractions enable row level security;

-- Policies (Security Rules)

-- User Profiles: Users can see their own profile
create policy "Users can view own profile"
  on public.user_profiles for select
  using ( auth.uid() = id );

-- Policies Table: Users can only see their own policies
create policy "Users can view own policies"
  on public.policies for select
  using ( auth.uid() = user_id );

create policy "Users can insert own policies"
  on public.policies for insert
  with check ( auth.uid() = user_id );

-- Extractions: Users can view extractions for their own policies
create policy "Users can view own extractions"
  on public.policy_extractions for select
  using ( 
    exists (
      select 1 from public.policies
      where policies.id = policy_extractions.policy_id
      and policies.user_id = auth.uid()
    )
  );
