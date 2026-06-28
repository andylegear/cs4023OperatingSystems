/*
 * rss_poll.c  — CS4023 Lab 11 Reference Implementation
 *
 * Spawns a monitor thread that reads VmRSS from /proc/self/status every 10 ms.
 * Main thread allocates 512 MB via mmap (pages not touched yet) then
 * sequentially touches one byte per page, watching RSS grow.
 * After all pages are touched, munmap is called and RSS drops.
 *
 * Build:  gcc -Wall -O2 -lpthread -o rss_poll rss_poll.c
 * Run:    ./rss_poll 2>/dev/null | head -60
 */
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>
#include <sys/mman.h>
#include <time.h>

#define MEM_SIZE  (512UL * 1024 * 1024)   /* 512 MB */
#define PAGE_SIZE 4096

static volatile int g_done = 0;

static long read_vmrss_kb(void) {
    FILE *f = fopen("/proc/self/status", "r");
    if (!f) return -1;
    char line[128];
    long rss = -1;
    while (fgets(line, sizeof(line), f)) {
        if (strncmp(line, "VmRSS:", 6) == 0) {
            sscanf(line, "VmRSS: %ld", &rss);
            break;
        }
    }
    fclose(f);
    return rss;
}

static long ms_now(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec * 1000L + ts.tv_nsec / 1000000L;
}

static void *monitor_thread(void *arg) {
    (void)arg;
    long t0 = ms_now();
    while (!g_done) {
        long rss = read_vmrss_kb();
        long t   = ms_now() - t0;
        printf("t=%5ld ms  VmRSS=%7ld kB  (~%.0f MB)\n",
               t, rss, (double)rss / 1024.0);
        fflush(stdout);
        struct timespec req = { .tv_sec = 0, .tv_nsec = 10000000L };  /* 10 ms */
        nanosleep(&req, NULL);
    }
    return NULL;
}

int main(void) {
    printf("=== RSS Poll Demo ===\n");
    printf("Allocating 512 MB (pages not yet touched)...\n");

    char *mem = mmap(NULL, MEM_SIZE, PROT_READ|PROT_WRITE,
                     MAP_PRIVATE|MAP_ANONYMOUS, -1, 0);
    if (mem == MAP_FAILED) { perror("mmap"); return 1; }

    pthread_t mon;
    pthread_create(&mon, NULL, monitor_thread, NULL);

    size_t n_pages = MEM_SIZE / PAGE_SIZE;
    printf("Touching %zu pages sequentially (watch RSS grow)...\n", n_pages);

    /* Touch one byte per page — forces minor faults */
    for (size_t i = 0; i < n_pages; i++) {
        mem[i * PAGE_SIZE] = 1;
        /* slow down slightly so monitor can sample */
        if (i % 4096 == 0) {
            struct timespec req = { .tv_nsec = 1000000L };  /* 1 ms */
            nanosleep(&req, NULL);
        }
    }

    printf("All pages touched. Sleeping 200ms before munmap...\n");
    struct timespec req = { .tv_nsec = 200000000L };
    nanosleep(&req, NULL);

    munmap(mem, MEM_SIZE);
    printf("munmap complete — watch RSS drop.\n");

    struct timespec req2 = { .tv_nsec = 100000000L };
    nanosleep(&req2, NULL);

    g_done = 1;
    pthread_join(mon, NULL);
    printf("Done.\n");
    return 0;
}
