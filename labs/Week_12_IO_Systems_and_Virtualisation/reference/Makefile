# Makefile — Lab 12: File I/O and Buffering Reference Implementations
# CS4023 Operating Systems — Week 12

CC     = gcc
CFLAGS = -Wall -O2 -g

TARGETS = io_benchmark_ref log_benchmark_ref stat_demo_ref

.PHONY: all run clean

all: $(TARGETS)

io_benchmark_ref: io_benchmark_ref.c
	$(CC) $(CFLAGS) -o $@ $<

log_benchmark_ref: log_benchmark_ref.c
	$(CC) $(CFLAGS) -o $@ $<

stat_demo_ref: stat_demo_ref.c
	$(CC) $(CFLAGS) -o $@ $<

run: all
	@echo "--- io_benchmark_ref ---"
	./io_benchmark_ref
	@echo ""
	@echo "--- log_benchmark_ref ---"
	./log_benchmark_ref
	@echo ""
	@echo "--- stat_demo_ref ---"
	./stat_demo_ref

clean:
	rm -f $(TARGETS) /tmp/io_bench_ref.bin /tmp/log_*.bin /tmp/stat_*.bin /tmp/stat_*.lnk
