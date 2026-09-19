/* fork_example.c – CS4023 Lab 03 Starter
 *
 * Demonstrates the fork() system call:
 *   - fork() returns TWICE: once in the parent (child PID), once in the child (0)
 *   - Parent and child run concurrently after the fork
 *   - Output order is non-deterministic
 *
 * Compile: gcc -Wall -o fork_example fork_example.c
 * Run:     ./fork_example
 * Run multiple times to see different ordering of output lines.
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>    /* fork(), getpid(), getppid() */
#include <sys/wait.h>  /* wait(), waitpid(), WIFEXITED, WEXITSTATUS */

int main(void) {
    printf("[Before fork] PID=%d\n", (int)getpid());

    pid_t pid = fork();   /* <-- THE SPLIT POINT */

    if (pid < 0) {
        /* fork failed */
        perror("fork");
        return EXIT_FAILURE;
    }

    if (pid == 0) {
        /* ---- CHILD PROCESS ---- */
        /* pid == 0 means "I am the child" */
        printf("[Child]  PID=%d  PPID=%d\n",
               (int)getpid(), (int)getppid());

        /* Child does some work */
        printf("[Child]  Doing child work...\n");
        sleep(1);   /* simulate work */
        printf("[Child]  Done. Exiting with code 0.\n");
        exit(0);

    } else {
        /* ---- PARENT PROCESS ---- */
        /* pid > 0 means "I am the parent, my child has PID=pid" */
        printf("[Parent] PID=%d  child_PID=%d\n",
               (int)getpid(), (int)pid);

        /* Parent waits for child to finish */
        int status;
        pid_t finished = waitpid(pid, &status, 0);

        if (finished < 0) {
            perror("waitpid");
            return EXIT_FAILURE;
        }

        if (WIFEXITED(status)) {
            printf("[Parent] Child %d exited normally with code %d\n",
                   (int)finished, WEXITSTATUS(status));
        } else if (WIFSIGNALED(status)) {
            printf("[Parent] Child %d was killed by signal %d\n",
                   (int)finished, WTERMSIG(status));
        }

        printf("[Parent] Done.\n");
    }

    return EXIT_SUCCESS;
}
