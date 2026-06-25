import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-GGVstujF.js";import{t as f}from"./default-dzga7xde.js";var p={__name:`L13_1_Cloud_Computing_and_Operating_Systems.md__slidev_8`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),7))),{default:i(()=>[p[1]||=s(`h1`,null,`Kubernetes — Pod Scheduling Flow`,-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,` kubectl apply -f deployment.yaml  (user creates Deployment)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` API Server (etcd stores desired state)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` kube-scheduler:  watches for unscheduled pods`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   1. Filter:  which nodes have sufficient CPU/RAM?`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   2. Score:   rank nodes by affinity, load, locality`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   3. Bind:    write node assignment to etcd`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`        │`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,` kubelet (on chosen node):  watches for pods assigned to it`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   4. Pull container image (if not cached)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   5. Call containerd → runc:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`       clone(CLONE_NEWPID | CLONE_NEWNET | CLONE_NEWNS | ...)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`       Write cgroup limits: cpu.max, memory.max`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`       Set up overlayfs rootfs`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`       exec container entrypoint`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`   6. Pod is RUNNING; kubelet reports health to API server`)])])],-1)]]),_:1}),p[2]||=s(`p`,null,[l(`The scheduler’s `),s(`strong`,null,`node selection`),l(` mirrors an OS process scheduler selecting a CPU — but at the level of entire machines.`)],-1)]),_:1},16)}}};export{p as default};