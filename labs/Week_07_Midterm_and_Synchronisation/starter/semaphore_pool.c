/* semaphore_pool.c – CS4023 Lab 07 Starter
 *
 * Resource pool using a counting POSIX semaphore.
 *
 * POOL_SIZE threads may hold the resource simultaneously.
 * NUM_THREADS worker threads compete for the pool.
 *
 * sem_init  initialises the semaphore with value = POOL_SIZE.
 * sem_wait  acquires one slot (blocks if value == 0).
 * sem_post  releases one slot (wakes a waiting thread).
 *
 * Compile: gcc -Wall -lpthread -o semaphore_pool semaphore_pool.c
 * Run:     ./semaphore_pool
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>   /* usleep */

#define POOL_SIZE   3     /* max concurrent resource holders */
#define NUM_THREADS 8
#define HOLD_US     200000  /* how long each thread holds the resource (200ms) */

static sem_t pool_sem;

/* A simple mutex just for clean log output */
static pthread_mutex_t log_mutex = PTHREAD_MUTEX_INITIALIZER;

void *worker(void *arg) {
    int id = *(int *)arg;

    pthread_mutex_lock(&log_mutex);
    printf("[Thread %d] Waiting for resource slot...\n", id);
    pthread_mutex_unlock(&log_mutex);

    sem_wait(&pool_sem);   /* acquire slot – blocks if pool is full */

    pthread_mutex_lock(&log_mutex);
    printf("[Thread %d] Acquired slot. Using resource for %d ms.\n",
           id, HOLD_US / 1000);
    pthread_mutex_unlock(&log_mutex);

    usleep(HOLD_US);       /* simulate using the resource */

    pthread_mutex_lock(&log_mutex);
    printf("[Thread %d] Releasing slot.\n", id);
    pthread_mutex_unlock(&log_mutex);

    sem_post(&pool_sem);   /* release slot */
    return NULL;
}

int main(void) {
    pthread_t threads[NUM_THREADS];
    int       ids[NUM_THREADS];

    /* Initialise counting semaphore: 0=thread-shared, initial=POOL_SIZE */
    if (sem_init(&pool_sem, 0, POOL_SIZE) != 0) {
        perror("sem_init");
        return EXIT_FAILURE;
    }

    printf("Pool size: %d, Threads: %d\n\n", POOL_SIZE, NUM_THREADS);

    for (int i = 0; i < NUM_THREADS; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, worker, &ids[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }

    sem_destroy(&pool_sem);
    printf("\nAll threads finished.\n");
    return EXIT_SUCCESS;
}
