import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-DBi6QuPH.js";import{t as f}from"./default-BxpNY4Wo.js";var p={__name:`L10_2_Virtual_Memory_Demand_Paging.md__slidev_10`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),9))),{default:i(()=>[p[1]||=s(`h1`,null,`Effective Access Time — Full Calculation`,-1),p[2]||=s(`p`,null,`For a system using both TLB and demand paging:`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` Given:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   Memory access time (t):              100 ns`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   TLB hit rate (α):                    0.98`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   Page fault probability (p):          0.001`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   Page fault service time (s):         10,000,000 ns (10 ms with SSD)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` EAT = α × (ε + t)  +  (1 - α) × (ε + 2t)  — for TLB component`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Then page fault adds:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` EAT_total = EAT_no_fault × (1 - p) + (s + t) × p`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`           ≈ 102 × 0.999 + 10,000,100 × 0.001`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`           = 101.9 + 10,000.1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`           = 10,102 ns`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ≈ 100× normal access time due to page faults.`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` With NVMe (s = 100,000 ns = 100 µs):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` EAT = 101.9 + (100,100 × 0.001) = 101.9 + 100.1 = 202 ns — manageable!`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,`Modern systems use SSDs primarily as swap, making demand paging practical.`,-1)]),_:1},16)}}};export{p as default};