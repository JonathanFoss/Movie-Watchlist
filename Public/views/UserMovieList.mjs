import * as hashURL from "../../Modules/pageController.mjs"
import hashRoute from "../../Modules/hashRoutes.mjs";
import { logincheck } from "../../Modules/logincheck.mjs";

import { getUserMovies } from "../../Modules/getUserList.mjs"

const isUserLoggedin = logincheck();

export async function showUserList() {

    

    if (isUserLoggedin === true) {

        document.body.innerHTML = "";

        const userName = JSON.parse(localStorage.getItem("validatedUser"));

        document.body.innerHTML = `

            <h1> ${userName.username}'s list </h1>
            <button id="back"> Back </button>
        

        
        `;

        document.getElementById("back").addEventListener("click", () => {
            hashURL.back();
        });

        const data = getUserList();


    
    }
    else {
        hashURL.redirect(hashRoute.Home);
    }
    


}

async function getUserList() {

    const userList = await getUserMovies();
    

    console.log(userList);

    userList.forEach(movie => {

        const wrapper = document.createElement("div");
        wrapper.className = "movie-card";
        const formateDate = new Date(movie.dateadded).toLocaleDateString("no-No");

        wrapper.innerHTML = `

            <h3 class="movie-title">${movie.title}</h3>

            <div class="movie-meta">

                <div class="movie-rating">
                    ⭐ ${movie.rating}/5
                </div>

                <div class="movie-status status-${movie.status}">
                    ${movie.status}
                </div>

            </div>

            <div class="movie-date">
                Added: ${formateDate}
            </div>

        `;

        document.body.appendChild(wrapper);

        
    });
    
}

