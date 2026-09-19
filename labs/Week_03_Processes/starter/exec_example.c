/* exec_example.c – CS4023 Lab 03 Starter
 *
 * Demonstrates fork() + execvp():
 *   1. Parent forks a child
 *   2. Child uses execvp() to replace itself with /bin/ls
 *   3. Parent waits for the child to finish
 *
 * After a successful execvp(), nothing after that call runs in the child —
 * the process image is completely replaced by the new program.
 *
 * Compile: gcc -Wall -o exec_example exec_example.c
 * Run:     ./exec_example
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>    /* fork(), execvp() */
#include <sys/wait.h>  /* waitpid(), WIFEXITED, WEXITSTATUS */

int main(void) {
    printf("[Parent] Starting. PID=%d\n", (int)getpid());

    pid_t pid = fork();

    if (pid < 0) {
        perror("fork");
        return EXIT_FAILURE;
    }

    if (pid == 0) {
        /* ---- CHILD PROCESS ---- */
        printf("[Child]  About to exec /bin/ls -l /tmp\n");

        /* Build argument list – must be NULL-terminated */
        char *args[] = { "ls", "-l", "/tmp", NULL };

        /* execvp searches PATH, so "ls" finds /bin/ls automatically */
        execvp("ls", args);

        /* If execvp returns at all, it failed */
        perror("execvp");   /* e.g., file not found */
        exit(EXIT_FAILURE);

    } else {
        /* ---- PARENT PROCESS ---- */
        printf("[Parent] Forked child PID=%d, waiting...\n", (int)pid);

        int status;
        waitpid(pid, &status, 0);

        if (WIFEXITED(status)) {
            printf("[Parent] Child exited with code %d\n",
                   WEXITSTATUS(status));
        } else if (WIFSIGNALED(status)) {
            printf("[Parent] Child killed by signal %d\n",
                   WTERMSIG(status));
        }

        printf("[Parent] Done.\n");
    }

    return EXIT_SUCCESS;
}
