import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-DDValNiN.js";import{t as f}from"./default-E9zzvISF.js";var p={__name:`L09_1_Deadlocks.md__slidev_12`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),11))),{default:i(()=>[p[1]||=s(`h1`,null,`Banker’s Algorithm — Resource Request`,-1),p[2]||=s(`p`,null,[l(`When process Pᵢ makes request vector `),s(`code`,null,`Request[i]`),l(`:`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Step 1:  if Request[i] > Need[i]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`             → ERROR: process exceeded declared maximum`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 2:  if Request[i] > Available`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`             → WAIT: resources not currently available`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 3:  Tentatively allocate (pretend to grant):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`             Available    -= Request[i]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`             Allocation[i]+= Request[i]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`             Need[i]      -= Request[i]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 4:  Run is_safe():`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`             if SAFE   → GRANT: keep tentative state`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`             if UNSAFE → ROLLBACK to pre-Step-3 state, WAIT`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[s(`strong`,null,`Cost:`),l(` one safety check per resource request — O(n² × m) overhead per allocation.`)],-1)]),_:1},16)}}};export{p as default};