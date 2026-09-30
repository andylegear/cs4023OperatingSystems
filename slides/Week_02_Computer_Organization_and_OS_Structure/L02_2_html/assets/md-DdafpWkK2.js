import{C as e,O as t,V as n,et as r,v as i,w as a,xt as o,y as s,yt as c}from"./modules/shiki-Db-WJ9xy.js";import{nt as l,rt as u}from"./index-Bq3p2I_N.js";import{t as d}from"./default-BoPCM-qs.js";import{t as f}from"./slidev/CodeBlockWrapper-C31T4A3l.js";var p={__name:`L02_2_OS_Services_Structure_and_Interfaces.md__slidev_4`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=f;return n(),s(d,o(t(c(l)(c(b),3))),{default:r(()=>[p[1]||=i(`h1`,null,`OS Services: Program Execution`,-1),p[2]||=i(`p`,null,[i(`strong`,null,`Program execution`),e(` is the most fundamental service:`)],-1),a(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[i(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[i(`code`,{class:`language-text`},[i(`span`,{class:`line`},[i(`span`,null,`User requests: ./myprogram`)]),e(`
`),i(`span`,{class:`line`},[i(`span`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`OS steps:`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`  1. Create a new process (allocate PCB, PID)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`  2. Load executable from disk into memory`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`     → Parse ELF headers`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`     → Map text, data, BSS segments`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`     → Set up stack (argc, argv, envp)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`     → Load interpreter (ld.so) for dynamic linking`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`  3. Set initial registers (PC = entry point, SP = stack top)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`  4. Schedule the process (add to ready queue)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`  5. Monitor execution:`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`     → Handle faults (segfault → SIGSEGV)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`     → Handle exits (collect exit code for wait())`)])])],-1)]]),_:1}),p[3]||=i(`p`,null,[i(`strong`,null,`Error detection`),e(` runs at every step:`)],-1),p[4]||=i(`ul`,null,[i(`li`,null,[e(`ELF magic number wrong → `),i(`code`,null,`exec format error`)]),i(`li`,null,[e(`Permissions wrong → `),i(`code`,null,`Permission denied`)]),i(`li`,null,[e(`Out of memory → `),i(`code`,null,`ENOMEM`),e(` from `),i(`code`,null,`mmap`)])],-1)]),_:1},16)}}};export{p as default};