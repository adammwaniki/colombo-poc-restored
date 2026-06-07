import puppeteer from "puppeteer";
const base = "http://localhost:8080";
const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox","--disable-setuid-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 900 });
async function dump(tag){
  await p.screenshot({ path: `/work/${tag}.png`, fullPage: true });
  const els = await p.$$eval("a,button,input,[role=button]", ns => ns.slice(0,60).map(n => {
    const t=(n.innerText||n.value||n.getAttribute("href")||n.getAttribute("name")||"").trim().slice(0,50);
    return n.tagName+(n.getAttribute("href")?`[${n.getAttribute("href")}]`:"")+": "+t;
  }).filter(s=>s.length>6));
  console.log(`== ${tag} url=${p.url()} title=${await p.title()} ==`);
  console.log(els.join("\n"));
}
await p.goto(base+"/", { waitUntil:"networkidle2", timeout:30000 });
await dump("01-home");
await b.close();
