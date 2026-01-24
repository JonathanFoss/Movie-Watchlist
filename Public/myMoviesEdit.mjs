const editBtn = document.getElementById("editMovies");

editBtn.addEventListener("click", () => {

editMovieList()

})

async function editMovieList() {
    try {

            const res = await fetch("/api/moviesEdit");
            const movies = await res.json();

            console.log(movies);

    } catch(error) {
        console.log(error);
    }
}

