import express from "express";
import { createMovie } from "../Node Controllers/movieService.mjs";

const movieRouter = express.Router();

movieRouter.post("/", async (req, res) => {

    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                error: "Title is required!"
            });
        }
        const movie = await createMovie(title);
        res.status(201).json(movie);

    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                error: "Movie already exists!"
            });
        }
        console.error(error);
        res.status(500).json({
            error: "Server error!"
        });

    }

});

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

movieRouter.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM movies ORDER BY movieID ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch movies" });
    }
});

movieRouter.post("/addMovie", async (req, res) => {
    const { userID, movieID, rating, status } = req.body;

    try {
        await pool.query(
            `INSERT INTO user_movies (userID, movieID, rating, status)
             VALUES ($1,$2,$3,$4)
             ON CONFLICT (userID, movieID)
             DO UPDATE SET rating = EXCLUDED.rating, status = EXCLUDED.status`,
            [userID, movieID, rating, status]
        );

        res.json({ message: "Movie added/updated in your list" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

movieRouter.get("/userlist", async (req, res) => {
    const userID = req.query.userID;

    if (!userID) return res.status(400).json({ error: "Missing userID" });

    try {
        const result = await pool.query(
            `
            SELECT 
                um.movieID,
                m.title,
                um.status,
                um.rating,
                um.dateadded
            FROM user_movies um
            JOIN movies m ON um.movieID = m.movieID
            WHERE um.userID = $1
            ORDER BY um.dateadded DESC
            `,
            [userID]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

export default movieRouter;