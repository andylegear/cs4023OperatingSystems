/* sem_receiver.c — CS4023 Week 7 Reference
 * Named semaphore IPC — receiver process.
 * Waits for RECV_COUNT signals from the sender via /cs4023sem.
 * Cleans up the named semaphore when done.
 *
 * Usage: start this first, then run ./sem_sender.
 *
 * Compile: gcc -Wall -Wextra -pthread -O1 -g sem_receiver.c -o sem_receiver
 */

#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <semaphore.h>

#define SEM_NAME    "/cs4023sem"
#define RECV_COUNT  5

int main(void)
{
    sem_t *sem = sem_open(SEM_NAME, O_CREAT, 0644, 0);
    if (sem == SEM_FAILED) {
        perror("sem_open");
        exit(EXIT_FAILURE);
    }

    printf("Receiver: waiting for %d signals on %s\n", RECV_COUNT, SEM_NAME);

    for (int i = 1; i <= RECV_COUNT; i++) {
        sem_wait(sem);
        printf("Receiver: got signal %d/%d\n", i, RECV_COUNT);
    }

    sem_close(sem);
    sem_unlink(SEM_NAME);   /* remove the named semaphore from the system */
    printf("Receiver: done. Semaphore %s removed.\n", SEM_NAME);
    return 0;
}
