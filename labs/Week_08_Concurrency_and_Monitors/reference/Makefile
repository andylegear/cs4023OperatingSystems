CC      = gcc
CFLAGS  = -Wall -Wextra -lpthread
BINS    = bounded_buffer_sem bounded_buffer_cond readers_writers deadlock_sem

.PHONY: all run clean sem cond rw deadlock

all: $(BINS)

bounded_buffer_sem: bounded_buffer_sem.c
	$(CC) $(CFLAGS) -o $@ $<

bounded_buffer_cond: bounded_buffer_cond.c
	$(CC) $(CFLAGS) -o $@ $<

readers_writers: readers_writers.c
	$(CC) $(CFLAGS) -o $@ $<

deadlock_sem: deadlock_sem.c
	$(CC) $(CFLAGS) -o $@ $<

sem: bounded_buffer_sem
	./bounded_buffer_sem

cond: bounded_buffer_cond
	./bounded_buffer_cond

rw: readers_writers
	./readers_writers

deadlock: deadlock_sem
	./deadlock_sem

run: all
	@echo "--- bounded_buffer_sem ---"
	./bounded_buffer_sem
	@echo ""
	@echo "--- bounded_buffer_cond ---"
	./bounded_buffer_cond
	@echo ""
	@echo "--- readers_writers ---"
	./readers_writers
	@echo ""
	@echo "--- deadlock_sem (will abort after 3s) ---"
	-./deadlock_sem

clean:
	rm -f $(BINS) *.o
