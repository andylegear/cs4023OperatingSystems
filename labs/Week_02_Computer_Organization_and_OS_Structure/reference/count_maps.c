/* count_maps.c – CS4023 Lab 02 Reference Implementation (Exercise 3)
 *
 * Reads /proc/self/maps and counts the number of memory region lines.
 *
 * Compile: gcc -Wall -o count_maps count_maps.c
 * Run:     ./count_maps
 * Via make: make run
 */

#include <fcntl.h>      /* open(), O_RDONLY */
#include <unistd.h>     /* read(), write(), close() */
#include <string.h>     /* strlen() */

#define BUF_SIZE 4096

/* Write null-terminated string to fd */
static void write_str(int fd, const char *msg) {
    write(fd, msg, strlen(msg));
}

/* Simple integer to decimal string; returns pointer into buf */
static const char *itoa_simple(int val, char *buf, int buflen) {
    int i = buflen - 1;
    buf[i] = '\0';
    if (val == 0) { buf[--i] = '0'; return buf + i; }
    while (val > 0 && i > 0) {
        buf[--i] = '0' + (val % 10);
        val /= 10;
    }
    return buf + i;
}

int main(void) {
    int fd = open("/proc/self/maps", O_RDONLY);
    if (fd < 0) {
        write_str(2, "Error: cannot open /proc/self/maps\n");
        return 1;
    }

    char buf[BUF_SIZE];
    ssize_t n;
    int line_count = 0;
    int in_line = 0;    /* 1 if we have seen at least one non-newline char */

    while ((n = read(fd, buf, BUF_SIZE)) > 0) {
        for (ssize_t i = 0; i < n; i++) {
            if (buf[i] == '\n') {
                if (in_line) {
                    line_count++;
                    in_line = 0;
                }
            } else {
                in_line = 1;
            }
        }
    }
    /* Count last line if file didn't end with newline */
    if (in_line) line_count++;

    close(fd);

    char numbuf[32];
    write_str(1, "Memory regions in /proc/self/maps: ");
    write_str(1, itoa_simple(line_count, numbuf, sizeof(numbuf)));
    write_str(1, "\n");

    return 0;
}
