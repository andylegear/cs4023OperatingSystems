/* shm_writer.c – CS4023 Lab 05 Starter
 *
 * Creates a POSIX shared memory object and writes a struct into it.
 * Run shm_reader in another terminal to retrieve the data.
 *
 * POSIX shared memory lives in /dev/shm/<name> on Linux.
 * It persists until shm_unlink() is called or the system reboots.
 *
 * Compile: gcc -Wall -lrt -o shm_writer shm_writer.c
 * Run:     ./shm_writer
 *
 * Then run: ./shm_reader
 * Then run: rm /dev/shm/cs4023shm   (or let shm_reader unlink it)
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>       /* O_CREAT, O_RDWR */
#include <sys/mman.h>    /* shm_open, mmap, munmap, PROT_*, MAP_SHARED */
#include <sys/stat.h>    /* mode constants */
#include <unistd.h>      /* ftruncate, close */

#define SHM_NAME  "/cs4023shm"
#define SHM_SIZE  sizeof(shared_data_t)

/* Layout of the shared memory region */
typedef struct {
    int  sequence;          /* a counter written by the writer */
    char message[128];      /* a text message */
} shared_data_t;

int main(void) {
    /* 1. Open (or create) the shared memory object */
    int fd = shm_open(SHM_NAME, O_CREAT | O_RDWR, 0600);
    if (fd == -1) {
        perror("shm_open");
        return EXIT_FAILURE;
    }

    /* 2. Set the size of the shared memory object */
    if (ftruncate(fd, (off_t)SHM_SIZE) == -1) {
        perror("ftruncate");
        close(fd);
        return EXIT_FAILURE;
    }

    /* 3. Map it into this process's address space */
    shared_data_t *shm = mmap(NULL, SHM_SIZE,
                               PROT_READ | PROT_WRITE,
                               MAP_SHARED, fd, 0);
    if (shm == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return EXIT_FAILURE;
    }
    close(fd);   /* fd no longer needed once mapped */

    /* 4. Write data through the pointer */
    shm->sequence = 42;
    strncpy(shm->message, "Hello from the writer!", sizeof(shm->message) - 1);
    shm->message[sizeof(shm->message) - 1] = '\0';

    printf("[Writer] Wrote sequence=%d, message=\"%s\"\n",
           shm->sequence, shm->message);
    printf("[Writer] Shared memory at /dev/shm%s\n", SHM_NAME);
    printf("[Writer] Now run ./shm_reader\n");

    /* 5. Unmap (the name in /dev/shm persists until shm_unlink) */
    munmap(shm, SHM_SIZE);

    return EXIT_SUCCESS;
}
