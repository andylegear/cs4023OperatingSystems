/* proc_tree.c – CS4023 Lab 03 Part 5 Reference
 *
 * Creates a three-level process tree:
 *   Parent → Child A → Child B
 * Each process prints its PID and parent PID.
 *
 * Compile: gcc -Wall -o proc_tree proc_tree.c
 * Run:     ./proc_tree
 *
 * Expected output (PIDs vary):
 *   [Parent]  PID=1200  PPID=1100
 *   [Child A] PID=1201  PPID=1200
 *   [Child B] PID=1202  PPID=1201
 *   [Parent]  Child A (1201) exited with status 0
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    printf("[Parent]  PID=%d  PPID=%d\n", (int)getpid(), (int)getppid());

    /* --- Fork Child A --- */
    pid_t pidA = fork();
    if (pidA < 0) {
        perror("fork A");
        return EXIT_FAILURE;
    }

    if (pidA == 0) {
        /* ===== CHILD A ===== */
        printf("[Child A] PID=%d  PPID=%d\n", (int)getpid(), (int)getppid());

        /* Child A forks Child B */
        pid_t pidB = fork();
        if (pidB < 0) {
            perror("fork B");
            exit(EXIT_FAILURE);
        }

        if (pidB == 0) {
            /* ===== CHILD B ===== */
            printf("[Child B] PID=%d  PPID=%d\n", (int)getpid(), (int)getppid());
            exit(EXIT_SUCCESS);
        }

        /* Child A waits for Child B */
        int statusB;
        waitpid(pidB, &statusB, 0);
        printf("[Child A] Child B (%d) exited with status %d\n",
               (int)pidB, WEXITSTATUS(statusB));
        exit(EXIT_SUCCESS);
    }

    /* ===== PARENT: wait for Child A ===== */
    int statusA;
    waitpid(pidA, &statusA, 0);
    printf("[Parent]  Child A (%d) exited with status %d\n",
           (int)pidA, WEXITSTATUS(statusA));

    return EXIT_SUCCESS;
}
