/* namespace_demo_ref.c — CS4023 Lab 13 Reference Solution (Exercise 1)
 *
 * Complete implementation of a PID namespace demo.
 * Demonstrates: unshare(CLONE_NEWPID), fork, /proc remount, and ps inside the new namespace.
 *
 * Compile: gcc -Wall -o namespace_demo_ref namespace_demo_ref.c
 * Run:     sudo ./namespace_demo_ref
 *
 * Expected output:
 *   [Parent] PID in host namespace: <real PID>
 *   [Parent] Child host PID:        <real child PID>
 *   [Child]  PID inside new namespace:  1
 *   [Child]  PPID inside new namespace: 0
 *   [Child]  Running: ps -o pid,ppid,comm
 *   PID  PPID COMMAND
 *     1     0 ps
 *   [Parent] Child exited with status 0.
 */
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sched.h>
#include <sys/mount.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(void) {
    if (geteuid() != 0) {
        fprintf(stderr, "Error: must run as root (sudo).\n");
        return EXIT_FAILURE;
    }

    printf("[Parent] PID in host namespace: %d\n", getpid());

    /* Enter a new PID namespace — takes effect after fork */
    if (unshare(CLONE_NEWPID) != 0) {
        perror("unshare(CLONE_NEWPID)");
        return EXIT_FAILURE;
    }

    pid_t child = fork();
    if (child < 0) { perror("fork"); return EXIT_FAILURE; }

    if (child == 0) {
        /* Child: PID 1 in the new namespace */
        printf("[Child]  PID inside new namespace:  %d  (should be 1)\n", getpid());
        printf("[Child]  PPID inside new namespace: %d  (should be 0)\n", getppid());

        /* Remount /proc so that ps reads the correct namespace */
        if (mount("proc", "/proc", "proc",
                  MS_NOSUID | MS_NOEXEC | MS_NODEV, NULL) != 0) {
            perror("mount /proc");
            fprintf(stderr, "Hint: run 'sudo unshare --pid --fork --mount-proc bash' if this fails.\n");
            return EXIT_FAILURE;
        }

        printf("[Child]  Running: ps -o pid,ppid,comm\n\n");
        char *argv[] = { "ps", "-o", "pid,ppid,comm", NULL };
        execvp("ps", argv);
        perror("execvp");
        return EXIT_FAILURE;
    }

    /* Parent: reports the child's host-namespace PID */
    printf("[Parent] Child host PID:        %d\n", child);

    int status;
    waitpid(child, &status, 0);

    if (WIFEXITED(status))
        printf("[Parent] Child exited with status %d.\n", WEXITSTATUS(status));
    else
        printf("[Parent] Child terminated abnormally (signal %d).\n", WTERMSIG(status));

    /* Restore /proc for subsequent commands in the parent's namespace */
    mount("proc", "/proc", "proc", MS_NOSUID | MS_NOEXEC | MS_NODEV, NULL);

    return EXIT_SUCCESS;
}
