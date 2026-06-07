import puppeteer from "puppeteer";
const base="http://localhost:8080";
const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox"]});
const p=await b.newPage(); await p.setViewport({width:1280,height:1000});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function clickExact(txt){return await p.evaluate(t=>{const els=[...document.querySelectorAll("button,a,div,li,span,[role=button]")];const el=els.find(e=>e.textContent.trim()===t || (e.getAttribute("id")||"").toLowerCase().includes("pin"));if(el){el.click();return el.tagName+"#"+(el.id||"")} return null;},txt);}
await p.goto(base+"/",{waitUntil:"networkidle2",timeout:30000});
await p.evaluate(()=>{[...document.querySelectorAll("button,a")].find(e=>/issuer/i.test(e.textContent))?.click()});
await p.waitForNavigation({waitUntil:"networkidle2",timeout:20000}).catch(()=>{});
await p.evaluate(()=>{[...document.querySelectorAll("button,a")].find(e=>/esignet/i.test(e.textContent))?.click()});
await wait(6000);
console.log("clicked PIN:",await clickExact("Login with PIN"));
await wait(4000);
const html=await p.evaluate(()=>{const f=document.querySelector("form")||document.body;return [...f.querySelectorAll("input,button")].map(n=>n.outerHTML.slice(0,160)).join("\n");});
console.log("=== PIN FORM ELEMENTS ===\n"+html);
await p.screenshot({path:"/work/04-pinform.png",fullPage:true});
await b.close();
