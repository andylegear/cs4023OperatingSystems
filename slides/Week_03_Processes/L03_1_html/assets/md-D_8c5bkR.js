import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-CskdELFa.js";import{t as f}from"./default-BHHpkrjJ.js";var p={__name:`L03_1_Processes_Concepts_and_Representation.md__slidev_7`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),6))),{default:i(()=>[p[1]||=s(`h1`,null,`Process Control Block (PCB)`,-1),p[2]||=s(`p`,null,[l(`The PCB (called `),s(`code`,null,`task_struct`),l(` in Linux) is the kernel data structure representing a process.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`┌─────────────────────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│                 PCB / task_struct                 │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├─────────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Process identification                          │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    pid_t pid;          // Process ID (e.g., 4821)│`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    pid_t ppid;         // Parent PID             │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    uid_t uid, euid;    // User IDs               │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    gid_t gid, egid;    // Group IDs              │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├─────────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  CPU state (saved when not running)             │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    unsigned long rip;  // Instruction pointer    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    unsigned long rsp;  // Stack pointer          │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    unsigned long rbp;  // Base pointer           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    unsigned long regs[16]; // General registers  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    unsigned long rflags;   // CPU flags          │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├─────────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Process state                                   │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    long state;         // TASK_RUNNING, _INTERRUPTIBLE, etc.│`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├─────────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Scheduling info                                 │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    int priority;       // static priority        │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    int nice;           // nice value (-20..+19)  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    u64 vruntime;       // CFS virtual runtime    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`└─────────────────────────────────────────────────┘`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};