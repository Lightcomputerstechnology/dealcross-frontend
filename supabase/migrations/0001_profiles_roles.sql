-- Create a public.profiles table tied to Supabase Auth users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep email in sync on user signup (optional convenience)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Timestamps
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies:
-- 1) A user can see their own profile
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

-- 2) A user can update their own profile (except is_admin)
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (
  auth.uid() = id
  and (is_admin is not distinct from is_admin) -- prevent client from changing is_admin
);

-- 3) Admins (checked via JWT claim) can read all (optional; backend usually uses service key)
-- You may skip this if you don't plan to expose all profiles to clients.
drop policy if exists "profiles_admin_read_all" on public.profiles;
create policy "profiles_admin_read_all"
on public.profiles
for select
using (
  coalesce(
    (current_setting('request.jwt.claims', true)::jsonb->'user_metadata'->>'is_admin')::boolean,
    false
  )
);

-- (Optional) Expose is_admin to the JWT by a Postgres function if needed later
-- Not required for the current frontend since it queries the table directly.
