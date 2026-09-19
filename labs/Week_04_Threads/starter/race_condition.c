/* race_condition.c – CS4023 Lab 04 Starter
 *
 * Demonstrates a DATA RACE on a shared counter.
 *
 * Two threads each increment `counter` 1,000,000 times WITHOUT synchronisation.
 * Expected result: 2,000,000
 * Actual result:   often less, due to interleaved read-modify-write operations.
 *
 * The race:  counter++  compiles to three steps:
 *   1. LOAD  counter  -> register
 *   2. ADD   register, 1
 *   3. STORE register -> counter
 * Two threads can both LOAD the same value and both STORE the same result,
 * effectively losing one increment.
 *
 * Run this program multiple times:
 *   for i in $(seq 10); do ./race_condition; done
 * and observe that the result varies.
 *
 * Compile: gcc -Wall -O0 -lpthread -o race_condition race_condition.c
 *   (-O0 disables optimisations that might hide the race)
 * Run:     ./race_condition
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define INCREMENTS  1000000L    /* each thread does this many increments */
#define NUM_THREADS 2

/* Shared counter – accessible by all threads with NO protection */
static long counter = 0;

void *increment_thread(void *arg) {
    int thread_id = *(int *)arg;
    (void)thread_id;   /* suppress unused warning */

    /* BUG: counter++ is NOT atomic – this causes a data race */
    for (long i = 0; i < INCREMENTS; i++) {
        counter++;   /* read-modify-write without synchronisation */
    }
    return NULL;
}

int main(void) {
    pthread_t threads[NUM_THREADS];
    int       ids[NUM_THREADS];

    counter = 0;

    for (int i = 0; i < NUM_THREADS; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, increment_thread, &ids[i]);
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }

    long expected = (long)NUM_THREADS * INCREMENTS;
    printf("Expected: %ld\n", expected);
    printf("Actual:   %ld\n", counter);

    if (counter == expected) {
        printf("Result:   CORRECT (lucky run – race did not manifest)\n");
    } else {
        printf("Result:   WRONG by %ld (race condition detected)\n",
               expected - counter);
    }

    return EXIT_SUCCESS;
}
