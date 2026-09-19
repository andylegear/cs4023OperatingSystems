/* shm_reader.c – CS4023 Lab 05 Starter
 *
 * Opens the POSIX shared memory object created by shm_writer,
 * reads and prints its contents, then unlinks it.
 *
 * Must run shm_writer first:
 *   ./shm_writer
 *   ./shm_reader
 *
 * Compile: gcc -Wall -lrt -o shm_reader shm_reader.c
 * Run:     ./shm_reader
 */

#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>       /* O_RDONLY */
#include <sys/mman.h>    /* shm_open, mmap, munmap */
#include <sys/stat.h>
#include <unistd.h>      /* close */

#define SHM_NAME  "/cs4023shm"
#define SHM_SIZE  sizeof(shared_data_t)

typedef struct {
    int  sequence;
    char message[128];
} shared_data_t;

int main(void) {
    /* 1. Open the existing shared memory object (read-only) */
    int fd = shm_open(SHM_NAME, O_RDONLY, 0);
    if (fd == -1) {
        perror("shm_open (did you run shm_writer first?)");
        return EXIT_FAILURE;
    }

    /* 2. Map it (read-only) */
    shared_data_t *shm = mmap(NULL, SHM_SIZE,
                               PROT_READ,
                               MAP_SHARED, fd, 0);
    if (shm == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return EXIT_FAILURE;
    }
    close(fd);

    /* 3. Read the data */
    printf("[Reader] Read sequence=%d, message=\"%s\"\n",
           shm->sequence, shm->message);

    /* 4. Unmap and remove the shared memory object */
    munmap(shm, SHM_SIZE);
    shm_unlink(SHM_NAME);
    printf("[Reader] Unlinked %s\n", SHM_NAME);

    return EXIT_SUCCESS;
}
