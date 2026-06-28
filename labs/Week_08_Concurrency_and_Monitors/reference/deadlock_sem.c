/* deadlock_sem.c – CS4023 Lab 08 Reference Implementation (Exercise 3)
 *
 * Deliberately causes deadlock in the bounded-buffer semaphore solution
 * by swapping the P(mutex) and P(empty) order in the producer.
 *
 * A watchdog thread sleeps 3 s; if not cancelled by then, it prints
 * "DEADLOCK DETECTED" and calls abort().
 *
 * Compile: gcc -Wall -lpthread -o deadlock_sem deadlock_sem.c
 * Run:     ./deadlock_sem   (hangs ~3 s, then watchdog fires)
 * Via make: make deadlock
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define BUFFER_SIZE 3

static int   buffer[BUFFER_SIZE];
static int   head = 0, tail = 0;

static sem_t sem_mutex;
static sem_t sem_empty;
static sem_t sem_full;

static volatile int watchdog_cancel = 0;

/* ------------------------------------------------------------------ */

void *watchdog(void *arg) {
    (void)arg;
    sleep(3);
    if (!watchdog_cancel) {
        fprintf(stderr, "\n[WATCHDOG] DEADLOCK DETECTED after 3 s — aborting.\n");
        fprintf(stderr, "  Producer holds sem_mutex (value=0), is blocked on sem_empty.\n");
        fprintf(stderr, "  Consumer is blocked on sem_mutex (cannot acquire).\n");
        fprintf(stderr, "  Neither can progress — circular wait.\n");
        abort();
    }
    return NULL;
}

void *producer_buggy(void *arg) {
    (void)arg;
    /* BUG: P(mutex) BEFORE P(empty) — if buffer is full and consumer tries
     * to acquire mutex: producer holds mutex, blocks on empty;
     * consumer blocks on mutex → deadlock.
     */
    printf("[Producer] P(mutex)...\n");
    sem_wait(&sem_mutex);              /* acquire mutex FIRST (wrong!) */
    printf("[Producer] P(mutex) acquired, now P(empty)...\n");

    sem_wait(&sem_empty);              /* blocks here if buffer full — holds mutex */
    int item = 42;
    buffer[head] = item;
    printf("[Producer] inserted %d at slot %d\n", item, head);
    head = (head + 1) % BUFFER_SIZE;

    sem_post(&sem_mutex);
    sem_post(&sem_full);
    return NULL;
}

void *consumer_buggy(void *arg) {
    (void)arg;
    usleep(50000);                     /* give producer a head start */
    printf("[Consumer] P(full)...\n");
    sem_wait(&sem_full);               /* wait for an item */
    printf("[Consumer] P(mutex)...\n");
    sem_wait(&sem_mutex);              /* blocks here — mutex held by producer */
    printf("[Consumer] P(mutex) acquired\n");

    int item = buffer[tail];
    printf("[Consumer] removed %d from slot %d\n", item, tail);
    tail = (tail + 1) % BUFFER_SIZE;

    sem_post(&sem_mutex);
    sem_post(&sem_empty);
    return NULL;
}

int main(void) {
    /* Fill the buffer completely so P(empty) will block */
    sem_init(&sem_mutex, 0, 1);
    sem_init(&sem_empty, 0, 0);         /* 0 empty slots — buffer full */
    sem_init(&sem_full,  0, BUFFER_SIZE);

    /* Pre-fill buffer */
    for (int i = 0; i < BUFFER_SIZE; i++) {
        buffer[i] = i + 1;
        head = (head + 1) % BUFFER_SIZE;
    }

    printf("Buffer pre-filled (%d items). Starting deadlock demo...\n", BUFFER_SIZE);

    pthread_t p, c, w;
    pthread_create(&w, NULL, watchdog, NULL);
    pthread_create(&p, NULL, producer_buggy, NULL);
    pthread_create(&c, NULL, consumer_buggy, NULL);

    pthread_join(p, NULL);
    pthread_join(c, NULL);

    watchdog_cancel = 1;
    pthread_join(w, NULL);

    printf("(If you see this, deadlock did not occur — try reducing usleep.)\n");
    sem_destroy(&sem_mutex);
    sem_destroy(&sem_empty);
    sem_destroy(&sem_full);
    return 0;
}
