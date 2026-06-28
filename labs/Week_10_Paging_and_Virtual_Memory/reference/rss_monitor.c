/* rss_monitor.c – CS4023 Lab 10 Reference Implementation
 *
 * Exercise 3: watch RSS grow as pages are touched in a 256 MB mmap region.
 *
 * Compile: gcc -Wall -lpthread -o rss_monitor rss_monitor.c
 * Run:     ./rss_monitor
 */

#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/mman.h>
#include <pthread.h>
#include <time.h>

#define ALLOC_MB   256
#define PAGE_SIZE  4096
#define POLL_MS     50

static volatile int done = 0;
static volatile size_t pages_touched = 0;

/* Read VmRSS from /proc/self/status (returns kB) */
static long read_vmrss(void) {
    FILE *f = fopen("/proc/self/status", "r");
    if (!f) return -1;
    char line[128];
    long rss = -1;
    while (fgets(line, sizeof(line), f)) {
        if (strncmp(line, "VmRSS:", 6) == 0) {
            sscanf(line + 6, "%ld", &rss);
            break;
        }
    }
    fclose(f);
    return rss;
}

typedef struct { char *mem; size_t size; } MonArgs;

static void *monitor_thread(void *arg) {
    (void)arg;
    struct timespec start, now;
    clock_gettime(CLOCK_MONOTONIC, &start);
    printf("%-12s %-14s %s\n", "time_ms", "VmRSS_kB", "pages_touched");
    printf("%-12s %-14s %s\n", "-------", "--------", "-------------");
    while (!done) {
        struct timespec ts = { .tv_sec = 0, .tv_nsec = POLL_MS * 1000000L };
        nanosleep(&ts, NULL);
        clock_gettime(CLOCK_MONOTONIC, &now);
        long elapsed = (long)((now.tv_sec - start.tv_sec) * 1000L
                             + (now.tv_nsec - start.tv_nsec) / 1000000L);
        long rss = read_vmrss();
        printf("%-12ld %-14ld %zu\n", elapsed, rss, pages_touched);
        fflush(stdout);
    }
    return NULL;
}

int main(void) {
    size_t size  = (size_t)ALLOC_MB * 1024 * 1024;
    size_t pages = size / PAGE_SIZE;

    printf("=== RSS Growth Monitor — %d MB mmap ===\n\n", ALLOC_MB);

    char *mem = mmap(NULL, size,
                     PROT_READ | PROT_WRITE,
                     MAP_PRIVATE | MAP_ANONYMOUS,
                     -1, 0);
    if (mem == MAP_FAILED) { perror("mmap"); return EXIT_FAILURE; }

    printf("mmap complete (no pages resident yet — demand paging)\n\n");

    pthread_t mon;
    pthread_create(&mon, NULL, monitor_thread, NULL);

    /* Touch every page sequentially — one byte per 4 KB page */
    for (size_t i = 0; i < pages; i++) {
        mem[i * PAGE_SIZE] = (char)(i & 0xFF);
        pages_touched = i + 1;
    }

    done = 1;
    pthread_join(mon, NULL);

    printf("\nDone. All %zu pages touched. Final VmRSS: %ld kB\n",
           pages, read_vmrss());

    munmap(mem, size);
    return EXIT_SUCCESS;
}
