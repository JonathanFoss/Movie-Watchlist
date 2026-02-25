import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "../Data/users.json");

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

// Oppdater brukernavn
export async function updateUsername(userId, newUsername) {
  const users = await readDB();

  // Finn brukeren
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return null;

  // Sjekk om det nye brukernavnet allerede finnes
  if (users.some(u => u.username === newUsername)) {
    throw new Error("Username already taken");
  }

  users[userIndex].username = newUsername;
  await writeDB(users);

  return users[userIndex];
}


// Slett bruker
export async function deleteUser(userId) {
  let users = await readDB();
  users = users.filter(u => u.id !== userId);
  await writeDB(users);
}


