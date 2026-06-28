/*
 * greet.c  – Exercise 3 reference implementation
 * CS4023 Lab 1 – Extended Makefile / multi-file build
 */
#include <stdio.h>
#include "greet.h"

void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
