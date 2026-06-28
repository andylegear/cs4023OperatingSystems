import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-CCO6oz2H.js";import{t as f}from"./default-CtZZsuj9.js";var p={__name:`L11_1_Virtual_Memory_Page_Replacement.md__slidev_5`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),4))),{default:i(()=>[p[1]||=s(`h1`,null,`FIFO — First In, First Out`,-1),p[2]||=s(`p`,null,[s(`strong`,null,`Rule:`),l(` replace the page that has been in memory the `),s(`strong`,null,`longest`),l(` (first loaded).`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5  (3 frames)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Ref | Frames (oldest→newest) | Queue    | Fault?`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  | 1  -  -                | [1]      |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  | 1  2  -                | [1,2]    |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  3  | 1  2  3                | [1,2,3]  |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  4  | 4  2  3                | [2,3,4]  |  F  (evict 1 — oldest)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  | 4  1  3                | [3,4,1]  |  F  (evict 2)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  | 4  1  2                | [4,1,2]  |  F  (evict 3)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  5  | 5  1  2                | [1,2,5]  |  F  (evict 4)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  | 5  1  2                | [1,2,5]  |  H`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  | 5  1  2                | [1,2,5]  |  H`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  3  | 5  3  2                | [2,5,3]  |  F  (evict 1)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  4  | 5  3  4                | [5,3,4]  |  F  (evict 2)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  5  | 5  3  4                | [5,3,4]  |  H`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` FIFO faults = 9`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[s(`strong`,null,`Belady’s Anomaly:`),l(` with FIFO, `),s(`em`,null,`more frames can lead to more page faults`),l(` on some reference strings.`)],-1),p[4]||=s(`p`,null,[l(`Example: string `),s(`code`,null,`1,2,3,4,1,2,5,1,2,3,4,5`),l(` — 3 frames: 9 faults; 4 frames: 10 faults!`)],-1)]),_:1},16)}}};export{p as default};