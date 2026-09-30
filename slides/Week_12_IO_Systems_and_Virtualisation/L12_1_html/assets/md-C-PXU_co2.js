import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-BUlZNt_n.js";import{t as d}from"./slidev/CodeBlockWrapper-BL15Qj1E.js";import{t as f}from"./default-B0E8JRSb.js";var p={__name:`L12_1_IO_Systems_Hardware_Drivers_and_Buffering.md__slidev_7`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return t(),i(f,a(e(s(l)(s(b),6))),{default:r(()=>[p[1]||=o(`h1`,null,`I/O Subsystem Structure`,-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,` Application layer       read(fd, buf, n)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`         ↓`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` POSIX / VFS layer       Generic file interface`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`         ↓`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` File system             ext4, btrfs, tmpfs, ...`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`         ↓`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Page cache              Buffer recently accessed disk data`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`         ↓`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Block layer             I/O scheduler, request merging`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`         ↓`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Device driver           Hardware-specific code (nvme.ko, ahci.ko)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`         ↓`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,` Hardware                NVMe SSD / SATA HDD / USB`)])])],-1)]]),_:1}),p[2]||=o(`p`,null,[o(`strong`,null,`Page cache`),c(` (Linux): disk blocks are cached in RAM as 4 KB pages. `),o(`code`,null,`read()`),c(` from file often returns from page cache without disk I/O — `),o(`strong`,null,`cache hit`),c(`. Write-back caching: dirty pages written to disk by `),o(`code`,null,`pdflush`),c(` / `),o(`code`,null,`writeback`),c(` threads.`)],-1)]),_:1},16)}}};export{p as default};