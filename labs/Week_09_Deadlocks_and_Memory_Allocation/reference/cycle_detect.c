/* cycle_detect.c – CS4023 Lab 09 Reference Implementation (Exercise 1)
 *
 * Resource Allocation Graph cycle detection using DFS.
 *
 * Nodes: processes P0..P(n_proc-1), resources R0..R(n_res-1)
 * Assignment edge: Rj -> Pi  (resource held by process)
 * Request  edge:   Pi -> Rj  (process waiting for resource)
 *
 * Compile: gcc -Wall -o cycle_detect cycle_detect.c
 * Run:     ./cycle_detect
 * Via make: make run-cycle
 */

#include <stdio.h>
#include <string.h>
#include <stdbool.h>

#define MAX_NODES 16

/* Adjacency matrix for a directed graph of MAX_NODES nodes */
typedef struct {
    bool adj[MAX_NODES][MAX_NODES];
    int  n;    /* total number of nodes */
    int  np;   /* number of processes (indices 0..np-1) */
    int  nr;   /* number of resources (indices np..np+nr-1) */
} Graph;

static void graph_init(Graph *g, int np, int nr) {
    memset(g, 0, sizeof(*g));
    g->np = np; g->nr = nr; g->n = np + nr;
}

/* Add assignment edge Rj -> Pi */
static void add_assignment(Graph *g, int pi, int rj) {
    g->adj[g->np + rj][pi] = true;
}

/* Add request edge Pi -> Rj */
static void add_request(Graph *g, int pi, int rj) {
    g->adj[pi][g->np + rj] = true;
}

static void node_name(int idx, int np, char *buf, int bufsz) {
    if (idx < np) snprintf(buf, bufsz, "P%d", idx);
    else          snprintf(buf, bufsz, "R%d", idx - np);
}

/* DFS cycle detection; returns true if cycle found */
static bool visited[MAX_NODES];
static bool in_stack[MAX_NODES];
static int  parent[MAX_NODES];
static int  cycle_back_from, cycle_back_to;

static bool dfs(Graph *g, int u) {
    visited[u] = true;
    in_stack[u] = true;
    for (int v = 0; v < g->n; v++) {
        if (!g->adj[u][v]) continue;
        if (!visited[v]) {
            parent[v] = u;
            if (dfs(g, v)) return true;
        } else if (in_stack[v]) {
            cycle_back_from = u;
            cycle_back_to   = v;
            return true;
        }
    }
    in_stack[u] = false;
    return false;
}

static bool has_cycle(Graph *g) {
    memset(visited,  0, sizeof(visited));
    memset(in_stack, 0, sizeof(in_stack));
    memset(parent, -1, sizeof(parent));
    cycle_back_from = -1; cycle_back_to = -1;
    for (int u = 0; u < g->n; u++)
        if (!visited[u] && dfs(g, u)) return true;
    return false;
}

static void print_cycle(Graph *g) {
    char buf[16];
    printf("  Cycle back-edge: ");
    node_name(cycle_back_from, g->np, buf, sizeof(buf)); printf("%s -> ", buf);
    node_name(cycle_back_to,   g->np, buf, sizeof(buf)); printf("%s\n", buf);

    /* Reconstruct cycle path via parent */
    int path[MAX_NODES], plen = 0;
    int cur = cycle_back_from;
    while (cur != cycle_back_to) {
        path[plen++] = cur;
        cur = parent[cur];
        if (plen > g->n) break; /* safety */
    }
    path[plen++] = cycle_back_to;
    printf("  Cycle nodes: ");
    for (int k = plen - 1; k >= 0; k--) {
        node_name(path[k], g->np, buf, sizeof(buf)); printf("%s%s", buf, k > 0 ? " -> " : "");
    }
    printf(" -> ");
    node_name(cycle_back_from, g->np, buf, sizeof(buf)); printf("%s\n", buf);
}

static void run_scenario(const char *name, Graph *g) {
    printf("\n=== Scenario: %s ===\n", name);
    if (has_cycle(g)) {
        printf("DEADLOCK DETECTED — cycle found in RAG.\n");
        print_cycle(g);
    } else {
        printf("SAFE — no cycle in RAG.\n");
    }
}

int main(void) {
    Graph g;

    /* Scenario A: no deadlock
     * P0 holds R0; P1 holds R1; P2 requests R0 (P0 can finish and release) */
    graph_init(&g, 3, 2);   /* 3 processes (P0,P1,P2), 2 resources (R0,R1) */
    add_assignment(&g, 0, 0);  /* R0 -> P0 */
    add_assignment(&g, 1, 1);  /* R1 -> P1 */
    add_request(&g, 2, 0);     /* P2 -> R0 */
    run_scenario("A: Safe (no cycle)", &g);

    /* Scenario B: deadlock — circular wait
     * P0 holds R0, waits R1; P1 holds R1, waits R2; P2 holds R2, waits R0 */
    graph_init(&g, 3, 3);
    add_assignment(&g, 0, 0);  /* R0 -> P0 */
    add_assignment(&g, 1, 1);  /* R1 -> P1 */
    add_assignment(&g, 2, 2);  /* R2 -> P2 */
    add_request(&g, 0, 1);     /* P0 -> R1 */
    add_request(&g, 1, 2);     /* P1 -> R2 */
    add_request(&g, 2, 0);     /* P2 -> R0 */
    run_scenario("B: Deadlock (P0->R1->P1->R2->P2->R0->P0)", &g);

    /* Scenario C: two processes, two resources — classic deadlock */
    graph_init(&g, 2, 2);
    add_assignment(&g, 0, 0);  /* R0 -> P0 */
    add_assignment(&g, 1, 1);  /* R1 -> P1 */
    add_request(&g, 0, 1);     /* P0 -> R1 */
    add_request(&g, 1, 0);     /* P1 -> R0 */
    run_scenario("C: Classic two-thread deadlock (P0<->P1)", &g);

    /* Scenario D: chain — no cycle
     * P0 waits for R0 held by P1 who waits for R1 (not held by anyone) */
    graph_init(&g, 2, 2);
    add_assignment(&g, 1, 0);  /* R0 -> P1 */
    add_request(&g, 0, 0);     /* P0 -> R0 */
    add_request(&g, 1, 1);     /* P1 -> R1 (not held — will not block) */
    run_scenario("D: Chain wait, no cycle (SAFE)", &g);

    return 0;
}
