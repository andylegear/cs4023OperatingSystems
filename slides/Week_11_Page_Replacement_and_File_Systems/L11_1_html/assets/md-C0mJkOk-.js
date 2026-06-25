import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-CT4S6vEf.js";import{t as f}from"./default-vyXt2WmO.js";var p={__name:`L11_1_Virtual_Memory_Page_Replacement.md__slidev_4`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),3))),{default:i(()=>[p[2]||=s(`h1`,null,`OPT — Optimal Algorithm`,-1),p[3]||=s(`p`,null,[s(`strong`,null,`Rule:`),l(` replace the page that will `),s(`strong`,null,`not be used for the longest time`),l(` in the future.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5   (3 frames)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Ref | Frames       | Fault?`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  |  1  -  -    |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  |  1  2  -    |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  3  |  1  2  3    |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  4  | [1] 2  3→4  |  F  (evict page 1; next use of 1 is ref 5, 3 uses at ref 8,9 — evict page farthest: page 3 not used until ref 10; evict 3)`)])])],-1)]]),_:1}),p[4]||=s(`p`,null,[l(`Wait — let me be precise:`),s(`br`),s(`span`,{"1,2,3":`true`},[s(`span`,{"1,2,3":`true`},[s(`span`,{"1,2,3":`true`},[s(`span`,{"1,2,3":`true`},[s(`span`,{"1,2,3":`true`},[s(`span`,{"1,2,3":`true`},`At ref=4, frames=`)])])])])]),l(`. Next uses: page1→ref5, page2→ref6, page3→ref10. Farthest = page3.`),s(`br`),l(` Evict page 3 → frames=.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[1]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` Ref | Frames      | Fault?`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  | 1  -  -     |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  | 1  2  -     |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  3  | 1  2  3     |  F`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  4  | 1  2  4     |  F  (evict 3; next uses: 1@5, 2@6, 3@10 → 3 farthest)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  | 1  2  4     |  H`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  | 1  2  4     |  H`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  5  | 1  2  5     |  F  (evict 4; next uses: 1@8, 2@9, 4@11 → 4 farthest)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1  | 1  2  5     |  H`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2  | 1  2  5     |  H`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  3  | 1  2  3 (→5)|  F  (evict 5? or 1 or 2? next: 1@∞, 2@∞, 5@12 → 1 or 2 farthest, say evict 2)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`     | 1  3  5     |     (evict 1 since 1 not used again? same either way)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  4  | 4  3  5     |  F  (evict 1: not used again; frames={3,4,5})`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  5  | 4  3  5     |  H`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`OPT faults = 6`)])])],-1)]]),_:1}),p[5]||=s(`p`,null,[s(`strong`,null,`OPT is a theoretical benchmark`),l(` — requires future knowledge; not implementable. Useful only for comparison.`)],-1)]),_:1},16)}}};export{p as default};