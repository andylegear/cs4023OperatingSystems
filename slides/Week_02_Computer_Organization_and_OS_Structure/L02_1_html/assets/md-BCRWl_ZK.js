import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-GJ2rBwA3.js";import{t as f}from"./default-BgORkVIW.js";var p={__name:`L02_1_Computer_System_Organization.md__slidev_6`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),5))),{default:i(()=>[p[1]||=s(`h1`,null,`Interrupts: The Foundation of Responsiveness`,-1),p[2]||=s(`p`,null,[s(`strong`,null,`Without interrupts`),l(`: the CPU would have to `),s(`em`,null,`poll`),l(` every device constantly.`)],-1),p[3]||=s(`p`,null,[s(`strong`,null,`With interrupts`),l(`: devices notify the CPU when they need attention.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Normal execution:           Interrupt occurs:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                            ┌──────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ─────────────────           │ 1. Device asserts IRQ pin │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Process A runs             │ 2. CPU finishes current   │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ─────────────────           │    instruction            │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                             │ 3. CPU saves state        │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                             │    (registers, PC → stack)│`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                             │ 4. CPU reads interrupt    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                             │    vector (IDT entry)     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                             │ 5. Jump to ISR            │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                             │ 6. ISR handles device     │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                             │ 7. iret: restore state    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`                             └──────────────────────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ─────────────────`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Process A continues (unaware interrupt occurred)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ─────────────────`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};