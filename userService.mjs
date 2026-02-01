import fs from "node:fs/promises";
import crypto from "node:crypto";

const DB_PATH = "./users.json";

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

import { encryptPassword, decryptPassword } from "./userEncryption.mjs";


export async function checkPassword(username, inputPassword) {
  const users = await readDB();
  const user = users.find(u => u.username === username);
  if (!user) return false;

  return decryptPassword(user.password) === inputPassword;
}

async function writeDB(users) {
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

// Sjekk om brukernavn finnes
export async function userExists(username) {
  const users = await readDB();
  return users.some(u => u.username === username);
}

export async function addUser(username, password, consent) {
  const users = await readDB();

  if (users.some(u => u.username === username)) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: crypto.randomUUID(),
    username,
    password: encryptPassword(password), // kryptert med key fra .env
    consent: { ...consent, timestamp: new Date().toISOString() },
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  await writeDB(users);

  return newUser;
}

// Slett bruker
export async function deleteUser(userId) {
  let users = await readDB();
  users = users.filter(u => u.id !== userId);
  await writeDB(users);
}


