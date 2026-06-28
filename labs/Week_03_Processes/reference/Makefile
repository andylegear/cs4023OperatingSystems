# CS4023 Lab 03 – Makefile (reference implementations)
# Usage:
#   make          – build all targets
#   make run      – build then run a quick smoke-test of each binary
#   make clean    – remove compiled binaries

CC      = gcc
CFLAGS  = -Wall -Wextra -std=c11 -pedantic
TARGETS = fork_example exec_example proc_tree fork_n run_cmd zombie_demo

# Starter files live one directory up
STARTER = ../starter

.PHONY: all run clean

all: $(TARGETS)

fork_example: $(STARTER)/fork_example.c
	$(CC) $(CFLAGS) -o $@ $<

exec_example: $(STARTER)/exec_example.c
	$(CC) $(CFLAGS) -o $@ $<

proc_tree: proc_tree.c
	$(CC) $(CFLAGS) -o $@ $<

fork_n: fork_n.c
	$(CC) $(CFLAGS) -o $@ $<

run_cmd: run_cmd.c
	$(CC) $(CFLAGS) -o $@ $<

zombie_demo: zombie_demo.c
	$(CC) $(CFLAGS) -o $@ $<

# Quick smoke-tests (non-interactive targets only)
run: all
	@echo "=== fork_example ==="
	./fork_example
	@echo ""
	@echo "=== exec_example ==="
	./exec_example
	@echo ""
	@echo "=== proc_tree ==="
	./proc_tree
	@echo ""
	@echo "=== fork_n 4 ==="
	./fork_n 4
	@echo ""
	@echo "(run_cmd and zombie_demo require interactive / manual testing)"

clean:
	rm -f $(TARGETS)
