import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-DDFDyMOi.js";import{t as d}from"./slidev/CodeBlockWrapper-D1byOOcX.js";import{t as f}from"./default-B6CRhnd4.js";var p={__name:`L05_1_IPC_Shared_Memory_and_Pipes.md__slidev_13`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return t(),i(f,a(e(s(l)(s(b),12))),{default:r(()=>[p[1]||=o(`h1`,null,`Worked Example: Execution Trace`,-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`t=0   pipe(pfd) called — kernel creates buffer`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`      pfd[0]=3 (read), pfd[1]=4 (write)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`t=1   fork() — child inherits pfd[0] and pfd[1]`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`t=2   PARENT: close(pfd[0])   CHILD: close(pfd[1])`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`      (each closes their unused end)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`t=3   PARENT: write(pfd[1], MSG, 26)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`      → kernel copies 26 bytes into pipe buffer`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`      CHILD:  read(pfd[0], buf, 127)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`      → kernel copies bytes out; returns n=26`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`t=4   PARENT: close(pfd[1])  → pipe buffer now has 0 writers`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`      (if child hadn't read yet, this would signal EOF)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`t=5   CHILD: prints message, closes pfd[0], exits`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`      PARENT: wait(NULL) returns → child reaped`)])])],-1)]]),_:1}),p[2]||=o(`p`,null,[o(`strong`,null,`Common mistakes:`)],-1),p[3]||=o(`ul`,null,[o(`li`,null,[c(`Forgetting to close unused ends → `),o(`strong`,null,`deadlock`),c(` (child waits for EOF that never comes)`)]),o(`li`,null,[c(`Not null-terminating after `),o(`code`,null,`read()`),c(` — `),o(`code`,null,`read()`),c(` does not add `),o(`code`,null,`'\\0'`)]),o(`li`,null,[c(`Omitting `),o(`code`,null,`wait()`),c(` → `),o(`strong`,null,`zombie`),c(` child process`)])],-1)]),_:1},16)}}};export{p as default};