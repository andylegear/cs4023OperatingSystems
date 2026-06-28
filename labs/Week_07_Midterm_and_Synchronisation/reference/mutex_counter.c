/* mutex_counter.c — CS4023 Week 7 Reference
 * Demonstrates mutex protection of a shared counter.
 * 4 threads each increment counter 1,000,000 times.
 * Expected final value: 4,000,000 (always correct with mutex).
 *
 * Compile: gcc -Wall -Wextra -pthread -O1 -g mutex_counter.c -o mutex_counter
 * Run:     ./mutex_counter
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define NUM_THREADS  4
#define ITERATIONS   1000000

static long counter = 0;
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

static void *thread_fn(void *arg)
{
    int id = *(int *)arg;
    for (int i = 0; i < ITERATIONS; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    printf("Thread %d done\n", id);
    return NULL;
}

int main(void)
{
    pthread_t threads[NUM_THREADS];
    int ids[NUM_THREADS];

    printf("Starting %d threads, %d iterations each\n", NUM_THREADS, ITERATIONS);
    printf("Expected final counter: %d\n\n", NUM_THREADS * ITERATIONS);

    for (int i = 0; i < NUM_THREADS; i++) {
        ids[i] = i + 1;
        if (pthread_create(&threads[i], NULL, thread_fn, &ids[i]) != 0) {
            perror("pthread_create");
            exit(EXIT_FAILURE);
        }
    }

    for (int i = 0; i < NUM_THREADS; i++)
        pthread_join(threads[i], NULL);

    pthread_mutex_destroy(&lock);

    printf("\nFinal counter: %ld\n", counter);
    if (counter == (long)NUM_THREADS * ITERATIONS)
        printf("Result: CORRECT (no lost updates)\n");
    else
        printf("Result: WRONG — %ld updates lost!\n",
               (long)NUM_THREADS * ITERATIONS - counter);

    return 0;
}
