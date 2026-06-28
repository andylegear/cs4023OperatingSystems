/*
 * stat_demo_ref.c — Lab 12: Inode and Block Inspection (Reference Implementation)
 *
 * Creates three files (normal, sparse, symlink), prints stat() metadata,
 * creates a hard link and verifies shared inode, and uses fstat().
 *
 * Compile:  gcc -Wall -O2 -o stat_demo_ref stat_demo_ref.c
 * Run:      ./stat_demo_ref
 * Via make: make run
 *
 * CS4023 Operating Systems — Lab 12 Reference Implementation
 */

#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>

#define FILE_NORMAL   "/tmp/stat_normal.bin"
#define FILE_SPARSE   "/tmp/stat_sparse.bin"
#define FILE_LINK     "/tmp/stat_hardlink.bin"
#define FILE_SYM      "/tmp/stat_sym.lnk"
#define NORMAL_SIZE   (1 * 1024 * 1024)  /* 1 MB */
#define SPARSE_SIZE   (100 * 1024 * 1024) /* 100 MB logical, holes only */

static const char *file_type(mode_t m) {
    if (S_ISREG(m))  return "regular";
    if (S_ISDIR(m))  return "directory";
    if (S_ISLNK(m))  return "symlink";
    if (S_ISBLK(m))  return "block device";
    if (S_ISCHR(m))  return "char device";
    if (S_ISFIFO(m)) return "fifo/pipe";
    if (S_ISSOCK(m)) return "socket";
    return "unknown";
}

static void print_stat(const char *path, int use_lstat) {
    struct stat st;
    int r = use_lstat ? lstat(path, &st) : stat(path, &st);
    if (r < 0) { perror(path); return; }
    printf("  %-28s  %10ld B  %6ld blks  inode %-8lu  %s  links=%ld\n",
           path,
           (long)st.st_size,
           (long)st.st_blocks,
           (unsigned long)st.st_ino,
           file_type(st.st_mode),
           (long)st.st_nlink);
}

int main(void) {
    /* Create normal 1 MB file */
    {
        int fd = open(FILE_NORMAL, O_WRONLY | O_CREAT | O_TRUNC, 0644);
        if (fd < 0) { perror(FILE_NORMAL); return 1; }
        char *buf = calloc(1, NORMAL_SIZE);
        memset(buf, 0xCC, NORMAL_SIZE);
        if (write(fd, buf, NORMAL_SIZE) < 0) perror("write");
        free(buf);
        close(fd);
    }

    /* Create sparse 100 MB file (lseek creates a hole — no actual disk blocks) */
    {
        int fd = open(FILE_SPARSE, O_WRONLY | O_CREAT | O_TRUNC, 0644);
        if (fd < 0) { perror(FILE_SPARSE); return 1; }
        lseek(fd, SPARSE_SIZE - 1, SEEK_SET);
        if (write(fd, "\0", 1) < 0) perror("write");
        close(fd);
    }

    /* Create hard link to normal file */
    unlink(FILE_LINK);
    if (link(FILE_NORMAL, FILE_LINK) < 0) perror("link");

    /* Create symbolic link */
    unlink(FILE_SYM);
    if (symlink(FILE_NORMAL, FILE_SYM) < 0) perror("symlink");

    printf("\n=== stat() results ===\n");
    printf("  %-28s  %10s  %8s  %-12s  %s\n", "File", "Size", "Blocks", "Inode", "Type");
    printf("  %s\n","---------------------------------------------------------------------------------");
    print_stat(FILE_NORMAL, 0);
    print_stat(FILE_SPARSE, 0);
    print_stat(FILE_LINK,   0);
    print_stat(FILE_SYM,    1);  /* lstat to see symlink itself, not target */

    printf("\n=== Hard link verification ===\n");
    {
        struct stat sn, sl;
        stat(FILE_NORMAL, &sn);
        stat(FILE_LINK,   &sl);
        printf("  %s inode: %lu  |  %s inode: %lu\n",
               FILE_NORMAL, (unsigned long)sn.st_ino,
               FILE_LINK,   (unsigned long)sl.st_ino);
        printf("  Inodes %s — hard link verified.\n",
               sn.st_ino == sl.st_ino ? "MATCH ✓" : "DO NOT MATCH ✗ (unexpected)");
        printf("  Link count on inode: %ld\n", (long)sn.st_nlink);
    }

    printf("\n=== fstat() on open file descriptor ===\n");
    {
        int fd = open(FILE_NORMAL, O_RDONLY);
        struct stat st;
        fstat(fd, &st);
        printf("  fstat inode: %lu  size: %ld B  blocks: %ld\n",
               (unsigned long)st.st_ino, (long)st.st_size, (long)st.st_blocks);
        close(fd);
    }

    printf("\nNote: The sparse file has st_size=%d MB but far fewer disk blocks.\n", SPARSE_SIZE/(1024*1024));
    printf("The OS did not allocate physical blocks for the 'hole' — they read as zeroes.\n");

    unlink(FILE_NORMAL); unlink(FILE_SPARSE); unlink(FILE_LINK); unlink(FILE_SYM);
    return 0;
}
