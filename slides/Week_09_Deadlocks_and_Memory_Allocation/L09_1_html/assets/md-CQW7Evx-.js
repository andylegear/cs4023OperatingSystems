import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-DipVGZJ5.js";import{t as d}from"./slidev/CodeBlockWrapper-Bzk1UHxB.js";import{t as f}from"./default-2nWlEW4f.js";var p={__name:`L09_1_Deadlocks.md__slidev_12`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return t(),i(f,a(e(s(l)(s(b),11))),{default:r(()=>[p[1]||=o(`h1`,null,`Banker’s Algorithm — Resource Request`,-1),p[2]||=o(`p`,null,[c(`When process Pᵢ makes request vector `),o(`code`,null,`Request[i]`),c(`:`)],-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`Step 1:  if Request[i] > Need[i]`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`             → ERROR: process exceeded declared maximum`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 2:  if Request[i] > Available`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`             → WAIT: resources not currently available`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 3:  Tentatively allocate (pretend to grant):`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`             Available    -= Request[i]`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`             Allocation[i]+= Request[i]`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`             Need[i]      -= Request[i]`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 4:  Run is_safe():`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`             if SAFE   → GRANT: keep tentative state`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`             if UNSAFE → ROLLBACK to pre-Step-3 state, WAIT`)])])],-1)]]),_:1}),p[3]||=o(`p`,null,[o(`strong`,null,`Cost:`),c(` one safety check per resource request — O(n² × m) overhead per allocation.`)],-1)]),_:1},16)}}};export{p as default};