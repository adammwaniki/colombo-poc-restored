import puppeteer from "puppeteer";
const base="http://localhost:8080";
const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox"]});
const p=await b.newPage();
await p.setViewport({width:1280,height:1000});
const shot=async t=>{await p.screenshot({path:`/work/${t}.png`,fullPage:true});console.log(`[shot ${t}] url=${p.url()}`);};
async function clickText(sel,txt){
  for(const e of await p.$$(sel)){const t=(await p.evaluate(n=>n.innerText||n.value||"",e)).trim();
    if(t.toLowerCase().includes(txt.toLowerCase())){await e.click();return t;}}
  return null;
}
async function dump(tag){
  const els=await p.$$eval("a,button,input,[role=button]",ns=>ns.map(n=>{
    const t=(n.innerText||n.value||n.getAttribute("name")||n.getAttribute("placeholder")||"").trim().slice(0,55);
    return n.tagName+(n.getAttribute("href")?`[${n.getAttribute("href")}]`:"")+(n.type?`(${n.type})`:"")+": "+t;
  }).filter(s=>s.length>5));
  console.log(`== ${tag} url=${p.url()} title=${await p.title()} ==\n`+els.join("\n"));
}
await p.goto(base+"/",{waitUntil:"networkidle2",timeout:30000}); await shot("01-home");
console.log("role:",await clickText("button,a","Issuer"));
await p.waitForNavigation({waitUntil:"networkidle2",timeout:20000}).catch(()=>{});
await shot("02-auth"); await dump("02-auth");
console.log("tile:",await clickText("a,button","eSignet"));
await new Promise(r=>setTimeout(r,4000));
await p.waitForNavigation({waitUntil:"networkidle2",timeout:25000}).catch(()=>{});
await shot("03-esignet"); await dump("03-esignet");
console.log("FINAL URL:",p.url());
await b.close();
