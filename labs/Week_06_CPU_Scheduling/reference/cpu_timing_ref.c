/* cpu_timing_ref.c – CS4023 Lab 06 Reference Implementation
 *
 * Complete solution covering:
 *   Part 1 – clock_gettime (MONOTONIC and PROCESS_CPUTIME_ID)
 *   Part 2 – getrusage: user vs system time, with a syscall-heavy variant
 *   Part 5 – /proc/[PID]/stat parser
 *
 * Compile: gcc -Wall -O0 -o cpu_timing_ref cpu_timing_ref.c
 * Run:     ./cpu_timing_ref
 */

#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <sys/resource.h>
#include <unistd.h>
#include <fcntl.h>

#define ITERATIONS 300000000L

/* ── helpers ────────────────────────────────────────────── */
static double ts_to_s(const struct timespec *ts) {
    return (double)ts->tv_sec + ts->tv_nsec / 1.0e9;
}

static double timeval_to_s(const struct timeval *tv) {
    return (double)tv->tv_sec + tv->tv_usec / 1.0e6;
}

/* ── Part 1: clock_gettime demonstration ────────────────── */
static void demo_clock_gettime(void) {
    struct timespec wall_start, wall_end, cpu_start, cpu_end;

    clock_gettime(CLOCK_MONOTONIC,          &wall_start);
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &cpu_start);

    /* CPU-bound loop */
    volatile long acc = 0;
    for (long i = 0; i < ITERATIONS; i++)
        acc += i % 7;

    clock_gettime(CLOCK_MONOTONIC,          &wall_end);
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &cpu_end);

    double wall = ts_to_s(&wall_end)  - ts_to_s(&wall_start);
    double cpu  = ts_to_s(&cpu_end)   - ts_to_s(&cpu_start);

    printf("\n=== Part 1: clock_gettime ===\n");
    printf("  Wall-clock elapsed : %.4f s\n", wall);
    printf("  CPU time consumed  : %.4f s\n", cpu);
    printf("  CPU efficiency     : %.1f%%  (close to 100%% means no I/O wait)\n",
           wall > 0.0 ? cpu / wall * 100.0 : 0.0);
    printf("  Accumulator value  : %ld  (prevents dead-code elimination)\n", acc);
}

/* ── Part 2: getrusage – user vs system time ────────────── */
static void demo_getrusage_cpu(void) {
    struct rusage before, after;
    getrusage(RUSAGE_SELF, &before);

    volatile long acc = 0;
    for (long i = 0; i < ITERATIONS; i++)
        acc += i & 1;

    getrusage(RUSAGE_SELF, &after);

    double user_t = timeval_to_s(&after.ru_utime) - timeval_to_s(&before.ru_utime);
    double sys_t  = timeval_to_s(&after.ru_stime) - timeval_to_s(&before.ru_stime);

    printf("\n=== Part 2a: getrusage — CPU-bound loop ===\n");
    printf("  User time   : %.4f s  (executing our code in user space)\n", user_t);
    printf("  System time : %.4f s  (kernel doing work on our behalf)\n", sys_t);
    printf("  Expected    : mostly user time — no system calls in this loop\n");
    (void)acc;
}

static void demo_getrusage_syscall(void) {
    struct rusage before, after;
    char tmpfile[] = "/tmp/lab06_XXXXXX";
    int fd = mkstemp(tmpfile);
    if (fd < 0) { perror("mkstemp"); return; }

    getrusage(RUSAGE_SELF, &before);

    /* 10,000 write() calls → significant sys time */
    const char msg[] = "x";
    for (int i = 0; i < 10000; i++)
        write(fd, msg, 1);
    fsync(fd);

    getrusage(RUSAGE_SELF, &after);
    close(fd);
    unlink(tmpfile);

    double user_t = timeval_to_s(&after.ru_utime) - timeval_to_s(&before.ru_utime);
    double sys_t  = timeval_to_s(&after.ru_stime) - timeval_to_s(&before.ru_stime);

    printf("\n=== Part 2b: getrusage — 10,000 write() calls ===\n");
    printf("  User time   : %.4f s\n", user_t);
    printf("  System time : %.4f s  (higher — kernel handling each write syscall)\n", sys_t);
}

/* ── Part 5: /proc/[PID]/stat parser ───────────────────── */
static void demo_proc_stat(void) {
    char path[64];
    snprintf(path, sizeof(path), "/proc/%d/stat", (int)getpid());

    FILE *f = fopen(path, "r");
    if (!f) { perror("fopen /proc/pid/stat"); return; }

    /* /proc/pid/stat fields are space-separated; field 2 (comm) may contain spaces
     * wrapped in parentheses.  Safe parse: read the whole line, find closing ')'. */
    char buf[1024];
    if (!fgets(buf, sizeof(buf), f)) { fclose(f); return; }
    fclose(f);

    /* Skip past "(comm)" section */
    char *p = strrchr(buf, ')');
    if (!p) return;
    p += 2; /* skip ') ' */

    /* Fields after comm (3-onward, 1-based from spec perspective):
     * state(3) ppid(4) pgrp(5) session(6) tty_nr(7) tpgid(8) flags(9)
     * minflt(10) cminflt(11) majflt(12) cmajflt(13)
     * utime(14) stime(15) cutime(16) cstime(17) priority(18) nice(19)
     */
    long utime_ticks, stime_ticks, priority, nice_val;
    int matched = sscanf(p,
        "%*c %*d %*d %*d %*d %*d %*u %*u %*u %*u %*u "
        "%ld %ld %*d %*d %ld %ld",
        &utime_ticks, &stime_ticks, &priority, &nice_val);

    if (matched < 4) {
        fprintf(stderr, "proc/stat parse failed (matched %d)\n", matched);
        return;
    }

    long clk_tck = sysconf(_SC_CLK_TCK);
    printf("\n=== Part 5: /proc/%d/stat ===\n", (int)getpid());
    printf("  utime   : %ld ticks  = %.4f s\n", utime_ticks, (double)utime_ticks / clk_tck);
    printf("  stime   : %ld ticks  = %.4f s\n", stime_ticks, (double)stime_ticks / clk_tck);
    printf("  priority: %ld  (kernel internal; higher = better for kernel)\n", priority);
    printf("  nice    : %ld  (user-space nice value, -20..+19)\n", nice_val);
    printf("  Clock ticks per second: %ld\n", clk_tck);
}

/* ── main ───────────────────────────────────────────────── */
int main(void) {
    printf("CS4023 Lab 06 – CPU Timing Reference Implementation\n");
    printf("PID: %d\n", (int)getpid());

    demo_clock_gettime();
    demo_getrusage_cpu();
    demo_getrusage_syscall();
    demo_proc_stat();

    printf("\nDone.\n");
    return 0;
}
