/* io_benchmark.c – CS4023 Lab 12 Starter
 *
 * Benchmarks write() throughput across block sizes 1 B to 64 KB.
 * Writes TOTAL_MB of data per block size to a temporary file,
 * then removes the file.
 *
 * Expected: very small blocks are limited by syscall overhead;
 * throughput rises steeply until ~4-16 KB then plateaus.
 *
 * Compile: gcc -Wall -o io_benchmark io_benchmark.c
 * Run:     ./io_benchmark
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <time.h>

#define TOTAL_MB    64           /* MB written per block size */
#define TMPFILE     "/tmp/cs4023_io_bench.bin"

static long ms_now(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec * 1000L + ts.tv_nsec / 1000000L;
}

static void run_benchmark(size_t block_size) {
    size_t total  = (size_t)TOTAL_MB * 1024 * 1024;
    long   writes = (long)(total / block_size);

    char *buf = calloc(1, block_size);
    if (!buf) { perror("calloc"); return; }
    memset(buf, 0xAB, block_size);

    int fd = open(TMPFILE, O_WRONLY | O_CREAT | O_TRUNC, 0600);
    if (fd < 0) { perror("open"); free(buf); return; }

    long t0 = ms_now();
    for (long i = 0; i < writes; i++) {
        ssize_t n = write(fd, buf, block_size);
        if (n < 0) { perror("write"); break; }
    }
    long wall = ms_now() - t0;

    close(fd);
    unlink(TMPFILE);
    free(buf);

    double mbps = (wall > 0) ? ((double)total / (1024.0 * 1024.0)) / (wall / 1000.0) : 0.0;

    printf("  %8zu B  %8ld syscalls  %6ld ms  %8.1f MB/s\n",
           block_size, writes, wall, mbps);
}

int main(void) {
    size_t sizes[] = {
        1, 512, 1024, 4096, 8192, 16384, 32768, 65536
    };
    int n = (int)(sizeof(sizes) / sizeof(sizes[0]));

    printf("=== I/O Benchmark (write, %d MB per block size) ===\n\n", TOTAL_MB);
    printf("  %8s  %16s  %9s  %12s\n",
           "Block", "Syscalls", "Wall ms", "Throughput");
    printf("  %8s  %16s  %9s  %12s\n",
           "--------", "----------------", "---------", "------------");

    for (int i = 0; i < n; i++)
        run_benchmark(sizes[i]);

    printf("\nTip: run with strace -c to count write() calls per block size.\n");
    return EXIT_SUCCESS;
}
