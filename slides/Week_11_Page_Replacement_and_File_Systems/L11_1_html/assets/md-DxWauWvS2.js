import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-2qPO4Xle.js";import{t as d}from"./default-SdL2rxqC.js";import{t as f}from"./slidev/CodeBlockWrapper-BZDhnnjv.js";var p={__name:`L11_1_Virtual_Memory_Page_Replacement.md__slidev_8`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=f;return t(),i(d,a(e(s(l)(s(b),7))),{default:r(()=>[p[1]||=o(`h1`,null,`Clock Algorithm — Detailed Trace`,-1),p[2]||=o(`p`,null,`Reference string: A B C D A B E A B C D E, 4 frames`,-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,` Initial: all frames empty, hand at slot 0.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` A: FAULT. Slot 0 = (A,R=1). Hand→1.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` B: FAULT. Slot 1 = (B,R=1). Hand→2.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` C: FAULT. Slot 2 = (C,R=1). Hand→3.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` D: FAULT. Slot 3 = (D,R=1). Hand→0.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` A: HIT.   Slot 0: R=1→still 1 (already 1). No eviction.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` B: HIT.   Slot 1: R=1.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` E: FAULT. Hand=0: (A,R=1)→clear R=0, hand→1.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`           Hand=1: (B,R=1)→clear R=0, hand→2.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`           Hand=2: (C,R=1)→clear R=0, hand→3.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`           Hand=3: (D,R=1)→clear R=0, hand→0.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`           Hand=0: (A,R=0)→EVICT A, place E=(E,R=1). Hand→1.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` A: FAULT. Hand=1: (B,R=0)→EVICT B, place A=(A,R=1). Hand→2.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` B: FAULT. Hand=2: (C,R=0)→EVICT C, place B=(B,R=1). Hand→3.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` ...`)])])],-1)]]),_:1}),p[3]||=o(`p`,null,[o(`strong`,null,`Clock performs well in practice`),c(` — O(1) per replacement, no costly LRU list updates.`),o(`br`),c(` Used in BSD Unix; Linux uses a more sophisticated two-list variant.`)],-1)]),_:1},16)}}};export{p as default};