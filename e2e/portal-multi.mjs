import puppeteer from "puppeteer";
const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox"]});
const p=await b.newPage(); const wait=ms=>new Promise(r=>setTimeout(r,ms));
await p.goto("https://sunbird-rc.in-labs.cdpi.dev/admin/",{waitUntil:"networkidle2",timeout:30000});
await wait(3500);
// cultivator (80000006) -> should offer all 4 types
await p.evaluate(()=>openCerts("80000006","Fathima Marikar",true)); await wait(5000);
console.log("CULTIVATOR issue buttons:", await p.evaluate(()=>[...document.querySelectorAll("#issueBtns button")].map(b=>b.textContent.replace("+ ",""))));
console.log("  held creds types:", await p.evaluate(()=>[...document.querySelectorAll("#certList .ch b")].map(b=>b.textContent)));
await p.evaluate(()=>certDlg.close()); await wait(300);
// non-cultivator (80000001) -> only GN + business permit
await p.evaluate(()=>openCerts("80000001","Nuwan Bandara",false)); await wait(4000);
console.log("NON-CULTIVATOR issue buttons:", await p.evaluate(()=>[...document.querySelectorAll("#issueBtns button")].map(b=>b.textContent.replace("+ ",""))));
await b.close();
