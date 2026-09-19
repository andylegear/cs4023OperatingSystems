# Makefile – CS4023 Lab 01 Starter
# Usage:
#   make        – build all targets
#   make clean  – remove generated files
#
# NOTE: indented recipe lines MUST use a real Tab character, not spaces.

CC     = gcc
CFLAGS = -Wall -g

# Default target: build all executables
all: hello

# Rule to build hello from hello.c
hello: hello.c
	$(CC) $(CFLAGS) -o hello hello.c

# Remove all generated files
clean:
	rm -f hello hello.i hello.s hello.o
