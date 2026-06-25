import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-CgPjfDrv.js";import{t as f}from"./default-DYwZxvbg.js";var p={__name:`L02_2_OS_Services_Structure_and_Interfaces.md__slidev_4`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),3))),{default:i(()=>[p[1]||=s(`h1`,null,`OS Services: Program Execution`,-1),p[2]||=s(`p`,null,[s(`strong`,null,`Program execution`),l(` is the most fundamental service:`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`User requests: ./myprogram`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`OS steps:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1. Create a new process (allocate PCB, PID)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2. Load executable from disk into memory`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     → Parse ELF headers`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     → Map text, data, BSS segments`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     → Set up stack (argc, argv, envp)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     → Load interpreter (ld.so) for dynamic linking`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  3. Set initial registers (PC = entry point, SP = stack top)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  4. Schedule the process (add to ready queue)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  5. Monitor execution:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     → Handle faults (segfault → SIGSEGV)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     → Handle exits (collect exit code for wait())`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[s(`strong`,null,`Error detection`),l(` runs at every step:`)],-1),p[4]||=s(`ul`,null,[s(`li`,null,[l(`ELF magic number wrong → `),s(`code`,null,`exec format error`)]),s(`li`,null,[l(`Permissions wrong → `),s(`code`,null,`Permission denied`)]),s(`li`,null,[l(`Out of memory → `),s(`code`,null,`ENOMEM`),l(` from `),s(`code`,null,`mmap`)])],-1)]),_:1},16)}}};export{p as default};