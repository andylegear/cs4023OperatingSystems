/*
 * page_fault_measure.c  — CS4023 Lab 11 Reference Implementation
 *
 * Allocates 256 MB and measures minor/major page faults and wall time for:
 *   1. Sequential write (cold)
 *   2. Sequential read  (warm)
 *   3. Random access    (cold — fresh mapping)
 *   4. Random access    (warm)
 *
 * Build:  gcc -Wall -O2 -o page_fault_measure page_fault_measure.c
 * Run:    ./page_fault_measure
 */
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <time.h>
#include <sys/mman.h>
#include <sys/resource.h>

#define MEM_SIZE   (256UL * 1024 * 1024)   /* 256 MB */
#define PAGE_SIZE  4096
#define INT_SIZE   sizeof(int)
#define INTS       (MEM_SIZE / INT_SIZE)
#define PAGES      (MEM_SIZE / PAGE_SIZE)
#define INTS_PER_PAGE (PAGE_SIZE / INT_SIZE)  /* 1024 */

static long ms_elapsed(struct timespec *start, struct timespec *end) {
    return (end->tv_sec - start->tv_sec) * 1000L +
           (end->tv_nsec - start->tv_nsec) / 1000000L;
}

static void get_faults(long *minflt, long *majflt) {
    struct rusage ru;
    getrusage(RUSAGE_SELF, &ru);
    *minflt = ru.ru_minflt;
    *majflt = ru.ru_majflt;
}

static int *alloc_fresh(void) {
    void *p = mmap(NULL, MEM_SIZE, PROT_READ|PROT_WRITE,
                   MAP_PRIVATE|MAP_ANONYMOUS, -1, 0);
    if (p == MAP_FAILED) { perror("mmap"); exit(1); }
    return (int *)p;
}

static void free_mapping(int *p) {
    munmap(p, MEM_SIZE);
}

/* Fisher-Yates shuffle of page indices for random access */
static void build_random_order(size_t *order, size_t n) {
    for (size_t i = 0; i < n; i++) order[i] = i;
    for (size_t i = n - 1; i > 0; i--) {
        size_t j = (size_t)rand() % (i + 1);
        size_t tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
}

int main(void) {
    srand(42);

    long minflt_before, majflt_before, minflt_after, majflt_after;
    struct timespec t0, t1;
    int *mem;
    volatile int sink = 0;  /* prevent optimisation */

    printf("%-30s  %8s  %8s  %8s  %10s\n",
           "Pattern", "MinFlt", "MajFlt", "Time(ms)", "Notes");
    printf("%-30s  %8s  %8s  %8s  %10s\n",
           "-------------------------------", "-------", "-------", "--------", "----------");

    /* 1. Sequential write — cold */
    mem = alloc_fresh();
    get_faults(&minflt_before, &majflt_before);
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < INTS; i++) mem[i] = (int)i;
    clock_gettime(CLOCK_MONOTONIC, &t1);
    get_faults(&minflt_after, &majflt_after);
    printf("%-30s  %8ld  %8ld  %8ld  expect ~%zu minflt\n",
           "1. Sequential write (cold)",
           minflt_after - minflt_before,
           majflt_after - majflt_before,
           ms_elapsed(&t0, &t1),
           PAGES);

    /* 2. Sequential read — warm (same mapping) */
    get_faults(&minflt_before, &majflt_before);
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < INTS; i++) sink += mem[i];
    clock_gettime(CLOCK_MONOTONIC, &t1);
    get_faults(&minflt_after, &majflt_after);
    printf("%-30s  %8ld  %8ld  %8ld  expect ~0 minflt\n",
           "2. Sequential read (warm)",
           minflt_after - minflt_before,
           majflt_after - majflt_before,
           ms_elapsed(&t0, &t1));
    free_mapping(mem);

    /* Build random page order */
    size_t *order = malloc(PAGES * sizeof(size_t));
    if (!order) { perror("malloc"); return 1; }
    build_random_order(order, PAGES);

    /* 3. Random access — cold (fresh mapping) */
    mem = alloc_fresh();
    get_faults(&minflt_before, &majflt_before);
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < PAGES; i++) {
        mem[order[i] * INTS_PER_PAGE] = (int)i;
    }
    clock_gettime(CLOCK_MONOTONIC, &t1);
    get_faults(&minflt_after, &majflt_after);
    printf("%-30s  %8ld  %8ld  %8ld  same total faults, worse TLB\n",
           "3. Random access (cold)",
           minflt_after - minflt_before,
           majflt_after - majflt_before,
           ms_elapsed(&t0, &t1));

    /* 4. Random access — warm (same order, same mapping) */
    get_faults(&minflt_before, &majflt_before);
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < PAGES; i++) {
        sink += mem[order[i] * INTS_PER_PAGE];
    }
    clock_gettime(CLOCK_MONOTONIC, &t1);
    get_faults(&minflt_after, &majflt_after);
    printf("%-30s  %8ld  %8ld  %8ld  expect ~0 minflt\n",
           "4. Random access (warm)",
           minflt_after - minflt_before,
           majflt_after - majflt_before,
           ms_elapsed(&t0, &t1));
    free_mapping(mem);
    free(order);

    (void)sink;
    return 0;
}
