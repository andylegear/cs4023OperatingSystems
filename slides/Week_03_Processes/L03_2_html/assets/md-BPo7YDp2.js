import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-B6PJBVCr.js";import{t as f}from"./default-DpZ8Hxwb.js";var p={__name:`L03_2_Process_Creation_Termination_Scheduling.md__slidev_15`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),14))),{default:i(()=>[p[1]||=s(`h1`,null,`Worked Example: Annotated Output`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`[parent] PID=1200: about to fork`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`── fork() returns ──`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  In parent:  pid = 1201 (child's PID)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  In child:   pid = 0`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`[parent] PID=1200: waiting for child PID=1201`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`[child]  PID=1201 PPID=1200: replacing with /bin/ls`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`── execvp("ls", ...) ──`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  child's address space REPLACED with /bin/ls`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  text/data/heap/stack all new`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  but PID stays 1201, parent stays 1200, open fds inherited`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  (ls output appears here):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`file1.txt`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`file2.txt`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`mydir`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`── ls exits (exit code 0) ──`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  child becomes zombie briefly`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  waitpid() in parent unblocks`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`[parent] child exited with status 0`)])])],-1)]]),_:1}),p[2]||=s(`p`,null,[s(`strong`,null,`Key observations:`)],-1),p[3]||=s(`ul`,null,[s(`li`,null,[l(`Parent and child run `),s(`strong`,null,`concurrently`),l(` — output order may vary`)]),s(`li`,null,[s(`code`,null,`exec()`),l(` does not create a new process — same PID, new program`)]),s(`li`,null,[s(`code`,null,`waitpid()`),l(` prevents zombie accumulation`)])],-1)]),_:1},16)}}};export{p as default};