import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-lp00r8VA.js";import{t as d}from"./default-Bmfj_Ysn.js";import{t as f}from"./slidev/CodeBlockWrapper-Bd6mm9SG.js";var p={__name:`L08_1_Classic_Concurrency_Problems.md__slidev_13`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=f;return t(),i(d,a(e(s(l)(s(b),12))),{default:r(()=>[p[2]||=o(`h1`,null,`Worked Example: Execution Analysis`,-1),p[3]||=o(`p`,null,[o(`strong`,null,`Invariants maintained by the semaphore solution:`)],-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`At all times:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  sem_value(empty) + sem_value(full) == N   (every slot is either empty or full)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  sem_value(mutex) == 0 or 1               (binary mutex)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  0 ≤ in, out < N                          (valid indices)`)])])],-1)]]),_:1}),p[4]||=o(`p`,null,[o(`strong`,null,`Trace (N=3, one producer, one consumer):`)],-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[1]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`Initial: empty=3, full=0, mutex=1`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Producer:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  P(empty) → empty=2`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  P(mutex) → mutex=0`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  buffer[0]=42, in=1`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  V(mutex) → mutex=1`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  V(full)  → full=1`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Consumer:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  P(full)  → full=0`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  P(mutex) → mutex=0`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  item=buffer[0]=42, out=1`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  V(mutex) → mutex=1`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  V(empty) → empty=3`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Producer can fill all 3 slots before consumer runs → full=3, empty=0`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` → Producer blocks on P(empty) → consumer must run first`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` → No data loss; no busy-waiting`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};