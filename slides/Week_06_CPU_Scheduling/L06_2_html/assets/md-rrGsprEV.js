import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-CR8V43nE.js";import{t as f}from"./default-CGn30Zmh.js";var p={__name:`L06_2_CPU_Scheduling_RR_Multilevel_CFS.md__slidev_5`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),4))),{default:i(()=>[p[1]||=s(`h1`,null,`Round Robin: Worked Trace (q = 2)`,-1),p[2]||=s(`p`,null,[s(`strong`,null,`Process set from L6.1:`)],-1),p[3]||=s(`table`,null,[s(`thead`,null,[s(`tr`,null,[s(`th`,null,`P`),s(`th`,null,`Arrival`),s(`th`,null,`Burst`)])]),s(`tbody`,null,[s(`tr`,null,[s(`td`,null,`P1`),s(`td`,null,`0`),s(`td`,null,`8`)]),s(`tr`,null,[s(`td`,null,`P2`),s(`td`,null,`1`),s(`td`,null,`4`)]),s(`tr`,null,[s(`td`,null,`P3`),s(`td`,null,`2`),s(`td`,null,`9`)]),s(`tr`,null,[s(`td`,null,`P4`),s(`td`,null,`3`),s(`td`,null,`5`)])])],-1),p[4]||=s(`p`,null,[s(`strong`,null,`Trace (arrivals enqueued in order of arrival time):`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`t= 0: run P1 (rem=8)        queue: []         P2 arrives at t=1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t= 2: P1 rem=6, enqueue P1  queue: [P2,P3,P1] P3 arrives at t=2, P1 preempted`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t= 2: run P2 (rem=4)        queue: [P3,P1]    P4 arrives at t=3`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t= 4: P2 rem=2, enqueue P2  queue: [P3,P1,P4,P2]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t= 4: run P3 (rem=9)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t= 6: P3 rem=7, enqueue P3  queue: [P1,P4,P2,P3]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t= 6: run P1 (rem=6)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t= 8: P1 rem=4, enqueue P1  queue: [P4,P2,P3,P1]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t= 8: run P4 (rem=5)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=10: P4 rem=3, enqueue P4  queue: [P2,P3,P1,P4]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=10: run P2 (rem=2)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=12: P2 DONE (completion=12)  queue: [P3,P1,P4]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=12: run P3 (rem=7)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=14: P3 rem=5, enqueue P3  queue: [P1,P4,P3]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=14: run P1 (rem=4)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=16: P1 rem=2, enqueue P1  queue: [P4,P3,P1]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=16: run P4 (rem=3)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=18: P4 rem=1, enqueue P4  queue: [P3,P1,P4]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=18: run P3 (rem=5)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=20: P3 rem=3, enqueue P3  queue: [P1,P4,P3]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=20: run P1 (rem=2)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=22: P1 DONE (completion=22)  queue: [P4,P3]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=22: run P4 (rem=1)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=23: P4 DONE (completion=23)  queue: [P3]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=23: run P3 (rem=3)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`t=26: P3 DONE (completion=26)`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};