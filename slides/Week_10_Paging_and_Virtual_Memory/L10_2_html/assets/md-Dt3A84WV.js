import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-B7KC2-uQ.js";import{t as f}from"./default-BFj_aMKh.js";var p={__name:`L10_2_Virtual_Memory_Demand_Paging.md__slidev_5`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),4))),{default:i(()=>[p[1]||=s(`h1`,null,`Page Fault Handling — The 8-Step Sequence`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` 1. CPU issues memory reference → checks PTE: Present bit = 0`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 2. CPU raises page fault trap → saves process state (PC, registers)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 3. OS page fault handler invoked:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    a. Verify the reference is valid (legal virtual address? access allowed?)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    b. If invalid → terminate process (SIGSEGV)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 4. Find a free frame in RAM`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    (if no free frame → run page replacement algorithm → evict a page)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 5. Issue disk I/O to read the required page from swap space or file`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    (process blocks; OS schedules another process → CPU utilisation maintained)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 6. Disk I/O completes → I/O interrupt:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    a. Mark target frame as occupied`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    b. Update PTE: frame number, Present=1, Dirty=0`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 7. Restart the faulting instruction from Step 1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    (CPU re-fetches the virtual address — this time PTE hit)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` 8. Process continues as if no fault occurred`)])])],-1)]]),_:1}),p[2]||=s(`p`,null,[s(`strong`,null,`Transparent:`),l(` the process has no visibility of the page fault.`)],-1)]),_:1},16)}}};export{p as default};