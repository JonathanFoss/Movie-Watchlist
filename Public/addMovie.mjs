console.log("Movies are great!");

const myMovies = document.getElementById("myMovieList");

myMovies.addEventListener("click", () => {
    window.location.href = "/My-Movies"
});

//---------------------------------------------------------------------------------

const submitMovie = document.getElementById("submitMovie");
let newMovieEntry = document.getElementById("newMovieEntry");

submitMovie.addEventListener("click", async (e) => {
    e.preventDefault();

    const title = newMovieEntry.value.trim();
    if (!title) return;

    await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    newMovieEntry.value = "";
});
