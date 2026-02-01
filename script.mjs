const movieInput = document.getElementById("movieTitle");
const submitMovieEntry = document.getElementById("submitMovie");

function submitMovie(movieTitle) {
    try {
            fetch("/movies", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: `${movieTitle.value}`
                })
        });

    } catch (error) {
        console.log(error);
    }
};

submitMovieEntry.addEventListener("click", () => {
    submitMovie(movieInput);
});