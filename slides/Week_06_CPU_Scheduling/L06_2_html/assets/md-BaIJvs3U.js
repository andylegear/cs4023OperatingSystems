import{C as e,O as t,V as n,et as r,v as i,w as a,xt as o,y as s,yt as c}from"./modules/shiki-Db-WJ9xy.js";import{nt as l,rt as u}from"./index-5LXbr3i8.js";import{t as d}from"./slidev/CodeBlockWrapper-Cy_VoPKI.js";import{t as f}from"./default-CzgPa4NS.js";var p={__name:`L06_2_CPU_Scheduling_RR_Multilevel_CFS.md__slidev_4`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return n(),s(f,o(t(c(l)(c(b),3))),{default:r(()=>[p[1]||=i(`h1`,null,`RR: Effect of Quantum Size`,-1),a(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[i(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[i(`code`,{class:`language-text`},[i(`span`,{class:`line`},[i(`span`,null,`Processes: P1(burst=6), P2(burst=3), P3(burst=1), P4(burst=4)  Arrival=0 all`)]),e(`
`),i(`span`,{class:`line`},[i(`span`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`With q=10 (all complete in first quantum):`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` 0     6      9  10    14`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` ├─P1──┼──P2──┼P3┼─P4──┤    (essentially FCFS)`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` Avg wait = (0+6+9+10)/4 = 6.25`)]),e(`
`),i(`span`,{class:`line`},[i(`span`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`With q=1 (maximum interleaving):`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` 0 1 2 3 4 5 6 7 8 9 10 11 12 13`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` ├P1┼P2┼P3┼P4┼P1┼P2┼P4┼P1┼P2┼P4┼P1┼P1┼P1┼P4┤`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` Avg wait = high; many context switches`)]),e(`
`),i(`span`,{class:`line`},[i(`span`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,`With q=4 (balanced):`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` 0    4    7  8       12     14`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` ├─P1─┼─P2─┼P3┼─P4────┼─P1──┤`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` P1 finishes at 14; P2 at 7; P3 at 8; P4 at 12`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` Wait: P1=(10-4)=6, P2=(4-0)=4, P3=(7-0)=7, P4=(8-0)=8`)]),e(`
`),i(`span`,{class:`line`},[i(`span`,null,` Avg wait ≈ 6.25`)])])],-1)]]),_:1}),p[2]||=i(`p`,null,[i(`strong`,null,`Quantum selection in practice:`)],-1),p[3]||=i(`ul`,null,[i(`li`,null,`Linux default: ~100ms for interactive, configurable`),i(`li`,null,`Soft real-time: smaller quantum (4–10 ms)`),i(`li`,null,`Server batch: larger quantum (100–200 ms)`)],-1)]),_:1},16)}}};export{p as default};