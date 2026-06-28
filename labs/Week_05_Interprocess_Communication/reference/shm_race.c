/*
 * shm_race.c  —  CS4023 Week 5 Lab Reference Implementation
 *
 * Demonstrates:
 *   PART A — Race condition in shared memory (no synchronisation)
 *     Two pthreads both increment a shared counter 500,000 times.
 *     Expected result: 1,000,000.  Actual result: < 1,000,000 (lost updates).
 *
 *   PART B — Fix with a process-shared mutex (pthread_mutex with PSHARED attribute)
 *     Same two threads, same counter, but protected by a mutex.
 *     Result is always exactly 1,000,000.
 *
 * Compile: gcc -Wall -Wextra -o shm_race shm_race.c -lpthread
 * Run:     ./shm_race
 *
 * NOTE: On modern out-of-order CPUs the race may not always show with small
 * iteration counts.  500,000 iterations is large enough to reliably demonstrate
 * the lost-update problem.
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define ITERATIONS 500000

/* ──────────────────────────────────────── */
/* Shared data (simulates a shared region)  */
/* ──────────────────────────────────────── */
typedef struct {
    long              counter;
    pthread_mutex_t   mutex;
} SharedRegion;

static SharedRegion region;
static int use_mutex = 0;   /* 0 = race, 1 = protected */

/* ────────── thread function ────────── */
static void *increment(void *arg)
{
    (void)arg;
    for (int i = 0; i < ITERATIONS; i++) {
        if (use_mutex) pthread_mutex_lock(&region.mutex);
        region.counter++;                /* non-atomic: read, add 1, write back */
        if (use_mutex) pthread_mutex_unlock(&region.mutex);
    }
    return NULL;
}

/* ────────── run one experiment ────────── */
static void run(const char *label, int mutex_on)
{
    region.counter = 0;
    use_mutex = mutex_on;

    pthread_t t1, t2;
    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    long expected = (long)ITERATIONS * 2;
    printf("%-35s expected=%ld  got=%ld  %s\n",
           label, expected, region.counter,
           (region.counter == expected) ? "✓ CORRECT" : "✗ LOST UPDATES");
}

int main(void)
{
    /* Initialise process-shared mutex (PSHARED allows use across mmap'd region) */
    pthread_mutexattr_t attr;
    pthread_mutexattr_init(&attr);
    pthread_mutexattr_setpshared(&attr, PTHREAD_PROCESS_SHARED);
    pthread_mutex_init(&region.mutex, &attr);
    pthread_mutexattr_destroy(&attr);

    printf("CS4023 Week 5 — Shared Memory Race Condition Demo\n");
    printf("Each experiment: 2 threads × %d iterations = %d expected\n\n",
           ITERATIONS, ITERATIONS * 2);

    /* PART A: no mutex — race condition */
    run("Part A: No mutex (race condition)", 0);

    /* PART B: mutex — serialised writes */
    run("Part B: pthread_mutex  (serialised)", 1);

    printf("\nKey insight: counter++ is NOT atomic — it compiles to:\n");
    printf("  mov rax, [counter]   ; load\n");
    printf("  inc rax              ; modify\n");
    printf("  mov [counter], rax   ; store\n");
    printf("A context switch between load and store causes a lost update.\n");

    pthread_mutex_destroy(&region.mutex);
    return 0;
}
