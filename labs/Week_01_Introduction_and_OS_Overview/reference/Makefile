# Makefile – CS4023 Lab 1 reference implementations
# Covers Parts 2 & 3 (hello), Part 4 (debug_demo), Exercises 1–3
#
# Usage:
#   make              – build everything
#   make hello        – Part 2/3 simple build
#   make debug_demo   – Part 4 GDB demo (with -g)
#   make pid_reporter – Exercise 1
#   make hello_greet  – Exercise 3 multi-file build
#   make clean        – remove all generated files

CC      = gcc
CFLAGS  = -Wall -g

.PHONY: all run clean

all: hello debug_demo pid_reporter hello_greet

# ── Part 2 / Part 3 ──────────────────────────────────────────────
hello: hello.c
	$(CC) $(CFLAGS) -o hello hello.c

# ── Part 4: GDB demo with intentional off-by-one bug ─────────────
debug_demo: debug_demo.c
	$(CC) $(CFLAGS) -o debug_demo debug_demo.c

# ── Exercise 1: PID Reporter ──────────────────────────────────────
pid_reporter: pid_reporter.c
	$(CC) $(CFLAGS) -o pid_reporter pid_reporter.c

# ── Exercise 3: multi-file build ──────────────────────────────────
hello_greet.o: hello_greet.c greet.h
	$(CC) $(CFLAGS) -c hello_greet.c -o hello_greet.o

greet.o: greet.c greet.h
	$(CC) $(CFLAGS) -c greet.c -o greet.o

hello_greet: hello_greet.o greet.o
	$(CC) $(CFLAGS) -o hello_greet hello_greet.o greet.o

# ── Clean ─────────────────────────────────────────────────────────
clean:
	rm -f hello debug_demo pid_reporter hello_greet \
	      *.o hello.i hello.s

# ── Run all (build first) ─────────────────────────────────────────
run: all
	@echo "--- hello ---"
	./hello
	@echo "--- pid_reporter ---"
	./pid_reporter
	@echo "--- hello_greet ---"
	./hello_greet
	@echo "--- debug_demo (arr[3] shows out-of-bounds garbage) ---"
	./debug_demo
