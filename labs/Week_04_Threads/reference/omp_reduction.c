/* omp_reduction.c – CS4023 Lab 04 Reference: Exercise 3
 *
 * Demonstrates three OpenMP patterns for a parallel sum:
 *   A) No protection  – data race, wrong answer
 *   B) Critical section – correct but serialised
 *   C) reduction clause – correct AND parallel
 *
 * Compile: gcc -Wall -fopenmp -o omp_reduction omp_reduction.c
 * Run:     ./omp_reduction
 */

#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

#define N 10000000

static int arr[N];

int main(void) {
    for (int i = 0; i < N; i++) arr[i] = 1;

    long sum;
    double t0, t1;

    /* ── A: No critical section (race condition) ── */
    sum = 0;
    t0 = omp_get_wtime();
    #pragma omp parallel for num_threads(4)
    for (int i = 0; i < N; i++)
        sum += arr[i];   /* DATA RACE – sum may be wrong */
    t1 = omp_get_wtime() - t0;
    printf("A) No protection:   sum = %ld (expected %d), time = %.4f s  ← may be wrong!\n",
           sum, N, t1);

    /* ── B: Critical section ── */
    sum = 0;
    t0 = omp_get_wtime();
    #pragma omp parallel for num_threads(4)
    for (int i = 0; i < N; i++) {
        #pragma omp critical
        sum += arr[i];   /* correct but very slow – fully serialised */
    }
    t1 = omp_get_wtime() - t0;
    printf("B) Critical:        sum = %ld (expected %d), time = %.4f s  ← correct but slow\n",
           sum, N, t1);

    /* ── C: Reduction clause ── */
    sum = 0;
    t0 = omp_get_wtime();
    #pragma omp parallel for num_threads(4) reduction(+:sum)
    for (int i = 0; i < N; i++)
        sum += arr[i];   /* each thread has private sum; merged at end */
    t1 = omp_get_wtime() - t0;
    printf("C) Reduction:       sum = %ld (expected %d), time = %.4f s  ← correct AND fast\n",
           sum, N, t1);

    return EXIT_SUCCESS;
}
