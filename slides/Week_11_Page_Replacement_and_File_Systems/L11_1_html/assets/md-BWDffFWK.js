import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-B0pEDBvG.js";import{t as f}from"./default-ZOB_USm9.js";var p={__name:`L11_1_Virtual_Memory_Page_Replacement.md__slidev_8`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),7))),{default:i(()=>[p[1]||=s(`h1`,null,`Clock Algorithm — Detailed Trace`,-1),p[2]||=s(`p`,null,`Reference string: A B C D A B E A B C D E, 4 frames`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` Initial: all frames empty, hand at slot 0.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` A: FAULT. Slot 0 = (A,R=1). Hand→1.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` B: FAULT. Slot 1 = (B,R=1). Hand→2.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` C: FAULT. Slot 2 = (C,R=1). Hand→3.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` D: FAULT. Slot 3 = (D,R=1). Hand→0.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` A: HIT.   Slot 0: R=1→still 1 (already 1). No eviction.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` B: HIT.   Slot 1: R=1.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` E: FAULT. Hand=0: (A,R=1)→clear R=0, hand→1.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`           Hand=1: (B,R=1)→clear R=0, hand→2.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`           Hand=2: (C,R=1)→clear R=0, hand→3.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`           Hand=3: (D,R=1)→clear R=0, hand→0.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`           Hand=0: (A,R=0)→EVICT A, place E=(E,R=1). Hand→1.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` A: FAULT. Hand=1: (B,R=0)→EVICT B, place A=(A,R=1). Hand→2.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` B: FAULT. Hand=2: (C,R=0)→EVICT C, place B=(B,R=1). Hand→3.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ...`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[s(`strong`,null,`Clock performs well in practice`),l(` — O(1) per replacement, no costly LRU list updates.`),s(`br`),l(` Used in BSD Unix; Linux uses a more sophisticated two-list variant.`)],-1)]),_:1},16)}}};export{p as default};