import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-2qPO4Xle.js";import{t as d}from"./default-SdL2rxqC.js";import{t as f}from"./slidev/CodeBlockWrapper-BZDhnnjv.js";var p={__name:`L11_1_Virtual_Memory_Page_Replacement.md__slidev_6`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=f;return t(),i(d,a(e(s(l)(s(b),5))),{default:r(()=>[p[1]||=o(`h1`,null,`LRU — Least Recently Used`,-1),p[2]||=o(`p`,null,[o(`strong`,null,`Rule:`),c(` replace the page that was `),o(`strong`,null,`least recently used`),c(` — approximation of OPT using the past.`)],-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5  (3 frames)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Ref | Frames (LRU→MRU)  | Fault?`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  1  | 1                 |  F`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  2  | 1  2              |  F`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  3  | 1  2  3           |  F`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  4  | 2  3  4           |  F  (evict 1 — LRU)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  1  | 3  4  1           |  F  (evict 2 — LRU)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  2  | 4  1  2           |  F  (evict 3 — LRU)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  5  | 1  2  5           |  F  (evict 4 — LRU)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  1  | 2  5  1           |  H  (1 now MRU)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  2  | 5  1  2           |  H  (2 now MRU)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  3  | 1  2  3           |  F  (evict 5 — LRU)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  4  | 2  3  4           |  F  (evict 1 — LRU)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  5  | 3  4  5           |  F  (evict 2 — LRU)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` LRU faults = 10 (worse than FIFO on this string! But generally better)`)])])],-1)]]),_:1}),p[3]||=o(`p`,null,[o(`strong`,null,`LRU is immune to Belady’s anomaly`),c(` (it is a `),o(`strong`,null,`stack algorithm`),c(`).`)],-1),p[4]||=o(`p`,null,[o(`strong`,null,`Implementation challenge:`),c(` exact LRU requires timestamping every access → hardware counter per page, or linked list update on every access → expensive.`)],-1)]),_:1},16)}}};export{p as default};