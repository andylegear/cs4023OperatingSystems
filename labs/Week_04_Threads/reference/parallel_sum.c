/* parallel_sum.c – CS4023 Lab 04 Reference: Exercise 1
 *
 * Parallel array summation using pthreads.
 * Spawns 4 threads, each sums a quarter of the array,
 * stores partial result, then main thread combines.
 * Times both single-threaded and multi-threaded versions.
 *
 * Compile: gcc -Wall -lpthread -o parallel_sum parallel_sum.c
 * Run:     ./parallel_sum
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <time.h>

#define N           10000000   /* array size */
#define NUM_THREADS 4

static int   g_array[N];
static long  partial[NUM_THREADS];   /* one slot per thread – no race */

typedef struct { int id; int start; int end; } sum_args_t;

/* ── Helper: read monotonic clock in seconds ─────────────── */
static double now_sec(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec + ts.tv_nsec * 1e-9;
}

/* ── Thread function ─────────────────────────────────────── */
void *sum_worker(void *arg) {
    sum_args_t *a = (sum_args_t *)arg;
    long s = 0;
    for (int i = a->start; i < a->end; i++)
        s += g_array[i];
    partial[a->id] = s;
    return NULL;
}

/* ── Single-threaded baseline ────────────────────────────── */
static long single_sum(void) {
    long s = 0;
    for (int i = 0; i < N; i++) s += g_array[i];
    return s;
}

int main(void) {
    /* Initialise array: all 1s → expected sum = N */
    for (int i = 0; i < N; i++) g_array[i] = 1;

    /* Single-threaded timing */
    double t0 = now_sec();
    long s1 = single_sum();
    double t1 = now_sec() - t0;
    printf("Single-thread:  sum = %ld, time = %.4f s\n", s1, t1);

    /* Multi-threaded */
    pthread_t  threads[NUM_THREADS];
    sum_args_t args[NUM_THREADS];
    int chunk = N / NUM_THREADS;

    t0 = now_sec();
    for (int i = 0; i < NUM_THREADS; i++) {
        args[i] = (sum_args_t){ i, i * chunk, (i + 1) * chunk };
        pthread_create(&threads[i], NULL, sum_worker, &args[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++)
        pthread_join(threads[i], NULL);

    long total = 0;
    for (int i = 0; i < NUM_THREADS; i++) total += partial[i];
    double t2 = now_sec() - t0;

    printf("Multi-thread:   sum = %ld, time = %.4f s\n", total, t2);
    printf("Expected:       %d\n", N);
    printf("Speedup:        %.2fx\n", t1 / t2);

    return EXIT_SUCCESS;
}
