/* syscall_example.c – CS4023 Lab 02 Starter
 *
 * Demonstrates raw POSIX I/O system calls: open, read, write, close.
 * Does NOT use stdio (no printf, fopen, fwrite, etc.).
 *
 * Compile: gcc -Wall -o syscall_example syscall_example.c
 * Run:     ./syscall_example
 * Trace:   strace -e trace=open,openat,read,write,close ./syscall_example
 */

#include <fcntl.h>      /* open(), O_RDONLY, O_WRONLY, O_CREAT, O_TRUNC */
#include <unistd.h>     /* read(), write(), close(), STDOUT_FILENO, STDERR_FILENO */
#include <string.h>     /* strlen() */

/* Helper: write a string to a file descriptor without printf */
static void write_str(int fd, const char *msg) {
    /* write() may write fewer bytes than requested; loop to be safe */
    size_t len = strlen(msg);
    size_t written = 0;
    while (written < len) {
        ssize_t n = write(fd, msg + written, len - written);
        if (n < 0) return;   /* error – silently ignore in this demo */
        written += (size_t)n;
    }
}

int main(void) {
    /* ------------------------------------------------------------------ */
    /* Part A: Write to stdout using write() – no printf                   */
    /* ------------------------------------------------------------------ */
    write_str(STDOUT_FILENO, "=== Part A: Writing to stdout via write() ===\n");

    /* File descriptor 1 is always stdout */
    const char *msg = "Hello from a raw write() syscall!\n";
    write(STDOUT_FILENO, msg, strlen(msg));

    /* ------------------------------------------------------------------ */
    /* Part B: Create a file, write to it, read it back                   */
    /* ------------------------------------------------------------------ */
    write_str(STDOUT_FILENO, "\n=== Part B: Writing and reading a file ===\n");

    const char *filename = "/tmp/syscall_demo.txt";
    const char *content  = "Line 1: the OS is just a program.\n"
                           "Line 2: system calls are the API.\n"
                           "Line 3: everything is a file descriptor.\n";

    /* Open for writing: create if not exists, truncate if exists */
    int fd_write = open(filename,
                        O_WRONLY | O_CREAT | O_TRUNC,
                        0644);         /* permissions: rw-r--r-- */

    if (fd_write < 0) {
        /* Report error to stderr (fd 2) */
        write_str(STDERR_FILENO, "ERROR: could not open file for writing\n");
        return 1;
    }

    /* Write the content */
    ssize_t bytes_written = write(fd_write, content, strlen(content));
    close(fd_write);    /* always close when done */

    /* Print how many bytes we wrote */
    char buf[64];
    /* Manual integer-to-string (avoid printf) */
    int n = (int)bytes_written;
    int idx = 0;
    char tmp[32];
    if (n == 0) { tmp[idx++] = '0'; }
    while (n > 0) { tmp[idx++] = '0' + (n % 10); n /= 10; }
    /* Reverse */
    char num_str[32];
    for (int i = 0; i < idx; i++) num_str[i] = tmp[idx - 1 - i];
    num_str[idx] = '\0';

    write_str(STDOUT_FILENO, "Wrote ");
    write_str(STDOUT_FILENO, num_str);
    write_str(STDOUT_FILENO, " bytes to ");
    write_str(STDOUT_FILENO, filename);
    write_str(STDOUT_FILENO, "\n");

    /* Now open the same file for reading */
    int fd_read = open(filename, O_RDONLY);
    if (fd_read < 0) {
        write_str(STDERR_FILENO, "ERROR: could not open file for reading\n");
        return 1;
    }

    write_str(STDOUT_FILENO, "\nFile contents (read back):\n");
    write_str(STDOUT_FILENO, "---\n");

    /* Read in 64-byte chunks until EOF */
    char read_buf[64];
    ssize_t bytes_read;
    while ((bytes_read = read(fd_read, read_buf, sizeof(read_buf))) > 0) {
        write(STDOUT_FILENO, read_buf, (size_t)bytes_read);
    }
    write_str(STDOUT_FILENO, "---\n");

    close(fd_read);

    /* ------------------------------------------------------------------ */
    /* Part C: Demonstrate file descriptor numbers                         */
    /* ------------------------------------------------------------------ */
    write_str(STDOUT_FILENO, "\n=== Part C: File descriptor numbers ===\n");
    write_str(STDOUT_FILENO, "STDIN_FILENO  = 0\n");
    write_str(STDOUT_FILENO, "STDOUT_FILENO = 1\n");
    write_str(STDOUT_FILENO, "STDERR_FILENO = 2\n");
    write_str(STDOUT_FILENO, "Check: ls -la /proc/self/fd\n");

    write_str(STDOUT_FILENO, "\nDone.\n");
    return 0;
}
