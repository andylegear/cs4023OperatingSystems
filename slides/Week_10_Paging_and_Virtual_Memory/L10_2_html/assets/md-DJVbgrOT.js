import{E as e,R as t,X as n,_ as r,_t as i,g as a,ht as o,v as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{et as l,tt as u}from"./index-DMt7-fMx.js";import{t as d}from"./default-JsTT9IP-.js";``+new URL(`cow_fork-CpFizPxA.png`,import.meta.url).href;var f={__name:`L10_2_Virtual_Memory_Demand_Paging.md__slidev_8`,setup(f){let{$slidev:p,$nav:m,$clicksContext:h,$clicks:g,$page:_,$renderContext:v,$frontmatter:y}=u();return h.setup(),(u,f)=>(t(),r(d,i(e(o(l)(o(y),7))),{default:n(()=>[f[0]||=a(`h1`,null,`Copy-on-Write (COW)`,-1),f[1]||=a(`p`,null,[a(`code`,null,`fork()`),c(` creates a child process that is a copy of the parent. Copying all pages immediately is expensive.`)],-1),f[2]||=a(`p`,null,[a(`strong`,null,`Copy-on-write optimisation:`)],-1),s(`nanobanana:
Technical textbook-style diagram on a dark (#1a1a2e) background.
White labels, orange (#ff8c00) accent, blue (#4a90d9) and green (#28a745) boxes.
Flat design, clean sans-serif font, no gradients.
Left column labelled "Parent page table", right column labelled "Child page table" (after fork).
Three rows between them:
  Row 1: Parent PTE[0] → Frame 5, Child PTE[0] → Frame 5 (same frame, both pointing to it with a shared oval labelled "Frame 5 (read-only)").
  Row 2: Parent PTE[1] → Frame 9 shared similarly, labelled "Frame 9 (read-only)".
  Row 3: Parent PTE[2] → Frame 3 shared, labelled "Frame 3 (read-only)".
Below the shared diagram: a second sub-diagram labelled "After child writes to page 1":
  Child PTE[1] now points to a new box "Frame 12 (writable, copied from Frame 9)" in green.
  Parent PTE[1] still points to "Frame 9 (now writable)" in blue.
  An orange label: "Copy-on-write triggered: OS allocates Frame 12, copies Frame 9 → Frame 12".
Style: CS course slide illustration, 1200×560 px, PNG.
Save output as: Lectures/Week_10_Paging_and_Virtual_Memory/assets/cow_fork.png
`),f[3]||=a(`img`,{src:``+new URL(`cow_fork-CpFizPxA.png`,import.meta.url).href,alt:`Copy-on-write: shared frames after fork and copy on first write`,class:`mx-auto h-52`},null,-1),f[4]||=a(`p`,{class:`text-center text-xs italic text-gray-400 mt-1`},`Diagram generated with AI image generation (nanobanana). Illustrative only.`,-1),f[5]||=a(`p`,null,[a(`strong`,null,`Result:`),c(),a(`code`,null,`fork()`),c(` is O(1) — only a page table copy initially.`),a(`br`),c(` Pages are copied `),a(`strong`,null,`on demand`),c(` when either process writes.`)],-1),f[6]||=a(`p`,null,[c(`This makes `),a(`code`,null,`fork()`),c(` + `),a(`code`,null,`exec()`),c(` (the Unix process model) extremely efficient.`)],-1)]),_:1},16))}};export{f as default};