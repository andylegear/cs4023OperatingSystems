import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-DiboP3BX.js";import{t as d}from"./default-CWDZqfoY.js";import{t as f}from"./slidev/CodeBlockWrapper-DBWxddKv.js";var p={__name:`L10_1_Paging_and_Page_Tables.md__slidev_8`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=f;return t(),i(d,a(e(s(l)(s(b),7))),{default:r(()=>[p[1]||=o(`h1`,null,`Effective Memory Access Time with TLB`,-1),p[2]||=o(`p`,null,`Let:`,-1),p[3]||=o(`ul`,null,[o(`li`,null,[o(`code`,null,`t`),c(` = memory access time (e.g., 100 ns)`)]),o(`li`,null,[o(`code`,null,`ε`),c(` = TLB access time (typically 1–5 ns; often modelled as 0 for simplicity)`)]),o(`li`,null,[o(`code`,null,`α`),c(` = TLB hit rate (e.g., 0.98 = 98%)`)])],-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,` TLB Hit:  TLB lookup + 1 memory access  = ε + t`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` TLB Miss: TLB lookup + page table read + data read = ε + t + t`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` EAT = α(ε + t) + (1 - α)(ε + 2t)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`     = ε + t + (1 - α) × t`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` With α = 0.98, t = 100 ns, ε ≈ 0:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` EAT = 0 + 100 + 0.02 × 100 = 102 ns`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Without TLB (every access needs page table):`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` access time = 2 × 100 = 200 ns`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` TLB provides ~2% overhead vs 100% without — huge gain.`)])])],-1)]]),_:1}),p[4]||=o(`p`,null,`Modern TLB hit rates of 99%+ are achievable for well-localised workloads.`,-1)]),_:1},16)}}};export{p as default};