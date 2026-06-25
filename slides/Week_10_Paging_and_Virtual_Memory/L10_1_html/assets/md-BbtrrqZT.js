import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-oz5fRni8.js";import{t as f}from"./default-C0_sxvUM.js";var p={__name:`L10_1_Paging_and_Page_Tables.md__slidev_4`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),3))),{default:i(()=>[p[1]||=s(`h1`,null,`Address Translation`,-1),p[2]||=s(`p`,null,[l(`Every logical (virtual) address = `),s(`strong`,null,`page number (p)`),l(` + `),s(`strong`,null,`offset (d)`)],-1),p[3]||=s(`p`,null,[l(`For a page size of 2ⁿ bytes, the offset uses the lower `),s(`strong`,null,`n`),l(` bits:`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` Virtual Address (32-bit, 4 KB pages):`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ┌────────────────────────┬────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` │  Page Number (20 bits) │ Offset (12 bits)│`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` └────────────────────────┴────────────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`          p                       d`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Translation:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   1. Look up page table entry: frame_number = page_table[p]`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   2. Physical address = (frame_number << 12) | d`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Example:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   Virtual:  p=3, d=0x6A0`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   page_table[3] = frame 7`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   Physical: (7 << 12) | 0x6A0 = 0x7000 + 0x6A0 = 0x76A0`)])])],-1)]]),_:1}),p[4]||=s(`p`,null,[s(`strong`,null,`Hardware support:`),l(` the `),s(`strong`,null,`Page Table Base Register (PTBR / CR3 on x86)`),l(` holds the physical address of the current process’s page table.`)],-1)]),_:1},16)}}};export{p as default};