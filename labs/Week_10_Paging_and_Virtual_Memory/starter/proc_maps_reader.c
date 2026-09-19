/* proc_maps_reader.c – CS4023 Lab 10 Starter
 *
 * Reads /proc/self/maps and categorises each memory region.
 *
 * /proc/self/maps format (one region per line):
 *   7f3a00000000-7f3a10000000 rw-p 00000000 00:00 0      [heap]
 *   address-range  perms  offset  dev  inode  [name]
 *
 * Categories detected: text, data/BSS, heap, stack, vdso, anonymous, library.
 *
 * Compile: gcc -Wall -o proc_maps_reader proc_maps_reader.c
 * Run:     ./proc_maps_reader
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LINE_MAX_LEN 512

typedef struct {
    unsigned long start;
    unsigned long end;
    char perms[8];
    char name[256];
} region_t;

static const char *categorise(const char *name, const char *perms) {
    if (strcmp(name, "[heap]") == 0)  return "heap";
    if (strcmp(name, "[stack]") == 0) return "stack";
    if (strcmp(name, "[vdso]") == 0)  return "vDSO";
    if (strcmp(name, "[vsyscall]") == 0) return "vsyscall";
    if (strstr(name, ".so")  != NULL)  return "shared library";
    if (strstr(name, "lib")  != NULL)  return "shared library";
    if (name[0] == '/')               return "file mapping";
    if (name[0] == '\0') {
        /* anonymous region – check perms for text/data hint */
        if (perms[2] == 'x') return "anonymous exec (JIT?)";
        return "anonymous";
    }
    return "other";
}

int main(void) {
    FILE *f = fopen("/proc/self/maps", "r");
    if (!f) { perror("fopen /proc/self/maps"); return EXIT_FAILURE; }

    char line[LINE_MAX_LEN];
    int  count = 0;

    printf("%-36s %-6s %-22s %s\n",
           "Address Range", "Perms", "Category", "Name");
    printf("%-36s %-6s %-22s %s\n",
           "-----------------------------------",
           "------", "----------------------", "----");

    while (fgets(line, sizeof(line), f)) {
        region_t r;
        r.name[0] = '\0';

        /* Parse: start-end perms offset dev inode [name] */
        int n = sscanf(line, "%lx-%lx %7s %*s %*s %*s %255[^\n]",
                       &r.start, &r.end, r.perms, r.name);
        if (n < 3) continue;

        /* Trim leading spaces from name */
        char *nm = r.name;
        while (*nm == ' ') nm++;

        const char *cat = categorise(nm, r.perms);

        printf("%016lx-%016lx %-6s %-22s %s\n",
               r.start, r.end, r.perms, cat, nm);
        count++;
    }
    fclose(f);

    printf("\nTotal regions: %d\n", count);
    printf("\nTip: compare with:  cat /proc/self/maps\n");
    return EXIT_SUCCESS;
}
