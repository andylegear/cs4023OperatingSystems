# Makefile — CS4023 Week 7 Lab Reference Implementations
# Compile: make        (builds all)
#          make run    (builds + runs each demo)
#          make clean  (removes binaries)

CC      := gcc
CFLAGS  := -Wall -Wextra -pthread -O1 -g
LDFLAGS := -pthread

TARGETS := mutex_counter semaphore_pool sync_benchmark ts_stack \
           sem_sender sem_receiver

.PHONY: all run clean

all: $(TARGETS)

mutex_counter: mutex_counter.c
	$(CC) $(CFLAGS) $< -o $@ $(LDFLAGS)

semaphore_pool: semaphore_pool.c
	$(CC) $(CFLAGS) $< -o $@ $(LDFLAGS)

sync_benchmark: sync_benchmark.c
	$(CC) $(CFLAGS) $< -o $@ $(LDFLAGS)

ts_stack: ts_stack.c
	$(CC) $(CFLAGS) $< -o $@ $(LDFLAGS)

sem_sender: sem_sender.c
	$(CC) $(CFLAGS) $< -o $@ $(LDFLAGS)

sem_receiver: sem_receiver.c
	$(CC) $(CFLAGS) $< -o $@ $(LDFLAGS)

run: all
	@echo ""
	@echo "=== mutex_counter ==="
	./mutex_counter
	@echo ""
	@echo "=== semaphore_pool ==="
	./semaphore_pool
	@echo ""
	@echo "=== sync_benchmark ==="
	./sync_benchmark
	@echo ""
	@echo "=== ts_stack ==="
	./ts_stack
	@echo ""
	@echo "(sem_sender / sem_receiver require two terminals — run manually)"

clean:
	rm -f $(TARGETS)
