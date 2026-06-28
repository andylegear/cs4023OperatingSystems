# CS4023 Operating Systems
## Project 1 Rubric – Mini-Shell

---

### Criterion 1: Correctness (10%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | All 8 functional requirements met; pipe correctly closes all surplus file descriptors in both parent and children; SIGINT kills foreground child but does not terminate the shell; background execution works (`sleep 5 &` returns prompt immediately); handles edge cases (empty input, invalid command, nonexistent directory for `cd`); no file descriptor leaks; no zombie processes on normal exit |
| A2 | 72–79 | Requirements 1–6 met; one minor gap (e.g., `>>` missing, exit status not printed, or `sigaction()` used but disposition not correctly reset in child); no crashes on standard input |
| B1/B2 | 60–71 | Requirements 1–4 met (prompt, parse, execute, single pipe); I/O redirection partially implemented (e.g., `>` works but `<` or `>>` absent); built-ins work; minor fd leaks or zombie risk present |
| C | 40–59 | `fork()`+`execvp()`+`wait()` works for simple commands; pipe or redirection broken or absent; built-ins partially implemented; signal handling missing |
| F | 0–39 | Does not compile; or compiles but crashes on basic commands; or `system()` / `popen()` used in place of `fork()`/`exec()` |

**Marker test cases (run before finalising Criterion 1):**
- `ls -la /tmp` — verify argument parsing
- `ls /tmp | grep ".c"` — verify pipe with correct fd closure in parent and both children
- `cat < /etc/hostname` — verify input redirection
- `echo hello > /tmp/test_cs4023.txt && cat /tmp/test_cs4023.txt` — verify output redirection
- `sleep 5 &` followed immediately by `pwd` — verify background non-blocking
- Ctrl-C during `sleep 10` — verify shell survives, child is killed

---

### Criterion 2: OS Concept Depth (30%)

Evidence for this criterion comes from the **README.md `OS Concepts Demonstrated` section** (one sentence per concept pointing to code) and from **deeper explanations embedded in the AI log** (where you discuss why something works the way it does).

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | README points to specific functions/lines for all five concepts. AI log contains at least one exchange per concept where the student explains or challenges an OS mechanism with implementation-level precision — citing lecture by number and topic. For `fork()`/`exec()`/`wait()`: explains copy-on-write, address space replacement, and fd inheritance; connects to specific code. For pipes: explains kernel ring buffer and write-end reference counting; identifies the exact `close()` calls that enforce EOF delivery. For `dup2()`: explains the per-process fd table entry replacement. For signals: explains `sigaction()` vs `signal()` portability and child disposition reset before `exec()`. For zombies: explains process table entry, PID retention, and `waitpid()` placement. |
| A2 | 72–79 | README and AI log cover four of five concepts with implementation-level detail. Signal handling or zombie concept may be at a "we used sigaction as taught in Lecture 5" level without the design-decision reasoning. Lecture citations present but occasionally imprecise. |
| B1/B2 | 60–71 | README covers all five concept pointers; AI log contains concept mentions but at slide-paraphrase level — the 'why' behind specific design choices (which fds to close, where to call `wait()`) is absent. |
| C | 40–59 | README `OS Concepts` section is present but lists concepts without code pointers. AI log has no OS-level discussion — only fix requests. |
| F | 0–39 | README `OS Concepts` section absent or generic; AI log has no OS concept discussion. |

---

### Criterion 3: AI Management Quality (30%)

This criterion is assessed **entirely from the AI log**. The README `Where to Find the AI Critique` section tells the marker which file and section to look at; the depth is in the log itself.

Three dimensions are assessed:
- **Error critique** — identifying where the AI was wrong and explaining why using lecture concepts by name and number
- **Design critique** — questioning a technically correct but suboptimal AI choice, grounded in OS theory
- **Delegation strategy** — explaining what was given to AI vs. written manually, and why, invoking lecture concepts

> **The lecture concepts are your evaluative lens.** Interrogate the AI's implementation through the theory you have been taught and show that interrogation in your log.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | README points to specific log location(s). Log addresses at least two of the three dimensions. Includes at least one design critique AND an explicit delegation discussion, both backed by OS-level reasoning. Log shows ≥3 iterative rounds with evidence of steering and questioning. **Error critique example:** "The AI did not close the write end of the pipe in the parent. The reader child never sees EOF because the kernel keeps the pipe alive until all write-end references drop to zero (pipe reference counting, Lecture 4). Fixed by adding `close(pipefd[1])` in the parent after `fork()`." **Design critique example:** "The AI used `signal()` for SIGINT. `sigaction()` with `SA_RESTART` is the portable and reliable choice per Lecture 5 — `signal()` has implementation-defined reset behaviour." **Delegation example:** "I gave the tokeniser to the AI (pure string work, no OS subtlety). I wrote the signal handler myself because inherited signal dispositions across `execvp()` (Lecture 5) are exactly where AI is likely to fail." |
| A2 | 72–79 | README points to log. Log covers two of the three dimensions. Delegation mentioned with some OS reasoning. Log shows multiple rounds. One critique may be at implementation level rather than OS concept level. |
| B1/B2 | 60–71 | README points to log. Log contains one or two error critiques but no design critique or delegation discussion. Explains what the AI got wrong but not the underlying OS reason. Log shows 1–2 rounds. |
| C | 40–59 | README `Where to Find the AI Critique` absent or vague. Log contains only fix requests with no OS reasoning or questioning of correct AI choices. |
| F | 0–39 | No AI log submitted; or log is a single prompt with no follow-up; or README claims critique that is absent from or contradicted by the log. |

---

### Criterion 4: Code Quality (15%)

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | Clean, readable C; meaningful variable names (`pipefd`, `child_pid`, not `x`, `temp`); all error returns from system calls checked and an informative error message printed to stderr using `perror()` (at minimum: `fork()`, `execvp()`, `pipe()`, `open()`, `chdir()`); all heap-allocated memory freed before the function returns; Makefile builds cleanly with `gcc -Wall -Wextra` producing zero warnings; code is structured into logical functions (tokenise, execute_simple, execute_pipe, etc.) rather than a single monolithic `main()` |
| A2 | 72–79 | Most system call return values checked; minor style issues; Makefile present and functional; 1–2 `-Wall` warnings that do not affect correctness; code is mostly structured but `main()` may be long |
| B1/B2 | 60–71 | Makefile present; code is readable; some error checking missing (e.g., `execvp()` failure branch absent — if `execvp()` returns, the child should call `exit()` not `return`); several `gcc -Wall` warnings |
| C | 40–59 | Makefile absent or broken (`make` fails); significant code quality issues; multiple unhandled error cases; hard-coded buffer sizes without constants; no function decomposition |
| F | 0–39 | No Makefile; code does not compile with `gcc -Wall`; security-unsafe functions used (`gets()`, unbounded `strcpy()`); `system()` or `popen()` used |

---

### Criterion 5: Testing Evidence (15%)

Test evidence is in the **README.md `Test Evidence` section** — exact commands and terminal transcripts.

| Band | % Range | Descriptor |
|---|---|---|
| A1 | 80–100 | README includes ≥5 distinct test cases: pipe, I/O redirection (input and output), background process, SIGINT, and at least one edge case (empty line, nonexistent command, `cd` to nonexistent directory, or overlong input). Each test shows the exact command and resulting shell output as a terminal transcript. Edge case entries include a one-sentence OS explanation (e.g., "when the command is not found, `execvp()` returns −1 with errno ENOENT; without `exit()` in the child after failure, the child would continue executing shell code"). |
| A2 | 72–79 | ≥4 test cases covering pipe, redirection, background, and built-ins. Terminal output shown for each. One edge case with brief correct discussion. |
| B1/B2 | 60–71 | ≥3 test cases covering basic execution, one pipe, one built-in. Terminal output shown. No SIGINT test or edge cases. |
| C | 40–59 | 1–2 test cases; only simple commands; no pipe, signal, or background test; output present but incomplete. |
| F | 0–39 | No test cases; or output not shown; or README describes intended testing without actual terminal transcripts. |

---

### Evidence Gate Rules

- **A1 requires:** The AI log must cite specific lecture concepts by name and number (e.g., "copy-on-write as introduced in Lecture 3, Process Creation") **and** the README must point to specific functions or line numbers in the submitted code. If one A1 descriptor element is absent, cap that criterion at 79. If two or more are absent, cap at 71.
- **Default to band floor:** When evidence is ambiguous, score at the bottom of the band and justify upward only when the evidence is explicit and traceable.
- **Penalty framework (apply before band assignment, to the weighted total):**
  - Missing `README.md`: −10 from weighted total
  - No AI log submitted: cap Criteria 2 + 3 at 40%
  - Code does not compile with `gcc -Wall`: cap Criterion 1 at 10%
  - `system()` or `popen()` used for command/pipe execution: cap Criterion 1 at 20%
  - No test cases in report: cap Criterion 5 at 20%
  - ≥3 report claims not corroborated by the AI log: cap Criterion 3 one full band below the otherwise assessed band
  - All critiques in the AI log are error corrections with no evidence of questioning a correct AI choice: cap Criterion 3 at 71%
