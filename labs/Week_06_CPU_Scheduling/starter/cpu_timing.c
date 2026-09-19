/* cpu_timing.c – CS4023 Lab 06 Starter
 *
 * Measures CPU consumption of a CPU-bound loop using:
 *   1. clock_gettime(CLOCK_MONOTONIC)           – wall-clock elapsed time
 *   2. clock_gettime(CLOCK_PROCESS_CPUTIME_ID)  – process CPU time
 *   3. getrusage(RUSAGE_SELF)                   – user + system time breakdown
 *
 * Compile: gcc -Wall -o cpu_timing cpu_timing.c
 * Run:     ./cpu_timing
 *
 * Try: time ./cpu_timing
 * Try: nice -n 19 ./cpu_timing   (lower priority – may take longer under load)
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>       /* clock_gettime, CLOCK_MONOTONIC, CLOCK_PROCESS_CPUTIME_ID */
#include <sys/resource.h>  /* getrusage, RUSAGE_SELF */

#define ITERATIONS 500000000L   /* 500 million iterations – adjust as needed */

static double timespec_to_s(const struct timespec *ts) {
    return ts->tv_sec + ts->tv_nsec / 1e9;
}

int main(void) {
    struct timespec wall_start, wall_end;
    struct timespec cpu_start,  cpu_end;
    struct rusage   usage_before, usage_after;

    /* --- Record start times --- */
    clock_gettime(CLOCK_MONOTONIC, &wall_start);
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &cpu_start);
    getrusage(RUSAGE_SELF, &usage_before);

    /* --- CPU-bound work: simple integer arithmetic loop --- */
    volatile long acc = 0;        /* volatile prevents the compiler from optimising away */
    for (long i = 0; i < ITERATIONS; i++) {
        acc += i % 3;             /* cheap arithmetic, not memory-bound */
    }

    /* --- Record end times --- */
    clock_gettime(CLOCK_MONOTONIC, &wall_end);
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &cpu_end);
    getrusage(RUSAGE_SELF, &usage_after);

    /* --- Compute deltas --- */
    double wall_elapsed = timespec_to_s(&wall_end)  - timespec_to_s(&wall_start);
    double cpu_elapsed  = timespec_to_s(&cpu_end)   - timespec_to_s(&cpu_start);

    /* getrusage times in microseconds */
    double user_s = (usage_after.ru_utime.tv_sec  - usage_before.ru_utime.tv_sec)
                  + (usage_after.ru_utime.tv_usec - usage_before.ru_utime.tv_usec) / 1e6;
    double sys_s  = (usage_after.ru_stime.tv_sec  - usage_before.ru_stime.tv_sec)
                  + (usage_after.ru_stime.tv_usec - usage_before.ru_stime.tv_usec) / 1e6;

    /* --- Print results --- */
    printf("Accumulator value (prevent dead-code elimination): %ld\n", acc);
    printf("Iterations:       %ld\n", ITERATIONS);
    printf("Wall-clock time:  %.4f s\n", wall_elapsed);
    printf("Process CPU time: %.4f s  (CLOCK_PROCESS_CPUTIME_ID)\n", cpu_elapsed);
    printf("getrusage user:   %.4f s\n", user_s);
    printf("getrusage sys:    %.4f s\n", sys_s);
    printf("CPU utilisation:  %.1f%%  (cpu / wall * 100)\n",
           wall_elapsed > 0.0 ? cpu_elapsed / wall_elapsed * 100.0 : 0.0);

    return EXIT_SUCCESS;
}
