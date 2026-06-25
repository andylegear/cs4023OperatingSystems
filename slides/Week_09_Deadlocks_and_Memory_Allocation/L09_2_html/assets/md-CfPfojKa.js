import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index--mG4Rjmk.js";import{t as f}from"./default-DaVQcCmc.js";var p={__name:`L09_2_Memory_Contiguous_Allocation_and_Segmentation.md__slidev_11`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),10))),{default:i(()=>[p[1]||=s(`h1`,null,`Segmentation`,-1),p[2]||=s(`p`,null,[s(`strong`,null,`Segmentation`),l(` maps the programmer’s logical view of memory: a program is a collection of `),s(`strong`,null,`named segments`),l(` — code, data, stack, heap.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` Logical address: <segment number s, offset d>`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Segment Table (per process):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  ┌───┬────────┬────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  │ s │  Base  │  Limit │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  ├───┼────────┼────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  │ 0 │ 0x4000 │ 0x0800 │ ← code segment`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  │ 1 │ 0xA000 │ 0x0400 │ ← data segment`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  │ 2 │ 0xC800 │ 0x0200 │ ← stack segment`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  └───┴────────┴────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Physical address:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   1. Check: d < Limit[s]  → else SIGSEGV`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   2. physical = Base[s] + d`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[l(`Segments can be `),s(`strong`,null,`different sizes`),l(` — matches program structure naturally.`)],-1)]),_:1},16)}}};export{p as default};