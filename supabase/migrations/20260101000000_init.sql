-- Portfolio schema. Run in Supabase → SQL Editor, or `supabase db push` with the CLI.
-- Content tables are public-read (RLS). contact_messages is insert-only for visitors;
-- read submissions in the Table Editor (service role) — never from the site.

create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  first_name text not null default 'YOUR',
  last_name text not null default 'NAME',
  display_name text not null default 'Your Name',
  role text not null default 'Software Engineer',
  tagline text not null default '',
  available boolean not null default true,
  availability_label text not null default 'Open to Roles & Freelance',
  years_label text not null default '3+ years of experience',
  email text not null default '',
  portrait_url text,          -- full URL, /public path, or path inside the storage bucket
  avatar_url text,
  cv_url text,                -- CV/résumé PDF; null hides the "Download CV" button
  cta_title text not null default 'HIRING, OR HAVE A PROJECT?',
  cta_body text not null default '',
  work_count text not null default '40',
  service_count text not null default '4',
  experience_count text not null default '3y+',
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  type text not null default 'Professional' check (type in ('Professional', 'Freelance', 'Personal', 'Exploration')),
  name text not null,
  title text not null,
  tags text[] not null default '{}',
  summary text not null default '',
  note text not null default '',
  role text,                  -- e.g. 'Lead developer'
  highlights jsonb not null default '[]', -- [{"label": "Architecture", "text": "…"}, …]
  prompts jsonb not null default '[]',    -- optional /PROMPTS section, same shape as highlights
  cover_url text,
  gallery text[] not null default '{}', -- [hero, section 2, section 3, …]
  live_url text,
  repo_url text,              -- public source code; null hides "View Code"
  featured boolean not null default true, -- shown on the home grid (first 4)
  published boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  preview_url text,
  sort int not null default 0
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  period text not null,
  summary text,               -- one or two lines under the role
  preview_url text,
  sort int not null default 0
);

create table if not exists public.socials (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  icon text not null check (icon in ('dribbble', 'instagram', 'linkedin', 'behance', 'x', 'github')),
  sort int not null default 0
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  message text not null check (char_length(message) between 10 and 4000),
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch before update on public.site_settings for each row execute function public.touch_updated_at();
drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects for each row execute function public.touch_updated_at();

alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.experience enable row level security;
alter table public.socials enable row level security;
alter table public.contact_messages enable row level security;

create policy "Public read" on public.site_settings for select to anon, authenticated using (true);
create policy "Public read published" on public.projects for select to anon, authenticated using (published);
create policy "Public read" on public.services for select to anon, authenticated using (true);
create policy "Public read" on public.experience for select to anon, authenticated using (true);
create policy "Public read" on public.socials for select to anon, authenticated using (true);
create policy "Visitors can send" on public.contact_messages for insert to anon, authenticated with check (handled = false);

grant select on public.site_settings, public.projects, public.services, public.experience, public.socials to anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;

-- Public bucket for portrait, covers, case-study shots and hover previews.
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true) on conflict (id) do nothing;
