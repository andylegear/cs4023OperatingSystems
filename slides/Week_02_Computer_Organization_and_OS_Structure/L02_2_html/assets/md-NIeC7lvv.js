import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-311HDs6e.js";import{t as f}from"./default-CINxFli0.js";var p={__name:`L02_2_OS_Services_Structure_and_Interfaces.md__slidev_10`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),9))),{default:i(()=>[p[1]||=s(`h1`,null,`OS Structure 2: Monolithic (Linux, SVR4 Unix)`,-1),p[2]||=s(`p`,null,[l(`All OS services compiled into one large kernel binary. `),s(`strong`,null,`Modules`),l(` can be loaded dynamically.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`┌─────────────────────────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│                 Linux Kernel (ring 0)                │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  ┌────────┐ ┌───────┐ ┌──────────┐ ┌─────────────┐ │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  │ Sched  │ │ VFS   │ │ Network  │ │  Memory     │ │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  │ (CFS)  │ │ Layer │ │ Stack    │ │  Manager    │ │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  └────────┘ └───────┘ └──────────┘ └─────────────┘ │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  ┌─────────────────────────────────────────────────┐│`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  │  Device Drivers  (loaded as .ko modules)        ││`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  └─────────────────────────────────────────────────┘│`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  System Call Interface                               │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`└─────────────────────────────────────────────────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`      │ system calls (335+ on Linux x86-64)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`┌─────────────────────────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│                  User Space (ring 3)                 │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│   glibc      bash      nginx      Python             │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`└─────────────────────────────────────────────────────┘`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[s(`strong`,null,`Pros`),l(`: high performance (direct function calls between subsystems), well understood.`),s(`br`),s(`strong`,null,`Cons`),l(`: a buffer overflow in a network driver can compromise the entire kernel.`)],-1)]),_:1},16)}}};export{p as default};