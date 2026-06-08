import puppeteer from "puppeteer";
const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox"]});
const p=await b.newPage(); const wait=ms=>new Promise(r=>setTimeout(r,ms));
await p.goto("https://sunbird-rc.in-labs.cdpi.dev/admin/",{waitUntil:"networkidle2",timeout:30000});
await wait(3500);
console.log("rows loaded:", await p.evaluate(()=>document.querySelectorAll("#rows tr").length));
// live search: type a district
await p.type("#q","Kandy");
await wait(600);
console.log("after typing Kandy -> visible rows:", await p.evaluate(()=>[...document.querySelectorAll("#rows tr")].map(r=>r.children[1]?.textContent).filter(Boolean)));
console.log("count label:", await p.evaluate(()=>document.getElementById("count").textContent));
// clear, search by national id fragment
await p.click("#q",{clickCount:3}); await p.type("#q","800000 1".replace(" ","")); await wait(500);
console.log("after typing 8000001 -> rows:", await p.evaluate(()=>document.querySelectorAll("#rows tr").length));
// open a cert dialog (clear filter first)
await p.click("#q",{clickCount:3}); await p.keyboard.press("Backspace"); await wait(400);
await p.evaluate(()=>[...document.querySelectorAll("button")].find(b=>b.textContent.trim()=="GN cert")?.click());
await wait(3000);
const dlg=await p.evaluate(()=>document.getElementById("certList")?.innerText||"");
console.log("dialog shows address/division:", /GN Division|Sri Lanka/.test(dlg));
console.log("download button present:", await p.evaluate(()=>[...document.querySelectorAll("#certList button")].some(b=>/Download/.test(b.textContent))));
await b.close();
