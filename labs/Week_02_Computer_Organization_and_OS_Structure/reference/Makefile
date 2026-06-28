# CS4023 Lab 02 – Reference Makefile
# Builds all reference implementations and provides individual run targets.
#
# Usage:
#   make          – build all binaries
#   make run      – build all and run main demo (syscall_example)
#   make clean    – remove all compiled binaries

CC      = gcc
CFLAGS  = -Wall -Wextra -std=c99 -g

TARGETS = syscall_example my_cat malloc_trace count_maps

.PHONY: all run clean

all: $(TARGETS)

syscall_example: syscall_example.c
	$(CC) $(CFLAGS) -o $@ $<

my_cat: my_cat.c
	$(CC) $(CFLAGS) -o $@ $<

malloc_trace: malloc_trace.c
	$(CC) $(CFLAGS) -o $@ $<

count_maps: count_maps.c
	$(CC) $(CFLAGS) -o $@ $<

run: all
	@echo "--- syscall_example ---"
	./syscall_example
	@echo ""
	@echo "--- my_cat /etc/hostname ---"
	./my_cat /etc/hostname
	@echo ""
	@echo "--- malloc_trace (run under strace for full detail) ---"
	./malloc_trace
	@echo ""
	@echo "--- count_maps ---"
	./count_maps

clean:
	rm -f $(TARGETS)
