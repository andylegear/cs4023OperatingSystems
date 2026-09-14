import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-C9yB4Ocp.js";import{t as d}from"./slidev/CodeBlockWrapper-k7a-g9QN.js";import{t as f}from"./default-AyuiaDZV.js";var p={__name:`L03_2_Process_Creation_Termination_Scheduling.md__slidev_15`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return t(),i(f,a(e(s(l)(s(b),14))),{default:r(()=>[p[1]||=o(`h1`,null,`Worked Example: Annotated Output`,-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`[parent] PID=1200: about to fork`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`── fork() returns ──`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  In parent:  pid = 1201 (child's PID)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  In child:   pid = 0`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`[parent] PID=1200: waiting for child PID=1201`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`[child]  PID=1201 PPID=1200: replacing with /bin/ls`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`── execvp("ls", ...) ──`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  child's address space REPLACED with /bin/ls`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  text/data/heap/stack all new`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  but PID stays 1201, parent stays 1200, open fds inherited`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  (ls output appears here):`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`file1.txt`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`file2.txt`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`mydir`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`── ls exits (exit code 0) ──`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  child becomes zombie briefly`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  waitpid() in parent unblocks`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`[parent] child exited with status 0`)])])],-1)]]),_:1}),p[2]||=o(`p`,null,[o(`strong`,null,`Key observations:`)],-1),p[3]||=o(`ul`,null,[o(`li`,null,[c(`Parent and child run `),o(`strong`,null,`concurrently`),c(` — output order may vary`)]),o(`li`,null,[o(`code`,null,`exec()`),c(` does not create a new process — same PID, new program`)]),o(`li`,null,[o(`code`,null,`waitpid()`),c(` prevents zombie accumulation`)])],-1)]),_:1},16)}}};export{p as default};