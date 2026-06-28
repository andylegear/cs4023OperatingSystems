/*
 * debug_demo.c  – Part 4 reference implementation
 * CS4023 Lab 1 – GDB Basics
 *
 * Deliberate bug: loop condition uses <= instead of <
 * causing an out-of-bounds array access on i=3.
 *
 * Compile:  gcc -Wall -g -o debug_demo debug_demo.c
 * Run:      ./debug_demo        (shows garbage arr[3] value – the bug)
 * Via make: make debug_demo && ./debug_demo
 * Debug:    gdb ./debug_demo
 *           (gdb) break main
 *           (gdb) run
 *           (gdb) next        (repeat to step into loop)
 *           (gdb) print i
 *           (gdb) print arr[i]
 */
#include <stdio.h>

int main(void) {
    int arr[3] = {10, 20, 30};
    for (int i = 0; i <= 3; i++) {   /* bug: should be i < 3 */
        printf("arr[%d] = %d\n", i, arr[i]);
    }
    return 0;
}
