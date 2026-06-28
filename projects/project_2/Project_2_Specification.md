# CS4023 Operating Systems
## Project 2 – Parallel Matrix Multiplication
**Worth: 10% of module grade | Announced: 28 September 2026 (Week 4) | Due: Friday 16 October 2026, 23:59**

---

### Overview

Matrix multiplication is one of the canonical benchmarks for evaluating parallel performance on shared-memory systems. While the algorithm itself is straightforward (three nested loops), implementing it correctly and efficiently with POSIX threads forces you to confront several fundamental OS and architecture concepts: how the kernel schedules threads onto CPU cores, how the OS distinguishes between thread-private stack space and the shared process heap, and how hardware cache behaviour — specifically *false sharing* — can eliminate expected speedup even when the parallelism is logically correct.

In this project you will implement C = A × B for configurable N×N matrices of `double` using `pthreads`. You will write a single-threaded baseline, then a multi-threaded version where T threads (T ∈ {1, 2, 4, 8}) each compute a contiguous block of rows in the output matrix C. You will measure both wall-clock time and CPU time for each configuration using `clock_gettime()`, compute the speedup ratio, and analyse the results. Critically, you will investigate false sharing: determine whether the AI-generated code is susceptible to it, justify your answer with reference to cache line geometry, and if possible demonstrate or disprove it empirically.

As in all CS4023 projects, your AI log, README, and critical engagement with AI-generated code are the primary assessment targets. An implementation that achieves 4× speedup with 4 threads but is accompanied by shallow AI logs will score lower than a correct implementation with an AI log and README that demonstrate genuine understanding of how the Linux kernel thread scheduler, the POSIX `pthreads` API, and CPU cache hierarchies interact.

### Learning Outcomes

On completion you will be able to:
- Create and join POSIX threads using `pthread_create()` and `pthread_join()`
- Describe the memory layout of a multi-threaded process: shared heap and BSS segments, private per-thread stack
- Measure wall-clock time and CPU time using `clock_gettime(CLOCK_MONOTONIC)` and `CLOCK_PROCESS_CPUTIME_ID` and interpret the difference between them
- Explain what false sharing is, identify whether it is present in a given code layout, and describe a mitigation strategy
- Compute and interpret the speedup ratio and apply Amdahl's Law to bound theoretical speedup
- Critically evaluate AI-generated multi-threaded C code for thread safety, memory safety, and performance correctness

### Background

The following lecture topics are directly relevant. You must reference them by number in your AI log and README:

- **Lecture 5**: Thread concept, user-level vs kernel-level threads, the pthreads API (`pthread_create`, `pthread_join`, `pthread_exit`, thread argument passing)
- **Lecture 6**: Thread memory model — shared code, heap, and BSS segments; private stack and registers per thread; thread safety; race conditions on shared data; why global and heap-allocated objects require protection
- **Lecture 7**: CPU cache hierarchy, cache line size (typically 64 bytes on x86-64), false sharing, the MESI invalidation protocol and its performance implications for multi-threaded writes
- **Lecture 3**: Process address space layout (background context for understanding the thread memory model)

---

### Requirements

#### Functional Requirements

1. **Baseline**: Implement standard triple-nested-loop matrix multiplication C = A × B for square N×N matrices of `double`, where N is supplied as a command-line argument (N ≥ 512). Initialise A and B deterministically (e.g., `A[i][j] = (double)(i + j + 1) / N`).
2. **Single-threaded timing**: Time the baseline using `clock_gettime(CLOCK_MONOTONIC)` for wall time and `clock_gettime(CLOCK_PROCESS_CPUTIME_ID)` for CPU time. Print both in seconds with 4 decimal places.
3. **Multi-threaded implementation**: Implement C = A × B using `pthread_create()`. Divide the N rows of C among T threads so that thread k computes output rows `[k*(N/T), (k+1)*(N/T))`. T is a command-line argument.
4. **Thread argument struct**: Pass per-thread parameters (thread index, start row, end row, matrix pointers, N) via a struct **allocated on the heap** (one struct per thread, not a single shared struct mutated in a loop). Free each struct after the corresponding `pthread_join()`.
5. **Correctness verification**: After all threads are joined, verify correctness by comparing at least three elements of C (e.g., `C[0][0]`, `C[N/2][N/2]`, `C[N-1][N-1]`) against independently computed values or the single-threaded baseline. Print PASS or FAIL with the compared values.
6. **Timing across all configurations**: For each T ∈ {1, 2, 4, 8}, run the multi-threaded version and record wall time. Compute speedup = (T=1 wall time) / (T-thread wall time) and print a formatted table.
7. **False sharing analysis**: In your report, determine whether false sharing is possible in your implementation. If each thread writes to a contiguous block of rows and `N × sizeof(double)` is a multiple of 64 bytes (one cache line), adjacent rows assigned to different threads do not share a cache line, and false sharing is impossible; show this calculation. If your matrix layout could cause false sharing, demonstrate the effect empirically by comparing performance with a padding strategy.
8. **Command-line interface**: `./matmul <N> <T>` where N is the matrix dimension and T is the thread count. The program prints the timing table for T ∈ {1,2,4,8} and a correctness verification line.

**Bonus (not assessed in primary rubric):**
- Transpose B before multiplication to improve cache locality on the inner loop; measure the effect
- Plot speedup vs T using a text-based graph in the README

#### Non-Functional Requirements
- Code must compile on Linux (or WSL2) with `gcc -Wall -Wextra -pthread -O2 -o matmul matmul.c` (or via `make`)
- Primary language: C (C99 or C11)
- **No use of OpenMP, MKL, BLAS, or any parallel linear algebra library** — raw `pthreads` only
- All matrices must be heap-allocated (not declared as global fixed-size arrays or stack VLAs)
- All threads must be explicitly joined with `pthread_join()` before the program exits

---

### Submission Format

Your submission must be a ZIP file named `StudentID_Project2.zip` containing:

```
project_2/
├── code/
│   ├── matmul.c            (or multiple .c/.h files)
│   └── Makefile            (default target builds `matmul`; `make clean` removes binaries and .o files)
├── ai_log/
│   └── [AI conversation logs — .txt, .md, or screenshots]
└── README.md               (see README Requirements below)
```

### README Requirements

Your `README.md` is a **signpost document** — it tells the marker where to find evidence, not a full essay. Aim for one screen of content. Use the headings below exactly.

```markdown
## How to Build and Run
<compile command and how to launch: `make && ./matmul <N> <T>`>

## What Works
<bullet list — tick off each functional requirement you implemented; note any bonus work>

## What Doesn't Work / Known Issues
<honest statement; "none" is fine if everything works>

## AI Tools Used
<name each tool; e.g., "GitHub Copilot Chat, ChatGPT-4o">

## Where to Find the AI Critique
<point to the specific file(s) and section(s) in ai_log/ where you:
 - identified an AI error and corrected it (cite the OS/architecture concept involved)
 - questioned a correct but questionable AI design choice (e.g. parameter passing, timing approach)>

## OS Concepts Demonstrated
<for each concept, one sentence pointing to the relevant function/line in your code>
- Thread creation lifecycle (`pthread_create`/`pthread_join` — what `clone()` flags mean for the address space)
- Shared heap vs private per-thread stack (which data structures in your code live where)
- Wall time vs CPU time (why CPU time can exceed wall time on a multi-core machine)
- False sharing (cache line arithmetic — is your row-block output layout susceptible? Show the calculation)
- Amdahl's Law (serial fraction of your program; theoretical speedup limit at T=8)

## Test Evidence
<performance table: N=512, T ∈ {1,2,4,8}: wall time, CPU time, speedup>
<correctness verification output>
<at least one test with non-power-of-two T or N not divisible by T>
Show exact command and terminal output for each.
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

*Full rubric: see [Project_2_Rubric.md](Project_2_Rubric.md)*

### Academic Integrity

All AI usage must be logged and submitted. Unreported AI use constitutes academic misconduct under the University of Limerick Academic Integrity Policy. You are assessed on your **management and critique of AI output**, not on the AI's performance results alone.
