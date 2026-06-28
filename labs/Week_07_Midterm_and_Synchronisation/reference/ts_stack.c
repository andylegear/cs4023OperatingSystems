/* ts_stack.c — CS4023 Week 7 Reference
 * Thread-safe stack with:
 *   - pthread_mutex_t for mutual exclusion
 *   - sem_t (counting) so pop() blocks on empty stack
 *
 * Test harness: 2 producer threads (push 1000 items each),
 *               2 consumer threads (pop 1000 items each).
 * Expected: all 2000 items pushed and all 2000 items popped.
 *
 * Compile: gcc -Wall -Wextra -pthread -O1 -g ts_stack.c -o ts_stack
 * Run:     ./ts_stack
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>

#define CAPACITY     100
#define ITEMS_EACH   1000
#define NUM_PROD     2
#define NUM_CONS     2

/* ── Stack ───────────────────────────────────────────────────────────────── */
typedef struct {
    int      data[CAPACITY];
    int      top;
    pthread_mutex_t lock;
    sem_t    items;    /* counts available items; pop blocks when 0 */
    sem_t    spaces;   /* counts free spaces; push blocks when full */
} ts_stack_t;

static ts_stack_t stack;

static void stack_init(ts_stack_t *s)
{
    s->top = 0;
    pthread_mutex_init(&s->lock, NULL);
    sem_init(&s->items,  0, 0);
    sem_init(&s->spaces, 0, CAPACITY);
}

static void stack_push(ts_stack_t *s, int val)
{
    sem_wait(&s->spaces);   /* wait for free space */
    pthread_mutex_lock(&s->lock);
    s->data[s->top++] = val;
    pthread_mutex_unlock(&s->lock);
    sem_post(&s->items);    /* signal that an item is available */
}

static int stack_pop(ts_stack_t *s)
{
    sem_wait(&s->items);    /* blocks if stack is empty */
    pthread_mutex_lock(&s->lock);
    int val = s->data[--s->top];
    pthread_mutex_unlock(&s->lock);
    sem_post(&s->spaces);   /* signal that a space is free */
    return val;
}

static void stack_destroy(ts_stack_t *s)
{
    pthread_mutex_destroy(&s->lock);
    sem_destroy(&s->items);
    sem_destroy(&s->spaces);
}

/* ── Counters ────────────────────────────────────────────────────────────── */
static long total_pushed = 0;
static long total_popped = 0;
static pthread_mutex_t stats_lock = PTHREAD_MUTEX_INITIALIZER;

/* ── Threads ─────────────────────────────────────────────────────────────── */
static void *producer(void *arg)
{
    int id = *(int *)arg;
    for (int i = 0; i < ITEMS_EACH; i++) {
        stack_push(&stack, id * ITEMS_EACH + i);
        pthread_mutex_lock(&stats_lock);
        total_pushed++;
        pthread_mutex_unlock(&stats_lock);
    }
    printf("Producer %d done (pushed %d items)\n", id, ITEMS_EACH);
    return NULL;
}

static void *consumer(void *arg)
{
    int id = *(int *)arg;
    for (int i = 0; i < ITEMS_EACH; i++) {
        stack_pop(&stack);
        pthread_mutex_lock(&stats_lock);
        total_popped++;
        pthread_mutex_unlock(&stats_lock);
    }
    printf("Consumer %d done (popped %d items)\n", id, ITEMS_EACH);
    return NULL;
}

int main(void)
{
    pthread_t prod_threads[NUM_PROD];
    pthread_t cons_threads[NUM_CONS];
    int prod_ids[NUM_PROD];
    int cons_ids[NUM_CONS];

    stack_init(&stack);

    printf("Thread-safe stack test: %d producers × %d cons, %d items each\n\n",
           NUM_PROD, NUM_CONS, ITEMS_EACH);

    for (int i = 0; i < NUM_PROD; i++) {
        prod_ids[i] = i + 1;
        pthread_create(&prod_threads[i], NULL, producer, &prod_ids[i]);
    }
    for (int i = 0; i < NUM_CONS; i++) {
        cons_ids[i] = i + 1;
        pthread_create(&cons_threads[i], NULL, consumer, &cons_ids[i]);
    }

    for (int i = 0; i < NUM_PROD; i++) pthread_join(prod_threads[i], NULL);
    for (int i = 0; i < NUM_CONS; i++) pthread_join(cons_threads[i], NULL);

    stack_destroy(&stack);
    pthread_mutex_destroy(&stats_lock);

    long expected = (long)NUM_PROD * ITEMS_EACH;
    printf("\nTotal pushed: %ld  Total popped: %ld  Expected: %ld\n",
           total_pushed, total_popped, expected);
    printf("Result: %s\n",
           (total_pushed == expected && total_popped == expected)
           ? "PASS" : "FAIL");

    return 0;
}
