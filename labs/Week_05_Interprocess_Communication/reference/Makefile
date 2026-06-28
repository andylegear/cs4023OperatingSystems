# CS4023 Week 5 Lab — Reference Implementation Makefile

CC      = gcc
CFLAGS  = -Wall -Wextra -g

# All binaries
TARGETS = pipe_demo fifo_demo shm_posix shm_race

.PHONY: all clean run

all: $(TARGETS)

pipe_demo: pipe_demo.c
	$(CC) $(CFLAGS) -o $@ $<

fifo_demo: fifo_demo.c
	$(CC) $(CFLAGS) -o $@ $<

shm_posix: shm_posix.c
	$(CC) $(CFLAGS) -o $@ $< -lrt

shm_race: shm_race.c
	$(CC) $(CFLAGS) -o $@ $< -lpthread

# Run all demos sequentially
run: all
	@echo "=== pipe_demo ==========================================="
	./pipe_demo
	@echo ""
	@echo "=== shm_posix ==========================================="
	./shm_posix
	@echo ""
	@echo "=== shm_race ============================================"
	./shm_race
	@echo ""
	@echo "fifo_demo requires two terminals — see fifo_demo.c header."

clean:
	rm -f $(TARGETS)
	@# Remove any stray FIFO or shared memory objects
	-rm -f /tmp/cs4023_fifo
	-$(shell ls /dev/shm/cs4023_* 2>/dev/null | xargs rm -f)
