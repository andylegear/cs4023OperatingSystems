/* mmap_demo.c – CS4023 Lab 10 Starter
 *
 * Demonstrates anonymous mmap:
 *  - allocate ALLOC_MB of memory via mmap (no file backing)
 *  - touch every page (write pass) to trigger demand-paging
 *  - read pass to measure warm-cache throughput
 *
 * Observe that the first write pass is slower (page faults) than subsequent
 * accesses (pages already resident).
 *
 * Compile: gcc -Wall -o mmap_demo mmap_demo.c
 * Run:     ./mmap_demo
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/mman.h>
#include <time.h>

#define ALLOC_MB   64
#define PAGE_SIZE  4096

static long ms_elapsed(struct timespec *start, struct timespec *end) {
    return (long)((end->tv_sec  - start->tv_sec) * 1000L
                + (end->tv_nsec - start->tv_nsec) / 1000000L);
}

int main(void) {
    size_t size  = (size_t)ALLOC_MB * 1024 * 1024;
    size_t pages = size / PAGE_SIZE;

    printf("=== mmap Demo ===\n");
    printf("Allocation: %d MB (%zu pages)\n\n", ALLOC_MB, pages);

    /* Map anonymous private memory */
    char *mem = mmap(NULL, size,
                     PROT_READ | PROT_WRITE,
                     MAP_PRIVATE | MAP_ANONYMOUS,
                     -1, 0);
    if (mem == MAP_FAILED) {
        perror("mmap");
        return EXIT_FAILURE;
    }

    struct timespec t0, t1;

    /* --- Pass 1: cold write (one byte per page – triggers page faults) --- */
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < pages; i++)
        mem[i * PAGE_SIZE] = (char)(i & 0xFF);
    clock_gettime(CLOCK_MONOTONIC, &t1);
    printf("Pass 1 (cold write, 1 byte/page): %ld ms\n", ms_elapsed(&t0, &t1));

    /* --- Pass 2: warm write (same bytes, pages already resident) --- */
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < pages; i++)
        mem[i * PAGE_SIZE] = (char)(i & 0xFF);
    clock_gettime(CLOCK_MONOTONIC, &t1);
    printf("Pass 2 (warm write, 1 byte/page): %ld ms\n", ms_elapsed(&t0, &t1));

    /* --- Pass 3: sequential read of all memory --- */
    volatile long checksum = 0;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < size; i++)
        checksum += (unsigned char)mem[i];
    clock_gettime(CLOCK_MONOTONIC, &t1);
    long ms = ms_elapsed(&t0, &t1);
    double gbps = (ms > 0) ? ((double)size / (1024.0*1024.0*1024.0)) / (ms / 1000.0) : 0.0;
    printf("Pass 3 (sequential read, all):   %ld ms  (%.2f GB/s, checksum=%ld)\n",
           ms, gbps, checksum);

    munmap(mem, size);
    printf("\nDone. Note: Pass 1 > Pass 2 because page faults occur on first access.\n");
    return EXIT_SUCCESS;
}
