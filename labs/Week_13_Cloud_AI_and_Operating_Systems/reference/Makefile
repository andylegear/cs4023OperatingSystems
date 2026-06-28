# Makefile — CS4023 Lab 13 Reference Implementations
# Compile: make
# Clean:   make clean

CC      = gcc
CFLAGS  = -Wall -O0 -g
TARGETS = namespace_demo_ref oom_test_ref

.PHONY: all clean

all: $(TARGETS)

namespace_demo_ref: namespace_demo_ref.c
	$(CC) $(CFLAGS) -o $@ $<
	@echo "Built $@ — run with: sudo ./namespace_demo_ref"

oom_test_ref: oom_test_ref.c
	$(CC) $(CFLAGS) -o $@ $<
	@echo "Built $@ — set up a cgroup before running (see file header)"

clean:
	rm -f $(TARGETS)
