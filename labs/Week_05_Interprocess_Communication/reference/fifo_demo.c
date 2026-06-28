/*
 * fifo_demo.c  —  CS4023 Week 5 Lab Reference Implementation
 *
 * Demonstrates:
 *   - mkfifo() to create a named pipe (FIFO) in the filesystem
 *   - open() + write() on the writer side (this process)
 *   - The reader can be a separate process or terminal:
 *       Terminal 1:  cat /tmp/cs4023_fifo
 *       Terminal 2:  ./fifo_demo
 *
 * Key differences from anonymous pipe:
 *   - Exists as a filesystem entry — survives across unrelated processes
 *   - Both processes open it by name, not by inherited fd
 *   - open(O_WRONLY) BLOCKS until a reader opens the other end
 *
 * Compile: gcc -Wall -Wextra -o fifo_demo fifo_demo.c
 * Run:     (open a second terminal and run: cat /tmp/cs4023_fifo)
 *          ./fifo_demo
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <errno.h>

#define FIFO_PATH "/tmp/cs4023_fifo"

int main(void)
{
    /* Create FIFO — ok if it already exists */
    if (mkfifo(FIFO_PATH, 0600) == -1 && errno != EEXIST) {
        perror("mkfifo");
        exit(EXIT_FAILURE);
    }

    printf("[writer] FIFO created at %s\n", FIFO_PATH);
    printf("[writer] Waiting for a reader to open the FIFO…\n");
    printf("[writer] (In another terminal run: cat %s)\n\n", FIFO_PATH);

    /*
     * open() with O_WRONLY BLOCKS here until a reader opens the read end.
     * This is a fundamental property of FIFOs (and named pipes on Linux).
     */
    int fd = open(FIFO_PATH, O_WRONLY);
    if (fd == -1) {
        perror("open");
        exit(EXIT_FAILURE);
    }

    const char *messages[] = {
        "CS4023 Week 5: IPC via Named FIFO\n",
        "Message 1: Hello from writer process\n",
        "Message 2: FIFO allows unrelated processes to communicate\n",
        "Message 3: Unlike anonymous pipes, no fork() required\n",
        NULL
    };

    for (int i = 0; messages[i] != NULL; i++) {
        printf("[writer] Sending: %s", messages[i]);
        if (write(fd, messages[i], strlen(messages[i])) == -1) {
            perror("write");
            close(fd);
            exit(EXIT_FAILURE);
        }
        sleep(1);   /* pace messages so reader can see them arrive */
    }

    close(fd);
    printf("[writer] Done. FIFO closed — reader will see EOF.\n");

    /* Clean up filesystem entry */
    unlink(FIFO_PATH);
    printf("[writer] FIFO removed from filesystem.\n");

    return 0;
}
