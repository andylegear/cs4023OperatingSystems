import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,v as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{nt as u,rt as d}from"./index-DiboP3BX.js";import{t as f}from"./default-CWDZqfoY.js";import{t as p}from"./slidev/CodeBlockWrapper-DBWxddKv.js";``+new URL(`address_translation-BANhKfKm.png`,import.meta.url).href;var m={__name:`L10_1_Paging_and_Page_Tables.md__slidev_4`,setup(m){let{$slidev:h,$nav:g,$clicksContext:_,$clicks:v,$page:y,$renderContext:b,$frontmatter:x}=d();return _.setup(),(d,m)=>{let h=p;return t(),i(f,a(e(s(u)(s(x),3))),{default:r(()=>[m[1]||=o(`h1`,null,`Address Translation`,-1),m[2]||=o(`p`,null,[l(`Every logical (virtual) address = `),o(`strong`,null,`page number (p)`),l(` + `),o(`strong`,null,`offset (d)`)],-1),m[3]||=o(`p`,null,[l(`For a page size of 2ⁿ bytes, the offset uses the lower `),o(`strong`,null,`n`),l(` bits:`)],-1),c(`nanobanana:
Technical textbook-style diagram on a dark (#1a1a2e) background.
White labels, orange (#ff8c00) accent lines, blue (#4a90d9) bit-field boxes.
Flat design, clean sans-serif font, no gradients.
One wide horizontal register box representing a 32-bit virtual address, divided into two sections:
  Left section (wider): labelled "Page Number p — 20 bits" in orange.
  Right section (narrower): labelled "Offset d — 12 bits" in blue.
Below the register: two lines of annotation:
  Line 1: "Translation: frame_number = page_table[p]"
  Line 2: "Physical address = (frame_number << 12) | d"
Small worked example at bottom: Virtual p=3 d=0x6A0 → frame 7 → Physical 0x76A0
Style: CS course slide illustration, 1200×420 px, PNG.
Save output as: Lectures/Week_10_Paging_and_Virtual_Memory/assets/address_translation.png
`),m[4]||=o(`img`,{src:``+new URL(`address_translation-BANhKfKm.png`,import.meta.url).href,alt:`Virtual address bit decomposition and translation`,class:`mx-auto h-44`},null,-1),m[5]||=o(`p`,{class:`text-center text-xs italic text-gray-400 mt-1`},`Diagram generated with AI image generation (nanobanana). Illustrative only.`,-1),n(h,{title:``,ranges:[]},{default:r(()=>[...m[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`Translation:`)]),l(`
`),o(`span`,{class:`line`},[o(`span`,null,`  1. frame_number = page_table[p]`)]),l(`
`),o(`span`,{class:`line`},[o(`span`,null,`  2. physical = (frame_number << 12) | d`)]),l(`
`),o(`span`,{class:`line`},[o(`span`)]),l(`
`),o(`span`,{class:`line`},[o(`span`,null,`Example: p=3, d=0x6A0, page_table[3]=frame 7`)]),l(`
`),o(`span`,{class:`line`},[o(`span`,null,`  Physical = (7 << 12) | 0x6A0 = 0x7000 + 0x6A0 = 0x76A0`)])])],-1)]]),_:1}),m[6]||=o(`p`,null,[o(`strong`,null,`Hardware support:`),l(` the `),o(`strong`,null,`Page Table Base Register (PTBR / CR3 on x86)`),l(` holds the physical address of the current process’s page table.`)],-1)]),_:1},16)}}};export{m as default};