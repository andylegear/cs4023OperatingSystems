import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-DZ4PnRMb.js";import{t as f}from"./default-Cny58Vhh.js";var p={__name:`L02_2_OS_Services_Structure_and_Interfaces.md__slidev_7`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),6))),{default:i(()=>[p[1]||=s(`h1`,null,`The System Call Interface: Detailed Flow`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Step 1: Application calls libc wrapper`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        e.g., fd = open("file.txt", O_RDONLY)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 2: libc wrapper prepares registers`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        %rax = __NR_open (2 on Linux x86-64)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        %rdi = pointer to "file.txt"`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        %rsi = O_RDONLY (0)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        executes: syscall instruction`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 3: Hardware trap to kernel`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        CPU: saves user %rip, %rsp, %rflags on kernel stack`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        CPU: switches to ring 0, loads kernel gs`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        CPU: jumps to entry_SYSCALL_64 (arch/x86/entry/entry_64.S)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 4: Kernel dispatch`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        Reads %rax = syscall number`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        syscall_table[%rax] → sys_openat() handler`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        Validates pointer (is "file.txt" in user space?)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        Performs operation`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 5: Return to user`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        Places return value in %rax (fd number, or -errno)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        sysret instruction: restores %rip, %rsp, back to ring 3`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 6: libc checks %rax`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        If %rax < 0: sets errno = -result, returns -1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        Otherwise: returns fd to caller`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};