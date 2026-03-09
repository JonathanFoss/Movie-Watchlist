import * as hashURL from "../../Modules/pageController.mjs"
import hashRoute from "../../Modules/hashRoutes.mjs";

let isUserLoggedin = localStorage.getItem("validatedUser");

export function showHomePage() {

    const htmlBody = document.body;
    htmlBody.innerHTML = "";

    if (!isUserLoggedin) {
            htmlBody.innerHTML = 
        `
        <h1>CinaLib</h1>
        <h5>
        Welcome to my university project, in this app you can track what you have watched, planned to watch or even those you have dropped!
        <br/>
        This app is built using the community, so if what you have watched isnt in here, you can be the first to add it to the app!
        </h5>


            <p>New here? Create an account to keep track over your favorit movies!</p>
            <button id="showAccountCreation">Create Account</button>

            <div class="loggedIn">
                <p>Already have an account?</p>
                <button id="showLogin">Login</button>
            </div>

        <h3> Logged in? Refresh the page!</h3>
        <button id="refresh"> Refresh </button>
        
        `

        const login = document.getElementById("showLogin");
        hashURL.attachNavigation(login,"#Login");

        const createAccount = document.getElementById("showAccountCreation");
        hashURL.attachNavigation(createAccount,"#AccountCreation")

        const refresh = document.getElementById("refresh")
        refresh.addEventListener("click", () => {
            hashURL.refresh();
        })

    }
    
    else {

        htmlBody.innerHTML =
        `
        
            <button id="showProfile"> Profile </button>
            <button> My movie list </button>
            <button id="addMovie"> Add Movie </button>

            <br/>
            
            <button> Log Out </button>


        `;

        const profile = document.getElementById("showProfile");
        hashURL.attachNavigation(profile, hashRoute.Profile);

        const addMovie = document.getElementById("addMovie");
        hashURL.attachNavigation(addMovie, hashRoute.AddMovie);

    }
};


