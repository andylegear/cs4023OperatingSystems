import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-Mg13lkPB.js";import{t as f}from"./default-Blra7OpC.js";var p={__name:`L02_1_Computer_System_Organization.md__slidev_5`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),4))),{default:i(()=>[p[1]||=s(`h1`,null,`Bootstrap / Boot Process`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Step 1: CPU power-on reset`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → fetches instruction from 0xFFFF_FFF0 (x86 reset vector)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → jumps to UEFI/BIOS firmware in Flash ROM`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 2: UEFI firmware`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Power-On Self Test (POST): test CPU registers, RAM cells, devices`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Build ACPI tables (hardware topology for OS)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Locate EFI System Partition (ESP), load bootloader`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 3: Bootloader (GRUB2)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Read kernel image (vmlinuz) from /boot`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Load initramfs into RAM`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Set up E820 memory map (tell kernel where RAM is)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Jump to kernel entry point (startup_64 on x86-64)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 4: Kernel init`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → start_kernel() in init/main.c`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Set up GDT, IDT (interrupt descriptor table)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Initialise memory allocator (buddy system)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Detect CPUs, bring up secondary cores (SMP)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → Mount root filesystem`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → execve("/sbin/init") → PID 1 (systemd)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 5: User space`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        → systemd starts services → getty → login`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};