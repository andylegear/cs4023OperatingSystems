import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-Dv-wnNcM.js";import{t as f}from"./default-Dv2z87Br.js";var p={__name:`L11_2_File_Systems_Concepts_and_Implementation.md__slidev_14`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),13))),{default:i(()=>[p[2]||=s(`h1`,null,`Worked Example — inode Block Traversal`,-1),p[3]||=s(`p`,null,[s(`strong`,null,`File system:`),l(` 4 KB blocks, 4-byte block pointers → 1024 pointers per indirect block.`),s(`br`),s(`strong`,null,`File size:`),l(` 15 data blocks total.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` Inode block layout:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` ┌────────────────────────────────────────────────┐`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` │ Direct[0] ──→ Block 100   (block 1 of file)    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` │ Direct[1] ──→ Block 101   (block 2)            │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` │ ...                                            │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` │ Direct[11]──→ Block 111   (block 12)           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` │ Single Indirect ──→ Block 500 (index block)    │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` │                  Block 500 contains:           │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` │                  [Block 200, Block 201, Block 202, ...] │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` │                  Blocks 200,201,202 = blocks 13,14,15  │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` └────────────────────────────────────────────────┘`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Disk accesses to read block 13:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   1. Read inode       (get SI pointer → block 500)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   2. Read block 500   (index block → get block 200)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   3. Read block 200   (actual data)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   Total: 3 disk accesses (vs 1 for a direct block)`)])])],-1)]]),_:1}),p[4]||=s(`p`,null,[s(`strong`,null,`Maximum file size with 4 KB blocks, 4-byte pointers:`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[1]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` Direct:          12 × 4 KB =        48 KB`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Single indirect:  1 × 1024 × 4 KB = 4,096 KB ≈   4 MB`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Double indirect:  1 × 1024² × 4 KB =             4 GB`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Triple indirect:  1 × 1024³ × 4 KB =             4 TB`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` Total ≈ 4 TB (before ext4 limits apply)`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};