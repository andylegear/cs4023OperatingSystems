/* bounded_buffer_sem.c – CS4023 Lab 08 Starter
 *
 * Bounded buffer (producer-consumer) using POSIX semaphores.
 *
 * Three semaphores:
 *   mutex  (initial=1)  – mutual exclusion on buffer array
 *   empty  (initial=N)  – counts empty slots
 *   full   (initial=0)  – counts filled slots
 *
 * 2 producers, 2 consumers, buffer capacity BUFFER_SIZE.
 * Each producer inserts ITEMS_PER_PRODUCER items; program exits when
 * consumers have taken all items.
 *
 * Compile: gcc -Wall -lpthread -o bounded_buffer_sem bounded_buffer_sem.c
 * Run:     ./bounded_buffer_sem
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>   /* usleep */

#define BUFFER_SIZE       5
#define NUM_PRODUCERS     2
#define NUM_CONSUMERS     2
#define ITEMS_PER_PRODUCER 10

static int buffer[BUFFER_SIZE];
static int head = 0, tail = 0;   /* head = next write, tail = next read */

static sem_t mutex_sem;   /* protects buffer access */
static sem_t empty_sem;   /* counts empty slots */
static sem_t full_sem;    /* counts filled slots */

/* Shared counter for consumers: how many items consumed total */
static volatile int items_consumed = 0;
static pthread_mutex_t consume_count_lock = PTHREAD_MUTEX_INITIALIZER;

/* ---- Producers ---- */
void *producer(void *arg) {
    int id = *(int *)arg;

    for (int i = 0; i < ITEMS_PER_PRODUCER; i++) {
        int item = id * 100 + i;   /* encode producer ID in item value */

        sem_wait(&empty_sem);      /* wait for a free slot */
        sem_wait(&mutex_sem);      /* lock buffer */

        buffer[head] = item;
        head = (head + 1) % BUFFER_SIZE;
        printf("[Producer %d] Inserted item %d\n", id, item);

        sem_post(&mutex_sem);      /* unlock buffer */
        sem_post(&full_sem);       /* signal a filled slot */

        usleep(5000);              /* slow down slightly */
    }
    printf("[Producer %d] Done.\n", id);
    return NULL;
}

/* ---- Consumers ---- */
void *consumer(void *arg) {
    int id = *(int *)arg;
    int total_items = NUM_PRODUCERS * ITEMS_PER_PRODUCER;

    while (1) {
        pthread_mutex_lock(&consume_count_lock);
        if (items_consumed >= total_items) {
            pthread_mutex_unlock(&consume_count_lock);
            break;
        }
        pthread_mutex_unlock(&consume_count_lock);

        sem_wait(&full_sem);       /* wait for a filled slot */
        sem_wait(&mutex_sem);

        int item = buffer[tail];
        tail = (tail + 1) % BUFFER_SIZE;

        pthread_mutex_lock(&consume_count_lock);
        items_consumed++;
        int consumed_so_far = items_consumed;
        pthread_mutex_unlock(&consume_count_lock);

        printf("[Consumer %d] Took item %d (%d/%d)\n",
               id, item, consumed_so_far, total_items);

        sem_post(&mutex_sem);
        sem_post(&empty_sem);      /* signal a free slot */

        usleep(8000);
    }
    printf("[Consumer %d] Done.\n", id);
    return NULL;
}

int main(void) {
    sem_init(&mutex_sem, 0, 1);
    sem_init(&empty_sem, 0, BUFFER_SIZE);
    sem_init(&full_sem,  0, 0);

    pthread_t producers[NUM_PRODUCERS];
    pthread_t consumers[NUM_CONSUMERS];
    int       pids[NUM_PRODUCERS], cids[NUM_CONSUMERS];

    for (int i = 0; i < NUM_PRODUCERS; i++) {
        pids[i] = i;
        pthread_create(&producers[i], NULL, producer, &pids[i]);
    }
    for (int i = 0; i < NUM_CONSUMERS; i++) {
        cids[i] = i;
        pthread_create(&consumers[i], NULL, consumer, &cids[i]);
    }

    for (int i = 0; i < NUM_PRODUCERS; i++) pthread_join(producers[i], NULL);
    for (int i = 0; i < NUM_CONSUMERS; i++) pthread_join(consumers[i], NULL);

    printf("\nTotal items produced: %d, consumed: %d\n",
           NUM_PRODUCERS * ITEMS_PER_PRODUCER, items_consumed);

    sem_destroy(&mutex_sem);
    sem_destroy(&empty_sem);
    sem_destroy(&full_sem);
    return EXIT_SUCCESS;
}
