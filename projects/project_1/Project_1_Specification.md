# CS4023 Operating Systems
## Project 1 – Mini-Shell
**Worth: 10% of module grade | Announced: 14 September 2026 (Week 2) | Due: Friday 02 October 2026, 23:59**

---

### Overview

A shell is the primary user-space interface to an operating system kernel. It demonstrates, in minimal form, most of the core process-management concepts covered in the first four weeks of CS4023: process creation via `fork()`, process image replacement via `exec()`, inter-process communication via pipes, I/O redirection through file-descriptor manipulation, signal delivery, and parent–child synchronisation via `wait()`. Building a shell from scratch forces you to confront exactly the abstractions the OS provides and to understand why each system call is necessary.

In this project you will build a functioning command-line shell called **cs4023-shell**. It will accept user commands, fork a child process for each command, execute the program in the child, and wait for — or background — the result. You will extend it incrementally to handle single pipes, I/O redirection, and background execution. You will use AI assistance throughout, but you are responsible for understanding every line of code and for identifying errors the AI produces.

The goal is not a production-quality shell. It is a vehicle for demonstrating precise knowledge of OS process management. The depth of your AI critique and concept discussion (in your AI log and README) matters more than the polish of your shell.

### Learning Outcomes

On completion you will be able to:
- Explain the `fork()`–`exec()`–`wait()` lifecycle and the role of the kernel in each step
- Describe how file descriptors are inherited across `fork()` and manipulated with `dup2()` for I/O redirection
- Implement a single-pipe pipeline by connecting two processes through a kernel pipe buffer
- Explain how POSIX signals work, distinguish synchronous from asynchronous delivery, and handle SIGINT correctly
- Demonstrate zombie process creation and prevention using `wait()` / `waitpid()`
- Critically evaluate AI-generated C code for correctness with respect to POSIX process semantics

### Background

The following lecture topics are directly relevant. You must reference them by number in your AI log and README:

- **Lecture 2**: Process concept, PCB, process states (new → ready → running → waiting → terminated), process creation and termination
- **Lecture 3**: `fork()`, `exec()` family, `wait()` / `waitpid()`, copy-on-write semantics, process address space layout (text, data, heap, stack)
- **Lecture 4**: File descriptors as per-process kernel objects, `dup2()`, pipes as kernel ring buffers, `pipe()` system call, the importance of closing surplus pipe ends
- **Lecture 5**: Signals — delivery, disposition, `signal()` vs `sigaction()`, SIGINT, SIGCHLD, zombie prevention

---

### Requirements

#### Functional Requirements

1. **Prompt and read**: Display the prompt `cs4023-shell> ` and read a complete command line from standard input using `fgets()` or `getline()`. Strip the trailing newline.
2. **Parse**: Tokenise the command line into an argument vector (`argv[]`) terminated by `NULL`, correctly separating the program name from its arguments using spaces and tabs as delimiters.
3. **Execute**: For each non-built-in command, call `fork()` to create a child process, then call `execvp()` in the child. The parent calls `waitpid()` to collect the child's exit status. Print a message if the exit status is non-zero.
4. **Single pipe**: Handle `cmd1 | cmd2` by calling `pipe()` to create a kernel pipe, forking two children, redirecting child 1's stdout to the pipe write end and child 2's stdin to the pipe read end via `dup2()`, closing all surplus file descriptors in both parent and children, and waiting for both children.
5. **I/O redirection**: Handle `cmd > file` (truncate and write), `cmd < file` (read from file), and `cmd >> file` (append) by opening the file with the appropriate `open()` flags and calling `dup2()` to redirect the relevant standard stream.
6. **Background execution**: Handle `cmd &` — fork and execute the command without calling `wait()` immediately. The shell prints `[PID] <pid>` and immediately returns to the prompt.
7. **Built-in commands**: Implement `exit` (terminate the shell with exit code 0), `cd [dir]` (change directory using `chdir()`; print an error message to stderr if the directory does not exist), and `pwd` (print the current working directory using `getcwd()`).
8. **Signal handling**: Install a SIGINT handler using `sigaction()` so that Ctrl-C kills the current foreground child process but does not terminate the shell itself. The shell must not exit on SIGINT; it must redisplay the prompt.

**Bonus (not assessed in primary rubric, but should be noted in the README if attempted):**
- Double pipe: `cmd1 | cmd2 | cmd3`
- SIGCHLD handler to reap background zombies automatically

#### Non-Functional Requirements
- Code must compile on Linux (or WSL2) with `gcc -Wall -Wextra -o cs4023-shell shell.c` (or via `make`)
- Primary language: C (C99 or C11)
- **No use of `system()`** — you must use `fork()`/`exec()`/`wait()` directly
- **No use of `popen()`** for pipe implementation
- All file descriptors opened during command execution must be closed before returning to the prompt
- Input lines exceeding 1024 characters may be handled as an error

---

### Submission Format

Your submission must be a ZIP file named `StudentID_Project1.zip` containing:

```
project_1/
├── code/
│   ├── shell.c             (or multiple .c/.h files)
│   └── Makefile            (default target builds `cs4023-shell`; `make clean` removes binaries)
├── ai_log/
│   └── [AI conversation logs — .txt, .md, or screenshots; filename must indicate the AI tool used]
└── README.md               (see README Requirements below)
```

### README Requirements

Your `README.md` is a **signpost document** — it tells the marker where to find evidence, not a full essay. It must be concise (aim for one screen of content). Use the headings below exactly.

```markdown
## How to Build and Run
<one or two shell commands to compile and launch the shell>

## What Works
<bullet list — tick off each functional requirement you implemented>

## What Doesn't Work / Known Issues
<honest statement; "none" is fine if everything works>

## AI Tools Used
<name each tool; e.g., "GitHub Copilot Chat (VS Code), ChatGPT-4o">

## Where to Find the AI Critique
<point to the specific file(s) and section(s) in ai_log/ where you:
 - identified an AI error and corrected it (cite the OS concept involved)
 - questioned a correct but questionable AI design choice>

## OS Concepts Demonstrated
<for each concept below, one sentence pointing to the relevant function/line in your code>
- fork()–exec()–wait() lifecycle
- File descriptor inheritance and dup2()
- Pipe as IPC (kernel buffer, write-end reference counting)
- Signal handling (SIGINT survival)
- Zombie prevention

## Test Evidence
<for each test case, the exact command and the shell output as a terminal transcript>
Minimum: multi-argument command, pipe, background process, one edge case.
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

*Full rubric: see [Project_1_Rubric.md](Project_1_Rubric.md)*

### Academic Integrity

All AI usage must be logged and submitted as part of your ZIP. Unreported AI use constitutes academic misconduct under the University of Limerick Academic Integrity Policy. You are assessed on your **management and critique of AI output**, not on the AI's code alone. Submitting AI output without substantive critique will score 0 on Criteria 2 and 3.
