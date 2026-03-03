import * as views from "./views/views.mjs";

const isUserLoggedIn = localStorage.getItem("loggedin");

function router() {
    const hash = window.location.hash || "#Home";

    switch(hash){
        case "#Login":
            views.showUserLogin();
            break;

        case "#AccountCreation":
            views.showUserCreation();
            break;

        case "#movies":
            views.showMovies();
            break;

        default:
            views.showHomePage();
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);