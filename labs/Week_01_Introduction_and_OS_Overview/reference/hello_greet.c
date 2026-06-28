/*
 * hello_greet.c  – Exercise 3 reference implementation
 * CS4023 Lab 1 – Extended Makefile / multi-file build
 *
 * hello.c modified to call greet() from greet.c.
 *
 * Compile:  gcc -Wall -g -c hello_greet.c -o hello_greet.o
 *           gcc -Wall -g -c greet.c -o greet.o
 *           gcc -Wall -g -o hello_greet hello_greet.o greet.o
 * Run:      ./hello_greet
 * Via make: make hello_greet && ./hello_greet
 */
#include "greet.h"

int main(void) {
    greet("OS Student");
    return 0;
}
