/* bankers.c – CS4023 Lab 09 Reference Implementation
 *
 * Banker's Algorithm: safety check + resource request algorithm.
 *
 * Usage:
 *   ./bankers           (runs hard-coded Silberschatz 5P example)
 *   ./bankers < input   (reads n, m, total, allocation, max from stdin)
 *
 * Input format (stdin):
 *   n_processes n_resources
 *   total[0] ... total[m-1]
 *   allocation[0][0] ... allocation[0][m-1]      (one row per process)
 *   ...
 *   max[0][0] ... max[0][m-1]
 *   ...
 *
 * Compile: gcc -Wall -o bankers bankers.c
 * Run:     ./bankers
 * Via make: make run-bankers
 */

#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <stdlib.h>

#define MAX_N 10
#define MAX_M 10

typedef struct {
    int n, m;
    int total[MAX_M];
    int alloc[MAX_N][MAX_M];
    int max_d[MAX_N][MAX_M];
    int avail[MAX_M];
    int need[MAX_N][MAX_M];
} State;

/* Compute need matrix and available vector */
static void compute_derived(State *s) {
    int sum[MAX_M] = {0};
    for (int i = 0; i < s->n; i++)
        for (int j = 0; j < s->m; j++) {
            s->need[i][j] = s->max_d[i][j] - s->alloc[i][j];
            sum[j] += s->alloc[i][j];
        }
    for (int j = 0; j < s->m; j++)
        s->avail[j] = s->total[j] - sum[j];
}

/* Returns true if need[i] <= work for all j */
static bool need_le(int need[MAX_M], int work[MAX_M], int m) {
    for (int j = 0; j < m; j++)
        if (need[j] > work[j]) return false;
    return true;
}

/* Safety algorithm.
 * Returns true if safe; fills safe_seq[0..n-1].
 * Prints step-by-step trace. */
static bool is_safe(State *s, int safe_seq[MAX_N]) {
    int work[MAX_M];
    bool finish[MAX_N];
    memcpy(work, s->avail, s->m * sizeof(int));
    memset(finish, 0, sizeof(finish));
    int count = 0;

    printf("\nSafety algorithm trace:\n");
    printf("Initial Work = [");
    for (int j = 0; j < s->m; j++) printf("%d%s", work[j], j < s->m - 1 ? "," : "");
    printf("]\n");

    while (count < s->n) {
        int found = -1;
        for (int i = 0; i < s->n; i++) {
            if (!finish[i] && need_le(s->need[i], work, s->m)) {
                found = i; break;
            }
        }
        if (found == -1) {
            printf("No runnable process found — UNSAFE.\n");
            return false;
        }
        printf("  P%d: Need=[", found);
        for (int j = 0; j < s->m; j++) printf("%d%s", s->need[found][j], j < s->m - 1 ? "," : "");
        printf("] <= Work — runs, releases Alloc=[");
        for (int j = 0; j < s->m; j++) printf("%d%s", s->alloc[found][j], j < s->m - 1 ? "," : "");
        printf("]. New Work=[");
        for (int j = 0; j < s->m; j++) work[j] += s->alloc[found][j];
        for (int j = 0; j < s->m; j++) printf("%d%s", work[j], j < s->m - 1 ? "," : "");
        printf("]\n");

        finish[found] = true;
        safe_seq[count++] = found;
    }
    return true;
}

/* Resource request algorithm for process req_pid requesting req[]. */
static void handle_request(State *s, int req_pid, int req[MAX_M]) {
    printf("\nRequest by P%d: [", req_pid);
    for (int j = 0; j < s->m; j++) printf("%d%s", req[j], j < s->m - 1 ? "," : "");
    printf("]\n");

    /* Step 1: check request <= need */
    for (int j = 0; j < s->m; j++) {
        if (req[j] > s->need[req_pid][j]) {
            printf("ERROR: request exceeds declared maximum need.\n");
            return;
        }
    }
    /* Step 2: check request <= available */
    for (int j = 0; j < s->m; j++) {
        if (req[j] > s->avail[j]) {
            printf("WAIT: resources not available right now.\n");
            return;
        }
    }
    /* Step 3: tentative allocation */
    for (int j = 0; j < s->m; j++) {
        s->avail[j]           -= req[j];
        s->alloc[req_pid][j]  += req[j];
        s->need[req_pid][j]   -= req[j];
    }
    /* Step 4: safety check */
    int seq[MAX_N];
    if (is_safe(s, seq)) {
        printf("GRANT — resulting state is SAFE. Safe sequence: <");
        for (int k = 0; k < s->n; k++) printf("P%d%s", seq[k], k < s->n - 1 ? "," : "");
        printf(">\n");
    } else {
        printf("DENY — resulting state is UNSAFE. Rolling back.\n");
        for (int j = 0; j < s->m; j++) {
            s->avail[j]           += req[j];
            s->alloc[req_pid][j]  -= req[j];
            s->need[req_pid][j]   += req[j];
        }
    }
}

static void print_state(const State *s) {
    printf("\n--- State ---\n");
    printf("%-4s  %-*s  %-*s  %-*s\n", "P",
           4*s->m, "Allocation", 4*s->m, "Max", 4*s->m, "Need");
    for (int i = 0; i < s->n; i++) {
        printf("P%-3d  ", i);
        for (int j = 0; j < s->m; j++) printf("%-4d", s->alloc[i][j]);
        printf("  ");
        for (int j = 0; j < s->m; j++) printf("%-4d", s->max_d[i][j]);
        printf("  ");
        for (int j = 0; j < s->m; j++) printf("%-4d", s->need[i][j]);
        printf("\n");
    }
    printf("Available:  ");
    for (int j = 0; j < s->m; j++) printf("%-4d", s->avail[j]);
    printf("\n");
}

/* Hard-coded Silberschatz 5-process, 3-resource example */
static void run_default(void) {
    State s;
    s.n = 5; s.m = 3;
    s.total[0] = 10; s.total[1] = 5; s.total[2] = 7;
    int alloc[][3] = {{0,1,0},{2,0,0},{3,0,2},{2,1,1},{0,0,2}};
    int maxd[][3]  = {{7,5,3},{3,2,2},{9,0,2},{2,2,2},{4,3,3}};
    for (int i = 0; i < s.n; i++)
        for (int j = 0; j < s.m; j++) {
            s.alloc[i][j] = alloc[i][j];
            s.max_d[i][j] = maxd[i][j];
        }
    compute_derived(&s);
    print_state(&s);

    int seq[MAX_N];
    if (is_safe(&s, seq)) {
        printf("\nResult: SAFE. Safe sequence: <");
        for (int k = 0; k < s.n; k++) printf("P%d%s", seq[k], k < s.n - 1 ? "," : "");
        printf(">\n");
    } else {
        printf("\nResult: UNSAFE.\n");
    }

    /* Demonstrate request: P1 requests (1,0,2) — from Silberschatz example */
    int req[MAX_M] = {1, 0, 2};
    handle_request(&s, 1, req);
}

/* Read scenario from stdin */
static void run_from_stdin(void) {
    State s;
    if (scanf("%d %d", &s.n, &s.m) != 2) { fprintf(stderr, "Read error\n"); return; }
    for (int j = 0; j < s.m; j++) scanf("%d", &s.total[j]);
    for (int i = 0; i < s.n; i++)
        for (int j = 0; j < s.m; j++) scanf("%d", &s.alloc[i][j]);
    for (int i = 0; i < s.n; i++)
        for (int j = 0; j < s.m; j++) scanf("%d", &s.max_d[i][j]);
    compute_derived(&s);
    print_state(&s);
    int seq[MAX_N];
    if (is_safe(&s, seq)) {
        printf("\nResult: SAFE. Safe sequence: <");
        for (int k = 0; k < s.n; k++) printf("P%d%s", seq[k], k < s.n - 1 ? "," : "");
        printf(">\n");
    } else {
        printf("\nResult: UNSAFE.\n");
    }
}

int main(int argc, char *argv[]) {
    (void)argc; (void)argv;
    if (argc > 1 && strcmp(argv[1], "stdin") == 0) {
        run_from_stdin();
    } else {
        printf("=== Banker's Algorithm — Silberschatz 5-process example ===\n");
        run_default();
    }
    return EXIT_SUCCESS;
}
