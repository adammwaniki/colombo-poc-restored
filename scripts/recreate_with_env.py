import json, subprocess, sys
name=sys.argv[1]; kv=dict(a.split("=",1) for a in sys.argv[2:])
d=json.loads(subprocess.check_output(["docker","inspect",name]))[0]
env=[e for e in d["Config"]["Env"] if e.split("=",1)[0] not in kv]
for k,v in kv.items(): env.append(k+"="+v)
ep=d["Config"]["Entrypoint"] or []; cmd=d["Config"]["Cmd"] or []
workdir=d["Config"]["WorkingDir"]; nets=list(d["NetworkSettings"]["Networks"].keys())
ports=[]
for cp,binds in (d["HostConfig"].get("PortBindings") or {}).items():
    for b in (binds or []):
        hip=b.get("HostIp") or ""; ports+=["-p",(hip+":" if hip else "")+b["HostPort"]+":"+cp.split("/")[0]]
mounts=[(m["Type"],m.get("Source") or m.get("Name"),m["Destination"]) for m in d.get("Mounts",[])]
subprocess.run(["docker","rm","-f",name],check=True)
args=["docker","run","-d","--name",name,"--restart","unless-stopped"]+ports
if workdir: args+=["-w",workdir]
if nets: args+=["--network",nets[0]]
for e in env: args+=["-e",e]
for t,s,dst in mounts:
    if s and t in ("volume","bind"): args+=["-v","%s:%s"%(s,dst)]
if ep: args+=["--entrypoint",ep[0]]
args+=[d["Config"]["Image"]]+ep[1:]+cmd
print("recreating",name,"->",subprocess.check_output(args).decode().strip()[:12])
for n in nets[1:]: subprocess.run(["docker","network","connect",n,name])
