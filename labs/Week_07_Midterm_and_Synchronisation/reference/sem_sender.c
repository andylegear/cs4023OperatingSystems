/* sem_sender.c — CS4023 Week 7 Reference
 * Named semaphore IPC — sender process.
 * Sends SEND_COUNT signals to the receiver via /cs4023sem.
 *
 * Usage: run ./sem_receiver in one terminal, ./sem_sender in another.
 *
 * Compile: gcc -Wall -Wextra -pthread -O1 -g sem_sender.c -o sem_sender
 */

#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <semaphore.h>
#include <unistd.h>

#define SEM_NAME    "/cs4023sem"
#define SEND_COUNT  5

int main(void)
{
    sem_t *sem = sem_open(SEM_NAME, O_CREAT, 0644, 0);
    if (sem == SEM_FAILED) {
        perror("sem_open");
        exit(EXIT_FAILURE);
    }

    printf("Sender: opened named semaphore %s\n", SEM_NAME);

    for (int i = 1; i <= SEND_COUNT; i++) {
        printf("Sender: posting signal %d/%d ...\n", i, SEND_COUNT);
        sem_post(sem);
        sleep(1);
    }

    sem_close(sem);
    printf("Sender: done.\n");
    return 0;
}
