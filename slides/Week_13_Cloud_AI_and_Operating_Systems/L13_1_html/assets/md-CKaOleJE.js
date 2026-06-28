import{E as e,H as t,R as n,S as r,X as i,_ as a,_t as o,g as s,ht as c,x as l}from"./modules/shiki-Dm5aQrj-.js";import{et as u,tt as d}from"./index-BhPQayqN.js";import{t as f}from"./default-WgtJJGGu.js";var p={__name:`L13_1_Cloud_Computing_and_Operating_Systems.md__slidev_13`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=d();return g.setup(),(d,p)=>{let m=t(`CodeBlockWrapper`);return n(),a(f,o(e(c(u)(c(b),12))),{default:i(()=>[p[1]||=s(`h1`,null,`Worked Example — Kubernetes Pod Scheduling`,-1),p[2]||=s(`p`,null,[s(`strong`,null,`Scenario:`),l(` deploy a web service with 3 replicas; cluster has 3 nodes.`)],-1),r(m,{title:``,ranges:[]},{default:i(()=>[...p[0]||=[s(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[s(`code`,{class:`language-text`},[s(`span`,{class:`line`},[s(`span`,null,`Step 1 — User submits Deployment`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  kubectl apply -f web-deploy.yaml`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  → API server writes to etcd: "3 pods wanted, image=nginx:1.25, cpu=100m, mem=128Mi"`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 2 — kube-scheduler detects 3 unscheduled pods`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Filter phase:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    Node1: 4 vCPU, 8 GB free → fits  ✓`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    Node2: 0.5 vCPU free   → too small ✗`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    Node3: 4 vCPU, 8 GB free → fits  ✓`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Score phase:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    Node1 score: 70 (low existing load)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    Node3 score: 85 (better anti-affinity score — no other nginx pods)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Bind: Pod1→Node1, Pod2→Node3, Pod3→Node1`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 3 — kubelet on Node1 creates Pod1:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`  containerd calls runc:`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    clone(CLONE_NEWPID|CLONE_NEWNET|CLONE_NEWNS, ...)`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    cgroup write: cpu.max="100000 1000000", memory.max="134217728"`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    overlayfs mount: nginx layers → container rootfs`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`    exec "/docker-entrypoint.sh nginx -g 'daemon off;'"`)]),l(`
`),s(`span`,{class:`line`},[s(`span`)]),l(`
`),s(`span`,{class:`line`},[s(`span`,null,`Step 4 — Pod1 Running; kubelet posts status; kube-proxy updates iptables/eBPF`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};