# CS4023 Operating Systems
## Project 5 – Page Replacement Simulator
**Worth: 10% of module grade | Announced: 05 November 2026 (Week 9) | Due: Thursday 26 November 2026, 17:00**

---

### Overview

Virtual memory is one of the most consequential abstractions provided by a modern operating system. By giving each process the illusion of a large, contiguous private address space backed partly by physical RAM and partly by secondary storage, the OS enables programs far larger than physical memory to run efficiently — and allows multiple processes to share the machine without interfering with each other's address spaces. The page replacement algorithm is the heart of this mechanism: when a page fault occurs and all physical frames are occupied, the OS must decide which resident page to evict.

In this project you will implement a page replacement simulator in C. The simulator reads a reference string (a sequence of page numbers representing memory accesses) and a frame count, then simulates four page replacement algorithms: FIFO, LRU, Clock (second-chance), and OPT (Optimal). For each algorithm it displays the frame state at each reference, identifies hits and faults, and computes the total fault count and fault rate. You will also investigate Belady's Anomaly — the counterintuitive phenomenon where FIFO can produce *more* page faults when given *more* physical frames.

This is the final project of the semester, and the expectation for AI critique and README depth is the highest of all five projects. You have now had ten weeks of OS lectures and four prior projects to develop your ability to reason about OS mechanisms. An A1 AI log and README on Project 5 require a level of synthesis — connecting virtual memory concepts across multiple lectures and to real-world implications — that goes beyond what was expected in earlier projects.

### Learning Outcomes

On completion you will be able to:
- Implement FIFO, LRU, Clock, and OPT page replacement algorithms and explain their design trade-offs
- Simulate frame state transitions and compute page fault rates for a given reference string
- Explain demand paging, the working set model, and the relationship between frame count and fault rate
- Demonstrate Belady's Anomaly empirically and explain the theoretical reason it occurs in FIFO but not in LRU or OPT
- Analyse the Clock algorithm as a hardware-assisted approximation to LRU
- Critically evaluate AI-generated page replacement code for algorithmic correctness and OS conceptual accuracy

### Background

The following lecture topics are directly relevant. You must reference them by number in your AI log and README:

- **Lecture 14**: Virtual memory concept, demand paging, page tables, the Translation Lookaside Buffer (TLB), page fault handling sequence
- **Lecture 15**: Page replacement algorithms — FIFO, LRU, OPT; the page replacement problem formulation; proof that OPT minimises faults; Belady's Anomaly in FIFO
- **Lecture 16**: Clock algorithm (second-chance); frame allocation (local vs global); thrashing and the working set model; page fault frequency
- **Lecture 3** (background): Process address space layout — text, data, heap, stack segments; how virtual addresses map to physical frames

---

### Requirements

#### Functional Requirements

1. **Input**: Accept a reference string from a file (space-separated page numbers on one line or one per line) and a frame count F as command-line arguments: `./pager <algorithm> <frames> <reference_file>`. Page numbers are non-negative integers ≤ 9999. Support `./pager all <frames> <reference_file>` to run all four algorithms and print results sequentially.

2. **FIFO**: Maintain a circular queue of resident pages. On a fault with full frames, evict the page that has been resident the longest (oldest loaded). Display the queue state after each reference.

3. **LRU**: On a fault with full frames, evict the page that was least recently used (largest time-since-last-access). Use timestamps or a recency stack to track usage order. Display the frame set after each reference.

4. **Clock (second-chance)**: Maintain a circular list of resident pages, each with a reference bit. On a hit, set the reference bit for that page. On a fault: scan from the clock hand position; skip pages with reference bit = 1 (clear the bit and advance); evict the first page with reference bit = 0. Display the frame contents and reference bits after each reference.

5. **OPT (Optimal)**: On a fault with full frames, evict the page that will not be used for the longest time in the future (requires lookahead over the remainder of the reference string). If a page will never be referenced again, evict it immediately. Display the frame set after each reference.

6. **Per-step display**: For each reference, display: the page referenced, whether it is a HIT or FAULT, and the frame contents after the operation. Example:
   ```
   Ref 3: FAULT  | frames: [3, -, -] |
   Ref 7: FAULT  | frames: [3, 7, -] |
   Ref 2: FAULT  | frames: [3, 7, 2] |
   Ref 3: HIT    | frames: [3, 7, 2] |
   Ref 4: FAULT  | frames: [4, 7, 2] | evicted: 3
   ```

7. **Summary**: After the per-step display, print: total references, total faults, total hits, fault rate (faults / total references × 100%), and hit rate.

8. **Belady's Anomaly demonstration**: Implement a subcommand `./pager belady <max_frames> <reference_file>` that runs FIFO for F = 1 to `max_frames` and prints the fault count for each. The output must show a frame count F where FIFO(F) has more faults than FIFO(F−1). Provide a reference string in `belady_demo.txt` for which this anomaly is clearly visible (document the classic example: reference string `3 2 1 0 3 2 4 3 2 1 0 4` with F=3 and F=4).

**Bonus (not assessed in primary rubric):**
- Working set model: implement a working set window Δ and track the working set size over time
- NFU (Not Frequently Used) as an approximation to LRU

#### Non-Functional Requirements
- Code must compile with `gcc -Wall -Wextra -o pager pager.c` (or via `make`)
- Primary language: C
- OPT may use O(N²) lookahead (N = reference string length); no approximation
- Maximum reference string length: 10,000 entries
- Maximum page number: 9999
- Maximum frame count: 64

---

### Submission Format

Your submission must be a ZIP file named `StudentID_Project5.zip` containing:

```
project_5/
├── code/
│   ├── pager.c             (or multiple .c/.h files)
│   ├── Makefile
│   ├── sample_refs.txt     (your primary reference string for testing)
│   └── belady_demo.txt     (reference string demonstrating Belady's Anomaly)
├── ai_log/
│   └── [AI conversation logs]
└── README.md               (see README Requirements below)
```

### README Requirements

Your `README.md` is a **signpost document** — tell the marker where to find evidence, not a full essay. Aim for one screen of content. Use the headings below exactly. This is the final project; the depth expected in your AI log is the highest of all five projects.

```markdown
## How to Build and Run
<compile command and how to invoke: `./pager <algorithm> <frames> <ref_file>` and `./pager belady <max_frames> <ref_file>`>

## What Works
<bullet list — which algorithms (FIFO, LRU, Clock, OPT, Belady subcommand) are implemented>

## What Doesn't Work / Known Issues
<honest statement>

## AI Tools Used
<name each tool>

## Where to Find the AI Critique
<point to the specific file(s) and section(s) in ai_log/ where you:
 - identified an AI error and corrected it (cite the page replacement concept from lecture)
 - questioned a correct but questionable AI design choice (e.g. OPT lookahead, Clock reference bit handling)>

## OS Concepts Demonstrated
<for each concept, one sentence pointing to the relevant function/line in your code>
- Demand paging fault handling sequence (hardware trap → ... → instruction restarted; cite Lecture 14)
- FIFO vs LRU vs OPT trade-off (why OPT is optimal but unimplementable; what LRU approximates)
- Reference bit mechanism (how hardware sets it; OS role in clearing; point to your Clock implementation)
- Belady's Anomaly (why FIFO but not LRU/OPT; the stack/inclusion property; point to belady_demo.txt output)
- Thrashing and working set (define thrashing; how page fault frequency addresses it; cite Lecture 16)

## Test Evidence
<complete per-step output for sample_refs.txt with F=3, all four algorithms>
<Belady demonstration output showing the anomaly>
<hand-verification of at least 3 steps of FIFO and LRU>
<fault count comparison across all four algorithms on the same reference string and F value>
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

*Full rubric: see [Project_5_Rubric.md](Project_5_Rubric.md)*

### Academic Integrity

All AI usage must be logged and submitted. Unreported AI use constitutes academic misconduct. You are assessed on your management and critique of AI, not on the AI's output alone. This is the final project; the standard of critical engagement expected in the report is the highest of all five.
