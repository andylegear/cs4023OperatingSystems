/* threads_basic.c – CS4023 Lab 04 Starter
 *
 * Demonstrates basic POSIX thread creation and joining.
 *   - pthread_create() spawns a new thread
 *   - pthread_join()   waits for a thread to finish
 *   - Thread function signature: void *func(void *arg)
 *
 * Compile: gcc -Wall -lpthread -o threads_basic threads_basic.c
 * Run:     ./threads_basic
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>   /* pthread_t, pthread_create, pthread_join */
#include <unistd.h>    /* getpid() */

#define NUM_THREADS 4

/* Argument structure passed to each thread */
typedef struct {
    int    thread_id;    /* 0-based identifier */
    int    iterations;   /* how many times to loop */
} thread_args_t;

/* Thread function – each thread prints a greeting and does some counting */
void *worker(void *arg) {
    thread_args_t *a = (thread_args_t *)arg;

    printf("[Thread %d] Started (OS thread PID via gettid would differ)\n",
           a->thread_id);

    /* Simulate work with a simple counting loop */
    long sum = 0;
    for (int i = 0; i < a->iterations; i++) {
        sum += i;
    }

    printf("[Thread %d] Done, sum of 0..%d = %ld\n",
           a->thread_id, a->iterations - 1, sum);

    return NULL;   /* thread functions return void* */
}

int main(void) {
    pthread_t     threads[NUM_THREADS];
    thread_args_t args[NUM_THREADS];

    printf("[Main] Process PID=%d, spawning %d threads\n",
           (int)getpid(), NUM_THREADS);

    /* Create threads */
    for (int i = 0; i < NUM_THREADS; i++) {
        args[i].thread_id  = i;
        args[i].iterations = (i + 1) * 100000;   /* different workload each */

        int ret = pthread_create(&threads[i], NULL, worker, &args[i]);
        if (ret != 0) {
            fprintf(stderr, "pthread_create failed for thread %d: %d\n", i, ret);
            exit(EXIT_FAILURE);
        }
        printf("[Main] Spawned thread %d\n", i);
    }

    /* Wait for all threads to finish */
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
        printf("[Main] Thread %d joined\n", i);
    }

    printf("[Main] All threads complete.\n");
    return EXIT_SUCCESS;
}
