import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-BYWCfe4j.js";import{t as d}from"./slidev/CodeBlockWrapper-CL80eefj.js";import{t as f}from"./default-D2a-mzmU.js";var p={__name:`L10_2_Virtual_Memory_Demand_Paging.md__slidev_5`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return t(),i(f,a(e(s(l)(s(b),4))),{default:r(()=>[p[1]||=o(`h1`,null,`Page Fault Handling — The 8-Step Sequence`,-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,` 1. CPU issues memory reference → checks PTE: Present bit = 0`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` 2. CPU raises page fault trap → saves process state (PC, registers)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` 3. OS page fault handler invoked:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    a. Verify the reference is valid (legal virtual address? access allowed?)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    b. If invalid → terminate process (SIGSEGV)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` 4. Find a free frame in RAM`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    (if no free frame → run page replacement algorithm → evict a page)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` 5. Issue disk I/O to read the required page from swap space or file`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    (process blocks; OS schedules another process → CPU utilisation maintained)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` 6. Disk I/O completes → I/O interrupt:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    a. Mark target frame as occupied`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    b. Update PTE: frame number, Present=1, Dirty=0`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` 7. Restart the faulting instruction from Step 1`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    (CPU re-fetches the virtual address — this time PTE hit)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` 8. Process continues as if no fault occurred`)])])],-1)]]),_:1}),p[2]||=o(`p`,null,[o(`strong`,null,`Transparent:`),c(` the process has no visibility of the page fault.`)],-1)]),_:1},16)}}};export{p as default};