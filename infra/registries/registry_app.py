"""registry_app.py — a generic, self-documenting agency registry.

One FastAPI app, configured per agency by REGISTRY_CONFIG (a JSON file). Each
agency runs its own container + its own SQLite store, so the registries are
physically separate sources of truth. FastAPI auto-generates the OpenAPI spec +
Swagger UI (/docs) + ReDoc (/redoc) per registry — this is the "data exchange
without VCs" path: a relying party queries the owning registry's API directly
to confirm a fact, as an alternative to an OID4VP credential presentation.
"""
import os
import json
import sqlite3
from typing import Optional, List

from fastapi import FastAPI, HTTPException, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import HTMLResponse, RedirectResponse
from pydantic import create_model, Field

CFG = json.load(open(os.environ["REGISTRY_CONFIG"]))
DB = os.environ.get("DB_PATH", "/data/registry.db")
ENTITY = CFG["entity"]          # url segment, e.g. "cultivators"
KEY = CFG["key"]                # primary key field, e.g. "nationalId"
FIELDS = CFG["fields"]
ISS = CFG.get("issuance")       # optional VC-issuance projection (see /issuance)
TYPES = {"string": str, "number": float, "integer": int, "boolean": bool}

conn = sqlite3.connect(DB, check_same_thread=False)
conn.execute("CREATE TABLE IF NOT EXISTS records (key TEXT PRIMARY KEY, data TEXT)")
conn.commit()
if conn.execute("SELECT COUNT(*) FROM records").fetchone()[0] == 0:
    for r in CFG.get("seed", []):
        conn.execute("INSERT OR REPLACE INTO records VALUES (?,?)", (str(r[KEY]), json.dumps(r)))
    conn.commit()

# Build the per-agency Pydantic model from the config (drives the OpenAPI schema).
model_fields = {}
for f in FIELDS:
    t = TYPES.get(f.get("type", "string"), str)
    req = f.get("required", False)
    ex = f.get("example")
    model_fields[f["name"]] = (
        t if req else Optional[t],
        Field(... if req else None, description=f.get("description"),
              examples=[ex] if ex is not None else None),
    )
Record = create_model(CFG["model_name"], **model_fields)

app = FastAPI(
    title=CFG["title"],
    version="1.0.0",
    description=CFG["description"],
    contact={"name": CFG.get("authority", ""), "url": CFG.get("home", "")},
    servers=[{"url": CFG["server"]}],
    openapi_tags=[
        {"name": ENTITY, "description": CFG.get("entity_desc", "")},
        {"name": "meta", "description": "Service health and info."},
    ],
)


def all_records():
    return [json.loads(d) for (_k, d) in conn.execute("SELECT key, data FROM records")]


ADMIN_HTML = '''<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Registry</title>
<style>
:root{--ink:#1a1a1a;--mute:#777;--line:#e3e3e3;--bg:#fafafa;--accent:#c0492b}
*{box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;margin:0;color:var(--ink)}
header{padding:1.2rem 1.5rem;border-bottom:1px solid var(--line);background:var(--bg)}
h1{font-size:1.25rem;margin:0 0 .2rem}.sub{color:var(--mute);font-size:.85rem}
.links{margin-top:.6rem;font-size:.8rem}.links a{color:var(--accent);text-decoration:none;margin-right:1.1rem}
main{padding:1.3rem 1.5rem;max-width:1150px}
.note{background:#fff8f0;border:1px solid #f0d9c0;border-radius:8px;padding:.7rem 1rem;font-size:.82rem;color:#8a5a2a;margin-bottom:1rem}
.bar{display:flex;gap:1rem;align-items:center;margin-bottom:1rem;flex-wrap:wrap}
input{padding:.5rem;border:1px solid var(--line);border-radius:6px;font-size:.9rem}
#search{flex:1;min-width:220px}
button{padding:.5rem .9rem;border:0;border-radius:6px;background:var(--accent);color:#fff;cursor:pointer;font-size:.88rem}
button.ghost{background:#ececec;color:#333}
.count{color:var(--mute);font-size:.8rem}
table{width:100%;border-collapse:collapse;font-size:.85rem}
th,td{text-align:left;padding:.5rem .6rem;border-bottom:1px solid var(--line);white-space:nowrap}
th{color:var(--mute);font-weight:600;font-size:.72rem;text-transform:uppercase;letter-spacing:.03em}
td.key{font-family:ui-monospace,monospace;font-weight:600}
tr:hover td{background:var(--bg)}
#addform{display:none;margin:1rem 0;padding:1rem;border:1px solid var(--line);border-radius:8px;background:var(--bg)}
#addform.open{display:block}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:.8rem}
.fld label{display:block;font-size:.7rem;color:var(--mute);margin-bottom:.2rem;text-transform:uppercase}
.fld input{width:100%}.req{color:var(--accent)}.msg{margin-top:.6rem;font-size:.85rem}
</style></head><body>
<header><h1 id="title">Registry</h1><div class="sub" id="authority"></div>
<div class="links"><a href="/docs" target="_blank">API docs (Swagger) &#8599;</a>
<a href="/redoc" target="_blank">ReDoc &#8599;</a>
<a id="isslink" style="display:none" target="_blank"></a>
<a id="homelink" style="display:none" target="_blank">Authority &#8599;</a></div></header>
<main>
<div class="note">Authoritative source of truth &mdash; relying parties query this registry's API directly to verify facts (no verifiable credential required).</div>
<div class="bar"><input id="search" placeholder="Search all fields&hellip;" oninput="render()">
<span class="count" id="count"></span>
<button onclick="document.getElementById('addform').classList.toggle('open')">+ Add record</button></div>
<form id="addform" onsubmit="return add(event)"><div class="grid" id="addgrid"></div>
<div style="margin-top:.8rem"><button type="submit">Save</button>
<button type="button" class="ghost" onclick="document.getElementById('addform').classList.remove('open')">Cancel</button></div>
<div class="msg" id="addmsg"></div></form>
<table><thead id="thead"></thead><tbody id="tbody"></tbody></table></main>
<script>
let META,ROWS=[];
async function boot(){
 META=await (await fetch("/admin/meta")).json();
 document.title=META.title;document.getElementById("title").textContent=META.title;
 document.getElementById("authority").textContent=META.authority||"";
 if(META.issuance){var a=document.getElementById("isslink");a.href="/"+META.entity+"/issuance";a.style.display="";a.textContent="VC-issuance export ("+META.issuance+") \\u2197";}
 if(META.home){var h=document.getElementById("homelink");h.href=META.home;h.style.display="";}
 document.getElementById("thead").innerHTML="<tr>"+META.fields.map(function(f){return "<th>"+f.name+"</th>"}).join("")+"</tr>";
 document.getElementById("addgrid").innerHTML=META.fields.map(function(f){return '<div class="fld"><label>'+f.name+(f.required?' <span class="req">*</span>':"")+'</label><input name="'+f.name+'" '+(f.required?"required":"")+' placeholder="'+(f.example!=null?f.example:"")+'"></div>'}).join("");
 await load();
}
async function load(){ROWS=await (await fetch("/"+META.entity)).json();render();}
function render(){
 var q=document.getElementById("search").value.toLowerCase();
 var rows=ROWS.filter(function(r){return !q||Object.values(r).some(function(v){return String(v).toLowerCase().indexOf(q)>=0})});
 document.getElementById("count").textContent=rows.length+" / "+ROWS.length+" records";
 document.getElementById("tbody").innerHTML=rows.map(function(r){return "<tr>"+META.fields.map(function(f){return "<td"+(f.name===META.key?' class="key"':"")+">"+(r[f.name]!=null?String(r[f.name]):"")+"</td>"}).join("")+"</tr>"}).join("");
}
async function add(e){
 e.preventDefault();var fd=new FormData(e.target),obj={};
 META.fields.forEach(function(f){var v=fd.get(f.name);if(v!=="")obj[f.name]=f.type==="number"?Number(v):f.type==="integer"?parseInt(v,10):f.type==="boolean"?(v==="true"):v;});
 var res=await fetch("/"+META.entity,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(obj)});
 var m=document.getElementById("addmsg");
 if(res.ok){m.textContent="Saved.";m.style.color="green";e.target.reset();await load();setTimeout(function(){document.getElementById("addform").classList.remove("open");m.textContent="";},800);}
 else{var t=await res.text();m.textContent="Error: "+t.slice(0,200);m.style.color="var(--accent)";}
 return false;
}
boot();
</script></body></html>'''


@app.get("/", include_in_schema=False, response_class=HTMLResponse)
def root():
    return ADMIN_HTML


@app.get("/admin/meta", include_in_schema=False)
def admin_meta():
    return {
        "title": CFG["title"],
        "authority": CFG.get("authority", ""),
        "home": CFG.get("home", ""),
        "entity": ENTITY,
        "key": KEY,
        "fields": FIELDS,
        "issuance": (ISS or {}).get("credential"),
    }


@app.get("/health", tags=["meta"], summary="Service health")
def health():
    n = conn.execute("SELECT COUNT(*) FROM records").fetchone()[0]
    return {"status": "ok", "registry": CFG["title"], "records": n}


@app.get(
    "/" + ENTITY,
    response_model=List[Record],
    tags=[ENTITY],
    summary="List / search " + ENTITY,
    description="Returns all records. Optional `q` is a case-insensitive substring "
                "match across every field — use it for lookups and uniqueness checks "
                "(e.g. *is this business name already taken?*).",
)
def list_entity(q: Optional[str] = Query(None, description="substring match across all fields")):
    rows = all_records()
    if q:
        ql = q.lower()
        rows = [r for r in rows if any(ql in str(v).lower() for v in r.values())]
    return rows


if ISS:
    _flt = ISS.get("filter") or {}
    _fltdesc = (", filtered to " + ", ".join(f"{k}={v}" for k, v in _flt.items())) if _flt else ""

    @app.get(
        "/" + ENTITY + "/issuance",
        tags=[ENTITY],
        summary="VC-issuance export — schema-shaped rows for bulk issuance",
        description="The same records reshaped to the **" + ISS["credential"] + "** credential's "
                    "field names" + _fltdesc + ". Point verifiably's bulk **API source** at this URL "
                    "to fan-out one credential per row. In-cluster URL: "
                    "`http://" + CFG.get("svc", "<svc>") + ":8000/" + ENTITY + "/issuance`.",
    )
    def issuance_export():
        rows = [r for r in all_records()
                if all(str(r.get(k, "")).lower() == str(v).lower() for k, v in _flt.items())]
        return [{sf: r.get(rf, "") for sf, rf in ISS["map"].items()} for r in rows]


@app.get(
    "/" + ENTITY + "/{key}",
    response_model=Record,
    tags=[ENTITY],
    summary="Fetch one by " + KEY,
    description="The authoritative lookup. A relying party calls this to verify a "
                "fact straight from the registry of record — **no verifiable "
                "credential required**.",
)
def get_entity(key: str):
    row = conn.execute("SELECT data FROM records WHERE key=?", (key,)).fetchone()
    if not row:
        raise HTTPException(404, KEY + " '" + key + "' not found in the " + CFG["title"])
    return json.loads(row[0])


@app.post(
    "/" + ENTITY,
    response_model=Record,
    status_code=201,
    tags=[ENTITY],
    summary="Register a new record (write to the source of truth)",
)
def create_entity(rec: Record):
    d = jsonable_encoder(rec)
    conn.execute("INSERT OR REPLACE INTO records VALUES (?,?)", (str(d[KEY]), json.dumps(d)))
    conn.commit()
    return d
