import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-Dl4xg7T7.js";import{t as f}from"./default-Dkt_eA_4.js";var p={__name:`L02_1_Computer_System_Organization.md__slidev_14`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),13))),{default:i(()=>[p[1]||=s(`h1`,null,`Worked Example: Keyboard Interrupt Step-by-Step`,-1),p[2]||=s(`p`,null,[s(`strong`,null,`Scenario`),l(`: user presses the 'A' key in a terminal session.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`1. Key press detected by keyboard controller (Intel 8042 or USB HID)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → Hardware asserts IRQ1 on the interrupt controller (APIC)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`2. CPU finishes current instruction, checks interrupt flag (IF=1)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → CPU automatically pushes: SS, RSP, RFLAGS, CS, RIP onto kernel stack`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → Sets CS to kernel code segment (ring 0), loads IDT[33] handler address`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`3. Linux IRQ1 handler (keyboard_interrupt) runs:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → Calls inb(0x60) to read scancode (e.g., 0x1E = 'A' pressed)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → Sends EOI (End of Interrupt) to APIC: outb(0x20, 0x20)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → Translates scancode → keycode → ASCII (via keyboard map)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → Stores character in the terminal line discipline buffer (tty layer)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`4. If a process (bash) is blocking on read() from this terminal:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → Kernel marks that process as RUNNABLE`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → Scheduler may preempt current task and run bash`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`5. Interrupt handler returns: iret instruction`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → CPU restores RIP, CS, RFLAGS, RSP, SS from stack`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   → Returns to whatever was running before (possibly bash now)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`6. bash's read() system call returns with 'A' in its buffer`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};