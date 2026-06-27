import{E as e,R as t,X as n,_ as r,_t as i,g as a,ht as o,v as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{et as l,tt as u}from"./index-Bby7Z5oC.js";import{t as d}from"./default-C5eRlGpx.js";``+new URL(`virtual_memory_concept-CgMzZI_F.png`,import.meta.url).href;var f={__name:`L10_2_Virtual_Memory_Demand_Paging.md__slidev_3`,setup(f){let{$slidev:p,$nav:m,$clicksContext:h,$clicks:g,$page:_,$renderContext:v,$frontmatter:y}=u();return h.setup(),(u,f)=>(t(),r(d,i(e(o(l)(o(y),2))),{default:n(()=>[f[0]||=a(`h1`,null,`The Virtual Memory Concept`,-1),f[1]||=a(`p`,null,[a(`strong`,null,`Key insight:`),c(` a program only needs a `),a(`strong`,null,`fraction`),c(` of its code and data in RAM at any instant.`)],-1),s(`nanobanana:
Technical textbook-style diagram on a dark (#1a1a2e) background.
White labels, orange (#ff8c00) accent lines, blue (#4a90d9) boxes.
Flat design, clean sans-serif font, no gradients.
Three vertical columns: "Process A (Virtual)" (left), "Physical RAM" (centre), "Disk / Swap" (right).
Left column: 5 page cells (Page 0–Page 4). Pages 0, 2, 4 highlighted blue (in RAM); Pages 1, 3 greyed-out (not loaded).
Centre column: 3 labelled frame cells: Frame 2, Frame 5, Frame 8 (blue fill).
Right column: 2 page cells: Page 1 and Page 3 (grey, labelled "not yet needed").
Orange solid arrows: Page 0 → Frame 2, Page 2 → Frame 5, Page 4 → Frame 8.
Dotted grey arrows: Page 1 and Page 3 pointing toward disk.
Caption at bottom: "Only actively-needed pages are resident in RAM"
Style: CS course slide illustration, 1200×480 px, PNG.
Save output as: Lectures/Week_10_Paging_and_Virtual_Memory/assets/virtual_memory_concept.png
`),f[2]||=a(`img`,{src:``+new URL(`virtual_memory_concept-CgMzZI_F.png`,import.meta.url).href,alt:`Virtual memory: process pages mapped to RAM and disk`,class:`mx-auto h-48`},null,-1),f[3]||=a(`p`,{class:`text-center text-xs italic text-gray-400 mt-1`},`Diagram generated with AI image generation (nanobanana). Illustrative only.`,-1),f[4]||=a(`p`,null,[a(`strong`,null,`Benefits of virtual memory:`)],-1),f[5]||=a(`ul`,null,[a(`li`,null,[c(`Programs can be `),a(`strong`,null,`larger than physical memory`)]),a(`li`,null,`Each process has its own large virtual address space (e.g., 128 TB on x86-64)`),a(`li`,null,[c(`The OS loads only `),a(`strong`,null,`required pages`),c(` into RAM on demand`)]),a(`li`,null,[c(`Enables `),a(`strong`,null,`more concurrent processes`),c(` — each uses less RAM`)]),a(`li`,null,`Simplifies program loading (no need to load entire binary)`)],-1)]),_:1},16))}};export{f as default};