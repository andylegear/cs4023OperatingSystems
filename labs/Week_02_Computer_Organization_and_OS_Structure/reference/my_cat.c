/* my_cat.c – CS4023 Lab 02 Reference Implementation (Exercise 1)
 *
 * A minimal 'cat' built entirely with POSIX system calls.
 * No stdio functions (no printf, fopen, fread, etc.).
 *
 * Compile: gcc -Wall -o my_cat my_cat.c
 * Run:     ./my_cat /etc/os-release
 * Trace:   strace -e trace=open,openat,read,write,close ./my_cat /etc/os-release
 * Via make: make run
 */

#include <fcntl.h>      /* open(), O_RDONLY */           /* causes openat syscall */
#include <unistd.h>     /* read(), write(), close() */
#include <string.h>     /* strlen() */

#define BUF_SIZE 4096

/* Helper: write a null-terminated string to a file descriptor */
static void write_str(int fd, const char *msg) {
    size_t len = strlen(msg);
    size_t written = 0;
    while (written < len) {
        ssize_t n = write(fd, msg + written, len - written);
        if (n < 0) return;
        written += (size_t)n;
    }
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        write_str(STDERR_FILENO, "Usage: my_cat <filename>\n");
        return 1;
    }

    /* Open the file for reading */             /* causes openat syscall */
    int fd = open(argv[1], O_RDONLY);
    if (fd < 0) {
        write_str(STDERR_FILENO, "Error: cannot open file: ");
        write_str(STDERR_FILENO, argv[1]);
        write_str(STDERR_FILENO, "\n");
        return 1;
    }

    char buf[BUF_SIZE];
    ssize_t bytes_read;

    /* Read in chunks until EOF */              /* each iteration causes read syscall */
    while ((bytes_read = read(fd, buf, BUF_SIZE)) > 0) {
        /* Write chunk to stdout */             /* causes write syscall */
        ssize_t written = 0;
        while (written < bytes_read) {
            ssize_t n = write(STDOUT_FILENO, buf + written,
                              (size_t)(bytes_read - written));
            if (n < 0) {
                write_str(STDERR_FILENO, "Error: write failed\n");
                close(fd);                      /* causes close syscall */
                return 1;
            }
            written += n;
        }
    }

    close(fd);                                  /* causes close syscall */
    return 0;
}
