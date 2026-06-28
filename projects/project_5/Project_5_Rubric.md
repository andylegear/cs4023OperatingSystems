# CS4023 Operating Systems
## Project 5 Rubric – Page Replacement Simulator

---

### Criterion 1: Correctness (10%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | All four algorithms produce correct per-step output and correct fault counts verified against hand calculation. Clock algorithm correctly implements the reference bit (sets on HIT, clears on scan, only evicts when bit is 0). OPT correctly uses lookahead and correctly handles pages that never reappear (evict immediately). Belady demonstration produces a reference string where FIFO fault count strictly increases from F=3 to F=4 (or another verified pair). `./pager all <frames> <file>` runs all four. |
| A2 | 72–79 | FIFO, LRU, and OPT correct; Clock has a minor error (e.g., reference bit set on fault as well as hit — usually harmless but technically incorrect per the second-chance definition); Belady demonstration present and shows the anomaly |
| B1/B2 | 60–71 | FIFO and LRU correct; OPT implemented but has a lookahead error for one edge case (e.g., page that does not reappear not correctly handled); Clock absent or implemented as FIFO without reference bits; Belady attempted |
| C | 40–59 | FIFO correct; LRU implemented but uses FIFO eviction order in one edge case (e.g., tie on recency not resolved by arrival order); OPT and Clock absent |
| F | 0–39 | Does not compile; or FIFO produces wrong fault counts on the standard test case; or LRU and OPT are identical to FIFO |

**Marker test cases (standard reference string):**
- Reference string: `7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1`, F=3
- Expected fault counts: FIFO=15, LRU=12, OPT=9 *(verify before use)*
- Belady string: `3 2 1 0 3 2 4 3 2 1 0 4`, F=3 → 9 faults, F=4 → 10 faults (FIFO only)

---

### Criterion 2: OS Concept Depth (30%)

### Criterion 2: OS Concept Depth (30%)

Evidence for this criterion comes from the **README.md `OS Concepts Demonstrated` section** (one sentence per concept pointing to code) and from **deeper explanations embedded in the AI log**.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | README points to specific functions/lines for all five concepts. AI log contains synthesis-level explanations with lecture citations and connection to the simulation. **Demand paging sequence**: AI log traces the full sequence from hardware fault trap through OS handler, frame selection, page-in, TLB update, and instruction restart — maps this to what the simulator models and what it abstracts away. **FIFO vs LRU vs OPT**: AI log explains that OPT requires future knowledge; LRU approximates OPT by recency; Clock approximates LRU using a single reference bit per frame — cites Lecture 16. **Belady's Anomaly**: AI log explains the stack property informally (LRU/OPT frames with F+1 are a superset of frames with F); demonstrates with submitted Belady output. **Thrashing**: AI log explains the feedback cycle and the working set solution from Lecture 16. **Reference bit hardware role**: AI log explains that the MMU sets the bit on every TLB hit; the OS clears it; the Clock algorithm reads it to approximate recency. |
| A2 | 72–79 | Four of five concepts explained with implementation-level detail. Thrashing or reference bit mechanism may be at a "from Lecture 16" level without the causal mechanism. Lecture citations present. |
| B1/B2 | 60–71 | Algorithms described correctly at the definition level. Belady's Anomaly mentioned as a known phenomenon but not explained via the stack property. Demand paging sequence described in general terms. No analysis of thrashing. |
| C | 40–59 | Algorithms described by paraphrasing lecture slides. No connection to simulation output. Belady's Anomaly named but not explained. |
| F | 0–39 | No OS concept discussion; or virtual memory concepts consistently misidentified; or README describes the wrong algorithms |

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
| A1 | 80–100 | Addresses at least two of the three dimensions above. Includes at least one design critique AND an explicit delegation strategy discussion, both backed by OS-level reasoning corroborated by the AI log. Log shows ≥3 iterative rounds with evidence of steering and questioning, not just fix requests. **Error critique example:** "The AI implemented OPT by evicting the page whose next reference is closest in the future, rather than furthest. This is the inverse of the correct policy — OPT keeps the page needed soonest and evicts the one needed latest. The correct OPT policy is proved optimal in Lecture 15 by the exchange argument: any other eviction choice causes at least as many faults." **Design critique example:** "The AI implemented LRU using a full timestamp array scanned linearly on every fault — O(F) per eviction. This is correct but inconsistent with the Clock discussion in Lecture 15, which exists precisely to avoid full recency tracking. I asked the AI whether this implementation reflects why Clock was invented; it agreed it did not. I retained the implementation for simplicity but documented that the design choice undermines the comparative analysis between LRU and Clock." **Delegation example:** "I gave the FIFO implementation to the AI as a baseline — it involves only a circular queue with no OS subtlety. I wrote the OPT lookahead myself because correctly handling pages that never reappear requires precise interpretation of the optimality proof from Lecture 15, and a subtle error here would invalidate the Belady demonstration." |
| A2 | 72–79 | Two critiques spanning at least two of the three dimensions. Delegation mentioned with some reasoning. Log shows multiple rounds. One critique may be at the algorithmic level rather than the OS concept level. Both critiques corroborated by the log. |
| B1/B2 | 60–71 | One or two error critiques only — no design critique and no delegation discussion. Explanation describes what was wrong algorithmically but does not connect to the OS concept. Log shows 1–2 rounds. |
| C | 40–59 | Critique is purely error-finding without OS reasoning, or described superficially. Delegation absent. No evidence the student questioned anything the AI got correct. |
| F | 0–39 | No AI log; single-prompt log; or claimed errors absent from or contradicted by the log |

---

### Criterion 4: Code Quality (15%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Clean, modular C with separate functions for each algorithm (`fifo_replace()`, `lru_replace()`, `clock_replace()`, `opt_replace()`, `print_step()`); OPT lookahead uses O(N) scan per fault (not re-sorted on every step); frame contents printed in a consistent, readable format; all `malloc()` checked; `sample_refs.txt` and `belady_demo.txt` both included and correctly formatted; Makefile builds cleanly with `gcc -Wall -Wextra` producing zero warnings |
| A2 | 72–79 | Separate functions for algorithms; minor style issues; both reference files included; Makefile functional; 1–2 `-Wall` warnings |
| B1/B2 | 60–71 | Makefile present; algorithms in separate functions or clearly labelled sections; `sample_refs.txt` included; `belady_demo.txt` absent; some hardcoded limits |
| C | 40–59 | No Makefile; algorithms in one monolithic function switched by a flag; reference files absent; minimal modularity |
| F | 0–39 | No Makefile; does not compile; all algorithms produce identical output; or OPT uses future reference information in a way that is not clearly a lookahead (e.g., result values pre-computed outside the simulation) |

---

### Criterion 5: Testing Evidence (15%)

Test evidence is in the **README.md `Test Evidence` section** — exact commands and terminal transcripts.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Per-step output shown for all four algorithms on the same reference string and F=3. At least 3 steps hand-verified in the README with arithmetic shown (e.g., "at step 8, LRU evicts page 1 because page 1 was last used at step 3, page 2 at step 5, and page 0 at step 7 — page 1 is least recently used"). Fault counts compared across all four algorithms with explanation for why OPT consistently beats FIFO. Belady output shown (fault count vs frame count table for FIFO) with the anomaly frame pair explicitly identified. Edge cases tested: F ≥ number of distinct pages (no faults after initial load); reference string of length 1; all references to the same page. |
| A2 | 72–79 | Per-step output for all four algorithms. Hand verification of 2 steps. Fault count comparison present. Belady output shown. One edge case. |
| B1/B2 | 60–71 | Per-step output for FIFO and LRU. No hand verification. Fault count comparison partial. Belady output shown but anomaly pair not identified. |
| C | 40–59 | Output for one or two algorithms; no hand verification; no Belady output; fault counts shown but not compared |
| F | 0–39 | No test output shown; or only shows that the program ran without crashing; or Belady attempted with LRU (anomaly cannot occur — not reported as such) |

---

### Evidence Gate Rules

- **A1 requires:** Belady's Anomaly must be demonstrated from the submitted code's actual output (not a textbook example); the stack property explanation for why LRU/OPT are anomaly-free must be present; per-step output for all four algorithms must be shown in the README.
- **Default to band floor:** When evidence is ambiguous, score at the floor.
- **Penalty framework (apply before band assignment):**
  - Missing `README.md`: −10 from weighted total
  - No AI log: cap Criteria 2 + 3 at 40%
  - Code does not compile: cap Criterion 1 at 10%
  - Missing `belady_demo.txt` or `sample_refs.txt`: −5 from weighted total
  - Belady demonstration uses LRU or OPT (anomaly cannot occur — fails the requirement): cap Criterion 1 at 50%
  - No test output in README: cap Criterion 5 at 20%
  - ≥3 README claims not corroborated by AI log: cap Criterion 3 one full band below assessed band  - All critiques in the AI log are error corrections with no evidence of questioning a correct AI choice: cap Criterion 3 at 71%