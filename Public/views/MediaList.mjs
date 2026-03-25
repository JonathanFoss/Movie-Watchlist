import { getAllMedia, addMediaEntry} from "../../Modules/mediaListUtils.mjs";
import { getUserId } from "../../Middleware/getUserId.mjs";

import * as hashURL from "../../Modules/pageController.mjs"
import hashRoute from "../../Modules/hashRoutes.mjs";

export async function showMediaList() {
    document.body.innerHTML = `

        <h1>List overview</h1>

        <input placeholder="Search"></input>
        <button id="back">Back</button>
    
    `;

    document.getElementById("back").addEventListener("click", () => {
        hashURL.back();
    })

    // Tar for seg å liste ut alle filmer
    const movies = await getAllMedia();

    //console.log(movies);

        movies.forEach(m => {
            const wrapper = document.createElement("div");
            wrapper.id = `movie-${m.movieid}`;
            wrapper.style.backgroundColor = "rgba(63, 63, 63, 1)";

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