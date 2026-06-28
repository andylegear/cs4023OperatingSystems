# CS4023 Operating Systems
## Project 4 Rubric – CPU Scheduling Simulator

---

### Criterion 1: Correctness (10%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | All four algorithms produce correct Gantt charts and correct per-process and average statistics verified by hand-computation. SRTF correctly preempts on new arrivals. Round Robin correctly handles: CPU idle followed by simultaneous arrival of multiple processes, processes that arrive during the running process's quantum, and the queue order after preemption. Average statistics rounded consistently (e.g., 2 decimal places). `./scheduler all --quantum 3 <file>` runs all four without error. |
| A2 | 72–79 | FCFS, SJF, and RR correct; SRTF has a minor error (e.g., tie-breaking inconsistency that does not affect average statistics significantly); `all` mode functional |
| B1/B2 | 60–71 | FCFS and SJF correct; SRTF implemented but has a logical flaw in the preemption condition (e.g., preempts on equal remaining time when it should not); RR implemented but queue handling has an edge case failure; Gantt chart present |
| C | 40–59 | FCFS correct; SJF non-preemptive correct; SRTF and RR absent or not functional; statistics correct for FCFS; Gantt chart absent or incorrect |
| F | 0–39 | Does not compile; or only one algorithm implemented; or all statistics consistently wrong across algorithms |

**Marker test cases (standard process set):**
```
P1 0  8  2
P2 1  4  1
P3 2  9  3
P4 3  5  2
```
Expected averages (for verification):
- FCFS: avg waiting = 8.75, avg turnaround = 14.5
- SJF (NP): avg waiting = 6.5, avg turnaround = 12.25
- SRTF: avg waiting = 6.0, avg turnaround = 11.75
- RR Q=3: avg waiting = 9.5, avg turnaround = 15.25

*(Note: marker should hand-verify these values before use as acceptance criteria.)*

---

### Criterion 2: OS Concept Depth (30%)

Evidence for this criterion comes from the **README.md `OS Concepts Demonstrated` section** (one sentence per concept pointing to code/output) and from **deeper explanations embedded in the AI log**.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | README points to specific code/output for all five concepts. AI log contains simulation-backed explanations with lecture citations. **Convoy effect**: AI log shows a Gantt chart where FCFS average waiting time is materially higher than SJF, identifies the long process causing the convoy, and explains that FCFS ignores burst time — references Lecture 12. **SRTF optimality**: AI log confirms or challenges the optimality claim using simulation data; explains the proof sketch. **RR quantum**: AI log shows three output tables (Q=1, Q=3, Q=10) and explains the small-Q vs large-Q trade-off per Lecture 13. **Context switching overhead**: AI log provides quantitative analysis of how adding switch cost k changes SRTF vs RR relative performance. **Ready queue structure**: AI log explains why FIFO queue is used for RR and why SRTF uses a priority structure; connects to scheduling lectures. |
| A2 | 72–79 | Four of five concepts explained with simulation evidence. Context switching or SRTF optimality may be at a "from Lecture 12, SRTF is optimal" level without original analysis. Lecture citations present. |
| B1/B2 | 60–71 | Algorithms described correctly at the definition level ("FCFS schedules in arrival order as in Lecture 11"). Convoy effect noted but not demonstrated from simulation output. RR quantum effect mentioned but not analysed quantitatively. |
| C | 40–59 | Algorithms described in general terms. No simulation evidence referenced in the concept discussion. No analysis of trade-offs. |
| F | 0–39 | No OS concept discussion; or concepts misidentified (e.g., SRTF described as non-preemptive); or README is a textbook paraphrase with no connection to the submitted simulator |

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
| A1 | 80–100 | Addresses at least two of the three dimensions above. Includes at least one design critique AND an explicit delegation strategy discussion, both backed by OS-level reasoning corroborated by the AI log. Log shows ≥3 iterative rounds with evidence of steering and questioning, not just fix requests. **Error critique example:** "The AI implemented SJF by sorting all processes by burst time at the start of the simulation, then scheduling them in sorted order. This is incorrect: SJF selects the shortest job among only those that have already arrived at the current time. The AI's version looks ahead at future arrivals, which is not possible in a real OS scheduler. The correct implementation checks only processes with ArrivalTime ≤ current_time at each decision point — per the SJF definition in Lecture 12." **Design critique example:** "The AI implemented the SRTF ready queue as an unsorted array scanned linearly at each time step — O(n) per decision. For small N this is harmless, but it misrepresents the data structure discussion in Lecture 12, where a min-heap is the appropriate structure for preemptive priority scheduling. I asked the AI to justify its choice; it could not. I retained the array for simplicity but documented the trade-off explicitly." **Delegation example:** "I gave FCFS and SJF to the AI since these are straightforward queue operations with well-defined selection rules. I wrote the Round Robin queue myself because correct handling of simultaneous arrivals during a running process's quantum — and the tie-breaking rules from Lecture 13 — require precise scheduling knowledge I did not trust the AI to apply correctly." |
| A2 | 72–79 | Two critiques spanning at least two of the three dimensions. Delegation mentioned with some reasoning. Log shows multiple rounds. One critique may be at the algorithmic level rather than the OS scheduling concept level. Both critiques corroborated by the log. |
| B1/B2 | 60–71 | One or two error critiques only — no design critique and no delegation discussion. Explanation describes what the AI got wrong but does not connect to the OS scheduling concept. Log shows 1–2 rounds. |
| C | 40–59 | Critique is purely error-finding without OS reasoning, or errors described vaguely. Delegation absent. No evidence the student questioned anything the AI got correct. |
| F | 0–39 | No AI log; single-prompt log; or claimed errors absent from log |

---

### Criterion 4: Code Quality (15%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Clean, modular C; separate functions for each algorithm (e.g., `schedule_fcfs()`, `schedule_rr()`, `print_gantt()`, `print_stats()`); process file parsing is robust (handles blank lines, comments beginning with `#`, graceful error for malformed lines); all `malloc()` and file operations checked; no hardcoded limits below 256 processes; Makefile builds cleanly with `gcc -Wall -Wextra` producing zero warnings; `sample_processes.txt` included and well-documented |
| A2 | 72–79 | Separate functions for algorithms; file parsing handles normal inputs; minor style issues; Makefile functional; 1–2 `-Wall` warnings |
| B1/B2 | 60–71 | Makefile present; algorithms implemented in separate functions or clearly delimited blocks; some hardcoded limits (e.g., max 10 processes); minimal input validation |
| C | 40–59 | No Makefile; all algorithms in one monolithic `main()` with copy-pasted simulation loops; no input validation; `sample_processes.txt` absent |
| F | 0–39 | No Makefile; does not compile; or all algorithms share a single undifferentiated simulation loop producing incorrect results for more than one algorithm |

---

### Criterion 5: Testing Evidence (15%)

Test evidence is in the **README.md `Test Evidence` section** — exact commands and terminal transcripts.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Two or more distinct process sets tested. For the primary set: complete output (Gantt + stats table) shown for all four algorithms; at least two per-process values hand-verified in the README with arithmetic shown. For the comparison analysis: RR run with Q=1, Q=3, Q=10 and a table comparing average turnaround time. A process set specifically designed to trigger the convoy effect (one long process arriving first, several short processes arriving shortly after). Edge case: a process set with all processes arriving at time 0 (tests tie-breaking); a process set with only one process; a process with burst time 0 (should be handled gracefully). |
| A2 | 72–79 | Primary process set fully output for all four algorithms. Hand verification of two values. RR tested with two quantum values. One edge case present. |
| B1/B2 | 60–71 | Primary process set output for ≥2 algorithms. Hand verification absent. One additional test. |
| C | 40–59 | Output shown for one or two algorithms only; no hand verification; no edge cases |
| F | 0–39 | No test output shown; or output is fabricated; or only shows that the program did not crash |

---

### Evidence Gate Rules

- **A1 requires:** Simulation output must be shown in full for the primary test case; convoy effect must be demonstrated from the output (not just described); RR quantum analysis must show data for at least two quantum values.
- **Default to band floor:** When evidence is ambiguous, score at the floor.
- **Penalty framework (apply before band assignment):**
  - Missing `README.md`: −10 from weighted total
  - No AI log: cap Criteria 2 + 3 at 40%
  - Code does not compile: cap Criterion 1 at 10%
  - Missing `sample_processes.txt`: −5 from weighted total
  - No test output in README: cap Criterion 5 at 20%
  - ≥3 README claims not corroborated by AI log: cap Criterion 3 one full band below assessed band
  - All critiques in the AI log are error corrections with no evidence of questioning a correct AI choice: cap Criterion 3 at 71%
