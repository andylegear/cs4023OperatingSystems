import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-BkMsrZ7s.js";import{t as f}from"./default-BBTaWgAm.js";var p={__name:`L10_2_Virtual_Memory_Demand_Paging.md__slidev_6`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),5))),{default:i(()=>[p[1]||=s(`h1`,null,`Page Fault Cost — Quantifying the Impact`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` Memory access time:         100 ns         (DRAM)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Page fault service time:     20 ms = 20,000,000 ns`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   (disk seek ≈ 8 ms + rotational latency ≈ 4 ms + transfer ≈ 1 ms + restart ≈ 7 ms)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Effective Access Time (EAT):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   EAT = (1 - p) × 100  +  p × 20,000,000   ns`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`       where p = probability of a page fault on any access`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` For p = 0.001 (1 fault per 1000 accesses):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   EAT = 0.999 × 100 + 0.001 × 20,000,000`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`       = 99.9 + 20,000`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`       = 20,099.9 ns  ≈ 200 × normal memory access time!`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` To keep EAT < 110 ns (10% degradation):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   p < 0.0000005  (fewer than 1 fault per 2,000,000 accesses)`)])])],-1)]]),_:1}),p[2]||=s(`p`,null,[s(`strong`,null,`Lesson:`),l(` page fault rate must be `),s(`strong`,null,`extremely low`),l(` for acceptable performance.`),s(`br`),l(` This drives page replacement algorithm design and working set management.`)],-1),p[3]||=s(`p`,null,`With NVMe SSDs (latency ~100 µs), penalty is reduced 100×, but still significant.`,-1)]),_:1},16)}}};export{p as default};