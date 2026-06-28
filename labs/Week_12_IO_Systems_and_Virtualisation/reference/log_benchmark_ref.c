/*
 * log_benchmark_ref.c — Lab 12: Append-Only Log Benchmark (Reference Implementation)
 *
 * Compares three durability strategies for writing a 128-byte log record:
 *   Version A: no fsync
 *   Version B: fdatasync after every write
 *   Version C: fdatasync after every 10 writes
 *
 * Compile:  gcc -Wall -O2 -o log_benchmark_ref log_benchmark_ref.c
 * Run:      ./log_benchmark_ref
 * Via make: make run
 *
 * CS4023 Operating Systems — Lab 12 Reference Implementation
 */

#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <time.h>
#include <stdint.h>

#define N_ENTRIES    10000
#define FILE_A       "/tmp/log_a.bin"
#define FILE_B       "/tmp/log_b.bin"
#define FILE_C       "/tmp/log_c.bin"

typedef struct {
    uint64_t timestamp_ns;
    char     msg[120];
} LogRecord;

static long long now_ns(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return (long long)ts.tv_sec * 1000000000LL + ts.tv_nsec;
}

static long long run_version(const char *path, int sync_every) {
    int fd = open(path, O_WRONLY | O_CREAT | O_TRUNC | O_APPEND, 0644);
    if (fd < 0) { perror("open"); return -1; }

    LogRecord rec;
    memset(&rec, 0, sizeof(rec));
    snprintf(rec.msg, sizeof(rec.msg), "CS4023 log entry test message %d", 0);

    long long t0 = now_ns();
    for (int i = 0; i < N_ENTRIES; i++) {
        rec.timestamp_ns = (uint64_t)now_ns();
        snprintf(rec.msg, sizeof(rec.msg), "entry %d: OS lab write test", i);
        ssize_t n = write(fd, &rec, sizeof(rec));
        if (n != sizeof(rec)) { perror("write"); break; }
        if (sync_every > 0 && (i + 1) % sync_every == 0)
            fdatasync(fd);
    }
    if (sync_every < 0) fdatasync(fd);   /* single flush at end */
    long long elapsed = now_ns() - t0;
    close(fd);
    return elapsed;
}

int main(void) {
    printf("\n=== Log Benchmark (%d × %zu-byte records) ===\n",
           N_ENTRIES, sizeof(LogRecord));
    printf("  %-20s  %-12s  %-10s\n", "Version", "Time (ms)", "Entries/s");
    printf("  %s\n", "----------------------------------------------");

    long long ta = run_version(FILE_A, 0);      /* no fsync */
    long long tb = run_version(FILE_B, 1);      /* fsync every write */
    long long tc = run_version(FILE_C, 10);     /* fsync every 10 */

    const char *names[3] = {"A: no fsync", "B: fsync every 1", "C: fsync every 10"};
    long long times[3] = {ta, tb, tc};
    for (int i = 0; i < 3; i++) {
        double ms  = times[i] / 1e6;
        double eps = (double)N_ENTRIES / (times[i] / 1e9);
        printf("  %-20s  %-12.1f  %-10.0f\n", names[i], ms, eps);
    }

    printf("\nNote: Version A is fastest but data may be lost on crash (still in page cache).\n");
    printf("Version B is safest but slowest — each fdatasync flushes to storage.\n");
    printf("Version C balances durability and throughput.\n");

    unlink(FILE_A); unlink(FILE_B); unlink(FILE_C);
    return 0;
}
