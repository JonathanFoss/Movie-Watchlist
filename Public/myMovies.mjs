console.log("Here are all your movies!");

// Hent elementet vi skal fylle
const movieListUl = document.getElementById("movieList");

// Hent filmene fra backend
async function fetchMovies() {
    try {
        const res = await fetch("/api/movies");
        const movies = await res.json();

        console.log(movies);

        // Tøm listen først
        movieListUl.innerHTML = "";

        // Loop gjennom filmene og lag liste-elementer
        movies.forEach(movie => {
            const li = document.createElement("li");

            // Formater dato
            const date = new Date(movie.createdAt);
            const formattedDate = date.toLocaleString("no-NO");

            li.textContent = `${movie.title} – lagt til ${formattedDate}`;
            movieListUl.appendChild(li);
        });
    } catch (err) {
        console.error("Kunne ikke hente filmer:", err);
    }
}

// Kjør funksjonen når siden lastes
fetchMovies();
