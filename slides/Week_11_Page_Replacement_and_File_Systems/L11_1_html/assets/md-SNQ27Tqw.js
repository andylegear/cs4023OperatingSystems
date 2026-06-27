import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-MTkHU9yt.js";import{t as f}from"./default-BYwHe-Xe.js";var p={__name:`L11_1_Virtual_Memory_Page_Replacement.md__slidev_6`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),5))),{default:i(()=>[p[1]||=s(`h1`,null,`LRU — Least Recently Used`,-1),p[2]||=s(`p`,null,[s(`strong`,null,`Rule:`),l(` replace the page that was `),s(`strong`,null,`least recently used`),l(` — approximation of OPT using the past.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5  (3 frames)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Ref | Frames (LRU→MRU)  | Fault?`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  | 1                 |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  | 1  2              |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  3  | 1  2  3           |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  4  | 2  3  4           |  F  (evict 1 — LRU)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  | 3  4  1           |  F  (evict 2 — LRU)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  | 4  1  2           |  F  (evict 3 — LRU)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  5  | 1  2  5           |  F  (evict 4 — LRU)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  | 2  5  1           |  H  (1 now MRU)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  | 5  1  2           |  H  (2 now MRU)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  3  | 1  2  3           |  F  (evict 5 — LRU)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  4  | 2  3  4           |  F  (evict 1 — LRU)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  5  | 3  4  5           |  F  (evict 2 — LRU)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` LRU faults = 10 (worse than FIFO on this string! But generally better)`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[s(`strong`,null,`LRU is immune to Belady’s anomaly`),l(` (it is a `),s(`strong`,null,`stack algorithm`),l(`).`)],-1),p[4]||=s(`p`,null,[s(`strong`,null,`Implementation challenge:`),l(` exact LRU requires timestamping every access → hardware counter per page, or linked list update on every access → expensive.`)],-1)]),_:1},16)}}};export{p as default};