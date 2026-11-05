import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-R14GpYK5.js";import{t as d}from"./default-DOPeizph.js";import{t as f}from"./slidev/CodeBlockWrapper-DwlZGvfg.js";var p={__name:`L11_1_Virtual_Memory_Page_Replacement.md__slidev_4`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=f;return t(),i(d,a(e(s(l)(s(b),3))),{default:r(()=>[p[1]||=o(`h1`,null,`OPT — Optimal Algorithm`,-1),p[2]||=o(`p`,null,[o(`strong`,null,`Rule:`),c(` replace the page that will `),o(`strong`,null,`not be used for the longest time`),c(` in the future.`)],-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5   (3 frames)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Ref | Frames      | Fault?`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  1  | 1  -  -     |  F`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  2  | 1  2  -     |  F`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  3  | 1  2  3     |  F`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  4  | 1  2  4     |  F  (evict 3; next uses: 1@5, 2@6, 3@10 → 3 is farthest)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  1  | 1  2  4     |  H`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  2  | 1  2  4     |  H`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  5  | 1  2  5     |  F  (evict 4; next uses: 1@8, 2@9, 4@11 → 4 is farthest)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  1  | 1  2  5     |  H`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  2  | 1  2  5     |  H`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  3  | 3  2  5     |  F  (evict 1; 1 and 2 are never used again, 5 is needed at 12)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  4  | 4  2  5     |  F  (evict 3; 3 and 2 are never used again, 5 is needed at 12)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  5  | 4  2  5     |  H`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`OPT faults = 7`)])])],-1)]]),_:1}),p[3]||=o(`p`,null,[o(`strong`,null,`OPT is a theoretical benchmark`),c(` — requires future knowledge; not implementable. Useful only for comparison.`)],-1)]),_:1},16)}}};export{p as default};