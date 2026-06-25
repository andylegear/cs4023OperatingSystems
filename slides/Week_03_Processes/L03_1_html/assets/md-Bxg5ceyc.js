import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-g08M8uMk.js";import{t as f}from"./default-hZafUaUk.js";var p={__name:`L03_1_Processes_Concepts_and_Representation.md__slidev_8`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),7))),{default:i(()=>[p[1]||=s(`h1`,null,`PCB Fields: Memory and Files`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`├─────────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Memory management                               │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    struct mm_struct *mm;  // virtual memory maps │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│      → page tables (virt → phys translation)    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│      → vm_area_struct list (text/data/heap/stack)│`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    unsigned long start_code, end_code;           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    unsigned long start_data, end_data;           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    unsigned long start_brk, brk;  // heap        │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    unsigned long start_stack;                    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├─────────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  File system / I/O                               │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    struct files_struct *files;                   │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│      → fd_array[]: file descriptor table        │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│        fd[0] = stdin, fd[1] = stdout, fd[2] = stderr │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│        fd[3] = open("data.txt") ...             │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    struct fs_struct *fs;  // cwd, root           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├─────────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Signal handling                                 │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    sigset_t pending;   // pending signals        │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    sigset_t blocked;   // masked signals         │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    struct sigaction sighandler[64]; // handlers  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`└─────────────────────────────────────────────────┘`)])])],-1)]]),_:1}),p[2]||=s(`p`,null,[l(`On a 64-bit Linux kernel, `),s(`code`,null,`task_struct`),l(` is approximately `),s(`strong`,null,`9 KB`),l(` in size.`)],-1)]),_:1},16)}}};export{p as default};