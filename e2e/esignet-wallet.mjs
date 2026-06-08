// Proof of the corrected path: log into verifiably as the HOLDER via the eSignet
// tile (National ID + PIN), then land in the holder wallet (driven by wallet-api).
// No standalone wallet, no Keycloak brokering — eSignet authenticates the session.
import puppeteer from "puppeteer";
const base="https://vc.in-labs.cdpi.dev", NID="80000006", PIN="100005";
const SHOT="/home/adam/cdpi/workshops/colombo-poc/e2e-shots";
const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox"]});
const p=await b.newPage(); await p.setViewport({width:1280,height:1000});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const shot=async t=>{await p.screenshot({path:`${SHOT}/${t}.png`,fullPage:true});};
async function clickText(sel,txt){for(const e of await p.$$(sel)){const t=(await p.evaluate(n=>n.innerText||n.value||"",e)).trim();if(t&&t.toLowerCase().includes(txt.toLowerCase())){await e.click();return t.slice(0,30);}}return null;}
const reactSet=(s,v)=>p.evaluate((s,v)=>{const inp=document.querySelector(s);if(!inp)return;const set=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;set.call(inp,v);inp.dispatchEvent(new Event("input",{bubbles:true}));inp.dispatchEvent(new Event("change",{bubbles:true}));},s,v);
try{
  await p.goto(base+"/",{waitUntil:"networkidle2",timeout:30000});
  console.log("role:",await clickText("button,a","Holder"));
  await p.waitForNavigation({waitUntil:"networkidle2",timeout:20000}).catch(()=>{});
  console.log("tile:",await clickText("button,a","eSignet"));
  await wait(7000); console.log("URL@esignet:",p.url().split("?")[0]);
  await p.evaluate(()=>document.querySelector("#login_with_pin")?.click()); await wait(4000);
  await reactSet("#Pin_mosip-uin",NID); await reactSet("#Pin_pin",PIN); await wait(1000); await shot("ew-1-pinform");
  console.log("submit:",await clickText("button","Login"));
  await wait(9000); console.log("URL after pin:",p.url().split("?")[0]);
  console.log("allow:",await clickText("button","Allow")||await clickText("button","Proceed")||await clickText("button","Authorize")||await clickText("button","Continue"));
  await wait(8000); console.log("post-login URL:",p.url().split("#")[0].slice(0,120));
  // land in the wallet
  await p.goto(base+"/holder/wallet",{waitUntil:"networkidle2",timeout:25000}).catch(()=>{});
  await wait(4000); await shot("ew-2-wallet");
  console.log("WALLET URL:",p.url().split("#")[0].slice(0,120));
  console.log("WALLET BODY:",(await p.evaluate(()=>document.body.innerText)).replace(/\s+/g," ").slice(0,360));
}catch(e){console.log("ERR:",e.message);}
await b.close();
