import{C as e,O as t,V as n,et as r,v as i,w as a,xt as o,y as s,yt as c}from"./modules/shiki-Db-WJ9xy.js";import{nt as l,rt as u}from"./index-xamHErzJ.js";import{t as d}from"./default-WRJ_dweU.js";import{t as f}from"./slidev/CodeBlockWrapper-BWVqNw6P.js";var p={__name:`L02_2_OS_Services_Structure_and_Interfaces.md__slidev_7`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=f;return n(),s(d,o(t(c(l)(c(b),6))),{default:r(()=>[p[1]||=i(`h1`,null,`The System Call Interface: Detailed Flow`,-1),a(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[i(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[i(`code`,{class:`language-text`},[i(`span`,{class:`line`},[i(`span`,null,`Step 1: Application calls libc wrapper`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        e.g., fd = open("file.txt", O_RDONLY)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`Step 2: libc wrapper prepares registers`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        %rax = __NR_open (2 on Linux x86-64)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        %rdi = pointer to "file.txt"`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        %rsi = O_RDONLY (0)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        executes: syscall instruction`)]),e(`
`),i(`span`,{class:`line`},[i(`span`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`Step 3: Hardware trap to kernel`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        CPU: saves user %rip, %rsp, %rflags on kernel stack`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        CPU: switches to ring 0, loads kernel gs`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        CPU: jumps to entry_SYSCALL_64 (arch/x86/entry/entry_64.S)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`Step 4: Kernel dispatch`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        Reads %rax = syscall number`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        syscall_table[%rax] → sys_openat() handler`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        Validates pointer (is "file.txt" in user space?)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        Performs operation`)]),e(`
`),i(`span`,{class:`line`},[i(`span`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`Step 5: Return to user`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        Places return value in %rax (fd number, or -errno)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        sysret instruction: restores %rip, %rsp, back to ring 3`)]),e(`
`),i(`span`,{class:`line`},[i(`span`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`Step 6: libc checks %rax`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        If %rax < 0: sets errno = -result, returns -1`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`        Otherwise: returns fd to caller`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};