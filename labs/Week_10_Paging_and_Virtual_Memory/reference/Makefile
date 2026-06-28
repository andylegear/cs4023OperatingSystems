CC      = gcc
CFLAGS  = -Wall -O2

TARGETS = mmap_demo file_copy_compare rss_monitor proc_maps_reader

all: $(TARGETS)

mmap_demo: mmap_demo.c
	$(CC) $(CFLAGS) -o $@ $<

file_copy_compare: file_copy_compare.c
	$(CC) $(CFLAGS) -o $@ $<

rss_monitor: rss_monitor.c
	$(CC) $(CFLAGS) -lpthread -o $@ $<

proc_maps_reader: proc_maps_reader.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f $(TARGETS) /tmp/copy_mmap.bin /tmp/copy_rw.bin

test: all
	@echo "=== mmap_demo ==="
	./mmap_demo
	@echo ""
	@echo "=== proc_maps_reader ==="
	./proc_maps_reader | head -20
	@echo ""
	@echo "=== rss_monitor (first 10 lines) ==="
	./rss_monitor | head -10
	@echo ""
	@echo "Note: file_copy_compare requires test50.bin — run:"
	@echo "  dd if=/dev/urandom of=test50.bin bs=1M count=50"
	@echo "  ./file_copy_compare test50.bin"

.PHONY: all clean test
