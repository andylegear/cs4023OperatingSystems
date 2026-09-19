/* pipe_parent.c – CS4023 Lab 05 Starter
 *
 * Demonstrates an unnamed pipe between a parent and child process.
 *
 *   Parent  →  pipe  →  Child
 *
 * The parent writes a message; the child reads and prints it.
 * Both processes must close the end they don't use so that EOF works
 * correctly (a pipe reaches EOF only when ALL write ends are closed).
 *
 * Compile: gcc -Wall -o pipe_parent pipe_parent.c
 * Run:     ./pipe_parent
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>    /* pipe(), fork(), read(), write(), close() */
#include <sys/wait.h>  /* waitpid() */

#define BUF_SIZE 256

int main(void) {
    int fds[2];   /* fds[0] = read end, fds[1] = write end */

    if (pipe(fds) == -1) {
        perror("pipe");
        return EXIT_FAILURE;
    }

    pid_t pid = fork();

    if (pid < 0) {
        perror("fork");
        return EXIT_FAILURE;
    }

    /* ---- CHILD: reads from the pipe ---- */
    if (pid == 0) {
        close(fds[1]);   /* MUST close unused write end in child */

        char buf[BUF_SIZE];
        ssize_t n = read(fds[0], buf, sizeof(buf) - 1);
        if (n < 0) {
            perror("read");
            exit(EXIT_FAILURE);
        }
        buf[n] = '\0';   /* null-terminate */
        printf("[Child]  Received (%zd bytes): \"%s\"\n", n, buf);

        close(fds[0]);
        exit(EXIT_SUCCESS);
    }

    /* ---- PARENT: writes to the pipe ---- */
    close(fds[0]);   /* MUST close unused read end in parent */

    const char *msg = "Hello from the parent process!";
    ssize_t written = write(fds[1], msg, strlen(msg));
    if (written < 0) {
        perror("write");
        close(fds[1]);
        return EXIT_FAILURE;
    }
    printf("[Parent] Sent (%zd bytes): \"%s\"\n", written, msg);

    close(fds[1]);   /* closing write end sends EOF to the reader */

    int status;
    waitpid(pid, &status, 0);
    printf("[Parent] Child exited with status %d\n", WEXITSTATUS(status));

    return EXIT_SUCCESS;
}
