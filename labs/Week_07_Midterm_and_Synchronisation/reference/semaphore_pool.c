/* semaphore_pool.c — CS4023 Week 7 Reference
 * Counting semaphore as a resource pool.
 * 8 threads compete for a pool of 3 resources.
 * Each thread acquires the resource, uses it, then releases it.
 *
 * Compile: gcc -Wall -Wextra -pthread -O1 -g semaphore_pool.c -o semaphore_pool
 * Run:     ./semaphore_pool
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define NUM_THREADS  8
#define POOL_SIZE    3
#define USE_TIME_MIN 50000   /* 50 ms  */
#define USE_TIME_MAX 200000  /* 200 ms */

static sem_t pool;
static pthread_mutex_t print_lock = PTHREAD_MUTEX_INITIALIZER;

static void *worker(void *arg)
{
    int id = *(int *)arg;
    int sem_val;

    /* Acquire resource (blocks if pool is full) */
    sem_getvalue(&pool, &sem_val);
    pthread_mutex_lock(&print_lock);
    printf("Thread %d: waiting for resource  (pool available: %d)\n",
           id, sem_val);
    pthread_mutex_unlock(&print_lock);

    sem_wait(&pool);

    sem_getvalue(&pool, &sem_val);
    pthread_mutex_lock(&print_lock);
    printf("Thread %d: acquired resource     (pool available: %d)\n",
           id, sem_val);
    pthread_mutex_unlock(&print_lock);

    /* Simulate using the resource */
    useconds_t use_time = USE_TIME_MIN +
        (useconds_t)(((unsigned)rand_r((unsigned *)arg)) %
                     (USE_TIME_MAX - USE_TIME_MIN));
    usleep(use_time);

    /* Release resource */
    sem_post(&pool);

    sem_getvalue(&pool, &sem_val);
    pthread_mutex_lock(&print_lock);
    printf("Thread %d: released resource     (pool available: %d)\n",
           id, sem_val);
    pthread_mutex_unlock(&print_lock);

    return NULL;
}

int main(void)
{
    pthread_t threads[NUM_THREADS];
    int ids[NUM_THREADS];

    sem_init(&pool, 0, POOL_SIZE);

    printf("Resource pool: %d slots, %d threads\n\n", POOL_SIZE, NUM_THREADS);

    for (int i = 0; i < NUM_THREADS; i++) {
        ids[i] = i + 1;
        if (pthread_create(&threads[i], NULL, worker, &ids[i]) != 0) {
            perror("pthread_create");
            exit(EXIT_FAILURE);
        }
    }

    for (int i = 0; i < NUM_THREADS; i++)
        pthread_join(threads[i], NULL);

    sem_destroy(&pool);
    pthread_mutex_destroy(&print_lock);

    printf("\nAll threads done. Pool fully released.\n");
    return 0;
}
