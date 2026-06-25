import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-v449yK-6.js";import{t as f}from"./default-CY4HaSs4.js";var p={__name:`L02_1_Computer_System_Organization.md__slidev_12`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),11))),{default:i(()=>[p[1]||=s(`h1`,null,`Memory Hierarchy`,-1),p[2]||=s(`p`,null,`Performance and cost create a hierarchy — closer to CPU = faster & more expensive.`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`  Fastest │  ┌─────────────────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Smallest │  │  CPU Registers   (~0.3 ns, ~1 KB, on-die)  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  ├─────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  │  L1 Cache         (~1 ns, ~64 KB, on-die)   │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  ├─────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  │  L2 Cache         (~4 ns, ~512 KB, on-die)  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  ├─────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  │  L3 Cache         (~10 ns, ~32 MB, on-die)  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  ├─────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  │  Main RAM (DRAM)  (~60 ns, ~64 GB, module)  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  ├─────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  │  NVMe SSD         (~100 µs, ~2 TB, PCIe)    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          │  ├─────────────────────────────────────────────┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Slowest │  │  HDD              (~10 ms, ~20 TB, SATA)    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Largest │  └─────────────────────────────────────────────┘`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[s(`strong`,null,`Ratio`),l(`: L1 to HDD = ~30,000,000× speed difference. OS memory management exploits this hierarchy.`)],-1)]),_:1},16)}}};export{p as default};