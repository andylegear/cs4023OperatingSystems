import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-CQn9CKQi.js";import{t as f}from"./default-U9iaSpyV.js";var p={__name:`L08_1_Classic_Concurrency_Problems.md__slidev_13`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),12))),{default:i(()=>[p[2]||=s(`h1`,null,`Worked Example: Execution Analysis`,-1),p[3]||=s(`p`,null,[s(`strong`,null,`Invariants maintained by the semaphore solution:`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`At all times:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  sem_value(empty) + sem_value(full) == N   (every slot is either empty or full)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  sem_value(mutex) == 0 or 1               (binary mutex)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  0 ≤ in, out < N                          (valid indices)`)])])],-1)]]),_:1}),p[4]||=s(`p`,null,[s(`strong`,null,`Trace (N=3, one producer, one consumer):`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[1]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Initial: empty=3, full=0, mutex=1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Producer:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  P(empty) → empty=2`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  P(mutex) → mutex=0`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  buffer[0]=42, in=1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  V(mutex) → mutex=1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  V(full)  → full=1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Consumer:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  P(full)  → full=0`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  P(mutex) → mutex=0`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  item=buffer[0]=42, out=1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  V(mutex) → mutex=1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  V(empty) → empty=3`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Producer can fill all 3 slots before consumer runs → full=3, empty=0`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` → Producer blocks on P(empty) → consumer must run first`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` → No data loss; no busy-waiting`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};