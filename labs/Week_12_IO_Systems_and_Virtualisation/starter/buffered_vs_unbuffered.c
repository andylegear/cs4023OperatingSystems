/* buffered_vs_unbuffered.c – CS4023 Lab 12 Starter
 *
 * Compares fwrite (buffered stdio) vs write (unbuffered POSIX)
 * for the same total data size, measuring:
 *   - wall time
 *   - approximate system call count (via a write counter wrapper)
 *
 * Both methods write TOTAL_MB of data in ELEMENT_SIZE chunks.
 * fwrite accumulates data in a userspace buffer; write makes a syscall
 * for every single chunk.
 *
 * Compile: gcc -Wall -o buffered_vs_unbuffered buffered_vs_unbuffered.c
 * Run:     ./buffered_vs_unbuffered
 *
 * To count actual syscalls, run:
 *   strace -c ./buffered_vs_unbuffered 2>&1 | grep -E "write|fwrite"
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <time.h>

#define TOTAL_MB     64
#define ELEMENT_SIZE 128        /* bytes per individual write/fwrite call */
#define TMPFILE_A    "/tmp/cs4023_buffered.bin"
#define TMPFILE_B    "/tmp/cs4023_unbuffered.bin"

static long ms_now(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec * 1000L + ts.tv_nsec / 1000000L;
}

int main(void) {
    size_t total   = (size_t)TOTAL_MB * 1024 * 1024;
    long   calls   = (long)(total / ELEMENT_SIZE);
    char   buf[ELEMENT_SIZE];
    memset(buf, 0xCD, ELEMENT_SIZE);

    printf("=== Buffered vs Unbuffered I/O ===\n");
    printf("Total: %d MB, Element size: %d B, Calls: %ld\n\n",
           TOTAL_MB, ELEMENT_SIZE, calls);

    /* ---- Buffered: fwrite via stdio ---- */
    long t0 = ms_now();
    FILE *f = fopen(TMPFILE_A, "wb");
    if (!f) { perror("fopen"); return EXIT_FAILURE; }
    for (long i = 0; i < calls; i++)
        fwrite(buf, 1, ELEMENT_SIZE, f);
    fclose(f);   /* flush on close */
    long t_buffered = ms_now() - t0;
    unlink(TMPFILE_A);

    double mbps_buf = (t_buffered > 0)
        ? ((double)total / (1024.0*1024.0)) / (t_buffered / 1000.0) : 0.0;

    /* ---- Unbuffered: write() directly ---- */
    t0 = ms_now();
    int fd = open(TMPFILE_B, O_WRONLY | O_CREAT | O_TRUNC, 0600);
    if (fd < 0) { perror("open"); return EXIT_FAILURE; }
    for (long i = 0; i < calls; i++)
        write(fd, buf, ELEMENT_SIZE);
    close(fd);
    long t_unbuffered = ms_now() - t0;
    unlink(TMPFILE_B);

    double mbps_ubuf = (t_unbuffered > 0)
        ? ((double)total / (1024.0*1024.0)) / (t_unbuffered / 1000.0) : 0.0;

    printf("  %-20s  %6ld ms  %8.1f MB/s  (~few write() calls)\n",
           "fwrite (buffered)", t_buffered, mbps_buf);
    printf("  %-20s  %6ld ms  %8.1f MB/s  (%ld write() calls)\n",
           "write (unbuffered)", t_unbuffered, mbps_ubuf, calls);

    if (t_unbuffered > 0 && t_buffered > 0) {
        double speedup = (double)t_unbuffered / (double)t_buffered;
        printf("\nfwrite is %.1fx faster than write for %d-byte elements.\n",
               speedup, ELEMENT_SIZE);
    }

    printf("\nTip: run  strace -c ./buffered_vs_unbuffered  to see syscall counts.\n");
    return EXIT_SUCCESS;
}
