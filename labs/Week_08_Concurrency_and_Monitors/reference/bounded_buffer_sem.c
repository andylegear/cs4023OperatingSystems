/* bounded_buffer_sem.c – CS4023 Lab 08 Reference Implementation
 *
 * Exercise 1: 4 producers, 4 consumers, buffer capacity 10.
 * Each producer inserts 250 items stamped with (producer_id, seq_num).
 * Each consumer logs every item consumed and increments a shared atomic counter.
 * Total consumed must equal 1000 (4 producers × 250 items).
 *
 * Compile: gcc -Wall -lpthread -o bounded_buffer_sem bounded_buffer_sem.c
 * Run:     ./bounded_buffer_sem
 * Via make: make sem
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <stdatomic.h>
#include <time.h>

#define BUFFER_SIZE       10
#define NUM_PRODUCERS     4
#define NUM_CONSUMERS     4
#define ITEMS_PER_PRODUCER 250
#define TOTAL_ITEMS       (NUM_PRODUCERS * ITEMS_PER_PRODUCER)

/* Each item carries producer id and sequence number */
typedef struct {
    int producer_id;
    int seq;
} Item;

static Item  buffer[BUFFER_SIZE];
static int   head = 0, tail = 0;

static sem_t sem_mutex;   /* binary: protects buffer */
static sem_t sem_empty;   /* counts empty slots (init = BUFFER_SIZE) */
static sem_t sem_full;    /* counts filled slots (init = 0) */

static atomic_int total_consumed = 0;   /* shared correctness counter */
static int consumed_per_producer[NUM_PRODUCERS + 1]; /* indexed 1..NUM_PRODUCERS */
static sem_t stats_mutex;

/* ------------------------------------------------------------------ */

void *producer(void *arg) {
    int id = *(int *)arg;
    for (int i = 0; i < ITEMS_PER_PRODUCER; i++) {
        Item item = { .producer_id = id, .seq = i };

        sem_wait(&sem_empty);          /* wait for a free slot  */
        sem_wait(&sem_mutex);          /* enter critical section */

        buffer[head] = item;
        printf("[P%d] produced item (%d,%d) at slot %d\n", id, id, i, head);
        head = (head + 1) % BUFFER_SIZE;

        sem_post(&sem_mutex);          /* leave critical section */
        sem_post(&sem_full);           /* signal: new item ready */
    }
    return NULL;
}

void *consumer(void *arg) {
    int id = *(int *)arg;
    while (1) {
        /* Check total first to avoid consuming beyond total items */
        int prev = atomic_fetch_add(&total_consumed, 1);
        if (prev >= TOTAL_ITEMS) {
            /* We over-incremented; put it back and exit */
            atomic_fetch_sub(&total_consumed, 1);
            break;
        }

        sem_wait(&sem_full);           /* wait for an item       */
        sem_wait(&sem_mutex);          /* enter critical section */

        Item item = buffer[tail];
        printf("[C%d] consumed item (%d,%d) from slot %d\n",
               id, item.producer_id, item.seq, tail);
        tail = (tail + 1) % BUFFER_SIZE;

        sem_post(&sem_mutex);          /* leave critical section */
        sem_post(&sem_empty);          /* signal: slot now free  */

        /* Update per-producer stats */
        sem_wait(&stats_mutex);
        consumed_per_producer[item.producer_id]++;
        sem_post(&stats_mutex);
    }
    return NULL;
}

int main(void) {
    /* Initialise semaphores */
    sem_init(&sem_mutex, 0, 1);
    sem_init(&sem_empty, 0, BUFFER_SIZE);
    sem_init(&sem_full,  0, 0);
    sem_init(&stats_mutex, 0, 1);

    pthread_t producers[NUM_PRODUCERS];
    pthread_t consumers[NUM_CONSUMERS];
    int pids[NUM_PRODUCERS], cids[NUM_CONSUMERS];

    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);

    /* Start producers */
    for (int i = 0; i < NUM_PRODUCERS; i++) {
        pids[i] = i + 1;
        pthread_create(&producers[i], NULL, producer, &pids[i]);
    }
    /* Start consumers */
    for (int i = 0; i < NUM_CONSUMERS; i++) {
        cids[i] = i + 1;
        pthread_create(&consumers[i], NULL, consumer, &cids[i]);
    }

    /* Join producers */
    for (int i = 0; i < NUM_PRODUCERS; i++)
        pthread_join(producers[i], NULL);

    /* Signal consumers to drain the remaining items and exit */
    /* (they exit via the atomic counter check) */
    for (int i = 0; i < NUM_CONSUMERS; i++)
        pthread_join(consumers[i], NULL);

    clock_gettime(CLOCK_MONOTONIC, &t1);
    double elapsed = (t1.tv_sec - t0.tv_sec) + (t1.tv_nsec - t0.tv_nsec) / 1e9;

    /* Report */
    int total = (int)atomic_load(&total_consumed);
    printf("\n--- Results ---\n");
    printf("Total consumed: %d / %d  [%s]\n",
           total, TOTAL_ITEMS,
           total == TOTAL_ITEMS ? "CORRECT" : "MISMATCH");
    for (int i = 1; i <= NUM_PRODUCERS; i++)
        printf("  Items from P%d: %d\n", i, consumed_per_producer[i]);
    printf("Wall time: %.3f s\n", elapsed);

    sem_destroy(&sem_mutex);
    sem_destroy(&sem_empty);
    sem_destroy(&sem_full);
    sem_destroy(&stats_mutex);
    return total == TOTAL_ITEMS ? 0 : 1;
}
