/* oom_test_ref.c — CS4023 Lab 13 Reference Solution (Exercise 3)
 *
 * Allocates memory in 1 MB chunks, printing progress, until OOM-killed.
 * Run inside a cgroup with a memory limit (e.g. 100 MB) to observe the OOM killer.
 *
 * Setup:
 *   sudo mkdir /sys/fs/cgroup/test_lab13
 *   echo "100M" | sudo tee /sys/fs/cgroup/test_lab13/memory.max
 *   echo "100M" | sudo tee /sys/fs/cgroup/test_lab13/memory.swap.max
 *   echo $$ | sudo tee /sys/fs/cgroup/test_lab13/cgroup.procs
 *
 * Compile: gcc -Wall -O0 -o oom_test_ref oom_test_ref.c
 * Run:     ./oom_test_ref
 *
 * After the process is killed, check: dmesg | grep -i "out of memory" | tail -5
 * Restore shell: echo $$ | sudo tee /sys/fs/cgroup/user.slice/cgroup.procs
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CHUNK_MB 1
#define CHUNK_BYTES (CHUNK_MB * 1024 * 1024)
#define REPORT_EVERY_MB 10

int main(void) {
    size_t total = 0;
    printf("Allocating memory in %d MB chunks. Will be OOM-killed when limit is reached.\n\n",
           CHUNK_MB);
    fflush(stdout);

    while (1) {
        void *p = malloc(CHUNK_BYTES);
        if (!p) {
            fprintf(stderr, "malloc failed at %zu MB — exiting normally (no OOM kill)\n",
                    total / (1024 * 1024));
            break;
        }
        /* Touch each page to force physical allocation (defeat lazy commit) */
        memset(p, 0xAB, CHUNK_BYTES);
        total += CHUNK_BYTES;

        if ((total / (1024 * 1024)) % REPORT_EVERY_MB == 0) {
            printf("Allocated: %zu MB\n", total / (1024 * 1024));
            fflush(stdout);
        }
    }
    return EXIT_SUCCESS;
}
