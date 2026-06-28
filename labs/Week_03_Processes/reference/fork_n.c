/* fork_n.c – CS4023 Lab 03 Exercise 1 Reference
 *
 * Forks N children; each child prints its index and PID, then
 * exits with exit code = i. Parent collects all children.
 *
 * Compile: gcc -Wall -o fork_n fork_n.c
 * Run:     ./fork_n 5
 *
 * Expected output (order of child lines is non-deterministic):
 *   Child [0] PID=1201
 *   Child [1] PID=1202
 *   Child [2] PID=1203
 *   Child [3] PID=1204
 *   Child [4] PID=1205
 *   All 5 children collected, last exit code=4
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(int argc, char *argv[])
{
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <N>\n", argv[0]);
        return EXIT_FAILURE;
    }

    int N = atoi(argv[1]);
    if (N <= 0 || N > 256) {
        fprintf(stderr, "N must be in range [1, 256]\n");
        return EXIT_FAILURE;
    }

    /* Fork N children */
    for (int i = 0; i < N; i++) {
        pid_t pid = fork();
        if (pid < 0) {
            perror("fork");
            return EXIT_FAILURE;
        }
        if (pid == 0) {
            /* Child: print and exit with code i */
            printf("Child [%d] PID=%d\n", i, (int)getpid());
            exit(i);
        }
        /* Parent loops and forks next child */
    }

    /* Parent collects all N children */
    int lastCode = -1;
    int collected = 0;
    for (int i = 0; i < N; i++) {
        int status;
        pid_t finished = waitpid(-1, &status, 0);  /* -1 = any child */
        if (finished < 0) {
            perror("waitpid");
            break;
        }
        if (WIFEXITED(status)) {
            lastCode = WEXITSTATUS(status);
            collected++;
        }
    }

    printf("All %d children collected, last exit code=%d\n", collected, lastCode);
    return EXIT_SUCCESS;
}
