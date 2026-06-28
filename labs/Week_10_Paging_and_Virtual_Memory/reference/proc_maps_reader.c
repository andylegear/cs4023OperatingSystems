/* proc_maps_reader.c – CS4023 Lab 10 Reference Implementation
 *
 * Reads /proc/self/maps and categorises each memory region.
 *
 * Compile: gcc -Wall -o proc_maps_reader proc_maps_reader.c
 * Run:     ./proc_maps_reader
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    unsigned long start, end;
    char perms[8];
    unsigned long offset;
    char dev[8];
    unsigned long inode;
    char path[256];
} Region;

static const char *classify(const Region *r) {
    if (strlen(r->path) == 0) {
        if (strstr(r->perms, "x")) return "anonymous exec";
        return "anonymous";
    }
    if (strstr(r->path, "[stack]"))  return "stack";
    if (strstr(r->path, "[heap]"))   return "heap";
    if (strstr(r->path, "[vdso]"))   return "vDSO";
    if (strstr(r->path, "[vsyscall]")) return "vsyscall";
    if (strstr(r->perms, "x"))       return "code (text)";
    if (strstr(r->perms, "w"))       return "data/bss";
    return "shared lib (ro)";
}

int main(void) {
    FILE *f = fopen("/proc/self/maps", "r");
    if (!f) { perror("/proc/self/maps"); return EXIT_FAILURE; }

    char line[512];
    printf("%-36s %-8s %-24s %s\n", "Address range", "Perms", "Category", "Path");
    printf("%-36s %-8s %-24s %s\n", "-------------", "-----", "--------", "----");

    while (fgets(line, sizeof(line), f)) {
        Region r = {0};
        /* format: addr-addr perms offset dev inode [path] */
        int n = sscanf(line, "%lx-%lx %7s %lx %7s %lu %255[^\n]",
                       &r.start, &r.end, r.perms, &r.offset, r.dev, &r.inode, r.path);
        if (n < 5) continue;
        char addr[40];
        snprintf(addr, sizeof(addr), "%012lx-%012lx", r.start, r.end);
        size_t kb = (r.end - r.start) / 1024;
        printf("%-36s %-8s %-24s %s (%zu KB)\n",
               addr, r.perms, classify(&r), r.path, kb);
    }
    fclose(f);
    return EXIT_SUCCESS;
}
