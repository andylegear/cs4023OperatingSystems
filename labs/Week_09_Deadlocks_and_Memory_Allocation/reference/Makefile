# CS4023 Lab 09 – Reference Makefile
# Targets: all, run, clean, run-deadlock, run-bankers, run-cycle, run-lock

CC      = gcc
CFLAGS  = -Wall -Wextra -g
LDFLAGS = -lpthread

PROGS   = deadlock_demo bankers cycle_detect lock_ordering

.PHONY: all run clean run-deadlock run-bankers run-cycle run-lock

all: $(PROGS)

deadlock_demo: deadlock_demo.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

bankers: bankers.c
	$(CC) $(CFLAGS) -o $@ $<

cycle_detect: cycle_detect.c
	$(CC) $(CFLAGS) -o $@ $<

lock_ordering: lock_ordering.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

# Run all non-hanging programs (skip the deadlock version by default)
run: all run-bankers run-cycle run-lock run-deadlock-fixed

run-deadlock-fixed: deadlock_demo
	@echo ""
	@echo "=== deadlock_demo (fixed order — completes) ==="
	./deadlock_demo fixed

run-deadlock: deadlock_demo
	@echo ""
	@echo "=== deadlock_demo (deadlock — will HANG; press Ctrl-C) ==="
	./deadlock_demo

run-bankers: bankers
	@echo ""
	@echo "=== bankers ==="
	./bankers

run-cycle: cycle_detect
	@echo ""
	@echo "=== cycle_detect ==="
	./cycle_detect

run-lock: lock_ordering
	@echo ""
	@echo "=== lock_ordering (fixed order) ==="
	./lock_ordering

clean:
	rm -f $(PROGS)
