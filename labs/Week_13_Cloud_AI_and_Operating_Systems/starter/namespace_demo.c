/* namespace_demo.c – CS4023 Lab 13 Starter
 *
 * Demonstrates Linux PID namespaces from C.
 *
 * Steps:
 *   1. unshare(CLONE_NEWPID) – enter a new PID namespace
 *   2. fork() – child becomes PID 1 in the new namespace
 *   3. Child mounts /proc (so ps sees the new namespace)
 *   4. Child runs: ps -o pid,ppid,comm
 *   5. Parent waits for child and reports exit status
 *
 * Requirements: must run as root (or with CAP_SYS_ADMIN + CAP_SYS_CHROOT).
 *
 * Compile: gcc -Wall -o namespace_demo namespace_demo.c
 * Run:     sudo ./namespace_demo
 */

#define _GNU_SOURCE          /* unshare, CLONE_NEWPID */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sched.h>           /* unshare, CLONE_NEWPID */
#include <sys/mount.h>       /* mount */
#include <sys/types.h>
#include <sys/wait.h>

int main(void) {
    if (geteuid() != 0) {
        fprintf(stderr, "Error: this program requires root (sudo).\n");
        return EXIT_FAILURE;
    }

    printf("[Parent] PID in host namespace: %d\n", getpid());

    /* Step 1: enter a new PID namespace */
    if (unshare(CLONE_NEWPID) != 0) {
        perror("unshare(CLONE_NEWPID)");
        return EXIT_FAILURE;
    }

    /* Step 2: fork – child will be PID 1 in the new namespace */
    pid_t child = fork();
    if (child < 0) {
        perror("fork");
        return EXIT_FAILURE;
    }

    if (child == 0) {
        /* ---- Child: runs inside the new PID namespace ---- */
        printf("[Child]  PID inside new namespace:  %d  (should be 1)\n",
               getpid());
        printf("[Child]  PPID inside new namespace: %d  (should be 0)\n",
               getppid());

        /* Step 3: remount /proc so ps sees only this namespace */
        if (mount("proc", "/proc", "proc",
                  MS_NOSUID | MS_NOEXEC | MS_NODEV, NULL) != 0) {
            perror("mount /proc");
            fprintf(stderr,
                    "Hint: if EPERM, try: sudo unshare --pid --fork --mount-proc bash\n");
            return EXIT_FAILURE;
        }

        printf("[Child]  Running: ps -o pid,ppid,comm\n\n");

        /* Step 4: exec ps */
        char *argv[] = { "ps", "-o", "pid,ppid,comm", NULL };
        execvp("ps", argv);
        perror("execvp ps");   /* only reached if exec fails */
        return EXIT_FAILURE;
    }

    /* ---- Parent: still in host PID namespace ---- */
    printf("[Parent] Child host PID:           %d\n", child);

    int status;
    waitpid(child, &status, 0);

    if (WIFEXITED(status))
        printf("[Parent] Child exited with status %d.\n", WEXITSTATUS(status));
    else
        printf("[Parent] Child terminated abnormally.\n");

    /* Restore /proc for the host namespace */
    if (mount("proc", "/proc", "proc",
              MS_NOSUID | MS_NOEXEC | MS_NODEV, NULL) != 0) {
        /* Non-fatal: warn only */
        perror("restore /proc (warning)");
    }

    return EXIT_SUCCESS;
}
