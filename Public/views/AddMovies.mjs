import * as hashURL from "../../Modules/pageController.mjs"
import hashRoute from "../../Modules/hashRoutes.mjs";

export function showAddMovies(){


    const body = document.body;
    body.innerHTML = "";

    body.innerHTML +=
    `

    <input placeholder="Movie Title"></input>
    <button> Add Movie </button>

    <button id="back"> Back </button>

    `

    const back = document.getElementById("back");
    back.addEventListener("click", hashURL.back);

}

