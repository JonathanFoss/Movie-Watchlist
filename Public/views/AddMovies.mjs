export function showAddMovies(){


    const body = document.body;
    body.innerHTML = "";

    body.innerHTML +=
    `

    <input placeholder="Movie Title"></input>
    <button> Add Movie </button>

    `

}