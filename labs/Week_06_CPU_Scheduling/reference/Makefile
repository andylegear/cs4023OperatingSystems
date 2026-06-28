# CS4023 Lab 06 Reference Implementation — Makefile

CC      = gcc
CFLAGS  = -Wall -Wextra -O0 -g
TARGETS = cpu_timing_ref

.PHONY: all clean

all: $(TARGETS)

cpu_timing_ref: cpu_timing_ref.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f $(TARGETS)
