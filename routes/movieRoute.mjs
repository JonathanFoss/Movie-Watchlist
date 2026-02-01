import express from "express";
import checkDuplicateMovie from "../middleware/checkDuplicateMovie.mjs";
import { getAllMovies, addMovie } from "../movieService.mjs";

const movieRouter = express.Router();

// GET all movies
movieRouter.get("/", async (req, res) => {
  const movies = await getAllMovies();
  res.json(movies);
});

// POST create movie
movieRouter.post("/", checkDuplicateMovie, async (req, res) => {
  const { title } = req.body;

  await addMovie(title);

  res.status(201).json({ message: "Movie added!" });
});

// PATCH update movie
movieRouter.patch("/movies/:id", (req, res) => {
  res.status(501).json({ message: "PATCH /movies/:id not implemented yet" });
});

// DELETE movie
movieRouter.delete("/movies/:id", (req, res) => {
  res.status(501).json({ message: "DELETE /movies/:id not implemented yet" });
});

export default movieRouter;