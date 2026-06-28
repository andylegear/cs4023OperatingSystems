/* deadlock_demo.c – CS4023 Lab 09 Reference Implementation
 *
 * Classic two-thread, two-mutex deadlock demonstration,
 * with a fixed version that uses consistent lock ordering.
 *
 * Compile: gcc -Wall -lpthread -o deadlock_demo deadlock_demo.c
 * Run:     ./deadlock_demo          (hangs after printing deadlock output)
 *          ./deadlock_demo fixed    (runs to completion — no deadlock)
 * Via make: make run-deadlock
 *
 * GDB attach (while hanging):
 *   gdb -p $(pgrep deadlock_demo)
 *   (gdb) info threads
 *   (gdb) thread apply all bt
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <unistd.h>

static pthread_mutex_t mutex_A = PTHREAD_MUTEX_INITIALIZER;
static pthread_mutex_t mutex_B = PTHREAD_MUTEX_INITIALIZER;
static int use_fixed_order = 0;

/* ---- DEADLOCK version ---- */
void *thread_a_dl(void *arg) {
    (void)arg;
    printf("[Thread A] Locking mutex_A...\n"); fflush(stdout);
    pthread_mutex_lock(&mutex_A);
    printf("[Thread A] Locked mutex_A. Yielding briefly...\n"); fflush(stdout);
    usleep(100000);   /* give Thread B time to lock mutex_B */

    printf("[Thread A] Trying to lock mutex_B...  (will block forever)\n"); fflush(stdout);
    pthread_mutex_lock(&mutex_B);    /* DEADLOCK — Thread B holds mutex_B */
    printf("[Thread A] Locked mutex_B. (unreachable)\n");

    pthread_mutex_unlock(&mutex_B);
    pthread_mutex_unlock(&mutex_A);
    return NULL;
}

void *thread_b_dl(void *arg) {
    (void)arg;
    printf("[Thread B] Locking mutex_B...\n"); fflush(stdout);
    pthread_mutex_lock(&mutex_B);
    printf("[Thread B] Locked mutex_B. Yielding briefly...\n"); fflush(stdout);
    usleep(100000);   /* give Thread A time to lock mutex_A */

    printf("[Thread B] Trying to lock mutex_A...  (will block forever)\n"); fflush(stdout);
    pthread_mutex_lock(&mutex_A);    /* DEADLOCK — Thread A holds mutex_A */
    printf("[Thread B] Locked mutex_A. (unreachable)\n");

    pthread_mutex_unlock(&mutex_A);
    pthread_mutex_unlock(&mutex_B);
    return NULL;
}

/* ---- FIXED version (consistent order: always A then B) ---- */
void *thread_a_fixed(void *arg) {
    (void)arg;
    printf("[Thread A-fixed] Locking mutex_A then mutex_B...\n"); fflush(stdout);
    pthread_mutex_lock(&mutex_A);
    pthread_mutex_lock(&mutex_B);
    printf("[Thread A-fixed] Holding both mutexes. Working...\n"); fflush(stdout);
    usleep(50000);
    pthread_mutex_unlock(&mutex_B);
    pthread_mutex_unlock(&mutex_A);
    printf("[Thread A-fixed] Done.\n"); fflush(stdout);
    return NULL;
}

void *thread_b_fixed(void *arg) {
    (void)arg;
    printf("[Thread B-fixed] Locking mutex_A then mutex_B...\n"); fflush(stdout);
    pthread_mutex_lock(&mutex_A);   /* SAME order: A then B */
    pthread_mutex_lock(&mutex_B);
    printf("[Thread B-fixed] Holding both mutexes. Working...\n"); fflush(stdout);
    usleep(50000);
    pthread_mutex_unlock(&mutex_B);
    pthread_mutex_unlock(&mutex_A);
    printf("[Thread B-fixed] Done.\n"); fflush(stdout);
    return NULL;
}

int main(int argc, char *argv[]) {
    if (argc > 1 && strcmp(argv[1], "fixed") == 0)
        use_fixed_order = 1;

    if (use_fixed_order) {
        printf("=== FIXED: consistent lock order (mutex_A before mutex_B) ===\n");
        printf("Expected: both threads complete without deadlock.\n\n");
        pthread_t ta, tb;
        pthread_create(&ta, NULL, thread_a_fixed, NULL);
        pthread_create(&tb, NULL, thread_b_fixed, NULL);
        pthread_join(ta, NULL);
        pthread_join(tb, NULL);
        printf("\nCompleted successfully — no deadlock.\n");
    } else {
        printf("=== DEADLOCK DEMO: opposite lock ordering ===\n");
        printf("Thread A: lock A then B\n");
        printf("Thread B: lock B then A\n");
        printf("Expected: both threads block; program hangs (Ctrl-C to kill).\n\n");
        pthread_t ta, tb;
        pthread_create(&ta, NULL, thread_a_dl, NULL);
        pthread_create(&tb, NULL, thread_b_dl, NULL);
        pthread_join(ta, NULL);  /* main hangs here */
        pthread_join(tb, NULL);
        printf("\nDone (unreachable).\n");
    }
    return EXIT_SUCCESS;
}
