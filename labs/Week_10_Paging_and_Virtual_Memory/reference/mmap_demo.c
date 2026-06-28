/* mmap_demo.c – CS4023 Lab 10 Reference Implementation
 *
 * Exercise 1: 100 MB anonymous mmap with three timed passes.
 *
 * Compile: gcc -Wall -o mmap_demo mmap_demo.c
 * Run:     ./mmap_demo
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/mman.h>
#include <time.h>

#define ALLOC_MB   100
#define PAGE_SIZE  4096

static long ms_elapsed(struct timespec *s, struct timespec *e) {
    return (long)((e->tv_sec - s->tv_sec) * 1000L
                + (e->tv_nsec - s->tv_nsec) / 1000000L);
}

static double gbps(size_t bytes, long ms) {
    if (ms == 0) return 0.0;
    return (double)bytes / (1024.0 * 1024.0 * 1024.0) / (ms / 1000.0);
}

int main(void) {
    size_t size  = (size_t)ALLOC_MB * 1024 * 1024;
    size_t pages = size / PAGE_SIZE;

    printf("=== mmap Demo — %d MB ===\n", ALLOC_MB);
    printf("%-8s %-16s %-14s %s\n", "Pass", "Bytes touched", "Wall time ms", "GB/s");
    printf("%-8s %-16s %-14s %s\n", "----", "-------------", "------------", "----");

    char *mem = mmap(NULL, size,
                     PROT_READ | PROT_WRITE,
                     MAP_PRIVATE | MAP_ANONYMOUS,
                     -1, 0);
    if (mem == MAP_FAILED) { perror("mmap"); return EXIT_FAILURE; }

    struct timespec t0, t1;

    /* Pass 1 (cold): write one byte per page — triggers page faults */
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < pages; i++)
        mem[i * PAGE_SIZE] = (char)i;
    clock_gettime(CLOCK_MONOTONIC, &t1);
    long ms1 = ms_elapsed(&t0, &t1);
    printf("%-8s %-16zu %-14ld %.2f\n", "1 cold", pages, ms1, gbps(pages, ms1));
    /* Pass 1 is slower because every page access raises a page fault;
     * the OS must allocate a physical frame and zero it on first touch. */

    /* Pass 2 (warm): repeat identical write — no faults, pages already resident */
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < pages; i++)
        mem[i * PAGE_SIZE] = (char)(i + 1);
    clock_gettime(CLOCK_MONOTONIC, &t1);
    long ms2 = ms_elapsed(&t0, &t1);
    printf("%-8s %-16zu %-14ld %.2f\n", "2 warm", pages, ms2, gbps(pages, ms2));

    /* Pass 3: read all 100 MB sequentially — benefits from hardware prefetch */
    volatile long sum = 0;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < size; i++)
        sum += (unsigned char)mem[i];
    clock_gettime(CLOCK_MONOTONIC, &t1);
    long ms3 = ms_elapsed(&t0, &t1);
    printf("%-8s %-16zu %-14ld %.2f\n", "3 read", size, ms3, gbps(size, ms3));
    (void)sum;

    printf("\nConclusion: Pass 1 >> Pass 2 because demand-paging causes ~%d page faults.\n",
           (int)pages);
    printf("Pass 3 (sequential read) is fast due to hardware prefetch and warm TLB.\n");

    munmap(mem, size);
    return EXIT_SUCCESS;
}
