/* lock_ordering.c – CS4023 Lab 09 Reference Implementation (Exercise 3)
 *
 * Demonstrates deadlock prevention through consistent lock ordering.
 *
 * 4 threads, 4 mutexes (R0..R3).
 * Thread i acquires resources: i, (i+1)%4, (i+2)%4
 *
 * MODE 1 (arbitrary order): each thread acquires in natural cyclic order
 *         → circular wait → deadlock (eventually)
 * MODE 2 (fixed order):     each thread sorts its resources and acquires
 *         in ascending index order → no circular wait → no deadlock
 *
 * Compile: gcc -Wall -lpthread -o lock_ordering lock_ordering.c
 * Run:     ./lock_ordering          (fixed order — runs 5 s without deadlock)
 *          ./lock_ordering deadlock  (may deadlock — uncomment watchdog)
 * Via make: make run-lock
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <unistd.h>
#include <time.h>
#include <stdatomic.h>

#define N_THREADS   4
#define N_RESOURCES 4
#define RUN_SECS    5

static pthread_mutex_t resources[N_RESOURCES];
static atomic_int ops_completed;   /* count of critical-section entries */
static int use_fixed_order;
static volatile int stop_flag = 0;

/* ---- sort 3 indices ascending ---- */
static void sort3(int a[3]) {
    int tmp;
    if (a[0] > a[1]) { tmp = a[0]; a[0] = a[1]; a[1] = tmp; }
    if (a[1] > a[2]) { tmp = a[1]; a[1] = a[2]; a[2] = tmp; }
    if (a[0] > a[1]) { tmp = a[0]; a[0] = a[1]; a[1] = tmp; }
}

void *worker(void *arg) {
    int id = (int)(long)arg;
    /* This thread acquires resources id, (id+1)%4, (id+2)%4 */
    int order[3] = { id, (id + 1) % N_RESOURCES, (id + 2) % N_RESOURCES };

    if (use_fixed_order) {
        sort3(order);   /* always lock in ascending index order */
    }
    /* else: arbitrary cyclic order — may deadlock */

    while (!stop_flag) {
        pthread_mutex_lock(&resources[order[0]]);
        pthread_mutex_lock(&resources[order[1]]);
        pthread_mutex_lock(&resources[order[2]]);

        /* Critical section */
        atomic_fetch_add(&ops_completed, 1);
        usleep(100);    /* simulate work */

        pthread_mutex_unlock(&resources[order[2]]);
        pthread_mutex_unlock(&resources[order[1]]);
        pthread_mutex_unlock(&resources[order[0]]);

        usleep(50);     /* release pressure between acquisitions */
    }
    return NULL;
}

int main(int argc, char *argv[]) {
    use_fixed_order = 1;
    if (argc > 1 && strcmp(argv[1], "deadlock") == 0) {
        use_fixed_order = 0;
        printf("=== ARBITRARY ORDER MODE (may deadlock — watch for hang) ===\n");
    } else {
        printf("=== FIXED ORDER MODE (ascending resource index — no deadlock) ===\n");
    }

    printf("4 threads, 4 resources. Each thread acquires 3 resources.\n");
    printf("Running for %d seconds...\n\n", RUN_SECS);

    for (int i = 0; i < N_RESOURCES; i++)
        pthread_mutex_init(&resources[i], NULL);
    atomic_store(&ops_completed, 0);

    pthread_t threads[N_THREADS];
    for (int i = 0; i < N_THREADS; i++)
        pthread_create(&threads[i], NULL, worker, (void*)(long)i);

    /* Let threads run for RUN_SECS seconds, printing progress */
    for (int s = 1; s <= RUN_SECS; s++) {
        sleep(1);
        int count = atomic_load(&ops_completed);
        printf("  t=%ds: %d critical-section entries completed\n", s, count);
    }
    stop_flag = 1;

    for (int i = 0; i < N_THREADS; i++)
        pthread_join(threads[i], NULL);

    printf("\nTotal ops: %d — no deadlock detected.\n", atomic_load(&ops_completed));
    for (int i = 0; i < N_RESOURCES; i++)
        pthread_mutex_destroy(&resources[i]);
    return EXIT_SUCCESS;
}
