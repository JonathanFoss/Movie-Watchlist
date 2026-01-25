import express from "express";


const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Movie watchlist API running" });
})

// GET all movies
app.get("/movies", (req, res) => {
  res.status(501).json({ message: "GET /movies not implemented yet" });
});

// POST create movie
import checkDuplicateMovie from "./checkDuplicateMovie.mjs";
const movies = [];


app.post("/movies", checkDuplicateMovie(movies), (req, res) => {
  movies.push(req.body);
  res.status(201).json({ message: "Movie added!"});
});

// PATCH update movie
app.patch("/movies/:id", (req, res) => {
  res.status(501).json({ message: "PATCH /movies/:id not implemented yet" });
});

// DELETE movie
app.delete("/movies/:id", (req, res) => {
  res.status(501).json({ message: "DELETE /movies/:id not implemented yet" });
});


app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})