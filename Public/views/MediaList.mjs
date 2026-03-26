import { getAllMedia, addMediaEntry} from "../../Modules/mediaListUtils.mjs";
import { getUserId } from "../../Middleware/getUserId.mjs";

import * as hashURL from "../../Modules/pageController.mjs"
import hashRoute from "../../Modules/hashRoutes.mjs";

export async function showMediaList() {
    document.body.innerHTML = `

        <h1>List overview</h1>
        <h4>Not seeing the movie you want? Click "Add Movie" to add it to our database!</h4>
        <button id="addMovie"> Add Movie </button>
        
        <button id="back">Back</button>

        <div class="movie-list"></div>
    
    `;

    const addMovie = document.getElementById("addMovie");
    hashURL.attachNavigation(addMovie, hashRoute.AddMovie);

    document.getElementById("back").addEventListener("click", () => {
        hashURL.back();
    })

    const movies = await getAllMedia();

        movies.forEach(m => {
            const wrapper = document.createElement("div");
            wrapper.className = "movie-card";
            wrapper.id = `movie-${m.movieid}`;

            const ratingId = `rating-${m.movieid}`;
            const statusId = `status-${m.movieid}`;
            const buttonId = `add-${m.movieid}`;

            wrapper.innerHTML = `
                <h3>${m.title}</h3>
                <select id="${ratingId}">
                    <option value="1">1 Terrible</option>
                    <option value="2">2 Below Average</option>
                    <option value="3">3 Average</option>
                    <option value="4">4 Good</option>
                    <option value="5">5 Excellent</option>
                </select>
                <select id="${statusId}">
                    <option value="watched">Watched</option>
                    <option value="plan">Plan to watch</option>
                    <option value="dropped">Dropped</option>
                </select>
                <button id="${buttonId}">Add to list</button>
            `;

            document.body.appendChild(wrapper);

            document.getElementById(buttonId).addEventListener("click", async () => {

                const rating = document.getElementById(ratingId).value;
                const status = document.getElementById(statusId).value;

                const userid = await getUserId();

                addMediaEntry(userid, m.movieid, rating, status);
                
            });
        });
    
    
}