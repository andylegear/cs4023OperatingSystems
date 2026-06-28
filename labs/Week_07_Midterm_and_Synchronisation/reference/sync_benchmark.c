/* sync_benchmark.c — CS4023 Week 7 Reference
 * Benchmarks three synchronisation strategies over 10,000,000 iterations:
 *   1. No synchronisation (plain counter++)
 *   2. pthread_mutex lock/unlock
 *   3. GCC built-in atomic: __sync_fetch_and_add
 *
 * Compile: gcc -Wall -Wextra -pthread -O1 -g sync_benchmark.c -o sync_benchmark
 * Run:     ./sync_benchmark
 *
 * Note: -O1 prevents the compiler from optimising away the unsynchronised loop.
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <time.h>

#define NUM_THREADS  4
#define ITERATIONS   10000000

/* ── Shared state ─────────────────────────────────────────────────────────── */
typedef struct {
    long counter;
    pthread_mutex_t mutex;
} bench_state_t;

static bench_state_t state;

typedef enum { MODE_NONE, MODE_MUTEX, MODE_ATOMIC } mode_t;
static mode_t current_mode;

/* ── Thread function ─────────────────────────────────────────────────────── */
static void *bench_thread(void *arg)
{
    (void)arg;
    for (int i = 0; i < ITERATIONS; i++) {
        switch (current_mode) {
        case MODE_NONE:
            state.counter++;
            break;
        case MODE_MUTEX:
            pthread_mutex_lock(&state.mutex);
            state.counter++;
            pthread_mutex_unlock(&state.mutex);
            break;
        case MODE_ATOMIC:
            __sync_fetch_and_add(&state.counter, 1);
            break;
        }
    }
    return NULL;
}

/* ── Benchmark helper ────────────────────────────────────────────────────── */
static void run_benchmark(const char *label, mode_t m)
{
    pthread_t threads[NUM_THREADS];
    struct timespec t0, t1;

    state.counter = 0;
    current_mode  = m;

    clock_gettime(CLOCK_MONOTONIC, &t0);

    for (int i = 0; i < NUM_THREADS; i++)
        pthread_create(&threads[i], NULL, bench_thread, NULL);
    for (int i = 0; i < NUM_THREADS; i++)
        pthread_join(threads[i], NULL);

    clock_gettime(CLOCK_MONOTONIC, &t1);

    long expected = (long)NUM_THREADS * ITERATIONS;
    long elapsed_ns = (t1.tv_sec - t0.tv_sec) * 1000000000L +
                      (t1.tv_nsec - t0.tv_nsec);
    double ns_per_op = (double)elapsed_ns / ((double)NUM_THREADS * ITERATIONS);

    printf("  %-22s  counter=%-12ld  correct=%-3s  time=%6.2f s  %6.1f ns/op\n",
           label,
           state.counter,
           state.counter == expected ? "yes" : "NO",
           (double)elapsed_ns / 1e9,
           ns_per_op);
}

int main(void)
{
    pthread_mutex_init(&state.mutex, NULL);

    printf("Sync Benchmark — %d threads × %d iterations\n\n",
           NUM_THREADS, ITERATIONS);
    printf("  %-22s  %-18s  %-7s  %-10s  %s\n",
           "Mode", "Final counter", "Correct", "Wall time", "ns/op");
    printf("  %s\n",
           "----------------------------------------------------------------------");

    run_benchmark("No sync",        MODE_NONE);
    run_benchmark("pthread_mutex",  MODE_MUTEX);
    run_benchmark("__sync (atomic)", MODE_ATOMIC);

    pthread_mutex_destroy(&state.mutex);
    return 0;
}
