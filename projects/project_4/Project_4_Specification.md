# CS4023 Operating Systems
## Project 4 – CPU Scheduling Simulator
**Worth: 10% of module grade | Announced: 29 October 2026 (Week 8) | Due: Thursday 12 November 2026, 17:00**

---

### Overview

CPU scheduling is one of the central responsibilities of an operating system kernel. The scheduler determines which process (or thread) runs on which CPU at which time, and its decisions profoundly affect system throughput, fairness, responsiveness, and energy consumption. Every major scheduling algorithm represents a different trade-off between these properties: FCFS is simple but can cause the convoy effect; SJF minimises average waiting time but requires knowing the future; Round Robin provides fairness at the cost of higher turnaround time for CPU-bound jobs.

In this project you will implement a CPU scheduling simulator in C. The simulator accepts a set of processes (each described by arrival time, CPU burst time, and priority) and simulates the execution of those processes under four scheduling algorithms: FCFS, SJF (non-preemptive), SRTF (preemptive SJF), and Round Robin. For each algorithm it produces an ASCII Gantt chart, per-process waiting time and turnaround time, and system-wide averages. You will accept process sets from a file, allowing you to compare all four algorithms on the same input.

As in all CS4023 projects, the depth of your OS concept reasoning in the report is the primary assessment target. A simulator that produces correct Gantt charts for all algorithms but is accompanied by a report that merely describes what the simulator does will score in the B band. An A1 AI log and README explain *why* each algorithm makes the scheduling decisions it does, in terms of the ready queue model, preemption mechanics, and the scheduling criteria from lecture.

### Learning Outcomes

On completion you will be able to:
- Implement and distinguish non-preemptive and preemptive scheduling algorithms
- Produce accurate Gantt charts and compute waiting time, turnaround time, response time, and CPU utilisation
- Explain the ready queue model, context switching overhead, and the CPU–I/O burst cycle
- Analyse the convoy effect in FCFS and starvation risk in SJF
- Evaluate the time quantum selection problem in Round Robin and its effect on context switch frequency
- Critically evaluate AI-generated scheduling code for algorithmic correctness and OS conceptual accuracy

### Background

The following lecture topics are directly relevant. You must reference them by number in your AI log and README:

- **Lecture 11**: CPU scheduling criteria — CPU utilisation, throughput, waiting time, turnaround time, response time; the CPU–I/O burst cycle; scheduling levels (long-term, short-term, medium-term)
- **Lecture 12**: Non-preemptive algorithms — FCFS and its convoy effect; SJF non-preemptive — proof of optimality for average waiting time; SJF preemptive (SRTF)
- **Lecture 13**: Round Robin — time quantum selection, context switch frequency, effect on average turnaround time for CPU-bound vs I/O-bound processes; multilevel queue and feedback queue (background only)
- **Lecture 8** (background): Context switching cost — what the OS saves and restores in the PCB; overhead relative to quantum size

---

### Requirements

#### Functional Requirements

1. **Process input**: Accept a process set from a text file specified as a command-line argument. Each line contains: `<PID> <ArrivalTime> <BurstTime> <Priority>` (all non-negative integers). The PID is a label (not necessarily sequential). Example file format:
   ```
   P1 0 8 2
   P2 1 4 1
   P3 2 9 3
   P4 3 5 2
   ```

2. **FCFS (non-preemptive)**: Schedule processes in order of arrival time. Ties broken by PID (lexicographic order). When the CPU is idle (no process has arrived yet), advance the clock to the next arrival.

3. **SJF non-preemptive**: Among all processes that have arrived, select the one with the shortest remaining burst time. Once a process starts, it runs to completion. Advance the clock on CPU idle. Ties broken by arrival time, then PID.

4. **SRTF (SJF preemptive)**: At every time unit, select the process with the shortest remaining burst time among all arrived processes. Preempt the current process if a newly arrived process has a shorter remaining burst. Advance the clock on idle. Ties broken by arrival time.

5. **Round Robin**: Time quantum Q is a command-line argument (e.g., `--quantum 3`). Maintain a FIFO ready queue. When a process's quantum expires without completing, it is appended to the back of the ready queue. If multiple processes arrive at the same time unit, they are added to the queue in PID order. Advance the clock on idle, adding any processes that arrive during the idle period.

6. **Gantt chart output**: For each algorithm, print an ASCII Gantt chart showing which process (or IDLE) runs at each time unit. Example:
   ```
   FCFS: |P1|P1|P1|P2|P2|P3|P3|P3|...
          0  1  2  3  4  5  6  7  8
   ```
   The time axis must be labelled. Identical consecutive time units may be compressed (e.g., `|P1(0-8)|P2(8-12)|`) for readability — both formats are acceptable.

7. **Per-process statistics**: For each algorithm, print a table with columns: PID, ArrivalTime, BurstTime, StartTime, CompletionTime, WaitingTime, TurnaroundTime. WaitingTime = TurnaroundTime − BurstTime. TurnaroundTime = CompletionTime − ArrivalTime.

8. **Summary statistics**: Print average waiting time, average turnaround time, and CPU utilisation (= total CPU active time / simulation end time × 100%) for each algorithm.

**Bonus (not assessed in primary rubric):**
- Priority scheduling (non-preemptive and preemptive) using the Priority field
- Multi-level feedback queue simulation

#### Non-Functional Requirements
- Code must compile with `gcc -Wall -Wextra -o scheduler scheduler.c` (or via `make`)
- Primary language: C
- Command-line: `./scheduler <algorithm> [--quantum Q] <process_file>`
  - `<algorithm>` ∈ {fcfs, sjf, srtf, rr}
  - `--quantum Q` required only for `rr`
  - Running `./scheduler all --quantum 3 <process_file>` must run all four algorithms on the same input and print all four outputs sequentially
- Process count: handle up to 256 processes
- Simulation must complete (no infinite loops on valid input)

---

### Submission Format

Your submission must be a ZIP file named `StudentID_Project4.zip` containing:

```
project_4/
├── code/
│   ├── scheduler.c         (or multiple .c/.h files)
│   ├── Makefile
│   └── sample_processes.txt
├── ai_log/
│   └── [AI conversation logs]
└── README.md               (see README Requirements below)
```

### README Requirements

Your `README.md` is a **signpost document** — tell the marker where to find evidence, not a full essay. Aim for one screen of content. Use the headings below exactly.

```markdown
## How to Build and Run
<compile command and how to invoke: `./scheduler <algorithm> [--quantum Q] <file>`, including the `all` mode>

## What Works
<bullet list — which algorithms (FCFS, SJF, SRTF, RR) produce correct Gantt charts and statistics>

## What Doesn't Work / Known Issues
<honest statement>

## AI Tools Used
<name each tool>

## Where to Find the AI Critique
<point to the specific file(s) and section(s) in ai_log/ where you:
 - identified an AI error and corrected it (cite the scheduling algorithm definition from lecture)
 - questioned a correct but questionable AI design choice>

## OS Concepts Demonstrated
<for each concept, one sentence pointing to the relevant function/line in your code or output>
- FCFS convoy effect (which lines implement FCFS; point to test output showing long process delaying all short ones)
- SRTF optimality (point to your simulation output comparing SRTF vs SJF average waiting time)
- Round Robin quantum trade-off (point to your Q=1/3/10 comparison output)
- Context switching overhead (analytical: how would adding a switch cost change relative SRTF vs RR performance?)
- Ready queue structure (which data structure; why FIFO is the correct choice for FCFS/RR)

## Test Evidence
<complete output (Gantt chart + stats table) for all four algorithms on sample_processes.txt>
<second process set demonstrating convoy effect and RR with two different quantum values>
<hand-computed waiting and turnaround time for at least two processes in one algorithm>
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

*Full rubric: see [Project_4_Rubric.md](Project_4_Rubric.md)*

### Academic Integrity

All AI usage must be logged and submitted. Unreported AI use constitutes academic misconduct. You are assessed on your management and critique of AI, not on the AI's output alone.
