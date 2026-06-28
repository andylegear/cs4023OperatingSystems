/* omp_demo.c – CS4023 Lab 04 Reference: Part 5
 *
 * Basic OpenMP examples: parallel for, critical section.
 *
 * Compile: gcc -Wall -fopenmp -o omp_demo omp_demo.c
 * Run:     ./omp_demo
 */

#include <stdio.h>
#include <omp.h>

int main(void) {
    printf("=== OpenMP Parallel For ===\n");

    /* Each iteration may be handled by a different thread */
    #pragma omp parallel for num_threads(4)
    for (int i = 0; i < 8; i++) {
        printf("  Iteration %d on thread %d\n", i, omp_get_thread_num());
    }

    printf("\n=== OpenMP Critical Section (serialised output) ===\n");

    #pragma omp parallel for num_threads(4)
    for (int i = 0; i < 8; i++) {
        #pragma omp critical
        {
            printf("  [critical] Iteration %d on thread %d\n",
                   i, omp_get_thread_num());
        }
    }

    return 0;
}
