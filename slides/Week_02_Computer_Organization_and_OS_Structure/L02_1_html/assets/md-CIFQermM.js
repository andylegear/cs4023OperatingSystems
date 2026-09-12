import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-C_eg0dhf.js";import{t as d}from"./default-DAhEsQQa.js";import{t as f}from"./slidev/CodeBlockWrapper-vO2PntbL.js";var p={__name:`L02_1_Computer_System_Organization.md__slidev_5`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=f;return t(),i(d,a(e(s(l)(s(b),4))),{default:r(()=>[p[1]||=o(`h1`,null,`Bootstrap / Boot Process`,-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`Step 1: CPU power-on reset`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → fetches instruction from 0xFFFF_FFF0 (x86 reset vector)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → jumps to UEFI/BIOS firmware in Flash ROM`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 2: UEFI firmware`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Power-On Self Test (POST): test CPU registers, RAM cells, devices`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Build ACPI tables (hardware topology for OS)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Locate EFI System Partition (ESP), load bootloader`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 3: Bootloader (GRUB2)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Read kernel image (vmlinuz) from /boot`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Load initramfs into RAM`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Set up E820 memory map (tell kernel where RAM is)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Jump to kernel entry point (startup_64 on x86-64)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 4: Kernel init`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → start_kernel() in init/main.c`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Set up GDT, IDT (interrupt descriptor table)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Initialise memory allocator (buddy system)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Detect CPUs, bring up secondary cores (SMP)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → Mount root filesystem`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → execve("/sbin/init") → PID 1 (systemd)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 5: User space`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`        → systemd starts services → getty → login`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};