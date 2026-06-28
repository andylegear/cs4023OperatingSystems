/* file_copy_compare.c – CS4023 Lab 10 Reference Implementation
 *
 * Exercise 2: compare mmap file copy vs read()/write() with a 50 MB file.
 *
 * Usage:
 *   dd if=/dev/urandom of=test50.bin bs=1M count=50
 *   gcc -Wall -o file_copy_compare file_copy_compare.c
 *   ./file_copy_compare test50.bin
 */

#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <time.h>

#define BUF_SIZE  4096   /* read/write buffer */

static long ms_elapsed(struct timespec *s, struct timespec *e) {
    return (long)((e->tv_sec - s->tv_sec) * 1000L
                + (e->tv_nsec - s->tv_nsec) / 1000000L);
}

/* Method A: mmap source + mmap dest + memcpy */
static long method_mmap(const char *src_path, const char *dst_path, size_t size) {
    struct timespec t0, t1;

    int src_fd = open(src_path, O_RDONLY);
    if (src_fd < 0) { perror("open src"); return -1; }

    int dst_fd = open(dst_path, O_RDWR | O_CREAT | O_TRUNC, 0644);
    if (dst_fd < 0) { perror("open dst"); close(src_fd); return -1; }
    /* pre-size destination */
    if (ftruncate(dst_fd, (off_t)size) < 0) { perror("ftruncate"); close(src_fd); close(dst_fd); return -1; }

    void *src = mmap(NULL, size, PROT_READ,  MAP_SHARED,  src_fd, 0);
    void *dst = mmap(NULL, size, PROT_WRITE, MAP_SHARED,  dst_fd, 0);
    if (src == MAP_FAILED || dst == MAP_FAILED) { perror("mmap"); return -1; }

    clock_gettime(CLOCK_MONOTONIC, &t0);
    memcpy(dst, src, size);
    /* msync ensures data reaches disk for a fair comparison */
    msync(dst, size, MS_SYNC);
    clock_gettime(CLOCK_MONOTONIC, &t1);

    munmap(src, size); munmap(dst, size);
    close(src_fd); close(dst_fd);
    return ms_elapsed(&t0, &t1);
}

/* Method B: read() / write() with 4 KB buffer */
static long method_readwrite(const char *src_path, const char *dst_path) {
    struct timespec t0, t1;
    char buf[BUF_SIZE];

    int src_fd = open(src_path, O_RDONLY);
    if (src_fd < 0) { perror("open src rw"); return -1; }
    int dst_fd = open(dst_path, O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (dst_fd < 0) { perror("open dst rw"); close(src_fd); return -1; }

    clock_gettime(CLOCK_MONOTONIC, &t0);
    ssize_t n;
    while ((n = read(src_fd, buf, BUF_SIZE)) > 0) {
        ssize_t written = write(dst_fd, buf, (size_t)n);
        (void)written;
    }
    fsync(dst_fd);
    clock_gettime(CLOCK_MONOTONIC, &t1);

    close(src_fd); close(dst_fd);
    return ms_elapsed(&t0, &t1);
}

int main(int argc, char *argv[]) {
    const char *src = argc > 1 ? argv[1] : "test50.bin";

    struct stat st;
    if (stat(src, &st) < 0) {
        fprintf(stderr, "Cannot stat '%s'. Create it with:\n"
                        "  dd if=/dev/urandom of=test50.bin bs=1M count=50\n", src);
        return EXIT_FAILURE;
    }
    size_t size = (size_t)st.st_size;
    double mb = size / (1024.0 * 1024.0);

    printf("=== File Copy Comparison — %.1f MB ===\n\n", mb);
    printf("%-20s %-10s %-14s %s\n", "Method", "Bytes", "Time ms", "Throughput MB/s");
    printf("%-20s %-10s %-14s %s\n", "------", "-----", "-------", "---------------");

    long ms_a = method_mmap(src, "/tmp/copy_mmap.bin", size);
    if (ms_a >= 0)
        printf("%-20s %-10zu %-14ld %.1f\n", "mmap+memcpy", size, ms_a,
               ms_a > 0 ? mb / (ms_a / 1000.0) : 0.0);

    long ms_b = method_readwrite(src, "/tmp/copy_rw.bin");
    if (ms_b >= 0)
        printf("%-20s %-10zu %-14ld %.1f\n", "read/write 4KB", size, ms_b,
               ms_b > 0 ? mb / (ms_b / 1000.0) : 0.0);

    if (ms_a > 0 && ms_b > 0)
        printf("\nSpeedup (mmap vs read/write): %.2fx\n", (double)ms_b / ms_a);

    return EXIT_SUCCESS;
}
