/* bounded_buffer_cond.c – CS4023 Lab 08 Starter
 *
 * Bounded buffer (producer-consumer) using pthread mutex + condition variables.
 *
 * One mutex guards the buffer state.
 * Two condition variables:
 *   not_empty – consumer waits here when buffer is empty
 *   not_full  – producer waits here when buffer is full
 *
 * IMPORTANT: always use while (not if) around pthread_cond_wait because
 * POSIX allows spurious wakeups.
 *
 * Compile: gcc -Wall -lpthread -o bounded_buffer_cond bounded_buffer_cond.c
 * Run:     ./bounded_buffer_cond
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>   /* usleep */

#define BUFFER_SIZE        5
#define NUM_PRODUCERS      2
#define NUM_CONSUMERS      2
#define ITEMS_PER_PRODUCER 10

static int buffer[BUFFER_SIZE];
static int head  = 0;   /* next write position */
static int tail  = 0;   /* next read position  */
static int count = 0;   /* items currently in buffer */

static pthread_mutex_t lock      = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t  not_empty = PTHREAD_COND_INITIALIZER;
static pthread_cond_t  not_full  = PTHREAD_COND_INITIALIZER;

static volatile int items_consumed = 0;

/* ---- Producers ---- */
void *producer(void *arg) {
    int id = *(int *)arg;

    for (int i = 0; i < ITEMS_PER_PRODUCER; i++) {
        int item = id * 100 + i;

        pthread_mutex_lock(&lock);

        while (count == BUFFER_SIZE)              /* buffer full – wait */
            pthread_cond_wait(&not_full, &lock);

        buffer[head] = item;
        head = (head + 1) % BUFFER_SIZE;
        count++;
        printf("[Producer %d] Inserted %d (count=%d)\n", id, item, count);

        pthread_cond_signal(&not_empty);          /* wake a waiting consumer */
        pthread_mutex_unlock(&lock);

        usleep(5000);
    }
    printf("[Producer %d] Done.\n", id);
    return NULL;
}

/* ---- Consumers ---- */
void *consumer(void *arg) {
    int id    = *(int *)arg;
    int total = NUM_PRODUCERS * ITEMS_PER_PRODUCER;

    while (1) {
        pthread_mutex_lock(&lock);

        /* Exit condition must be checked under the lock */
        while (count == 0) {
            if (items_consumed >= total) {
                pthread_mutex_unlock(&lock);
                goto done;
            }
            pthread_cond_wait(&not_empty, &lock);
        }

        int item = buffer[tail];
        tail = (tail + 1) % BUFFER_SIZE;
        count--;
        items_consumed++;
        printf("[Consumer %d] Took %d (count=%d, consumed=%d)\n",
               id, item, count, items_consumed);

        pthread_cond_signal(&not_full);           /* wake a waiting producer */
        pthread_mutex_unlock(&lock);

        usleep(8000);
    }
done:
    printf("[Consumer %d] Done.\n", id);
    return NULL;
}

int main(void) {
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

    /* Wake consumers so they can observe the exit condition */
    pthread_mutex_lock(&lock);
    pthread_cond_broadcast(&not_empty);
    pthread_mutex_unlock(&lock);

    for (int i = 0; i < NUM_CONSUMERS; i++) pthread_join(consumers[i], NULL);

    printf("\nTotal items produced: %d, consumed: %d\n",
           NUM_PRODUCERS * ITEMS_PER_PRODUCER, items_consumed);
    return EXIT_SUCCESS;
}
