import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-311HDs6e.js";import{t as f}from"./default-CINxFli0.js";var p={__name:`L02_2_OS_Services_Structure_and_Interfaces.md__slidev_5`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),4))),{default:i(()=>[p[1]||=s(`h1`,null,`System Calls: Definition and Role`,-1),p[2]||=s(`p`,null,[l(`A `),s(`strong`,null,`system call`),l(` is the programmatic interface through which user programs request kernel services.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`     Application`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     ─────────────────────────────────────────────────`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │  printf("hi") → write(1, "hi", 2)             │  User space`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │                                                 │  (ring 3)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │  libc wrapper:                                  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │    mov $1, %rax    ; __NR_write = 1             │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │    mov $1, %rdi    ; fd = 1 (stdout)            │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │    mov %rsi, %rsi  ; buf pointer                │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │    mov $2, %rdx    ; count = 2                  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │    syscall          ; ← TRAP HERE               │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     ─────────────────────────────────────────────────`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │  kernel/sys.c:                                  │  Kernel space`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │    sys_write(fd, buf, count):                   │  (ring 0)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │      → validate args                            │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │      → find file struct for fd                  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │      → call file->f_op->write(...)              │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     │      → return bytes written                     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     ─────────────────────────────────────────────────`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[l(`There are approximately `),s(`strong`,null,`335 system calls`),l(` in Linux 6.x on x86-64.`)],-1)]),_:1},16)}}};export{p as default};