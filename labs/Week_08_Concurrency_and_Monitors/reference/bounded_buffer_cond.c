/* bounded_buffer_cond.c – CS4023 Lab 08 Reference Implementation
 *
 * Exercise 1: 4 producers, 4 consumers, buffer capacity 10.
 * Uses pthread_mutex + pthread_cond_t (not semaphores).
 * Identical correctness semantics as bounded_buffer_sem.c — compare wall times.
 *
 * Compile: gcc -Wall -lpthread -o bounded_buffer_cond bounded_buffer_cond.c
 * Run:     ./bounded_buffer_cond
 * Via make: make cond
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <stdatomic.h>
#include <time.h>

#define BUFFER_SIZE        10
#define NUM_PRODUCERS      4
#define NUM_CONSUMERS      4
#define ITEMS_PER_PRODUCER 250
#define TOTAL_ITEMS        (NUM_PRODUCERS * ITEMS_PER_PRODUCER)

typedef struct {
    int producer_id;
    int seq;
} Item;

static Item  buffer[BUFFER_SIZE];
static int   head = 0, tail = 0, count = 0;

static pthread_mutex_t mutex     = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t  not_full  = PTHREAD_COND_INITIALIZER;
static pthread_cond_t  not_empty = PTHREAD_COND_INITIALIZER;

static atomic_int total_consumed = 0;
static int consumed_per_producer[NUM_PRODUCERS + 1];
static pthread_mutex_t stats_mutex = PTHREAD_MUTEX_INITIALIZER;

/* ------------------------------------------------------------------ */

void *producer(void *arg) {
    int id = *(int *)arg;
    for (int i = 0; i < ITEMS_PER_PRODUCER; i++) {
        Item item = { .producer_id = id, .seq = i };

        pthread_mutex_lock(&mutex);
        while (count == BUFFER_SIZE)               /* buffer full */
            pthread_cond_wait(&not_full, &mutex);  /* wait for room */

        buffer[head] = item;
        printf("[P%d] produced item (%d,%d) at slot %d (count=%d)\n",
               id, id, i, head, count + 1);
        head = (head + 1) % BUFFER_SIZE;
        count++;

        pthread_cond_signal(&not_empty);           /* wake a consumer */
        pthread_mutex_unlock(&mutex);
    }
    return NULL;
}

void *consumer(void *arg) {
    int id = *(int *)arg;
    while (1) {
        int prev = atomic_fetch_add(&total_consumed, 1);
        if (prev >= TOTAL_ITEMS) {
            atomic_fetch_sub(&total_consumed, 1);
            break;
        }

        pthread_mutex_lock(&mutex);
        while (count == 0)                          /* buffer empty  */
            pthread_cond_wait(&not_empty, &mutex);  /* wait for item */

        Item item = buffer[tail];
        printf("[C%d] consumed item (%d,%d) from slot %d (count=%d)\n",
               id, item.producer_id, item.seq, tail, count - 1);
        tail = (tail + 1) % BUFFER_SIZE;
        count--;

        pthread_cond_signal(&not_full);             /* wake a producer */
        pthread_mutex_unlock(&mutex);

        pthread_mutex_lock(&stats_mutex);
        consumed_per_producer[item.producer_id]++;
        pthread_mutex_unlock(&stats_mutex);
    }
    return NULL;
}

int main(void) {
    pthread_t producers[NUM_PRODUCERS];
    pthread_t consumers[NUM_CONSUMERS];
    int pids[NUM_PRODUCERS], cids[NUM_CONSUMERS];

    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);

    for (int i = 0; i < NUM_PRODUCERS; i++) { pids[i] = i + 1; pthread_create(&producers[i], NULL, producer, &pids[i]); }
    for (int i = 0; i < NUM_CONSUMERS; i++) { cids[i] = i + 1; pthread_create(&consumers[i], NULL, consumer, &cids[i]); }

    for (int i = 0; i < NUM_PRODUCERS; i++) pthread_join(producers[i], NULL);
    for (int i = 0; i < NUM_CONSUMERS; i++) pthread_join(consumers[i], NULL);

    clock_gettime(CLOCK_MONOTONIC, &t1);
    double elapsed = (t1.tv_sec - t0.tv_sec) + (t1.tv_nsec - t0.tv_nsec) / 1e9;

    int total = (int)atomic_load(&total_consumed);
    printf("\n--- Results ---\n");
    printf("Total consumed: %d / %d  [%s]\n", total, TOTAL_ITEMS,
           total == TOTAL_ITEMS ? "CORRECT" : "MISMATCH");
    for (int i = 1; i <= NUM_PRODUCERS; i++)
        printf("  Items from P%d: %d\n", i, consumed_per_producer[i]);
    printf("Wall time: %.3f s\n", elapsed);

    pthread_mutex_destroy(&mutex);
    pthread_cond_destroy(&not_full);
    pthread_cond_destroy(&not_empty);
    pthread_mutex_destroy(&stats_mutex);
    return total == TOTAL_ITEMS ? 0 : 1;
}
