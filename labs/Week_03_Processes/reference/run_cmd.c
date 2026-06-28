/* run_cmd.c – CS4023 Lab 03 Exercise 2 Reference
 *
 * A minimal shell: reads command lines from stdin, forks a child to
 * execute each command via execvp, waits for it, prints exit status.
 * Type "exit" to quit.
 *
 * Compile: gcc -Wall -o run_cmd run_cmd.c
 * Run:     ./run_cmd
 *
 * Example session:
 *   > ls -l /tmp
 *   (output of ls)
 *   [ls] exited with status 0
 *   > date
 *   Wed Jun 25 18:00:00 UTC 2026
 *   [date] exited with status 0
 *   > exit
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

#define MAX_LINE  1024
#define MAX_ARGS  64

int main(void)
{
    char line[MAX_LINE];

    while (1) {
        printf("> ");
        fflush(stdout);

        if (!fgets(line, sizeof(line), stdin)) {
            /* EOF (e.g., Ctrl-D) */
            printf("\n");
            break;
        }

        /* Strip trailing newline */
        line[strcspn(line, "\n")] = '\0';

        if (strcmp(line, "exit") == 0)
            break;

        if (line[0] == '\0')    /* blank line */
            continue;

        /* Tokenise */
        char *args[MAX_ARGS];
        int argc = 0;
        char *tok = strtok(line, " \t");
        while (tok && argc < MAX_ARGS - 1) {
            args[argc++] = tok;
            tok = strtok(NULL, " \t");
        }
        args[argc] = NULL;

        if (argc == 0) continue;

        pid_t pid = fork();
        if (pid < 0) {
            perror("fork");
            continue;
        }

        if (pid == 0) {
            /* Child: execute the command */
            execvp(args[0], args);
            /* Only reached on execvp failure */
            perror(args[0]);
            exit(127);   /* conventional "command not found" exit code */
        }

        /* Parent: wait and print status */
        int status;
        waitpid(pid, &status, 0);

        if (WIFEXITED(status)) {
            printf("[%s] exited with status %d\n", args[0], WEXITSTATUS(status));
        } else if (WIFSIGNALED(status)) {
            printf("[%s] killed by signal %d\n", args[0], WTERMSIG(status));
        }
    }

    return EXIT_SUCCESS;
}
