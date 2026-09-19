/* deadlock_demo.c – CS4023 Lab 09 Starter
 *
 * Classic two-thread, two-mutex deadlock demonstration.
 *
 * Thread A: lock mutex_A, then lock mutex_B
 * Thread B: lock mutex_B, then lock mutex_A  ← opposite order → DEADLOCK
 *
 * Both threads block waiting for the mutex held by the other.
 *
 * Compile: gcc -Wall -lpthread -o deadlock_demo deadlock_demo.c
 * Run:     ./deadlock_demo      (will hang – use Ctrl-C to kill)
 *
 * Exercise: fix by making both threads lock in the same order (A then B).
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

static pthread_mutex_t mutex_A = PTHREAD_MUTEX_INITIALIZER;
static pthread_mutex_t mutex_B = PTHREAD_MUTEX_INITIALIZER;

void *thread_a(void *arg) {
    (void)arg;
    printf("[Thread A] Locking mutex_A...\n");
    pthread_mutex_lock(&mutex_A);
    printf("[Thread A] Locked mutex_A. Sleeping briefly...\n");
    usleep(100000);   /* give Thread B time to lock mutex_B */

    printf("[Thread A] Trying to lock mutex_B...\n");
    pthread_mutex_lock(&mutex_B);   /* BLOCKS – Thread B holds mutex_B */
    printf("[Thread A] Locked mutex_B. (should never reach here)\n");

    pthread_mutex_unlock(&mutex_B);
    pthread_mutex_unlock(&mutex_A);
    return NULL;
}

void *thread_b(void *arg) {
    (void)arg;
    printf("[Thread B] Locking mutex_B...\n");
    pthread_mutex_lock(&mutex_B);
    printf("[Thread B] Locked mutex_B. Sleeping briefly...\n");
    usleep(100000);   /* give Thread A time to lock mutex_A */

    printf("[Thread B] Trying to lock mutex_A...\n");
    pthread_mutex_lock(&mutex_A);   /* BLOCKS – Thread A holds mutex_A */
    printf("[Thread B] Locked mutex_A. (should never reach here)\n");

    pthread_mutex_unlock(&mutex_A);
    pthread_mutex_unlock(&mutex_B);
    return NULL;
}

int main(void) {
    pthread_t ta, tb;

    printf("Starting deadlock demo...\n");
    printf("Expected behaviour: both threads block and program hangs.\n\n");

    pthread_create(&ta, NULL, thread_a, NULL);
    pthread_create(&tb, NULL, thread_b, NULL);

    pthread_join(ta, NULL);   /* main will block here too */
    pthread_join(tb, NULL);

    printf("Done (unreachable).\n");
    return EXIT_SUCCESS;
}
