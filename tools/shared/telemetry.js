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
 */
(function (global) {
  "use strict";

  const SUPABASE_URL = "https://silazvtqdxbunpgoivur.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Yrrd2GQm68PMwSC6CHgzbg_S0HDyT9_";
  const TABLE = "tool_telemetry_events";

  const TOKEN_KEY = "cs4023_study_token";
  const IDLE_LIMIT_MS = 60 * 1000;
  const HEARTBEAT_INTERVAL_MS = 30 * 1000;
  const MAX_ACTIVE_SECONDS = 1800;

  let toolId = null;
  let week = null;
  let studyToken = null;
  let activeSeconds = 0;
  let lastActivityAt = Date.now();
  let idle = false;
  let heartbeatTimer = null;
  let secondsTimer = null;

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

  function sendEvent(eventType, extra) {
    const payload = Object.assign(
      {
        study_token: studyToken,
        tool_id: toolId,
        week: week,
        event_type: eventType,
      },
      extra || {}
    );

    const url = SUPABASE_URL + "/rest/v1/" + TABLE;
    const body = JSON.stringify(payload);

    // sendBeacon can't set custom headers, so it's only used for the closing event,
    // where the fetch keepalive fallback below covers browsers without beacon support.
    if (eventType === "closed" && navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const beaconUrl = url + "?apikey=" + encodeURIComponent(SUPABASE_PUBLISHABLE_KEY);
      navigator.sendBeacon(beaconUrl, blob);
      return;
    }

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
    }).catch(function () {
      /* telemetry is best-effort; swallow network errors */
    });
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
  function updateProgress(score, maxScore) {
    sendEvent("progress", {
      active_seconds: capSeconds(activeSeconds),
      score: score,
      max_score: maxScore,
    });
  }

  function getToken() {
    return studyToken;
  }

  global.Telemetry = {
    init: init,
    markComplete: markComplete,
    updateProgress: updateProgress,
    getToken: getToken,
  };
})(window);
