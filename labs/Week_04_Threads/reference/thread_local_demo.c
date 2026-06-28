/* thread_local_demo.c – CS4023 Lab 04 Reference: Part 4
 *
 * Demonstrates the __thread (Thread-Local Storage) qualifier.
 *
 * Each thread has its own private copy of  local_x.
 * All threads share the same  shared_x  (race condition visible).
 *
 * Compile: gcc -Wall -lpthread -o thread_local_demo thread_local_demo.c
 * Run:     ./thread_local_demo
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define NUM_THREADS  4
#define INCREMENTS   1000

/* Global shared variable – all threads write to the same memory */
static int shared_x = 0;

/* Thread-local variable – each thread gets its own private copy */
static __thread int local_x = 0;

typedef struct { int id; } tls_args_t;

void *tls_worker(void *arg) {
    tls_args_t *a = (tls_args_t *)arg;

    for (int i = 0; i < INCREMENTS; i++) {
        shared_x++;   /* unprotected – races with other threads */
        local_x++;    /* private – no race possible              */
    }

    printf("[Thread %d] local_x = %d (should be %d)\n",
           a->id, local_x, INCREMENTS);
    return NULL;
}

int main(void) {
    pthread_t   threads[NUM_THREADS];
    tls_args_t  args[NUM_THREADS];

    for (int i = 0; i < NUM_THREADS; i++) {
        args[i].id = i;
        pthread_create(&threads[i], NULL, tls_worker, &args[i]);
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }

    int expected = NUM_THREADS * INCREMENTS;
    printf("[Main] shared_x = %d (expected %d, race may cause difference)\n",
           shared_x, expected);
    printf("[Main] local_x from main thread = %d (was never incremented by other threads)\n",
           local_x);
    return EXIT_SUCCESS;
}
