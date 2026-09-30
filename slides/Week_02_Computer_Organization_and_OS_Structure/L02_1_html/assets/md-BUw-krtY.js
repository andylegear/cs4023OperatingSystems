import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index--K2OR0xc.js";import{t as d}from"./default-B_ths8nu.js";import{t as f}from"./slidev/CodeBlockWrapper-xuQQwyAx.js";var p={__name:`L02_1_Computer_System_Organization.md__slidev_15`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=f;return t(),i(d,a(e(s(l)(s(b),14))),{default:r(()=>[p[1]||=o(`h1`,null,`Worked Example: Keyboard Interrupt Step-by-Step`,-1),p[2]||=o(`p`,null,[o(`strong`,null,`Scenario`),c(`: user presses the 'A' key in a terminal session.`)],-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`1. Key press detected by keyboard controller (Intel 8042 or USB HID)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → Hardware asserts IRQ1 on the interrupt controller (APIC)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`2. CPU finishes current instruction, checks interrupt flag (IF=1)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → CPU automatically pushes: SS, RSP, RFLAGS, CS, RIP onto kernel stack`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → Sets CS to kernel code segment (ring 0), loads IDT[33] handler address`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`3. Linux IRQ1 handler (keyboard_interrupt) runs:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → Calls inb(0x60) to read scancode (e.g., 0x1E = 'A' pressed)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → Sends EOI (End of Interrupt) to APIC: outb(0x20, 0x20)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → Translates scancode → keycode → ASCII (via keyboard map)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → Stores character in the terminal line discipline buffer (tty layer)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`4. If a process (bash) is blocking on read() from this terminal:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → Kernel marks that process as RUNNABLE`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → Scheduler may preempt current task and run bash`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`5. Interrupt handler returns: iret instruction`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → CPU restores RIP, CS, RFLAGS, RSP, SS from stack`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`   → Returns to whatever was running before (possibly bash now)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`6. bash's read() system call returns with 'A' in its buffer`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};