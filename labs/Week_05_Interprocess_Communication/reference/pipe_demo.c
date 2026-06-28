/*
 * pipe_demo.c  —  CS4023 Week 5 Lab Reference Implementation
 *
 * Demonstrates:
 *   - pipe() creation before fork()
 *   - Correct close() discipline (each process closes the end it does not use)
 *   - Parent writes message; child reads and prints it
 *   - Why closing the unused write end is mandatory for EOF detection
 *
 * Compile: gcc -Wall -Wextra -o pipe_demo pipe_demo.c
 * Run:     ./pipe_demo
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

#define MSG "Hello from parent via pipe!\n"

int main(void)
{
    int pfd[2];   /* pfd[0] = read end, pfd[1] = write end */

    if (pipe(pfd) == -1) {
        perror("pipe");
        exit(EXIT_FAILURE);
    }

    pid_t pid = fork();
    if (pid == -1) {
        perror("fork");
        exit(EXIT_FAILURE);
    }

    if (pid == 0) {
        /* ── CHILD: reader ── */
        close(pfd[1]);           /* MUST close unused write end —
                                    otherwise read() never returns 0 (EOF) */

        char buf[256];
        ssize_t n;

        printf("[child  pid=%d] Waiting to read from pipe…\n", getpid());

        while ((n = read(pfd[0], buf, sizeof(buf) - 1)) > 0) {
            buf[n] = '\0';
            printf("[child  pid=%d] Received: %s", getpid(), buf);
        }

        if (n == 0)
            printf("[child  pid=%d] read() returned 0 — EOF (write end closed)\n", getpid());
        else
            perror("read");

        close(pfd[0]);
        exit(EXIT_SUCCESS);
    }

    /* ── PARENT: writer ── */
    close(pfd[0]);               /* MUST close unused read end —
                                    avoids resource leak and possible deadlock */

    printf("[parent pid=%d] Writing to pipe…\n", getpid());
    write(pfd[1], MSG, strlen(MSG));

    /* Closing write end signals EOF to child's read() */
    close(pfd[1]);

    int status;
    waitpid(pid, &status, 0);
    printf("[parent pid=%d] Child exited with status %d\n",
           getpid(), WEXITSTATUS(status));

    return 0;
}
