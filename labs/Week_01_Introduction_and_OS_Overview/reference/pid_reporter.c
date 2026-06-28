/*
 * pid_reporter.c  – Exercise 1 reference implementation
 * CS4023 Lab 1 – PID Reporter
 *
 * Prints own PID, then reads and prints the first 5 lines of
 * /proc/self/status to show how the OS exposes process metadata.
 *
 * Compile:  gcc -Wall -o pid_reporter pid_reporter.c
 * Run:      ./pid_reporter
 * Via make: make pid_reporter && ./pid_reporter
 */
#include <stdio.h>
#include <unistd.h>

#define STATUS_FILE "/proc/self/status"
#define LINES_TO_PRINT 5

int main(void) {
    printf("My PID: %d\n\n", getpid());

    FILE *fp = fopen(STATUS_FILE, "r");
    if (fp == NULL) {
        perror("fopen " STATUS_FILE);
        return 1;
    }

    printf("First %d lines of %s:\n", LINES_TO_PRINT, STATUS_FILE);
    char line[256];
    for (int i = 0; i < LINES_TO_PRINT; i++) {
        if (fgets(line, sizeof(line), fp) == NULL)
            break;
        printf("  %s", line);
    }

    fclose(fp);
    return 0;
}
