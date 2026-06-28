import{E as e,R as t,X as n,_ as r,_t as i,g as a,ht as o,v as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{et as l,tt as u}from"./index-DvQ2g6Fe.js";import{t as d}from"./default-VLqv8Rj_.js";``+new URL(`process_address_space-DxMj5wei.png`,import.meta.url).href;var f={__name:`L03_1_Processes_Concepts_and_Representation.md__slidev_9`,setup(f){let{$slidev:p,$nav:m,$clicksContext:h,$clicks:g,$page:_,$renderContext:v,$frontmatter:y}=u();return h.setup(),(u,f)=>(t(),r(d,i(e(o(l)(o(y),8))),{default:n(()=>[f[0]||=a(`h1`,null,`Process Address Space Layout`,-1),f[1]||=a(`p`,null,[c(`Each process sees a `),a(`strong`,null,`virtual address space`),c(` — the OS maps pages of physical RAM into it.`)],-1),s(`nanobanana:
Technical textbook-style diagram on a dark (#1a1a2e) background. White labels, orange (#ff8c00) accent lines/borders. Flat design, clean sans-serif font. 1200×700 px PNG.
A vertical stack of labelled rectangular segments representing a process address space (low addresses at bottom, high at top):
- Bottom: "Text (code) — read-only, shared" in dark blue with orange left border
- Above: "Data — initialised globals (e.g. int x=42)" in slightly lighter blue
- Above: "BSS — uninitialised globals, zero-filled" same style
- Above: "Heap → grows upward via malloc/brk" with an upward orange arrow inside the block
- Centre gap: "(unmapped guard page)" in dark grey italic
- Near top: "Stack ← grows downward (local vars, return addresses)" with a downward orange arrow
- Top: "cmd args / env vars" thin strip
Left axis label: "Low 0x0040_0000" at bottom, "High 0x7FFF_FFFF" at top. Right margin annotations for each segment.
Save output as: Lectures/Week_03_Processes/assets/process_address_space.png
`),f[2]||=a(`img`,{src:``+new URL(`process_address_space-DxMj5wei.png`,import.meta.url).href,alt:`Process virtual address space: text, data, BSS, heap (grows up), guard page, stack (grows down), args/env`,class:`mx-auto h-52`},null,-1),f[3]||=a(`p`,{class:`text-center text-xs italic text-gray-400 mt-1`},`Diagram generated with AI image generation (nanobanana). Illustrative only.`,-1)]),_:1},16))}};export{f as default};