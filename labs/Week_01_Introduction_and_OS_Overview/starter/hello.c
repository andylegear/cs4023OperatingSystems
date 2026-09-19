/* hello.c – CS4023 Lab 01 Starter
 * Compile: gcc -Wall -o hello hello.c
 * Run:     ./hello
 *
 * Starting point for Lab 01. Read the lab instructions before modifying.
 */
#include <stdio.h>
#include <unistd.h>   /* getpid() */

int main(void) {
    pid_t my_pid = getpid();

    printf("Hello, OS World!\n");
    printf("My PID is: %d\n", (int)my_pid);

    return 0;
}
