import express from "express";


import movieRouter from "./routes/movieRoute.mjs";
import userRouter from "./routes/userRoute.mjs";
import loginRouter from "./routes/loginRoute.mjs"

const app = express();
const PORT = 3000;

// REMOVE AFTER
import pool from "./db/db.mjs";

async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      consent BOOLEAN NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// REMOVE UP FROM HERE

createTable();

app.use(express.json());

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("Public"));
app.use(express.static(__dirname));

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/movies", movieRouter);



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})