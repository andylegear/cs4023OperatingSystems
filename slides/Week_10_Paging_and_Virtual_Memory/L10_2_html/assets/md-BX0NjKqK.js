import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-BYWCfe4j.js";import{t as d}from"./slidev/CodeBlockWrapper-CL80eefj.js";import{t as f}from"./default-D2a-mzmU.js";var p={__name:`L10_2_Virtual_Memory_Demand_Paging.md__slidev_6`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return t(),i(f,a(e(s(l)(s(b),5))),{default:r(()=>[p[1]||=o(`h1`,null,`Page Fault Cost — Quantifying the Impact`,-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,` Memory access time:         100 ns         (DRAM)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Page fault service time:     20 ms = 20,000,000 ns`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   (disk seek ≈ 8 ms + rotational latency ≈ 4 ms + transfer ≈ 1 ms + restart ≈ 7 ms)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Effective Access Time (EAT):`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   EAT = (1 - p) × 100  +  p × 20,000,000   ns`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`       where p = probability of a page fault on any access`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` For p = 0.001 (1 fault per 1000 accesses):`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   EAT = 0.999 × 100 + 0.001 × 20,000,000`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`       = 99.9 + 20,000`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`       = 20,099.9 ns  ≈ 200 × normal memory access time!`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` To keep EAT < 110 ns (10% degradation):`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   p < 0.0000005  (fewer than 1 fault per 2,000,000 accesses)`)])])],-1)]]),_:1}),p[2]||=o(`p`,null,[o(`strong`,null,`Lesson:`),c(` page fault rate must be `),o(`strong`,null,`extremely low`),c(` for acceptable performance.`),o(`br`),c(` This drives page replacement algorithm design and working set management.`)],-1),p[3]||=o(`p`,null,`With NVMe SSDs (latency ~100 µs), penalty is reduced 100×, but still significant.`,-1)]),_:1},16)}}};export{p as default};