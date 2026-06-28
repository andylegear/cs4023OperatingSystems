import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,v as l,x as u}from"./modules/shiki-Dm5aQrj-.js";import{et as d,tt as f}from"./index-mgtUcao0.js";import{t as p}from"./default-B9S_BWJr.js";``+new URL(`address_translation-BANhKfKm.png`,import.meta.url).href;var m={__name:`L10_1_Paging_and_Page_Tables.md__slidev_4`,setup(m){let{$slidev:h,$nav:g,$clicksContext:_,$clicks:v,$page:y,$renderContext:b,$frontmatter:x}=f();return _.setup(),(f,m)=>{let h=t(`CodeBlockWrapper`);return n(),a(p,o(e(c(d)(c(x),3))),{default:i(()=>[m[1]||=s(`h1`,null,`Address Translation`,-1),m[2]||=s(`p`,null,[u(`Every logical (virtual) address = `),s(`strong`,null,`page number (p)`),u(` + `),s(`strong`,null,`offset (d)`)],-1),m[3]||=s(`p`,null,[u(`For a page size of 2ⁿ bytes, the offset uses the lower `),s(`strong`,null,`n`),u(` bits:`)],-1),l(`nanobanana:
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
`),m[4]||=s(`img`,{src:``+new URL(`address_translation-BANhKfKm.png`,import.meta.url).href,alt:`Virtual address bit decomposition and translation`,class:`mx-auto h-44`},null,-1),m[5]||=s(`p`,{class:`text-center text-xs italic text-gray-400 mt-1`},`Diagram generated with AI image generation (nanobanana). Illustrative only.`,-1),r(h,{title:``,ranges:[]},{default:i(()=>[...m[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Translation:`)]),u(`
`),s(`span`,{class:`line`},[s(`span`,null,`  1. frame_number = page_table[p]`)]),u(`
`),s(`span`,{class:`line`},[s(`span`,null,`  2. physical = (frame_number << 12) | d`)]),u(`
`),s(`span`,{class:`line`},[s(`span`)]),u(`
`),s(`span`,{class:`line`},[s(`span`,null,`Example: p=3, d=0x6A0, page_table[3]=frame 7`)]),u(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Physical = (7 << 12) | 0x6A0 = 0x7000 + 0x6A0 = 0x76A0`)])])],-1)]]),_:1}),m[6]||=s(`p`,null,[s(`strong`,null,`Hardware support:`),u(` the `),s(`strong`,null,`Page Table Base Register (PTBR / CR3 on x86)`),u(` holds the physical address of the current process’s page table.`)],-1)]),_:1},16)}}};export{m as default};