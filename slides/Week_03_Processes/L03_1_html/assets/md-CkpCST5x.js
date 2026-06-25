import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-BsdQDGop.js";import{t as f}from"./default-BtprDP6m.js";var p={__name:`L03_1_Processes_Concepts_and_Representation.md__slidev_9`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),8))),{default:i(()=>[p[1]||=s(`h1`,null,`Process Address Space Layout`,-1),p[2]||=s(`p`,null,[l(`Each process sees a `),s(`strong`,null,`virtual address space`),l(` — the OS maps pages of physical RAM into it.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`High addresses (0x7FFF_FFFF_FFFF)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`┌────────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Command-line args & environment   │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Stack (grows ↓ on function calls) │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  ─── local variables               │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  ─── return addresses              │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  ─── saved registers               │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│              ↓                     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│     (unmapped — guard page)        │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│              ↑                     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Heap (grows ↑ via malloc/brk)     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  BSS segment                       │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  (uninitialised global/static vars)│`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  e.g., int arr[1000];  zero-filled │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Data segment (initialised data)   │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  e.g., int x = 42;                 │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`├────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  Text segment (read-only code)     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  ─── compiled machine instructions │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  ─── read-only; shared across      │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│      all instances of this program │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`└────────────────────────────────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Low addresses (0x0000_0040_0000)`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};