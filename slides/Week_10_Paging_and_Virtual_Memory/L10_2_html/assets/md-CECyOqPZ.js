import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-BYWCfe4j.js";import{t as d}from"./slidev/CodeBlockWrapper-CL80eefj.js";import{t as f}from"./default-D2a-mzmU.js";var p={__name:`L10_2_Virtual_Memory_Demand_Paging.md__slidev_10`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return t(),i(f,a(e(s(l)(s(b),9))),{default:r(()=>[p[1]||=o(`h1`,null,`Effective Access Time — Full Calculation`,-1),p[2]||=o(`p`,null,`For a system using both TLB and demand paging:`,-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,` Given:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   Memory access time (t):              100 ns`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   TLB hit rate (α):                    0.98`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   Page fault probability (p):          0.001`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   Page fault service time (s):         10,000,000 ns (10 ms with SSD)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` EAT = α × (ε + t)  +  (1 - α) × (ε + 2t)  — for TLB component`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Then page fault adds:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` EAT_total = EAT_no_fault × (1 - p) + (s + t) × p`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`           ≈ 102 × 0.999 + 10,000,100 × 0.001`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`           = 101.9 + 10,000.1`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`           = 10,102 ns`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` ≈ 100× normal access time due to page faults.`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` With NVMe (s = 100,000 ns = 100 µs):`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` EAT = 101.9 + (100,100 × 0.001) = 101.9 + 100.1 = 202 ns — manageable!`)])])],-1)]]),_:1}),p[3]||=o(`p`,null,`Modern systems use SSDs primarily as swap, making demand paging practical.`,-1)]),_:1},16)}}};export{p as default};