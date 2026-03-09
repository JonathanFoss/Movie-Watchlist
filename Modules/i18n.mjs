// BACKEND MESSAGES

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getLang(req) {
  return req.headers['accept-language']?.startsWith('no') ? 'no' : 'en';
}

export async function getMessages(lang) {
  const filePath = path.join(__dirname, "../locales", `${lang}.json`);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data); // parse JSON til JS-objekt
}