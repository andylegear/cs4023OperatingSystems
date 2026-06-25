import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-g08M8uMk.js";import{t as f}from"./default-hZafUaUk.js";var p={__name:`L03_1_Processes_Concepts_and_Representation.md__slidev_5`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),4))),{default:i(()=>[p[1]||=s(`h1`,null,`Process States: Five-State Model`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`        ┌─────────────────────────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        │                                                     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        ▼                                                     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  ┌──────────┐  admitted   ┌──────────┐  scheduler  ┌──────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  │          │ ──────────→ │          │  dispatch   │              │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  │   NEW    │             │  READY   │ ──────────→ │   RUNNING    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  │          │             │          │             │              │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  └──────────┘             └──────────┘             └──────────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                ▲                    │         │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                │     interrupt /    │         │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                │     time slice     │         │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                └────────────────────┘         │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                                               │ I/O or`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                                               │ event wait`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                                               ▼`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                           exit  ┌──────────────┐      ┌────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                      ─────────→ │  TERMINATED  │      │    WAITING     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                 │  (Zombie)    │      │   (Blocked)    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                 └──────────────┘      └────────────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                                               │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                                       I/O complete /`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                                       event occurs`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                                               │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                                        → READY (above)`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};