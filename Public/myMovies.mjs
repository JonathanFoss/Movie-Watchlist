console.log("Here are all your movies!");

const movieListUl = document.getElementById("movieList");



async function fetchMovies() {
 
        try {

            const res = await fetch("/api/movies");
            const movies = await res.json();

            console.log(movies);

                if (movies.length === 0) { 
                const errmsg = document.createElement("h1");
                errmsg.textContent = "No movies found?!";

                document.body.append(errmsg);
                console.log(errmsg)
            } else {

            let i = 0;
            movies.forEach(movie => {
                const movieContainer = document.createElement("div");
                
                movieContainer.classList = "movieContainer";
                movieContainer.id = `entry_${i}`;
                i++;

                // LAGER DIV SOM VISER FARGEN OM NOE ER SETT, DROPPET ELLER SKAL SES
                const colorStatus = document.createElement("div");
                colorStatus.classList = `status ${movie.status}`;
               
                movieContainer.appendChild(colorStatus);

                // DROPDOWN FOR Å VELGE STATUS
                const dropDownStatus = document.createElement("select");
                movieContainer.appendChild(dropDownStatus);

                dropDownStatus.innerHTML = `

                    <option>Watched</option>
                    <option>Plan to Watch</option>
                    <option>Dropped</option>

                
                `;

                // LEGGER TIL TITTEL AV FILMEN
                const movieTitle = document.createElement("h3");

                movieTitle.textContent = movie.title;
                movieContainer.appendChild(movieTitle);

                // LEGGER TIL TIDEN FILMEN BLE LAGT TIL
                const movieTimeAdded = document.createElement("h5");
                const date = new Date(movie.createdAt);
                const formattedDate = date.toLocaleString("no-NO");

                movieTimeAdded.textContent = `Date added: ${formattedDate}`;
                movieContainer.appendChild(movieTimeAdded);

                // SAMLER ALT I EN LISTE
                movieListUl.appendChild(movieContainer);
                
            });}

        } catch(error) {
            console.log(error);
        }
}


fetchMovies();
