/* mutex_counter.c – CS4023 Lab 07 Starter
 *
 * Fixes the data race from Lab 04 (race_condition.c) using a pthread_mutex.
 *
 * 4 threads each increment a shared counter 1,000,000 times.
 * With the mutex protecting counter++, the result is always 4,000,000.
 *
 * Compare runtime with race_condition.c to see the overhead of locking.
 *
 * Compile: gcc -Wall -lpthread -o mutex_counter mutex_counter.c
 * Run:     ./mutex_counter
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <time.h>   /* clock_gettime */

#define INCREMENTS  1000000L
#define NUM_THREADS 4

static long              counter = 0;
static pthread_mutex_t   lock    = PTHREAD_MUTEX_INITIALIZER;

void *increment_thread(void *arg) {
    int id = *(int *)arg;
    (void)id;

    for (long i = 0; i < INCREMENTS; i++) {
        pthread_mutex_lock(&lock);
        counter++;                   /* critical section */
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

static double now_s(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec + ts.tv_nsec / 1e9;
}

int main(void) {
    pthread_t threads[NUM_THREADS];
    int       ids[NUM_THREADS];

    double t0 = now_s();

    for (int i = 0; i < NUM_THREADS; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, increment_thread, &ids[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }

    double elapsed = now_s() - t0;

    long expected = (long)NUM_THREADS * INCREMENTS;
    printf("Expected: %ld\n", expected);
    printf("Actual:   %ld\n", counter);
    printf("Result:   %s\n", counter == expected ? "CORRECT" : "WRONG");
    printf("Time:     %.3f s (%.1f ns/op)\n",
           elapsed,
           elapsed * 1e9 / ((double)NUM_THREADS * INCREMENTS));

    pthread_mutex_destroy(&lock);
    return EXIT_SUCCESS;
}
