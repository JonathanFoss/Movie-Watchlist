console.log("Here are all your movies!");

const movieListUl = document.getElementById("movieList");


async function fetchMovies() {
    try {
        const res = await fetch("/api/movies");
        const movies = await res.json();

        console.log(movies);

        movieListUl.innerHTML = "";

        movies.forEach(movie => {
            const li = document.createElement("li");

           
            const date = new Date(movie.createdAt);
            const formattedDate = date.toLocaleString("no-NO");

            li.textContent = `${movie.title} – lagt til ${formattedDate}`;
            movieListUl.appendChild(li);
        });
    } catch (err) {
        console.error("Kunne ikke hente filmer:", err);
    }
}


fetchMovies();
