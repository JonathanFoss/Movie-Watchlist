import * as hashURL from "../../Modules/pageController.mjs";
import hashRoute from "../../Modules/hashRoutes.mjs";
import { logincheck } from "../../Modules/logincheck.mjs";
import addMovie from "../../Modules/addMovie.mjs";

const userLoggedin = logincheck();

export function showAddMovies(){

    
    const body = document.body;

    body.innerHTML = "";

    if (userLoggedin === true) {
        
            body.innerHTML = "";

            body.innerHTML +=
            `

            <input placeholder="Movie Title" id="movieTitle"></input>
            <button id="submitMovieEntry"> Add Movie </button>

            <button id="back"> Back </button>
  
            <h3 id="respone"></h3>

            `

            const back = document.getElementById("back");
            back.addEventListener("click", hashURL.back);

            document.getElementById("submitMovieEntry").addEventListener("click", () => {
                const movieTitle = document.getElementById("movieTitle").value;
                addMovie(movieTitle);
            });

            const showMediaList = document.getElementById("movielist");
            hashURL.attachNavigation(showMediaList, hashRoute.MediaList);

    }

    else {
         body.innerHTML = "";

            body.innerHTML =
            `

            <h2> You're currently not logged in! </h2>
            <h3> Log in to add movies! </h3>

            <button id="login"> Log in </button>

            `

            const loginbutton = document.getElementById("login");
            hashURL.attachNavigation(loginbutton, hashRoute.Login);
            
    }
    

}

