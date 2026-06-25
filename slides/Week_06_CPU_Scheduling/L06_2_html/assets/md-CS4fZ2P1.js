import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-CQhm5ZAb.js";import{t as f}from"./default-Cf8B1YHV.js";var p={__name:`L06_2_CPU_Scheduling_RR_Multilevel_CFS.md__slidev_4`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),3))),{default:i(()=>[p[1]||=s(`h1`,null,`RR: Effect of Quantum Size`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Processes: P1(burst=6), P2(burst=3), P3(burst=1), P4(burst=4)  Arrival=0 all`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`With q=10 (all complete in first quantum):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 0     6      9  10    14`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ├─P1──┼──P2──┼P3┼─P4──┤    (essentially FCFS)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Avg wait = (0+6+9+10)/4 = 6.25`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`With q=1 (maximum interleaving):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 0 1 2 3 4 5 6 7 8 9 10 11 12 13`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ├P1┼P2┼P3┼P4┼P1┼P2┼P4┼P1┼P2┼P4┼P1┼P1┼P1┼P4┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Avg wait = high; many context switches`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`With q=4 (balanced):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 0    4    7  8       12     14`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ├─P1─┼─P2─┼P3┼─P4────┼─P1──┤`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` P1 finishes at 14; P2 at 7; P3 at 8; P4 at 12`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Wait: P1=(10-4)=6, P2=(4-0)=4, P3=(7-0)=7, P4=(8-0)=8`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Avg wait ≈ 6.25`)])])],-1)]]),_:1}),p[2]||=s(`p`,null,[s(`strong`,null,`Quantum selection in practice:`)],-1),p[3]||=s(`ul`,null,[s(`li`,null,`Linux default: ~100ms for interactive, configurable`),s(`li`,null,`Soft real-time: smaller quantum (4–10 ms)`),s(`li`,null,`Server batch: larger quantum (100–200 ms)`)],-1)]),_:1},16)}}};export{p as default};