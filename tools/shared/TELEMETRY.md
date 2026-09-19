# CS4023 active-learning-tool telemetry

How usage data is collected from the `ActiveLearningTools/*/Tool_*` pages and
where it lives. See `telemetry.js` for the client implementation and
`schema.sql` for the Supabase/Postgres table definition.

## What it does

`shared/telemetry.js` is a small vanilla-JS client, loaded by every tool via:

```html
<script src="../../shared/telemetry.js"></script>
```

Each tool calls three functions:

```js
Telemetry.init("1_1", 1);                     // toolId, week — once on page load
Telemetry.updateProgress(score, maxScore, attemptsTotal); // whenever score/attempts change
Telemetry.markComplete(attemptsTotal);        // once when the exercise is finished
```

- `score` / `maxScore` — how far through the exercise the student has progressed
  (e.g. cards resolved out of total cards). Used to compute `max_completion_pct`.
- `attemptsTotal` (optional) — how many questions have been answered so far,
  right or wrong. May exceed `score` if the tool allows retries; used to compute
  `accuracy_pct` (score / attempts) separately from progress.

The client also tracks, without any per-tool code:

- **Active time** — seconds where the tab is visible and the student has
  interacted (mouse/keyboard/touch/scroll) within the last 60s idle window,
  capped at 1800s (30 min) per session to guard against runaway tabs.
- **Device context** — `device_type` (`mobile` / `tablet` / `desktop`),
  `viewport_width`, `viewport_height`, `is_touch`. Classified once at `init()`
  from `window.innerWidth`/`innerHeight` and touch/pointer capability, and
  re-classified on `resize` (covers orientation changes). Added to every event.
  This exists to let analysis compare completion rates across device types —
  e.g. whether students on phones abandon exercises more often than on
  laptops/tablets.
- **Anonymous identity** — a random `study_token` generated once and persisted
  in `localStorage`, so repeat visits from the same browser link back to the
  same session without collecting any PII.
- **Named identity (name + student ID)** — on the *first* tool a student opens,
  `ensureIdentity()` blocks with two `window.prompt()` calls (name, student ID),
  then caches the result in `localStorage` (`cs4023_study_identity`) so no
  subsequent tool ever prompts again. `student_name`/`student_id` are sent with
  every event alongside `study_token`. This exists so telemetry rows can be
  matched directly against the MS Forms consent list before analysis — i.e. so
  only data from students who actually consented is ever examined, rather than
  relying solely on students correctly copy-pasting `study_token` into the
  consent form (see `token-banner.html`, which is still used as a fallback/aid).
  If `localStorage` is unavailable, or a student submits blank answers three
  times, telemetry proceeds anyway with `null` name/id rather than blocking the
  tool — never let identity capture break the learning exercise itself.

Events fire automatically at these points:

| event_type  | When |
|-------------|------|
| `opened`    | Page load, once `init()` is called |
| `progress`  | Each `updateProgress()` call |
| `heartbeat` | Every 30s while the tab is open |
| `completed` | Once, on `markComplete()` |
| `closed`    | On `beforeunload` (via `sendBeacon`, falls back to `fetch keepalive`) |

## Where it goes

Events are `INSERT`-only rows in a Supabase Postgres table, `tool_telemetry_events`
(see `schema.sql`). The client uses the Supabase **publishable** (anon) key,
which is safe to embed client-side — Row Level Security only grants `INSERT`
to the anon role; there is no read access from the browser.

## Adding a new column

If you add a new field to the telemetry payload in `telemetry.js`, you **must**
add the matching column to `tool_telemetry_events` first (via Supabase SQL
editor, or by re-running `schema.sql`). PostgREST rejects inserts that
reference unknown columns, so deploying client code ahead of the schema change
breaks *all* telemetry, not just the new field.

## Analysis

`scripts/session_progress.py` reads `.env` (`SUPABASE_URL`,
`SUPABASE_SERVICE_KEY` — service key, not the publishable key, since this
script reads rows) and prints:

- Per-session (`study_token` + `tool_id`) best score, progress %, attempts,
  accuracy %, device type, and completion status.
- A completion-rate-by-`device_type` breakdown, to check whether mobile/tablet
  students complete exercises at a different rate than desktop students.

```
python scripts/session_progress.py [--since 2026-08-30] [--tool 1_1] [--out summary.json]
```

## Deploying changes

`shared/telemetry.js` is copied into the public deploy repo at
`tools/shared/telemetry.js` (one shared file used by all tools — no per-tool
changes needed for client-wide telemetry changes). See
`.github/skills/cs4023-week-build/SKILL.md` for the full build/deploy flow;
for a telemetry-only change it's enough to copy just this one file across,
commit, and push — no need to rerun the full `build_public.ps1`.
