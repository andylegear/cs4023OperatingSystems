/*
 * shm_posix.c  —  CS4023 Week 5 Lab Reference Implementation
 *
 * Demonstrates POSIX shared memory:
 *   - shm_open()   — create / open a shared memory object
 *   - ftruncate()  — set its size
 *   - mmap()       — map it into this process's address space
 *   - fork()       — child and parent SHARE the same physical pages
 *   - munmap() / shm_unlink() — clean up
 *
 * Writer side (parent): writes an integer value and a string.
 * Reader side (child):  reads and prints both after a short delay.
 *
 * Compile: gcc -Wall -Wextra -o shm_posix shm_posix.c -lrt
 * Run:     ./shm_posix
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/wait.h>
#include <sys/stat.h>

#define SHM_NAME  "/cs4023_shm_demo"
#define SHM_SIZE  4096

/* Layout of the shared region */
typedef struct {
    int   counter;
    char  message[256];
} SharedData;

int main(void)
{
    /* 1. Create shared memory object */
    int shm_fd = shm_open(SHM_NAME, O_CREAT | O_RDWR, 0600);
    if (shm_fd == -1) { perror("shm_open"); exit(EXIT_FAILURE); }

    /* 2. Set size */
    if (ftruncate(shm_fd, SHM_SIZE) == -1) {
        perror("ftruncate"); exit(EXIT_FAILURE);
    }

    /* 3. Map into address space — MAP_SHARED means changes are visible to all mappings */
    SharedData *shm = mmap(NULL, SHM_SIZE, PROT_READ | PROT_WRITE,
                           MAP_SHARED, shm_fd, 0);
    if (shm == MAP_FAILED) { perror("mmap"); exit(EXIT_FAILURE); }

    close(shm_fd);   /* fd no longer needed after mmap() */

    pid_t pid = fork();
    if (pid == -1) { perror("fork"); exit(EXIT_FAILURE); }

    if (pid == 0) {
        /* ── CHILD: reader ── */
        sleep(1);   /* give parent time to write */

        printf("[child  pid=%d] counter = %d\n",     getpid(), shm->counter);
        printf("[child  pid=%d] message = \"%s\"\n",  getpid(), shm->message);

        munmap(shm, SHM_SIZE);
        exit(EXIT_SUCCESS);
    }

    /* ── PARENT: writer ── */
    shm->counter = 42;
    strncpy(shm->message, "Hello from parent via shared memory!", sizeof(shm->message) - 1);
    shm->message[sizeof(shm->message) - 1] = '\0';

    printf("[parent pid=%d] Wrote counter=%d, message=\"%s\"\n",
           getpid(), shm->counter, shm->message);

    int status;
    waitpid(pid, &status, 0);

    munmap(shm, SHM_SIZE);
    shm_unlink(SHM_NAME);   /* remove the /dev/shm entry */
    printf("[parent pid=%d] Shared memory unlinked. Done.\n", getpid());

    return 0;
}
