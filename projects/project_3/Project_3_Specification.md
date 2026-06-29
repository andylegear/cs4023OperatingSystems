# CS4023 Operating Systems
## Project 3 – Readers-Writers Synchronisation
**Worth: 10% of module grade | Announced: 15 October 2026 (Week 6) | Due: Thursday 29 October 2026, 17:00**

---

### Overview

The Readers-Writers problem is one of the classic synchronisation problems in operating systems, appearing in every major OS textbook precisely because it captures a fundamental tension in shared-memory concurrent systems: allowing maximum concurrency for read-only access while guaranteeing exclusive access for writes. Real-world instances are everywhere — database table access, filesystem metadata, in-kernel page table updates, and web server session caches all require readers-writers-style synchronisation.

In this project you will simulate a shared "database" as an array of integers, accessed concurrently by reader threads and writer threads. You will implement the problem in four progressive parts: first demonstrating the race condition that occurs without synchronisation, then implementing a reader-preference solution using semaphores, then a writer-preference variant, and finally a fair (starvation-free) solution using POSIX condition variables and a mutex. The progression is essential — each part must demonstrate the limitation of the previous one.

The value of this project lies in your ability to reason about correctness properties. A working Part D implementation that you cannot explain in OS terms is worth less than a broken Part D implementation accompanied by a report that precisely describes why the race conditions and starvation scenarios occur at the kernel scheduling level.

### Learning Outcomes

On completion you will be able to:
- Identify and demonstrate a data race condition in concurrent shared-memory code
- Implement semaphore-based mutual exclusion using POSIX unnamed semaphores (`sem_wait()`, `sem_post()`)
- Explain the reader-preference and writer-preference policies and demonstrate empirically that reader-preference causes writer starvation
- Implement a starvation-free readers-writers solution using `pthread_mutex_t` and `pthread_cond_t`
- Distinguish busy-waiting from blocking synchronisation and explain the OS scheduling implications of each
- Critically evaluate AI-generated synchronisation code for correctness, liveness, and fairness

### Background

The following lecture topics are directly relevant. You must reference them by number in your AI log and README:

- **Lecture 8**: The Critical Section Problem — mutual exclusion, progress, bounded waiting; race conditions; Peterson's solution; hardware-based solutions
- **Lecture 9**: Semaphores — counting and binary; `sem_wait()` and `sem_post()` semantics; the readers-writers problem formulation; the reader-preference and writer-preference solutions
- **Lecture 10**: Monitors and condition variables — `pthread_mutex_lock/unlock`, `pthread_cond_wait`, `pthread_cond_signal`, `pthread_cond_broadcast`; spurious wakeups; the distinction between signalling and broadcasting
- **Lecture 6** (background): Thread safety, shared heap, the cost of context switches relative to lock granularity

---

### Requirements

#### Functional Requirements

1. **Shared database**: Implement a "database" as a heap-allocated array of `int` of configurable size D (default 256). Initialise all elements to 0. Accept D, the number of reader threads (R), the number of writer threads (W), and the number of operations per thread (OPS) as command-line arguments.

2. **Reader thread**: Each reader randomly selects an index in [0, D), reads the value, and logs: `[READ] thread=<tid> index=<i> value=<v>`. Repeat OPS times with a short random sleep between operations (0–5 ms using `usleep()`).

3. **Writer thread**: Each writer randomly selects an index in [0, D) and increments the value by 1, logging: `[WRITE] thread=<tid> index=<i> old=<v> new=<v+1>`. Repeat OPS times with a short random sleep.

4. **Part A — Unsynchronised (race demonstration)**: Run R reader threads and W writer threads with no synchronisation. Enable a "corruption detector": after all threads complete, for each index verify that the sum of all increments equals the final value; print a CORRUPT or OK report. The log must show at least one race condition artefact (lost update visible from the mismatch between expected and actual database total). Use `fprintf(stderr, ...)` for log output to avoid buffering artifacts.

5. **Part B — Reader-preference (semaphore)**: Implement the classical reader-preference solution: a `mutex` semaphore to protect the reader count, a `rw_sem` semaphore to represent write access. Multiple readers may access simultaneously; a writer waits until the reader count drops to 0. Corruption detector must report OK for all indices.

6. **Part C — Writer starvation demonstration**: Using the Part B implementation, configure R=8 readers, W=2 writers, OPS=100 with very short reader sleep (0–1 ms) and longer writer sleep (5–10 ms). In your report, show from the log that writers are starved (long stretches where [WRITE] entries are absent from the log while [READ] entries are continuous).

7. **Part D — Writer-preference and fair solution**: Implement at least one of:
   - **Writer preference**: writers are given priority; new readers are blocked if a writer is waiting (prevents writer starvation but may starve readers).
   - **Fair (FIFO) solution using `pthread_cond_t`**: readers and writers queue in arrival order using a `pthread_mutex_t` and two `pthread_cond_t` variables (one for readers, one for writers). No starvation in either direction. Corruption detector must report OK.

8. **Comparison**: Your report must directly compare Parts B, C, and D: show log excerpts side by side and explain the scheduling-level reason for the observed behaviour.

**Bonus (not assessed in primary rubric):**
- Implement all three variants (reader-preference, writer-preference, fair) and allow selection via command-line argument `--policy {rp|wp|fair}`
- Implement using spinlocks (`pthread_spinlock_t`) and compare with semaphore/mutex performance

#### Non-Functional Requirements
- Code must compile with `gcc -Wall -Wextra -pthread -o rw rw.c` (or via `make`)
- Primary language: C
- **No use of `pthread_rwlock_t`** — the point is to build the abstraction from primitives
- All threads must be joinable and joined before the program prints the final corruption report
- `usleep()` calls must use random delays (seed with `time(NULL)` or a configurable seed for reproducibility)

---

### Submission Format

Your submission must be a ZIP file named `StudentID_Project3.zip` containing:

```
project_3/
├── code/
│   ├── rw.c                (or rw_partA.c, rw_partB.c etc. — make your structure clear in the README)
│   └── Makefile
├── ai_log/
│   └── [AI conversation logs]
└── README.md               (see README Requirements below)
```

### README Requirements

Your `README.md` is a **signpost document** — tell the marker where to find evidence, not a full essay. Aim for one screen of content. Use the headings below exactly.

```markdown
## How to Build and Run
<compile command and how to invoke each Part, e.g. `make && ./rw 8 2 256 50 B`>

## What Works
<bullet list — which Parts (A/B/C/D) are implemented and working>

## What Doesn't Work / Known Issues
<honest statement>

## AI Tools Used
<name each tool>

## Where to Find the AI Critique
<point to the specific file(s) and section(s) in ai_log/ where you:
 - identified an AI error and corrected it (cite the OS/synchronisation concept involved)
 - questioned a correct but questionable AI design choice>

## OS Concepts Demonstrated
<for each concept, one sentence pointing to the relevant function/line in your code>
- Race condition (at what instruction level does the increment race occur in Part A?)
- Semaphore semantics (what does `sem_wait()` do when value is 0 — busy-wait or block?)
- Reader preference and writer starvation (how does your Part C log demonstrate starvation?)
- Condition variables (`signal` vs `broadcast`; why `cond_wait` must be in a `while` loop — spurious wakeups)
- Bounded waiting (does your Part D solution satisfy it? Point to the relevant logic)

## Test Evidence
<log excerpts (not full log) for: Part A corruption, Part B correct concurrent reads, Part C writer starvation, Part D fairness>
<corruption detector output for each Part>
<at least one run with R=4, W=4, D=16, OPS=20>
Show exact command and terminal output.
```

> **Depth belongs in the AI log**, not here. The AI log is where you show your reasoning — your README just tells the marker where to look.

### Grading Rubric Summary

| Criterion | Weight |
|---|---|
| Correctness | 10% |
| OS Concept Depth | 30% |
| AI Critique Quality | 30% |
| Code Quality | 15% |
| Testing Evidence | 15% |

*Full rubric: see [Project_3_Rubric.md](Project_3_Rubric.md)*

### Academic Integrity

All AI usage must be logged and submitted. Unreported AI use constitutes academic misconduct. You are assessed on your management and critique of AI, not on the AI's output alone.
