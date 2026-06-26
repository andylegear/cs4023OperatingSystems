import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-5LwlhYif.js";import{t as f}from"./default-CV29bPuL.js";var p={__name:`L05_1_IPC_Shared_Memory_and_Pipes.md__slidev_13`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),12))),{default:i(()=>[p[1]||=s(`h1`,null,`Worked Example: Execution Trace`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`t=0   pipe(pfd) called — kernel creates buffer`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`      pfd[0]=3 (read), pfd[1]=4 (write)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=1   fork() — child inherits pfd[0] and pfd[1]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=2   PARENT: close(pfd[0])   CHILD: close(pfd[1])`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`      (each closes their unused end)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=3   PARENT: write(pfd[1], MSG, 26)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`      → kernel copies 26 bytes into pipe buffer`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`      CHILD:  read(pfd[0], buf, 127)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`      → kernel copies bytes out; returns n=26`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=4   PARENT: close(pfd[1])  → pipe buffer now has 0 writers`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`      (if child hadn't read yet, this would signal EOF)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=5   CHILD: prints message, closes pfd[0], exits`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`      PARENT: wait(NULL) returns → child reaped`)])])],-1)]]),_:1}),p[2]||=s(`p`,null,[s(`strong`,null,`Common mistakes:`)],-1),p[3]||=s(`ul`,null,[s(`li`,null,[l(`Forgetting to close unused ends → `),s(`strong`,null,`deadlock`),l(` (child waits for EOF that never comes)`)]),s(`li`,null,[l(`Not null-terminating after `),s(`code`,null,`read()`),l(` — `),s(`code`,null,`read()`),l(` does not add `),s(`code`,null,`'\\0'`)]),s(`li`,null,[l(`Omitting `),s(`code`,null,`wait()`),l(` → `),s(`strong`,null,`zombie`),l(` child process`)])],-1)]),_:1},16)}}};export{p as default};