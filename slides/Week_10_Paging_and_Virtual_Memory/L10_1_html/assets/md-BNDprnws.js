import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-oz5fRni8.js";import{t as f}from"./default-C0_sxvUM.js";var p={__name:`L10_1_Paging_and_Page_Tables.md__slidev_8`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),7))),{default:i(()=>[p[1]||=s(`h1`,null,`Effective Memory Access Time with TLB`,-1),p[2]||=s(`p`,null,`Let:`,-1),p[3]||=s(`ul`,null,[s(`li`,null,[s(`code`,null,`t`),l(` = memory access time (e.g., 100 ns)`)]),s(`li`,null,[s(`code`,null,`ε`),l(` = TLB access time (typically 1–5 ns; often modelled as 0 for simplicity)`)]),s(`li`,null,[s(`code`,null,`α`),l(` = TLB hit rate (e.g., 0.98 = 98%)`)])],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` TLB Hit:  TLB lookup + 1 memory access  = ε + t`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` TLB Miss: TLB lookup + page table read + data read = ε + t + t`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` EAT = α(ε + t) + (1 - α)(ε + 2t)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     = ε + t + (1 - α) × t`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` With α = 0.98, t = 100 ns, ε ≈ 0:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` EAT = 0 + 100 + 0.02 × 100 = 102 ns`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Without TLB (every access needs page table):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` access time = 2 × 100 = 200 ns`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` TLB provides ~2% overhead vs 100% without — huge gain.`)])])],-1)]]),_:1}),p[4]||=s(`p`,null,`Modern TLB hit rates of 99%+ are achievable for well-localised workloads.`,-1)]),_:1},16)}}};export{p as default};