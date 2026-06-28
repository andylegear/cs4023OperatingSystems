/*
 * io_benchmark_ref.c — Lab 12: I/O Block-Size Benchmark (Reference Implementation)
 *
 * Measures write throughput (MB/s) as a function of block size.
 * Writes 128 MB total for each block size using O_WRONLY without O_SYNC,
 * then repeats with O_SYNC to show fsync cost.
 *
 * Compile:  gcc -Wall -O2 -o io_benchmark_ref io_benchmark_ref.c
 * Run:      ./io_benchmark_ref
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

#define TOTAL_BYTES  (128UL * 1024 * 1024)   /* 128 MB per test */
#define FILE_NAME    "/tmp/io_bench_ref.bin"

static long long now_ns(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return (long long)ts.tv_sec * 1000000000LL + ts.tv_nsec;
}

static void benchmark(int block_size, int use_sync) {
    char *buf = malloc(block_size);
    if (!buf) { perror("malloc"); return; }
    memset(buf, 0xAB, block_size);

    int flags = O_WRONLY | O_CREAT | O_TRUNC;
    if (use_sync) flags |= O_SYNC;
    int fd = open(FILE_NAME, flags, 0644);
    if (fd < 0) { perror("open"); free(buf); return; }

    size_t writes = TOTAL_BYTES / block_size;
    long long t0 = now_ns();
    for (size_t i = 0; i < writes; i++) {
        ssize_t n = write(fd, buf, block_size);
        if (n != block_size) { perror("write"); break; }
    }
    long long elapsed = now_ns() - t0;
    close(fd);

    double ms = elapsed / 1e6;
    double mbs = (double)TOTAL_BYTES / (1024.0 * 1024.0) / (elapsed / 1e9);
    long syscalls = (long)writes;
    printf("  %-8d  %-10ld  %-10.1f  %-10.1f\n", block_size, syscalls, ms, mbs);
    free(buf);
}

int main(void) {
    int block_sizes[] = { 1, 512, 1024, 4096, 16384, 65536, 0 };

    printf("\n=== IO Benchmark (128 MB total, no O_SYNC) ===\n");
    printf("  %-8s  %-10s  %-10s  %-10s\n", "BlkSize", "Syscalls", "Wall(ms)", "MB/s");
    printf("  %s\n", "------------------------------------------------------------");
    for (int i = 0; block_sizes[i]; i++)
        benchmark(block_sizes[i], 0);

    printf("\n=== IO Benchmark (128 MB total, O_SYNC) ===\n");
    printf("  %-8s  %-10s  %-10s  %-10s\n", "BlkSize", "Syscalls", "Wall(ms)", "MB/s");
    printf("  %s\n", "------------------------------------------------------------");
    /* Only test larger block sizes with O_SYNC to keep runtime reasonable */
    int sync_sizes[] = { 512, 4096, 65536, 0 };
    for (int i = 0; sync_sizes[i]; i++)
        benchmark(sync_sizes[i], 1);

    unlink(FILE_NAME);
    printf("\nNote: With O_SYNC each write() flushes to disk — throughput drops dramatically for small blocks.\n");
    printf("The 'knee' where throughput plateaus is typically around 4–64 KB block size.\n");
    return 0;
}
