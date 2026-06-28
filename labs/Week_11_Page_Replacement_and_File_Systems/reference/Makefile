CC      = gcc
CFLAGS  = -Wall -O2 -g
TARGETS = page_fault_measure rss_poll cold_warm_mmap

.PHONY: all clean run run_fault run_rss run_mmap

all: $(TARGETS)

page_fault_measure: page_fault_measure.c
	$(CC) $(CFLAGS) -o $@ $<

rss_poll: rss_poll.c
	$(CC) $(CFLAGS) -lpthread -o $@ $<

cold_warm_mmap: cold_warm_mmap.c
	$(CC) $(CFLAGS) -o $@ $<

run: run_fault run_mmap

run_fault: page_fault_measure
	@echo "=== page_fault_measure ===" && ./page_fault_measure

run_rss: rss_poll
	@echo "=== rss_poll ===" && ./rss_poll 2>/dev/null | head -60

run_mmap: cold_warm_mmap
	@echo "=== cold_warm_mmap ===" && \
	  dd if=/dev/urandom of=test256.bin bs=1M count=32 2>/dev/null && \
	  ./cold_warm_mmap test256.bin && \
	  rm -f test256.bin

clean:
	rm -f $(TARGETS) test256.bin *.o
