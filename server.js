const express = require('express');
const fs = require("fs");
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const moviesPath = path.join(__dirname, "movies.json");

app.post("/api/movies", (req, res) => {
    const { title, status } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Missing title" });
    }

        const movies = JSON.parse(fs.readFileSync(moviesPath, "utf-8"));

        movies.push({
            title,
            createdAt: new Date().toISOString(),
            status
        });

        fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));

        res.json({ success: true });
});


app.get("/api/movies", (req, res) => {
    const moviesPath = path.join(__dirname, "movies.json");

    let movies = [];
    try {
        const data = fs.readFileSync(moviesPath, "utf-8");
        movies = data ? JSON.parse(data) : [];
    } catch (err) {
        movies = [];
    }

    res.json(movies);
});


app.get("/My-Movies", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "myMovies.html"));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
