/* readers_writers.c – CS4023 Lab 08 Reference Implementation (Exercise 2)
 *
 * Reader-preference readers-writers lock (Courtois solution).
 * Shared "database": an array of integers. Multiple readers may read
 * concurrently; writers require exclusive access.
 *
 * Spawns 5 readers (each reads 100 times) and 2 writers (each writes 10 times).
 * Logs every access with a timestamp (us since start).
 *
 * Compile: gcc -Wall -lpthread -o readers_writers readers_writers.c
 * Run:     ./readers_writers
 * Via make: make rw
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
#include <time.h>
#include <string.h>

#define DB_SIZE      8
#define NUM_READERS  5
#define NUM_WRITERS  2
#define READ_OPS     100
#define WRITE_OPS    10

static int db[DB_SIZE];

/* Courtois reader-preference variables */
static int            reader_count = 0;
static pthread_mutex_t count_mutex  = PTHREAD_MUTEX_INITIALIZER; /* guards reader_count */
static pthread_mutex_t rw_mutex     = PTHREAD_MUTEX_INITIALIZER; /* exclusive write access */

/* Timing helper */
static struct timespec t_start;
static long us_since_start(void) {
    struct timespec now;
    clock_gettime(CLOCK_MONOTONIC, &now);
    return (now.tv_sec - t_start.tv_sec) * 1000000L
         + (now.tv_nsec - t_start.tv_nsec) / 1000L;
}

/* ------------------------------------------------------------------ */

void *reader(void *arg) {
    int id = *(int *)arg;
    for (int i = 0; i < READ_OPS; i++) {
        /* Reader entry */
        pthread_mutex_lock(&count_mutex);
        reader_count++;
        if (reader_count == 1)           /* first reader locks out writers */
            pthread_mutex_lock(&rw_mutex);
        pthread_mutex_unlock(&count_mutex);

        /* Read critical section */
        int snapshot[DB_SIZE];
        memcpy(snapshot, db, sizeof db);
        printf("[%7ld us] R%d reading: [%d,%d,%d,...]\n",
               us_since_start(), id, snapshot[0], snapshot[1], snapshot[2]);
        usleep(100 + rand() % 200);      /* simulate read time */

        /* Reader exit */
        pthread_mutex_lock(&count_mutex);
        reader_count--;
        if (reader_count == 0)           /* last reader releases writers */
            pthread_mutex_unlock(&rw_mutex);
        pthread_mutex_unlock(&count_mutex);

        usleep(rand() % 500);            /* think time */
    }
    return NULL;
}

void *writer(void *arg) {
    int id = *(int *)arg;
    for (int i = 0; i < WRITE_OPS; i++) {
        pthread_mutex_lock(&rw_mutex);   /* exclusive access */

        /* Write critical section */
        for (int j = 0; j < DB_SIZE; j++)
            db[j] = id * 100 + i;       /* stamp with writer id + seq */
        printf("[%7ld us] W%d writing: db[*] = %d\n",
               us_since_start(), id, db[0]);
        usleep(500 + rand() % 500);     /* simulate write time */

        pthread_mutex_unlock(&rw_mutex);

        usleep(1000 + rand() % 2000);   /* think time between writes */
    }
    return NULL;
}

int main(void) {
    srand(42);
    clock_gettime(CLOCK_MONOTONIC, &t_start);

    pthread_t readers[NUM_READERS], writers[NUM_WRITERS];
    int rids[NUM_READERS], wids[NUM_WRITERS];

    for (int i = 0; i < NUM_WRITERS; i++) {
        wids[i] = i + 1;
        pthread_create(&writers[i], NULL, writer, &wids[i]);
    }
    for (int i = 0; i < NUM_READERS; i++) {
        rids[i] = i + 1;
        pthread_create(&readers[i], NULL, reader, &rids[i]);
    }

    for (int i = 0; i < NUM_READERS; i++) pthread_join(readers[i], NULL);
    for (int i = 0; i < NUM_WRITERS; i++) pthread_join(writers[i], NULL);

    printf("\nDone — no writer–reader overlap guaranteed by reader-preference lock.\n");
    printf("(Writer starvation is possible if readers arrive continuously.)\n");
    return 0;
}
