import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-Mg13lkPB.js";import{t as f}from"./default-Blra7OpC.js";var p={__name:`L02_1_Computer_System_Organization.md__slidev_8`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),7))),{default:i(()=>[p[1]||=s(`h1`,null,`The Interrupt Descriptor Table (IDT)`,-1),p[2]||=s(`p`,null,[l(`The `),s(`strong`,null,`IDT`),l(` is an array of 256 entries; each maps an interrupt number to a handler address.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`IDT (x86-64):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`┌─────┬──────────────────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  0  │  Divide by zero exception handler             │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  1  │  Debug exception handler                      │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  2  │  NMI handler                                  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│  3  │  Breakpoint handler (int 3 — gdb uses this)   │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│ ... │  ...                                          │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│ 14  │  Page fault handler                           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│ ... │  ...                                          │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│ 32  │  IRQ 0: Timer (PIT / HPET / LAPIC timer)      │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│ 33  │  IRQ 1: Keyboard controller (i8042)           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│ 34  │  IRQ 2: (cascade to secondary PIC)            │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│ ... │  ...                                          │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│128  │  Linux system call entry (legacy int 0x80)    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`│255  │  Spurious interrupt                           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`└─────┴──────────────────────────────────────────────┘`)])])],-1)]]),_:1}),p[3]||=s(`p`,null,[l(`Loaded by kernel at boot: `),s(`code`,null,`lidt`),l(` instruction points the CPU at this table.`)],-1)]),_:1},16)}}};export{p as default};