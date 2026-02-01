import dotenv from "dotenv";

dotenv.config();

const key = parseInt(process.env.PASSWORD_KEY || "5"); // fallback til 5

export function encryptPassword(password) {
  let encrypted = "";
  for (let i = 0; i < password.length; i++) {
    encrypted += String.fromCharCode(password.charCodeAt(i) + key);
  }
  return encrypted;
}

export function decryptPassword(encrypted) {
  let decrypted = "";
  for (let i = 0; i < encrypted.length; i++) {
    decrypted += String.fromCharCode(encrypted.charCodeAt(i) - key);
  }
  return decrypted;
}
