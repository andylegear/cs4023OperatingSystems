all: threads_basic race_condition thread_local_demo omp_demo parallel_sum omp_reduction

CC      = gcc
CFLAGS  = -Wall -O2
PTHREAD = -lpthread
OMP     = -fopenmp

threads_basic: ../starter/threads_basic.c
	$(CC) $(CFLAGS) $(PTHREAD) -o $@ $<

race_condition: ../starter/race_condition.c
	$(CC) $(CFLAGS) -O0 $(PTHREAD) -o $@ $<

thread_local_demo: thread_local_demo.c
	$(CC) $(CFLAGS) $(PTHREAD) -o $@ $<

omp_demo: omp_demo.c
	$(CC) $(CFLAGS) $(OMP) -o $@ $<

parallel_sum: parallel_sum.c
	$(CC) $(CFLAGS) $(PTHREAD) -o $@ $<

omp_reduction: omp_reduction.c
	$(CC) $(CFLAGS) $(OMP) -o $@ $<

run: all
	@echo "=== threads_basic ==="
	./threads_basic
	@echo ""
	@echo "=== race_condition (3 runs) ==="
	for i in 1 2 3; do ./race_condition; done
	@echo ""
	@echo "=== thread_local_demo ==="
	./thread_local_demo
	@echo ""
	@echo "=== omp_demo ==="
	./omp_demo
	@echo ""
	@echo "=== parallel_sum ==="
	./parallel_sum
	@echo ""
	@echo "=== omp_reduction ==="
	./omp_reduction

clean:
	rm -f threads_basic race_condition thread_local_demo omp_demo parallel_sum omp_reduction

.PHONY: all run clean
