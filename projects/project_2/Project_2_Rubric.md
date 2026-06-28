# CS4023 Operating Systems
## Project 2 Rubric – Parallel Matrix Multiplication

---

### Criterion 1: Correctness (10%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | All 8 functional requirements met; matrices heap-allocated with `malloc()` and freed before exit; thread argument structs heap-allocated (one per thread, not a single reused stack struct); all threads joined before result is read; correctness verification passes for at least three matrix elements; wall time and CPU time reported for all T ∈ {1,2,4,8}; speedup computed and tabulated correctly; false sharing analysis present and mathematically accurate |
| A2 | 72–79 | Requirements 1–6 met; correctness verified; timing table present; thread argument may be borderline (e.g., stack-allocated but loop completes before threads are scheduled — harmless in practice but technically unsafe); false sharing analysis absent or superficial |
| B1/B2 | 60–71 | Multi-threaded multiplication produces correct output for N=512; timing reported for ≥3 T values; speedup computed for at least two pairs; correctness verification absent |
| C | 40–59 | Single-threaded baseline works; multi-threaded version has a partition error (some rows computed twice, some skipped) or a race on the output matrix; no timing |
| F | 0–39 | Does not compile with `-pthread`; or multi-threaded version consistently produces wrong results; or OpenMP/BLAS used |

**Marker test cases:**
- `./matmul 512 4` — verify C[0][0], C[256][256], C[511][511] against baseline
- `./matmul 1024 8` — wall time should be less than T=1 wall time on a multi-core machine
- `./matmul 512 1` — thread-path T=1 result must equal baseline result
- `./matmul 513 4` — N not divisible by T: verify no rows are skipped or doubled

---

### Criterion 2: OS Concept Depth (30%)

Evidence for this criterion comes from the **README.md `OS Concepts Demonstrated` section** (one sentence per concept pointing to code) and from **deeper explanations embedded in the AI log** (where you show why something works the way it does).

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | README points to specific functions/lines for all five concepts. AI log contains implementation-level explanations with lecture citations. **Threads**: AI log explains that `pthread_create()` calls `clone()` with `CLONE_VM`, `CLONE_FILES`, etc., and connects this to why all threads can read A and B without copying. **Heap vs stack**: README and log identify exactly which data live on the shared heap vs per-thread stack, and explain why the argument struct must be heap-allocated. **Wall vs CPU time**: AI log explains that CPU time accumulates across all threads and identifies what the measured CPU/wall ratio indicates about parallelism. **False sharing**: calculates whether `N × sizeof(double)` is a multiple of 64 bytes for N=512; explains MESI invalidation. **Amdahl**: identifies serial fraction and computes theoretical max speedup for T=8. Lecture numbers cited throughout. |
| A2 | 72–79 | Four of five concepts explained with implementation detail. Wall/CPU ratio or Amdahl analysis may be at a textbook level without connecting to the measured data. Lecture citations present. |
| B1/B2 | 60–71 | Threads and heap/stack described at a "we used `pthreads` as taught in Lecture 5" level. Timing results reported but not interpreted. False sharing mentioned ("could be an issue") without calculation or connection to cache line geometry. |
| C | 40–59 | Concepts listed but description paraphrases the man page or lecture slides. No connection between the concept and how the submitted code demonstrates it. No cache line calculation. |
| F | 0–39 | No OS concept discussion; or concepts consistently misidentified (e.g., describes threads as separate processes throughout, or claims pthreads uses `fork()`) |

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
| A1 | 80–100 | Addresses at least two of the three dimensions above. Includes at least one design critique AND an explicit delegation strategy discussion, both backed by OS-level reasoning corroborated by the AI log. Log shows ≥3 iterative rounds with evidence of steering and questioning, not just fix requests. **Error critique example:** "The AI generated a loop that allocated a single `thread_args` struct on the stack of `main()` and reused it in each `pthread_create()` call, mutating `start_row` before all threads were scheduled. This is a data race: threads that had not yet read the struct would see the next iteration's `start_row`, causing multiple threads to compute the same row range. The fix is to `malloc()` a separate struct per thread and free after `pthread_join()` — this is the heap-vs-stack distinction from Lecture 5." **Design critique example:** "The AI used `gettimeofday()` for both wall time and CPU time. `gettimeofday()` measures elapsed real time only — it cannot measure per-process CPU time. `clock_gettime(CLOCK_PROCESS_CPUTIME_ID, ...)` is required for CPU time per the wall-vs-CPU distinction in Lecture 6. The AI's solution would have reported identical wall and CPU time, making the speedup analysis meaningless. I challenged this and the AI revised it." **Delegation example:** "I gave the matrix multiplication loop structure to the AI. I retained the timing harness myself because correctly distinguishing wall time from CPU time (Lecture 6) is exactly the kind of OS concept the AI is likely to conflate, and the speedup analysis depends on getting this right." |
| A2 | 72–79 | Two critiques spanning at least two of the three dimensions. Delegation mentioned with some reasoning. Log shows multiple rounds. One critique may be at the implementation level rather than the OS concept level. Both critiques corroborated by the log. |
| B1/B2 | 60–71 | One or two error critiques only — no design critique and no delegation discussion. Explanation describes what was wrong at a code level (e.g., "the AI forgot to multiply the index by sizeof(double)") without connecting to thread safety or memory layout. Log shows 1–2 prompting rounds. |
| C | 40–59 | Critique is purely error-finding without OS reasoning, or described superficially. Delegation absent. No evidence the student questioned anything the AI got correct. |
| F | 0–39 | No AI log submitted; or single-prompt log with no iteration; or claimed errors are absent from or contradicted by the log |

---

### Criterion 4: Code Quality (15%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Clean, readable C; all `pthread_create()`, `pthread_join()`, and `malloc()` return values checked with informative error messages; all matrices and argument structs freed before exit; timing uses `clock_gettime()` correctly (not `clock()` which on Linux measures CPU time only); Makefile builds cleanly with `gcc -Wall -Wextra -pthread -O2` producing zero warnings; code structured into logical functions (e.g., `alloc_matrix()`, `thread_worker()`, `run_timed()`) |
| A2 | 72–79 | Most return values checked; matrices freed; minor style issues; Makefile functional; 1–2 `-Wall` warnings that do not affect correctness; `clock()` used for timing (suboptimal but not incorrect for CPU-bound programs) |
| B1/B2 | 60–71 | Makefile present; code readable; some allocation checks absent; thread argument structs not freed (minor leak); several `-Wall` warnings |
| C | 40–59 | No Makefile; allocation unchecked; `pthread_create()` return value ignored; global fixed-size arrays used instead of heap allocation |
| F | 0–39 | No Makefile; does not compile with `-pthread -O2`; busy-wait synchronisation (e.g., polling a global flag) used instead of `pthread_join()` |

---

### Criterion 5: Testing Evidence (15%)

Test evidence is in the **README.md `Test Evidence` section** — exact commands and terminal transcripts.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Performance table showing wall time, CPU time, and speedup for N ∈ {512, 1024} × T ∈ {1,2,4,8} — 16 configurations. Correctness verification output shown for at least one run. Speedup deviation from linear is analysed: serial fraction estimated, OS scheduling overhead mentioned, NUMA effects noted if machine is NUMA. Edge case tested: T > number of logical CPUs on the test machine — reports the wall time and notes that OS over-subscribes the cores. Bonus if Amdahl bound is drawn on the speedup plot. |
| A2 | 72–79 | Performance table for N=512, T ∈ {1,2,4,8}. Correctness verification present. Speedup deviation discussed with reference to serial fraction. One edge case present. |
| B1/B2 | 60–71 | Performance data for ≥3 T values at N=512. Correctness not formally verified. Speedup table present but not interpreted. |
| C | 40–59 | Timing data for 1–2 T values. No correctness verification. No speedup analysis. Some output shown. |
| F | 0–39 | No performance data; or only shows that the code compiled and ran; or results table is fabricated (times too perfect, no variance) |

---

### Evidence Gate Rules

- **A1 requires:** Lecture citations by number and topic; false sharing analysis must include the cache line arithmetic for the specific N used in testing; speedup analysis must reference the measured data.
- **Default to band floor:** When evidence is ambiguous, score at the floor and justify upward only when explicit.
- **Penalty framework (apply before band assignment):**
  - Missing `README.md`: −10 from weighted total
  - No AI log submitted: cap Criteria 2 + 3 at 40%
  - Code does not compile with `-pthread`: cap Criterion 1 at 10%
  - OpenMP or BLAS used: cap Criterion 1 at 20% and Criterion 2 at 40%
  - No test/performance data in README: cap Criterion 5 at 20%
  - ≥3 README claims not corroborated by AI log: cap Criterion 3 one full band below assessed band
  - All critiques in the AI log are error corrections with no evidence of questioning a correct AI choice: cap Criterion 3 at 71%
