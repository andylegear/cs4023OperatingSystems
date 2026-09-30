import{C as e,O as t,V as n,et as r,v as i,w as a,xt as o,y as s,yt as c}from"./modules/shiki-Db-WJ9xy.js";import{nt as l,rt as u}from"./index-5LXbr3i8.js";import{t as d}from"./slidev/CodeBlockWrapper-Cy_VoPKI.js";import{t as f}from"./default-CzgPa4NS.js";var p={__name:`L06_2_CPU_Scheduling_RR_Multilevel_CFS.md__slidev_5`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return n(),s(f,o(t(c(l)(c(b),4))),{default:r(()=>[p[1]||=i(`h1`,null,`Round Robin: Worked Trace (q = 2)`,-1),p[2]||=i(`p`,null,[i(`strong`,null,`Process set from L6.1:`)],-1),p[3]||=i(`table`,null,[i(`thead`,null,[i(`tr`,null,[i(`th`,null,`P`),i(`th`,null,`Arrival`),i(`th`,null,`Burst`)])]),i(`tbody`,null,[i(`tr`,null,[i(`td`,null,`P1`),i(`td`,null,`0`),i(`td`,null,`8`)]),i(`tr`,null,[i(`td`,null,`P2`),i(`td`,null,`1`),i(`td`,null,`4`)]),i(`tr`,null,[i(`td`,null,`P3`),i(`td`,null,`2`),i(`td`,null,`9`)]),i(`tr`,null,[i(`td`,null,`P4`),i(`td`,null,`3`),i(`td`,null,`5`)])])],-1),p[4]||=i(`p`,null,[i(`strong`,null,`Trace (arrivals enqueued in order of arrival time):`)],-1),a(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[i(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[i(`code`,{class:`language-text`},[i(`span`,{class:`line`},[i(`span`,null,`t= 0: run P1 (rem=8)        queue: []         P2 arrives at t=1`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t= 2: P1 rem=6, enqueue P1  queue: [P2,P3,P1] P3 arrives at t=2, P1 preempted`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t= 2: run P2 (rem=4)        queue: [P3,P1]    P4 arrives at t=3`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t= 4: P2 rem=2, enqueue P2  queue: [P3,P1,P4,P2]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t= 4: run P3 (rem=9)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t= 6: P3 rem=7, enqueue P3  queue: [P1,P4,P2,P3]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t= 6: run P1 (rem=6)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t= 8: P1 rem=4, enqueue P1  queue: [P4,P2,P3,P1]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t= 8: run P4 (rem=5)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=10: P4 rem=3, enqueue P4  queue: [P2,P3,P1,P4]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=10: run P2 (rem=2)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=12: P2 DONE (completion=12)  queue: [P3,P1,P4]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=12: run P3 (rem=7)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=14: P3 rem=5, enqueue P3  queue: [P1,P4,P3]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=14: run P1 (rem=4)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=16: P1 rem=2, enqueue P1  queue: [P4,P3,P1]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=16: run P4 (rem=3)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=18: P4 rem=1, enqueue P4  queue: [P3,P1,P4]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=18: run P3 (rem=5)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=20: P3 rem=3, enqueue P3  queue: [P1,P4,P3]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=20: run P1 (rem=2)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=22: P1 DONE (completion=22)  queue: [P4,P3]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=22: run P4 (rem=1)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=23: P4 DONE (completion=23)  queue: [P3]`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=23: run P3 (rem=3)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`t=26: P3 DONE (completion=26)`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};