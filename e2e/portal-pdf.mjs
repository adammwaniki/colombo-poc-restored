import puppeteer from "puppeteer";
const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox"]});
const p=await b.newPage(); const wait=ms=>new Promise(r=>setTimeout(r,ms));
p.on("pageerror",e=>console.log("PAGEERROR:",String(e).slice(0,120)));
await p.goto("https://sunbird-rc.in-labs.cdpi.dev/admin/",{waitUntil:"networkidle2",timeout:30000});
await wait(4500);
const r=await p.evaluate(async ()=>{
  const libs={jspdf:typeof window.jspdf, qrcode:typeof window.qrcode};
  const list=await (await fetch("/issuer/list?nationalId=80000006")).json();
  const c=(list.credentials||[])[0]; if(!c) return {libs,err:"no cred"};
  const vc=await fetchVC(c.credentialId);
  const vclen=JSON.stringify(vc).length;
  const png=qrPNG(JSON.stringify(vc));
  const doc=buildPDF(vc,c.type); const uri=doc.output("datauristring");
  return {libs, type:c.type, vcBytes:vclen, qrIsPNG: !!png&&png.startsWith("data:image/png"),
          pdfOk: uri.startsWith("data:application/pdf"), pdfKB: Math.round(uri.length/1024)};
});
console.log(JSON.stringify(r));
await b.close();
