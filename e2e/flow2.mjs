import puppeteer from "puppeteer";
const base="http://localhost:8080", NID="KE-PID-96977837", PIN="111111";
const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox"]});
const p=await b.newPage(); await p.setViewport({width:1280,height:1000});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const shot=async t=>{await p.screenshot({path:`/work/${t}.png`,fullPage:true});console.log(`[shot ${t}] ${p.url().slice(0,90)}`);};
async function clickText(sel,txt){for(const e of await p.$$(sel)){const t=(await p.evaluate(n=>n.innerText||n.value||"",e)).trim();if(t&&t.toLowerCase().includes(txt.toLowerCase())){await e.click();return t;}}return null;}
async function dumpInputs(tag){const ins=await p.$$eval("input,button,select",ns=>ns.map(n=>n.tagName+":"+(n.type||"")+":"+(n.id||n.name||"")+":"+((n.placeholder||n.innerText||n.value||"")+"").trim().slice(0,40)).filter(s=>s.length>7));console.log(`== ${tag} ${p.url().slice(0,70)} ==\n`+ins.join("\n"));}
await p.goto(base+"/",{waitUntil:"networkidle2",timeout:30000});
await clickText("button,a","Issuer"); await p.waitForNavigation({waitUntil:"networkidle2",timeout:20000}).catch(()=>{});
await clickText("a,button","eSignet"); await wait(5000); await shot("03-esignet");
console.log("PIN factor:",await clickText("button,div,a,li","Login with PIN")); await wait(3500); await shot("04-pinform"); await dumpInputs("04-pinform");
for(const inp of await p.$$("input")){const ty=await p.evaluate(n=>n.type,inp); if(["text","tel","number"].includes(ty)){await inp.click({clickCount:3}); await inp.type(NID,{delay:30}); console.log("filled NID into",ty); break;}}
await wait(800);
let pinFilled=false;
for(const inp of await p.$$("input")){const ty=await p.evaluate(n=>n.type,inp); if(ty==="password"){await inp.click(); await inp.type(PIN,{delay:60}); pinFilled=true;}}
if(!pinFilled){await p.keyboard.type(PIN,{delay:80}); console.log("typed PIN via keyboard");}
await wait(800); await shot("05-filled");
const sub=await clickText("button","Login")||await clickText("button","Verify")||await clickText("button","Continue")||await clickText("button","Submit")||await clickText("button","Sign");
console.log("submit:",sub); await wait(7000); await shot("06-aftersubmit"); await dumpInputs("06-aftersubmit");
const consent=await clickText("button","Allow")||await clickText("button","Consent")||await clickText("button","Continue")||await clickText("button","Proceed")||await clickText("button","Authorize");
console.log("consent:",consent); await wait(7000); await shot("07-final"); await dumpInputs("07-final");
console.log("FINAL URL:",p.url());
await b.close();
