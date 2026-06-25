import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-CC9ap148.js";import{t as f}from"./default-EBx1voiM.js";var p={__name:`L08_2_Monitors_and_Condition_Variables.md__slidev_4`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),3))),{default:i(()=>[p[1]||=s(`h1`,null,`The Monitor Concept`,-1),p[2]||=s(`p`,null,[l(`A `),s(`strong`,null,`monitor`),l(` is a programming language construct that bundles:`)],-1),p[3]||=s(`ol`,null,[s(`li`,null,[s(`strong`,null,`Shared data`),l(` — instance variables`)]),s(`li`,null,[s(`strong`,null,`Procedures`),l(` — only way to access the data`)]),s(`li`,null,[s(`strong`,null,`Mutual exclusion`),l(` — only one procedure runs in the monitor at a time (implicit)`)])],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`┌──────────── Monitor ──────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Private data:  buffer[], in, out, count  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Condition vars: not_full, not_empty      │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│                                           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  procedure insert(item):                  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    if count == N: wait(not_full)          │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    buffer[in] = item                      │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    in = (in+1) % N; count++              │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    signal(not_empty)                      │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│                                           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  procedure remove():                      │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    if count == 0: wait(not_empty)         │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    item = buffer[out]                     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    out = (out+1) % N; count--            │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    signal(not_full)                       │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│    return item                            │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`└───────────────────────────────────────────┘`)])])],-1)]]),_:1}),p[4]||=s(`p`,null,[s(`strong`,null,`Key property:`),l(` entry to any procedure automatically acquires the monitor mutex; exit releases it. The programmer `),s(`strong`,null,`cannot forget`),l(` to lock/unlock.`)],-1)]),_:1},16)}}};export{p as default};