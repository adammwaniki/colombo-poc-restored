import json, subprocess
SUNBIRD_NET="sunbird-rc_default"; SUNBIRD_URL="http://sunbird-rc-registry-1:8081"; img="mock-identity-sunbird:v010"
d=json.loads(subprocess.check_output(["docker","inspect","injiweb-mock-identity"]))[0]
env=[e for e in d["Config"]["Env"] if not e.startswith("SUNBIRD_")]
ep=d["Config"]["Entrypoint"] or []; cmd=d["Config"]["Cmd"] or []
workdir=d["Config"]["WorkingDir"]; nets=list(d["NetworkSettings"]["Networks"].keys())
mounts=[(m["Type"],m.get("Source") or m.get("Name"),m["Destination"]) for m in d.get("Mounts",[])]
subprocess.run(["docker","rm","-f","injiweb-mock-identity"],check=True)
args=["docker","run","-d","--name","injiweb-mock-identity","--restart","unless-stopped","-p","8083:8082"]
if workdir: args+=["-w",workdir]
if nets: args+=["--network",nets[0]]
for e in env: args+=["-e",e]
args+=["-e","SUNBIRD_REGISTRY_URL="+SUNBIRD_URL,"-e","SUNBIRD_ENTITY=Person"]
for t,s,dst in mounts:
    if s and t in("volume","bind"): args+=["-v","%s:%s"%(s,dst)]
if ep: args+=["--entrypoint",ep[0]]
args+=[img]+ep[1:]+cmd
cid=subprocess.check_output(args).decode().strip()[:12]
print("recreated injiweb-mock-identity",cid,"workdir",workdir)
for n in nets[1:]: subprocess.run(["docker","network","connect",n,"injiweb-mock-identity"])
subprocess.run(["docker","network","connect",SUNBIRD_NET,"injiweb-mock-identity"]); print("connected to",SUNBIRD_NET)
