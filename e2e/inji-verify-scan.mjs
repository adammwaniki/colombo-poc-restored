// End-to-end proof of the citizen flow the user reported failing:
//   download/scan the QR  ->  Inji Verify decodes it  ->  verifies the VC.
// Reproduced headlessly against OUR Inji Verify (inji-verify.in-labs.cdpi.dev).
//
// Step 1: on the admin portal (has window.PixelPass + qrPNG), mint the EXACT QR
//         PNG the PDF embeds for a real credential.
// Step 2: upload that PNG into the Inji Verify UI and capture the
//         /v1/verify/vc-verification response the browser receives.
import puppeteer from "puppeteer";
import { writeFileSync } from "node:fs";

const NID = process.argv[2] || "80000006";
const PORTAL = "https://sunbird-rc.in-labs.cdpi.dev/admin/";
const INJI = "https://inji-verify.in-labs.cdpi.dev/";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
try {
  // --- Step 1: generate the QR PNG exactly as the portal does ---
  const p1 = await b.newPage();
  await p1.goto(PORTAL, { waitUntil: "networkidle2", timeout: 45000 });
  await wait(4000);
  const gen = await p1.evaluate(async (nid) => {
    const list = await (await fetch("/issuer/list?nationalId=" + nid)).json();
    const c = (list.credentials || []).find((x) => x.status === "ISSUED") || (list.credentials || [])[0];
    if (!c) return { error: "no credentials for " + nid };
    const vc = await fetchVC(c.credentialId);
    const payload = window.PixelPass.generateQRData(JSON.stringify(vc));
    return { png: qrPNG(payload), id: c.credentialId, issuer: vc.issuer, type: c.type, holder: (vc.credentialSubject || {}).holder };
  }, NID);
  if (gen.error) throw new Error(gen.error);
  console.log("QR minted for:", gen.id, "| issuer:", gen.issuer, "| holder:", gen.holder);
  const png = Buffer.from(gen.png.split(",")[1], "base64");
  writeFileSync("/tmp/inji-qr.png", png);

  // --- Step 2: upload into Inji Verify, capture the verify response ---
  const p2 = await b.newPage();
  let verifyBody = null;
  p2.on("response", async (res) => {
    if (res.url().includes("/v1/verify/vc-verification")) {
      try { verifyBody = { status: res.status(), body: await res.text() }; } catch {}
    }
  });
  await p2.goto(INJI, { waitUntil: "networkidle2", timeout: 45000 });
  await wait(2000);
  // react-dropzone renders a hidden <input type=file>; uploading triggers the decode+verify
  await p2.waitForSelector('input[type=file]', { timeout: 15000 });
  const input = await p2.$('input[type=file]');
  await input.uploadFile("/tmp/inji-qr.png");

  // wait until the verify call comes back (or time out)
  for (let i = 0; i < 30 && !verifyBody; i++) await wait(1000);
  await wait(1500);
  await p2.screenshot({ path: "/home/adam/cdpi/workshops/colombo-poc/e2e-shots/inji-verify-result.png", fullPage: true });

  const bodyText = await p2.evaluate(() => document.body.innerText.replace(/\s+/g, " ").slice(0, 400));
  console.log("verify response:", JSON.stringify(verifyBody));
  console.log("page text:", bodyText);
} finally {
  await b.close();
}
