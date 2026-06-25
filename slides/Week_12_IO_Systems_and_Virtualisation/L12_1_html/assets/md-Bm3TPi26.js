import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-Ci36PBUh.js";import{t as f}from"./default-82wpepAf.js";var p={__name:`L12_1_IO_Systems_Hardware_Drivers_and_Buffering.md__slidev_7`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),6))),{default:i(()=>[p[1]||=s(`h1`,null,`I/O Subsystem Structure`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` Application layer       read(fd, buf, n)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`         ↓`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` POSIX / VFS layer       Generic file interface`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`         ↓`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` File system             ext4, btrfs, tmpfs, ...`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`         ↓`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Page cache              Buffer recently accessed disk data`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`         ↓`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Block layer             I/O scheduler, request merging`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`         ↓`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Device driver           Hardware-specific code (nvme.ko, ahci.ko)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`         ↓`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Hardware                NVMe SSD / SATA HDD / USB`)])])],-1)]]),_:1}),p[2]||=s(`p`,null,[s(`strong`,null,`Page cache`),l(` (Linux): disk blocks are cached in RAM as 4 KB pages. `),s(`code`,null,`read()`),l(` from file often returns from page cache without disk I/O — `),s(`strong`,null,`cache hit`),l(`. Write-back caching: dirty pages written to disk by `),s(`code`,null,`pdflush`),l(` / `),s(`code`,null,`writeback`),l(` threads.`)],-1)]),_:1},16)}}};export{p as default};