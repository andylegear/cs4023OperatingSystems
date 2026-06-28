/* malloc_trace.c – CS4023 Lab 02 Reference Implementation (Exercise 2)
 *
 * Demonstrates which syscall malloc uses to request memory from the OS.
 *
 * Compile: gcc -Wall -o malloc_trace malloc_trace.c
 * Run:     strace ./malloc_trace
 * Via make: make run
 *
 * Finding: On glibc/Linux, a small malloc(1) typically uses brk() to extend
 * the data segment for the first allocation. For large allocations (>= 128 KB
 * by default) glibc uses mmap() instead.
 * Run under strace and look for 'brk' or 'mmap' calls.
 */

#include <stdlib.h>     /* malloc(), free() */
#include <unistd.h>     /* write() */
#include <string.h>     /* strlen() */

static void write_str(int fd, const char *msg) {
    write(fd, msg, strlen(msg));
}

int main(void) {
    write_str(1, "Calling malloc(1)...\n");

    /* A single small allocation — watch strace for brk or mmap */
    void *p = malloc(1);

    write_str(1, "Calling free()...\n");
    free(p);

    write_str(1, "Done. Check strace output for brk/mmap calls.\n");
    return 0;
}
