import json, subprocess, sys
img=sys.argv[1]; add_sunbird=(len(sys.argv)>2 and sys.argv[2]=="sunbird")
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
if add_sunbird: args+=["-e","SUNBIRD_REGISTRY_URL=http://156.67.105.185:18091","-e","SUNBIRD_ENTITY=Person"]
for t,s,dst in mounts:
    if s and t in("volume","bind"): args+=["-v",f"{s}:{dst}"]
if ep: args+=["--entrypoint",ep[0]]
args+=[img]; args+=ep[1:]+cmd
print("img:",img,"sunbird:",add_sunbird,"port 8083:8082 -> started",subprocess.check_output(args).decode().strip()[:12])
for n in nets[1:]: subprocess.run(["docker","network","connect",n,"injiweb-mock-identity"])
