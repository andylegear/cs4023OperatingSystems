/*
 * cold_warm_mmap.c  — CS4023 Lab 11 Reference Implementation
 *
 * Demonstrates cold vs warm page-cache performance for mmap file access.
 * Cold pass: pages not in page cache → OS fetches from disk (or fills zeros
 *            for a new sparse file); slow.
 * Warm pass: pages already in page cache → very fast.
 *
 * Build:  gcc -Wall -O2 -o cold_warm_mmap cold_warm_mmap.c
 * Run:    ./cold_warm_mmap test256.bin
 *         (create file first: dd if=/dev/urandom of=test256.bin bs=1M count=64)
 *
 * To simulate a truly cold pass, flush the page cache:
 *   echo 1 | sudo tee /proc/sys/vm/drop_caches
 * In WSL2 this may be limited; POSIX_FADV_DONTNEED is used instead.
 */
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <time.h>
#include <sys/mman.h>
#include <sys/stat.h>

static double ms_elapsed(struct timespec *t0, struct timespec *t1) {
    return (t1->tv_sec  - t0->tv_sec ) * 1000.0 +
           (t1->tv_nsec - t0->tv_nsec) / 1e6;
}

static double mb_per_sec(size_t bytes, double ms) {
    return (bytes / (1024.0 * 1024.0)) / (ms / 1000.0);
}

static long sequential_read_mmap(int fd, size_t size, const char *label) {
    struct timespec t0, t1;
    volatile long sum = 0;

    char *p = mmap(NULL, size, PROT_READ, MAP_SHARED, fd, 0);
    if (p == MAP_FAILED) { perror("mmap"); return -1; }

    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < size; i += 64) sum += p[i];   /* cache-line stride */
    clock_gettime(CLOCK_MONOTONIC, &t1);

    double elapsed = ms_elapsed(&t0, &t1);
    printf("  %-20s  %.1f ms  (~%.0f MB/s)\n", label, elapsed, mb_per_sec(size, elapsed));

    /* Advise kernel to drop these pages from page cache for the next cold pass */
    posix_fadvise(fd, 0, (off_t)size, POSIX_FADV_DONTNEED);
    munmap(p, size);
    (void)sum;
    return 0;
}

int main(int argc, char *argv[]) {
    const char *path = argc > 1 ? argv[1] : "test256.bin";

    int fd = open(path, O_RDONLY);
    if (fd < 0) {
        fprintf(stderr,
            "Cannot open '%s'.\n"
            "Create it with: dd if=/dev/urandom of=%s bs=1M count=64\n",
            path, path);
        return 1;
    }

    struct stat st;
    fstat(fd, &st);
    size_t size = (size_t)st.st_size;
    if (size == 0) { fprintf(stderr, "File is empty.\n"); return 1; }

    printf("File: %s (%.0f MB)\n", path, size / (1024.0*1024.0));
    printf("\nPass 1 — cold (posix_fadvise DONTNEED before read):\n");
    posix_fadvise(fd, 0, (off_t)size, POSIX_FADV_DONTNEED);
    sequential_read_mmap(fd, size, "Cold mmap read");

    printf("\nPass 2 — warm (pages in page cache):\n");
    sequential_read_mmap(fd, size, "Warm mmap read");

    printf("\nPass 3 — cold again (DONTNEED evicted cache):\n");
    posix_fadvise(fd, 0, (off_t)size, POSIX_FADV_DONTNEED);
    sequential_read_mmap(fd, size, "Cold mmap read #2");

    close(fd);
    printf("\nNote: In WSL2, posix_fadvise(DONTNEED) may not fully evict the cache.\n");
    printf("For a true cold measurement, restart the process or flush caches:\n");
    printf("  echo 1 | sudo tee /proc/sys/vm/drop_caches\n");
    return 0;
}
