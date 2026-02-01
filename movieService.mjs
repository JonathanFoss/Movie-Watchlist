import fs from "node:fs/promises";
import crypto from "node:crypto";

const DB_PATH = "./movieDB.json";

// Hjelpefunksjoner
async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // Hvis filen ikke finnes, returner tom array
    return [];
  }
}

async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// Normaliser tittel for duplikatsjekk
function normalizeTitle(title) {
  return String(title)
    .toLowerCase()
    .trim()
    .replace(" ", ""); // erstatter alle mellomrom
}

// Hent alle filmer
export async function getAllMovies() {
  return await readDB();
}

// Sjekk om en film finnes (basert på normalisert tittel)
export async function movieExists(title) {
  const movies = await readDB();
  const normalized = normalizeTitle(title);
  return movies.some(m => m.normalizedTitle === normalized);
}

// Legg til film hvis den ikke finnes
export async function addMovie(title) {
  const movies = await readDB();
  const normalized = normalizeTitle(title);

  // Sjekk om filmen allerede finnes
  let movie = movies.find(m => m.normalizedTitle === normalized);

  if (!movie) {
    movie = {
      id: crypto.randomUUID(),   // unik ID
      title: title,              // original tittel
      normalizedTitle: normalized // for duplikatsjekk
    };
    movies.push(movie);
    await writeDB(movies);
  }

  return movie; // returner hele objektet
}
