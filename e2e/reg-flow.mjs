import puppeteer from "puppeteer";
import {readFileSync} from "fs";
const base="http://156.67.105.185:8090", PHONE="+254726531766", NID="44556677", PIN="778899";
const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox"]});
const p=await b.newPage(); await p.setViewport({width:1100,height:1150});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const shot=t=>p.screenshot({path:`/work/${t}.png`,fullPage:true});
async function clickText(t){for(const e of await p.$$("button")){const x=(await p.evaluate(n=>n.innerText,e)).trim();if(x.toLowerCase().includes(t.toLowerCase())){await e.click();return x}}return null}
await p.goto(base,{waitUntil:"networkidle2",timeout:30000}); await shot("reg-1-form");
await p.type("#phone",PHONE,{delay:20});
console.log("send:",await clickText("Send")); await wait(7000); await shot("reg-2-otpsent");
const otp=readFileSync("/work/reg.log","utf8").split("\n").filter(l=>l.includes("OTP for "+PHONE)).pop().split("= ")[1].trim();
console.log("OTP from log:",otp);
for(const [id,v] of [["#otp",otp],["#nationalId",NID],["#givenName","Kofi"],["#familyName","Otieno"],["#email","kofi@example.com"],["#gender","Male"],["#dateOfBirth","1988/02/02"],["#farmId","KE-FARM-44556"],["#pin",PIN]]) await p.type(id,v,{delay:15});
await shot("reg-3-filled");
console.log("register:",await clickText("Register")); await wait(6000); await shot("reg-4-success");
console.log("RESULT:",(await p.evaluate(()=>document.getElementById("out").innerText)).slice(0,200));
await b.close();
