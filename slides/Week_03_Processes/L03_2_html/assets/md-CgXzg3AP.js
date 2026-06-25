import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-B-XgrWnd.js";import{t as f}from"./default-DWqlEC1f.js";var p={__name:`L03_2_Process_Creation_Termination_Scheduling.md__slidev_13`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),12))),{default:i(()=>[p[1]||=s(`h1`,null,`Scheduling Queues`,-1),p[2]||=s(`p`,null,[l(`Linux maintains several `),s(`strong`,null,`queues`),l(` of processes:`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`                  ┌─────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Job queue         │  ALL processes in the system     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`(all processes)   │  [P1][P2][P3][P4][P5][P6]...    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                  └─────────────────────────────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                  ┌─────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Ready queue       │  Processes in RAM, ready to run  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`(per CPU)         │  [P1][P3][P5]                    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                  └──────────────────┬──────────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                     │ scheduler dispatch`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                     ▼`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                  ┌─────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                  │ CPU │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                                  └──┬──┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                  ┌───────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Device queues     │  Processes waiting for each device │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`(one per device)  │  HDD: [P2][P6]    NIC: [P4]       │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                  └───────────────────────────────────┘`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[s(`strong`,null,`Context switch`),l(`: when the scheduler selects a new process, it saves the current process’s PCB and loads the new one. Takes ~1–10 µs.`)],-1)]),_:1},16)}}};export{p as default};