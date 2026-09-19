/* page_fault_measure.c – CS4023 Lab 11 Starter
 *
 * Measures minor and major page faults for different memory access patterns
 * using getrusage(RUSAGE_SELF, ...).
 *
 * Three patterns on a fresh anonymous mmap allocation:
 *   1. Sequential write  (cold)
 *   2. Sequential read   (warm – same pages, already resident)
 *   3. Strided write     (stride = one cache line = 64 bytes)
 *
 * Compile: gcc -Wall -o page_fault_measure page_fault_measure.c
 * Run:     ./page_fault_measure
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/mman.h>
#include <sys/resource.h>
#include <time.h>

#define ALLOC_MB   64
#define PAGE_SIZE  4096
#define CACHE_LINE 64

typedef struct {
    long minor_faults;
    long major_faults;
    long wall_ms;
} result_t;

static long ms_now(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec * 1000L + ts.tv_nsec / 1000000L;
}

static result_t measure(const char *label,
                         char *mem, size_t size, int stride, int write_mode) {
    struct rusage before, after;
    getrusage(RUSAGE_SELF, &before);
    long t0 = ms_now();

    volatile char sink = 0;
    if (write_mode) {
        for (size_t i = 0; i < size; i += stride)
            mem[i] = (char)(i & 0xFF);
    } else {
        for (size_t i = 0; i < size; i += stride)
            sink += mem[i];
    }
    (void)sink;

    long wall = ms_now() - t0;
    getrusage(RUSAGE_SELF, &after);

    result_t r;
    r.minor_faults = after.ru_minflt - before.ru_minflt;
    r.major_faults = after.ru_majflt - before.ru_majflt;
    r.wall_ms      = wall;

    printf("  %-30s  minor=%5ld  major=%3ld  wall=%4ld ms\n",
           label, r.minor_faults, r.major_faults, wall);
    return r;
}

int main(void) {
    size_t size = (size_t)ALLOC_MB * 1024 * 1024;

    printf("=== Page Fault Measurement ===\n");
    printf("Allocation: %d MB  Page size: %d B\n\n", ALLOC_MB, PAGE_SIZE);
    printf("  %-30s  %-13s %-11s %s\n",
           "Pattern", "Minor Faults", "Major Faults", "Wall Time");
    printf("  %-30s  %-13s %-11s %s\n",
           "------------------------------",
           "-------------", "-----------", "---------");

    /* --- fresh allocation for cold write --- */
    char *mem = mmap(NULL, size,
                     PROT_READ | PROT_WRITE,
                     MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
    if (mem == MAP_FAILED) { perror("mmap"); return EXIT_FAILURE; }

    measure("Sequential write (cold)", mem, size, 1,    1);
    measure("Sequential read  (warm)", mem, size, 1,    0);
    measure("Strided write (64B, warm)", mem, size, CACHE_LINE, 1);

    munmap(mem, size);

    /* --- fresh allocation for strided cold --- */
    mem = mmap(NULL, size,
               PROT_READ | PROT_WRITE,
               MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
    if (mem == MAP_FAILED) { perror("mmap"); return EXIT_FAILURE; }

    measure("Strided write (64B, cold)", mem, size, CACHE_LINE, 1);

    munmap(mem, size);

    printf("\nExpected: cold write has many minor faults (~%zu);\n"
           "         warm read has near-zero faults.\n",
           size / PAGE_SIZE);
    return EXIT_SUCCESS;
}
