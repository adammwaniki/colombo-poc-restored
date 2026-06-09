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
from fastapi.responses import RedirectResponse
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


@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse("/docs")


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
