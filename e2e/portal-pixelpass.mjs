import puppeteer from "puppeteer";
const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox"]});
const p=await b.newPage(); const wait=ms=>new Promise(r=>setTimeout(r,ms));
await p.goto("https://sunbird-rc.in-labs.cdpi.dev/admin/",{waitUntil:"networkidle2",timeout:30000});
await wait(4000);
const r=await p.evaluate(async ()=>{
  const has=typeof window.PixelPass;
  const list=await (await fetch("/issuer/list?nationalId=80000006")).json();
  const c=(list.credentials||[])[0]; const vc=await fetchVC(c.credentialId); const js=JSON.stringify(vc);
  const qrdata=window.PixelPass.generateQRData(js);
  const back=window.PixelPass.decode(qrdata);
  return {pixelpass:has, firstChar:qrdata[0], qrLen:qrdata.length, rawLen:js.length,
          roundTripsParsed: JSON.stringify(JSON.parse(back))===JSON.stringify(JSON.parse(js)),
          issuer: vc.issuer};
});
console.log(JSON.stringify(r,null,0));
await b.close();
