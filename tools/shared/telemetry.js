/*
 * telemetry.js — shared CS4023 active-learning-tool telemetry client.
 * Vanilla JS, no dependencies. Include via:
 *   <script src="../../shared/telemetry.js"></script>
 *
 * Usage in each tool:
 *   Telemetry.init("1_1", 1);                  // toolId, week — call once on page load
 *   Telemetry.updateProgress(score, maxScore); // call each time the score changes
 *   Telemetry.markComplete(attemptsTotal);     // call once when the tool is completed
 *
 * Sends anon INSERT-only events to Supabase (tool_telemetry_events table).
 * The publishable key below is safe to embed client-side: RLS only allows
 * inserts, never reads, for the anon/publishable role.
 *
 * Every event also carries device_type ("mobile"|"tablet"|"desktop"),
 * viewport_width, viewport_height, is_touch — requires matching columns
 * on tool_telemetry_events (see build_public.ps1 / repo docs).
 *
 * Every event also carries student_name and student_id, captured once via a
 * blocking prompt and cached in localStorage, so telemetry rows can be
 * matched against the MS Forms consent list before analysis (i.e. so only
 * consented students' data is examined). See ensureIdentity() below.
 */
(function (global) {
  "use strict";

  const SUPABASE_URL = "https://silazvtqdxbunpgoivur.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Yrrd2GQm68PMwSC6CHgzbg_S0HDyT9_";
  const TABLE = "tool_telemetry_events";

  const TOKEN_KEY = "cs4023_study_token";
  const IDENTITY_KEY = "cs4023_study_identity";
  const IDLE_LIMIT_MS = 60 * 1000;
  const HEARTBEAT_INTERVAL_MS = 30 * 1000;
  const MAX_ACTIVE_SECONDS = 1800;
  const MAX_CONSECUTIVE_FAILURES = 3;

  let toolId = null;
  let week = null;
  let studyToken = null;
  let studentName = null;
  let studentId = null;
  let activeSeconds = 0;
  let lastActivityAt = Date.now();
  let idle = false;
  let heartbeatTimer = null;
  let secondsTimer = null;
  let deviceInfo = null;
  let consecutiveFailures = 0;
  let telemetryDisabled = false;

  // Backend (e.g. a paused/suspended Supabase project) may be unreachable at any time.
  // Telemetry must never block or break the learning tool, so after a few failed sends
  // in a row we stop trying, log once, and let the tool carry on as normal.
  function disableTelemetry(reason) {
    if (telemetryDisabled) return;
    telemetryDisabled = true;
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    console.info("[Telemetry] Publishing unavailable — continuing without it (" + reason + ").");
  }

  // Coarse device classification so completion rates can be compared across screen sizes.
  function classifyDevice() {
    const w = window.innerWidth || document.documentElement.clientWidth || 0;
    const h = window.innerHeight || document.documentElement.clientHeight || 0;
    const isTouch = "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0;
    const coarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    let deviceType;
    if (w < 768) deviceType = "mobile";
    else if (w < 1024 && (isTouch || coarsePointer)) deviceType = "tablet";
    else deviceType = "desktop";
    return {
      device_type: deviceType,
      viewport_width: w,
      viewport_height: h,
      is_touch: !!(isTouch || coarsePointer),
    };
  }

  function getOrCreateToken() {
    let token = null;
    try {
      token = localStorage.getItem(TOKEN_KEY);
    } catch (e) {
      /* localStorage unavailable — fall back to a session-only token */
    }
    if (!token) {
      token = "tok_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      try {
        localStorage.setItem(TOKEN_KEY, token);
      } catch (e) {
        /* ignore — token still usable for this session */
      }
    }
    return token;
  }

  function getStoredIdentity() {
    try {
      const raw = localStorage.getItem(IDENTITY_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.name && parsed.studentId) return parsed;
    } catch (e) {
      /* corrupt/unavailable — fall through to re-prompt */
    }
    return null;
  }

  function storeIdentity(identity) {
    try {
      localStorage.setItem(IDENTITY_KEY, JSON.stringify(identity));
    } catch (e) {
      /* localStorage unavailable — identity only lasts this page load */
    }
  }

  // Blocks (via window.prompt) until name + student ID are captured, so telemetry
  // rows can later be matched against the MS Forms consent list. Cached in
  // localStorage so only the first tool a student opens ever prompts.
  function ensureIdentity() {
    const cached = getStoredIdentity();
    if (cached) {
      studentName = cached.name;
      studentId = cached.studentId;
      return;
    }

    let name = "";
    let id = "";
    for (let attempt = 0; attempt < 3 && (!name || !id); attempt++) {
      name = (window.prompt("Please enter your full name (as given on the consent form):") || "").trim();
      id = (window.prompt("Please enter your student ID:") || "").trim();
    }

    studentName = name || null;
    studentId = id || null;
    storeIdentity({ name: studentName, studentId: studentId });
  }

  function sendEvent(eventType, extra) {
    if (telemetryDisabled) return;

    const payload = Object.assign(
      {
        study_token: studyToken,
        student_name: studentName,
        student_id: studentId,
        tool_id: toolId,
        week: week,
        event_type: eventType,
      },
      deviceInfo || {},
      extra || {}
    );

    const url = SUPABASE_URL + "/rest/v1/" + TABLE;
    let body;
    try {
      body = JSON.stringify(payload);
    } catch (e) {
      return; // malformed payload — never let telemetry throw into the caller
    }

    // sendBeacon can't set custom headers, so it's only used for the closing event,
    // where the fetch keepalive fallback below covers browsers without beacon support.
    if (eventType === "closed" && navigator.sendBeacon) {
      try {
        const blob = new Blob([body], { type: "application/json" });
        const beaconUrl = url + "?apikey=" + encodeURIComponent(SUPABASE_PUBLISHABLE_KEY);
        navigator.sendBeacon(beaconUrl, blob);
      } catch (e) {
        /* best-effort; ignore */
      }
      return;
    }

    try {
      fetch(url, {
        method: "POST",
        keepalive: eventType === "closed",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: "Bearer " + SUPABASE_PUBLISHABLE_KEY,
          Prefer: "return=minimal",
        },
        body: body,
      })
        .then(function (response) {
          if (response.ok) {
            consecutiveFailures = 0;
          } else {
            consecutiveFailures += 1;
            if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
              disableTelemetry("HTTP " + response.status);
            }
          }
        })
        .catch(function () {
          consecutiveFailures += 1;
          if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
            disableTelemetry("network unreachable");
          }
        });
    } catch (e) {
      /* telemetry is best-effort; swallow any synchronous errors (e.g. fetch unavailable) */
      disableTelemetry("fetch threw synchronously");
    }
  }

  function capSeconds(s) {
    return Math.min(Math.round(s), MAX_ACTIVE_SECONDS);
  }

  function tickActiveSeconds() {
    const now = Date.now();
    const sinceActivity = now - lastActivityAt;
    if (sinceActivity > IDLE_LIMIT_MS || document.hidden) {
      idle = true;
    } else if (!idle) {
      activeSeconds += 1;
    }
  }

  function markActivity() {
    lastActivityAt = Date.now();
    idle = false;
  }

  function sendHeartbeat() {
    sendEvent("heartbeat", { active_seconds: capSeconds(activeSeconds) });
  }

  function sendClosed() {
    sendEvent("closed", { active_seconds: capSeconds(activeSeconds) });
  }

  function init(newToolId, newWeek) {
    toolId = newToolId;
    week = newWeek;
    studyToken = getOrCreateToken();
    ensureIdentity();
    deviceInfo = classifyDevice();

    window.addEventListener("resize", function () {
      deviceInfo = classifyDevice();
    });

    ["mousemove", "keydown", "click", "touchstart", "scroll"].forEach(function (evt) {
      document.addEventListener(evt, markActivity, { passive: true });
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        idle = true;
      } else {
        markActivity();
      }
    });
    window.addEventListener("beforeunload", sendClosed);

    secondsTimer = setInterval(tickActiveSeconds, 1000);
    heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);

    sendEvent("opened");
  }

  function markComplete(attemptsTotal) {
    sendEvent("completed", {
      active_seconds: capSeconds(activeSeconds),
      attempts_total: attemptsTotal != null ? attemptsTotal : null,
    });
  }

  // Fire-and-forget snapshot of in-progress score; lets analysis derive % complete over time.
  // attemptsTotal (optional) is how many questions have been answered so far (right or wrong),
  // which may be higher than score if the tool allows retries.
  function updateProgress(score, maxScore, attemptsTotal) {
    sendEvent("progress", {
      active_seconds: capSeconds(activeSeconds),
      score: score,
      max_score: maxScore,
      attempts_total: attemptsTotal != null ? attemptsTotal : null,
    });
  }

  function getToken() {
    return studyToken;
  }

  function getIdentity() {
    return { name: studentName, studentId: studentId };
  }

  // Every public entry point is wrapped so that a bug or an unavailable backend in the
  // telemetry layer can never throw into (and break) the tool that calls it.
  function safe(fn) {
    return function () {
      try {
        return fn.apply(null, arguments);
      } catch (e) {
        disableTelemetry("unexpected error: " + (e && e.message ? e.message : e));
      }
    };
  }

  global.Telemetry = {
    init: safe(init),
    markComplete: safe(markComplete),
    updateProgress: safe(updateProgress),
    getToken: getToken,
    getIdentity: getIdentity,
  };
})(window);
