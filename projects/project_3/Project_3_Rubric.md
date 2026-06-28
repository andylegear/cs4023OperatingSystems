# CS4023 Operating Systems
## Project 3 Rubric – Readers-Writers Synchronisation

---

### Criterion 1: Correctness (10%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | All four parts implemented and functional. Part A demonstrably shows data corruption with non-trivial probability (corruption detector reports CORRUPT for ≥1 index on a run with R≥4, W≥4, OPS≥50); Part B produces consistent OK results with concurrent readers evident in the log; Part C demonstrates writer starvation with quantitative log evidence (e.g., count of consecutive READ entries between two WRITE entries); Part D produces consistent OK results with no starvation in the log; `pthread_rwlock_t` not used; all threads joined before final report |
| A2 | 72–79 | Parts A, B, and C implemented and correct. Part D present but may have a subtle starvation risk (e.g., writer-preference implemented rather than fair); corruption detector outputs correct for B |
| B1/B2 | 60–71 | Parts A and B implemented correctly; Part C attempted (starvation not demonstrated due to timing but code is structurally correct); Part D absent or identical to Part B |
| C | 40–59 | Part A runs but race condition may not appear consistently; Part B compiles and runs but may not be truly reader-concurrent (e.g., a single mutex serialises all readers); Parts C and D absent |
| F | 0–39 | Does not compile; or `pthread_rwlock_t` used throughout; or Part A produces no evidence of a race condition (synchronisation accidentally present) |

**Marker test cases:**
- Part A: `./rw --part A --readers 6 --writers 6 --size 32 --ops 200` — run 5 times; at least 3 runs should report CORRUPT
- Part B: `./rw --part B --readers 8 --writers 2 --size 256 --ops 50` — corruption detector must report OK; log must show at least 2 readers operating simultaneously (overlapping timestamps or interleaved lines)
- Part C: same config as Part B; log must show ≥10 consecutive READ-only entries
- Part D: `./rw --part D --readers 4 --writers 4 --size 64 --ops 100` — OK; writer entries should appear with roughly equal frequency to reader entries

---

### Criterion 2: OS Concept Depth (30%)

Evidence for this criterion comes from the **README.md `OS Concepts Demonstrated` section** (one sentence per concept pointing to code) and from **deeper explanations embedded in the AI log**.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | README points to specific functions/lines for all five concepts. AI log contains implementation-level explanations with lecture citations. **Race condition**: AI log explains the read–modify–write instruction sequence (MOV, INC/ADD, MOV) and how a context switch between any two allows another thread to overwrite the partial update; links to Critical Section definition from Lecture 8. **Semaphore semantics**: AI log explains that `sem_wait()` blocks the calling thread in the OS wait queue (not busy-wait), that blocked threads move to TASK_INTERRUPTIBLE, and that `sem_post()` wakes exactly one waiting thread. **Reader preference starvation**: AI log explains the scheduling scenario where reader count never drops to 0, preventing the writer's `sem_wait()` on `rw_sem` from unblocking — violation of bounded waiting from Lecture 8. **Condition variable semantics**: AI log explains `signal` vs `broadcast`, the atomic mutex release in `cond_wait` (lost-wakeup prevention), and why a `while` loop is mandatory for spurious wakeups. **Bounded waiting in Part D**: README and log identify the queue/counter mechanism preventing indefinite postponement. |
| A2 | 72–79 | Four of five concepts explained with implementation detail. Condition variable or bounded waiting analysis may be at a textbook level without connecting to the specific code. Lecture citations present. |
| B1/B2 | 60–71 | Semaphores and race condition described at the level of "we used `sem_wait()` to protect the critical section as shown in Lecture 9." Reader preference starvation mentioned but the scheduling mechanism not explained. Condition variable semantics not covered or incorrect. |
| C | 40–59 | Concepts listed; race condition described as "threads interfere" without explaining the read–modify–write mechanism. No distinction between `sem_wait()` blocking and busy-waiting. |
| F | 0–39 | No OS concept discussion; or concepts are fundamentally misidentified (e.g., describes semaphores as mutexes throughout); or README covers only Part A |

---

### Criterion 3: AI Management Quality (30%)

This criterion is assessed **entirely from the AI log**. The README `Where to Find the AI Critique` section tells the marker which file and section to look at; the depth is in the log itself.

Three dimensions are assessed:
- **Error critique** — identifying where the AI was wrong and explaining why, **using OS concepts from the lectures by name and with lecture citations**
- **Design critique** — questioning a technically correct but suboptimal AI choice, grounded in OS theory
- **Delegation strategy** — explaining what was given to AI vs written manually, and why, invoking lecture concepts

> **The lecture concepts are your evaluative lens.** Interrogate the AI’s implementation through the theory you have been taught and show that interrogation in your log.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Addresses at least two of the three dimensions above. Includes at least one design critique AND an explicit delegation strategy discussion, both backed by OS-level reasoning corroborated by the AI log. Log shows ≥3 iterative rounds with evidence of steering and questioning, not just fix requests. **Error critique example:** "The AI implemented Part D using `pthread_cond_signal` instead of `pthread_cond_broadcast` in the writer-exit code path. When a writer finishes, only one waiting reader is woken; the others remain blocked indefinitely. Because all readers share the same `pthread_cond_t`, a broadcast is required when reader_count drops to 0. This is the signal vs broadcast distinction from Lecture 10." **Design critique example:** "The AI's Part B implementation used a mutex to protect the reader count but also wrapped the entire read operation in the same mutex, serialising all readers. This is technically safe but eliminates the concurrent-reader property that is the entire point of the readers-writers solution. I identified this from the Lecture 9 definition of reader-preference: multiple readers must hold the lock simultaneously. The AI produced correct-but-wrong code." **Delegation example:** "I gave Part A (the unsynchronised race demonstration) to the AI since it involves straightforward thread spawning with no synchronisation design. I wrote Part D myself because the bounded waiting requirement from Lecture 9 demands a specific queuing strategy, and I expected the AI to produce a solution that was starvation-free by accident rather than by design." |
| A2 | 72–79 | Two critiques spanning at least two of the three dimensions. Delegation mentioned with some reasoning. Log shows multiple rounds. One critique may be at the API usage level rather than OS concept level. Both critiques corroborated by the log. |
| B1/B2 | 60–71 | One or two error critiques only — no design critique and no delegation discussion. Explanation references synchronisation behaviour but lacks OS concept grounding. Log shows 1–2 rounds. |
| C | 40–59 | Critique is purely error-finding without OS reasoning, or described superficially. Delegation absent. No evidence the student questioned anything the AI got correct. |
| F | 0–39 | No AI log; or single-prompt log; or claimed errors absent from log |

---

### Criterion 4: Code Quality (15%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Clean, modular C; separate functions for reader thread logic and writer thread logic; all `pthread_*` and `sem_*` return values checked; corruption detector logic is correct and separate from thread logic; `rand_r()` used with per-thread seed (not `rand()`); Makefile builds with `gcc -Wall -Wextra -pthread` producing zero warnings; global synchronisation variables initialised before threads are created (not after) |
| A2 | 72–79 | Most return values checked; `rand_r()` or `srand(time(NULL))` with acceptable thread safety; minor style issues; Makefile functional; 1–2 `-Wall` warnings |
| B1/B2 | 60–71 | Makefile present; code readable; `rand()` used (not `rand_r()`) — acceptable at this level; some return values unchecked; reader and writer logic partially interleaved in one function |
| C | 40–59 | No Makefile; significant duplication between parts; synchronisation globals inconsistently initialised; no corruption detector or a logically incorrect one |
| F | 0–39 | No Makefile; does not compile; `pthread_rwlock_t` used (violating the spec); busy-wait loops used where blocking primitives are required |

---

### Criterion 5: Testing Evidence (15%)

Test evidence is in the **README.md `Test Evidence` section** — exact commands and log excerpts.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Report shows log excerpts for all four parts with clear annotations explaining what each excerpt demonstrates. Corruption detector output shown for Parts A, B, and D. Part C starvation quantified: e.g., "in a 200-operation run, the longest gap between WRITE entries was 47 consecutive READ entries." Edge case tested: D=1 (all threads contend on the same element) — report notes whether this maximises or minimises starvation effect. Comparison table or timeline diagram contrasting reader-preference vs fair policy. |
| A2 | 72–79 | Log excerpts for Parts A, B, C, D. Corruption detector output shown for B and D. Part C starvation evident in log. Brief quantitative comparison between parts. |
| B1/B2 | 60–71 | Log excerpts for Parts A and B. Corruption detector output shown for B. Part C log not shown or starvation not evident. Part D output shown but not compared. |
| C | 40–59 | Log excerpt for Part A only; or excerpts for multiple parts but no annotation or explanation; corruption detector output missing for Part D |
| F | 0–39 | No test output shown; or only shows that the code compiled; or log lines unexplained |

---

### Evidence Gate Rules

- **A1 requires:** Race condition explanation must include the read–modify–write instruction sequence; starvation explanation must identify the scheduling-level mechanism (reader count never reaching 0); condition variable discussion must address spurious wakeups and signal vs broadcast. Lecture citations by number required.
- **Default to band floor:** When evidence is ambiguous, score at the floor and justify upward explicitly.
- **Penalty framework (apply before band assignment):**
  - Missing `README.md`: −10 from weighted total
  - No AI log: cap Criteria 2 + 3 at 40%
  - Code does not compile: cap Criterion 1 at 10%
  - `pthread_rwlock_t` used: cap Criterion 1 at 20% and Criterion 2 at 40%
  - Part A produces no race condition evidence: cap Criterion 1 at 40%
  - No test output in README: cap Criterion 5 at 20%
  - ≥3 README claims not corroborated by AI log: cap Criterion 3 one full band below assessed band
  - All critiques in the AI log are error corrections with no evidence of questioning a correct AI choice: cap Criterion 3 at 71%
