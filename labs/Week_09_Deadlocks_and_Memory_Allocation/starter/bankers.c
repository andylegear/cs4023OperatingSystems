/* bankers.c – CS4023 Lab 09 Starter
 *
 * Banker's Algorithm – safety check.
 *
 * Given:
 *   allocation[n][m]  – resources currently allocated to each process
 *   max[n][m]         – maximum resources each process may request
 *   available[m]      – currently available resources
 *
 * Derived:
 *   need[i][j] = max[i][j] - allocation[i][j]
 *
 * Safety algorithm:
 *   work   = available
 *   finish = {false, false, ...}
 *   Find i where finish[i]==false && need[i] <= work
 *   → work += allocation[i], finish[i]=true, repeat
 *   If all finish[i]==true → SAFE, else UNSAFE
 *
 * Compile: gcc -Wall -o bankers bankers.c
 * Run:     ./bankers
 */

#include <stdio.h>
#include <string.h>

#define MAX_PROCESSES 10
#define MAX_RESOURCES 10

int n_processes = 5;
int n_resources = 3;

/* Example state from Silberschatz textbook */
int allocation[MAX_PROCESSES][MAX_RESOURCES] = {
    /* A  B  C */
    {  0, 1, 0 },   /* P0 */
    {  2, 0, 0 },   /* P1 */
    {  3, 0, 2 },   /* P2 */
    {  2, 1, 1 },   /* P3 */
    {  0, 0, 2 },   /* P4 */
};

int max_matrix[MAX_PROCESSES][MAX_RESOURCES] = {
    {  7, 5, 3 },
    {  3, 2, 2 },
    {  9, 0, 2 },
    {  2, 2, 2 },
    {  4, 3, 3 },
};

int available[MAX_RESOURCES] = { 3, 3, 2 };

/* ----- helper: print a matrix ----- */
static void print_matrix(const char *name,
                          int mat[MAX_PROCESSES][MAX_RESOURCES],
                          int rows, int cols) {
    printf("%s:\n", name);
    for (int i = 0; i < rows; i++) {
        printf("  P%d: ", i);
        for (int j = 0; j < cols; j++) printf("%3d", mat[i][j]);
        printf("\n");
    }
}

/* ----- safety check ----- */
/* Returns 1 if safe, 0 if unsafe.
 * Fills safe_seq[0..n_processes-1] with the safe sequence if safe. */
static int is_safe(int safe_seq[MAX_PROCESSES]) {
    int work[MAX_RESOURCES];
    int finish[MAX_PROCESSES];
    int need[MAX_PROCESSES][MAX_RESOURCES];

    /* Compute need */
    for (int i = 0; i < n_processes; i++)
        for (int j = 0; j < n_resources; j++)
            need[i][j] = max_matrix[i][j] - allocation[i][j];

    memcpy(work, available, n_resources * sizeof(int));
    memset(finish, 0, sizeof(finish));

    int seq_idx = 0;

    for (int count = 0; count < n_processes; count++) {
        int found = 0;
        for (int i = 0; i < n_processes; i++) {
            if (finish[i]) continue;

            /* Check if need[i] <= work */
            int ok = 1;
            for (int j = 0; j < n_resources; j++) {
                if (need[i][j] > work[j]) { ok = 0; break; }
            }
            if (!ok) continue;

            /* Process i can finish – add its allocation back to work */
            for (int j = 0; j < n_resources; j++)
                work[j] += allocation[i][j];
            finish[i] = 1;
            safe_seq[seq_idx++] = i;
            found = 1;
            break;   /* restart outer loop */
        }
        if (!found) break;   /* no progress this round */
    }

    /* Check all finished */
    for (int i = 0; i < n_processes; i++)
        if (!finish[i]) return 0;
    return 1;
}

int main(void) {
    printf("=== Banker's Algorithm Safety Check ===\n\n");

    print_matrix("Allocation", allocation, n_processes, n_resources);
    printf("\n");
    print_matrix("Max", max_matrix, n_processes, n_resources);
    printf("\nAvailable: ");
    for (int j = 0; j < n_resources; j++) printf("%3d", available[j]);
    printf("\n\n");

    int safe_seq[MAX_PROCESSES];
    if (is_safe(safe_seq)) {
        printf("System is in a SAFE state.\n");
        printf("Safe sequence: ");
        for (int i = 0; i < n_processes; i++) {
            printf("P%d", safe_seq[i]);
            if (i < n_processes - 1) printf(" -> ");
        }
        printf("\n");
    } else {
        printf("System is in an UNSAFE state (potential deadlock).\n");
    }
    return 0;
}
