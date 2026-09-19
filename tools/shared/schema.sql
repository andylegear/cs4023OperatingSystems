-- CS4023 active-learning-tool telemetry schema (Supabase / Postgres)
--
-- Recreates the `tool_telemetry_events` table used by
-- ActiveLearningTools/shared/telemetry.js. Safe to re-run: uses
-- IF NOT EXISTS / OR REPLACE throughout, so it can also be used to add
-- missing columns to an existing table (e.g. the device_type/viewport
-- columns added after the table was first created).
--
-- Run this in the Supabase SQL editor (or via psql) against a fresh project,
-- or after adding new fields to the telemetry.js payload.

create table if not exists tool_telemetry_events (
  id               bigint generated always as identity primary key,
  created_at       timestamptz not null default now(),

  -- identity / context (see telemetry.js sendEvent())
  study_token      text not null,
  student_name     text,
  student_id       text,
  tool_id          text not null,
  week             int,
  event_type       text not null check (event_type in ('opened', 'progress', 'heartbeat', 'completed', 'closed')),

  -- progress (updateProgress() / markComplete())
  score            numeric,
  max_score        numeric,
  attempts_total   int,
  active_seconds   int,

  -- device/viewport classification (classifyDevice(), added later)
  device_type      text check (device_type in ('mobile', 'tablet', 'desktop')),
  viewport_width   int,
  viewport_height  int,
  is_touch         boolean
);

-- Add these individually if the table already exists from an earlier version:
alter table tool_telemetry_events add column if not exists device_type text;
alter table tool_telemetry_events add column if not exists viewport_width int;
alter table tool_telemetry_events add column if not exists viewport_height int;
alter table tool_telemetry_events add column if not exists is_touch boolean;
alter table tool_telemetry_events add column if not exists student_name text;
alter table tool_telemetry_events add column if not exists student_id text;

create index if not exists idx_tool_telemetry_events_session
  on tool_telemetry_events (study_token, tool_id);

create index if not exists idx_tool_telemetry_events_created_at
  on tool_telemetry_events (created_at);

-- Row Level Security: anon (publishable) key may INSERT but never read.
-- session_progress.py uses the service-role key instead, which bypasses RLS.
alter table tool_telemetry_events enable row level security;

drop policy if exists "anon can insert telemetry" on tool_telemetry_events;
create policy "anon can insert telemetry"
  on tool_telemetry_events
  for insert
  to anon
  with check (true);

-- No select/update/delete policies are defined for anon — the table is
-- effectively write-only from the browser.
