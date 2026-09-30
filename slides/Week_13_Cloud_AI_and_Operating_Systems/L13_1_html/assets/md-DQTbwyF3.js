import{E as e,R as t,S as n,X as r,_ as i,_t as a,g as o,ht as s,x as c}from"./modules/shiki-Dm5aQrj-.js";import{nt as l,rt as u}from"./index-DcuQaTED.js";import{t as d}from"./slidev/CodeBlockWrapper-CtigSaG1.js";import{t as f}from"./default-BtuPP38V.js";var p={__name:`L13_1_Cloud_Computing_and_Operating_Systems.md__slidev_13`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=u();return g.setup(),(u,p)=>{let m=d;return t(),i(f,a(e(s(l)(s(b),12))),{default:r(()=>[p[1]||=o(`h1`,null,`Worked Example — Kubernetes Pod Scheduling`,-1),p[2]||=o(`p`,null,[o(`strong`,null,`Scenario:`),c(` deploy a web service with 3 replicas; cluster has 3 nodes.`)],-1),n(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[o(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[o(`code`,{class:`language-text`},[o(`span`,{class:`line`},[o(`span`,null,`Step 1 — User submits Deployment`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  kubectl apply -f web-deploy.yaml`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  → API server writes to etcd: "3 pods wanted, image=nginx:1.25, cpu=100m, mem=128Mi"`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 2 — kube-scheduler detects 3 unscheduled pods`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  Filter phase:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Node1: 4 vCPU, 8 GB free → fits  ✓`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Node2: 0.5 vCPU free   → too small ✗`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Node3: 4 vCPU, 8 GB free → fits  ✓`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  Score phase:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Node1 score: 70 (low existing load)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Node3 score: 85 (better anti-affinity score — no other nginx pods)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  Bind: Pod1→Node1, Pod2→Node3, Pod3→Node1`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 3 — kubelet on Node1 creates Pod1:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`  containerd calls runc:`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    clone(CLONE_NEWPID|CLONE_NEWNET|CLONE_NEWNS, ...)`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    cgroup write: cpu.max="100000 1000000", memory.max="134217728"`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    overlayfs mount: nginx layers → container rootfs`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`    exec "/docker-entrypoint.sh nginx -g 'daemon off;'"`)]),c(`
`),o(`span`,{class:`line`},[o(`span`)]),c(`
`),o(`span`,{class:`line`},[o(`span`,null,`Step 4 — Pod1 Running; kubelet posts status; kube-proxy updates iptables/eBPF`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};