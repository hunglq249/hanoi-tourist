-- Run this in Supabase SQL Editor to create all tables

create table if not exists cars (
  id text primary key,
  name text not null,
  brand text not null,
  category text not null,
  seats integer not null,
  year integer not null,
  transmission text not null,
  fuel text not null,
  price_per_day numeric not null,
  price_per_month numeric not null,
  image text not null default '',
  features text[] not null default '{}',
  available boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists services (
  id text primary key,
  icon text not null,
  title text not null,
  description text not null,
  features text[] not null default '{}',
  highlight boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists pricing_plans (
  id text primary key,
  name text not null,
  price text not null,
  unit text not null,
  description text not null,
  features text[] not null default '{}',
  cta text not null,
  highlight boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id text primary key,
  name text not null,
  role text not null,
  avatar text not null,
  rating integer not null default 5,
  text text not null,
  date text not null,
  created_at timestamptz not null default now()
);

create table if not exists faqs (
  id text primary key,
  q text not null,
  a text not null,
  created_at timestamptz not null default now()
);

create table if not exists whyus_reasons (
  id text primary key,
  icon text not null,
  title text not null,
  description text not null,
  created_at timestamptz not null default now()
);

-- key/value store for misc settings (used for partners list)
create table if not exists settings (
  key text primary key,
  value jsonb not null default '[]'::jsonb
);

create table if not exists bookings (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null default 'pending',
  type text not null,
  full_name text not null,
  phone text not null,
  email text,
  car_model text not null,
  start_date text not null,
  end_date text not null,
  pickup_location text not null,
  notes text,
  estimated_price numeric
);
