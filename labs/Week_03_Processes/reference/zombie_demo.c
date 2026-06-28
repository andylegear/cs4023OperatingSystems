/* zombie_demo.c – CS4023 Lab 03 Exercise 3 Reference
 *
 * Demonstrates a zombie process:
 *   1. Parent forks a child
 *   2. Child immediately exits with code 0
 *   3. Parent sleeps for 30 seconds WITHOUT calling wait()
 *   4. During those 30 s, the child appears as a zombie (state Z)
 *      in `ps aux` or `ps -e -o pid,ppid,stat,cmd`
 *   5. When parent exits, init/systemd (PID 1) reaps the zombie
 *
 * Compile: gcc -Wall -o zombie_demo zombie_demo.c
 * Run:     ./zombie_demo &
 *          # In another terminal:
 *          ps aux | grep zombie_demo
 *          # Look for the child entry with 'Z' in the STAT column
 *
 * OBSERVED OUTPUT (example — PIDs will differ):
 * USER   PID  STAT  COMMAND
 * user  5100  S+    ./zombie_demo          <- parent sleeping
 * user  5101  Z+    [zombie_demo] <defunct> <- child zombie
 *
 * After 30 s the parent exits, and systemd reaps the zombie automatically.
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>

int main(void)
{
    pid_t pid = fork();

    if (pid < 0) {
        perror("fork");
        return EXIT_FAILURE;
    }

    if (pid == 0) {
        /* CHILD: exit immediately — becomes zombie until parent waits */
        printf("[Child]  PID=%d exiting now (will become zombie)\n",
               (int)getpid());
        exit(0);
    }

    /* PARENT: sleep WITHOUT calling wait() */
    printf("[Parent] PID=%d child PID=%d\n", (int)getpid(), (int)pid);
    printf("[Parent] Sleeping 30 s — check 'ps aux | grep zombie_demo' now\n");
    sleep(30);
    printf("[Parent] Waking up. Exiting WITHOUT calling wait().\n");
    printf("[Parent] Kernel (init/systemd) will now reap the zombie.\n");

    return EXIT_SUCCESS;
    /* NOTE: production code must always call waitpid() to avoid zombies */
}
