import * as views from "./views/views.mjs";
import hashRoute from "../../Modules/hashRoutes.mjs";

/* if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service_worker.mjs')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.log('Service Worker failed', err));
  });
} */

async function checkValidKey(){

    try {
        const stored = localStorage.getItem("validatedUser");
        if(!stored) return false;

        const user = JSON.parse(stored);
        if(!user?.username || !user?.validationKey) return false;

        const response = await fetch("/login/validate",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: user.username,
                validationKey: user.validationKey
            })
        });

        return response.ok;

    } catch (error) {
        console.error(error);
        return false;
    }
}

let cachedAuthState = null;

async function router(){
    
    const hash = window.location.hash || hashRoute.Home;

    //console.log(hash);
    switch(hash){

        case hashRoute.Login:
            views.showUserLogin();
            break;

        case hashRoute.AccountCreation:
            views.showUserCreation();
            break;
        
        case hashRoute.Profile:
            views.showUserInfo();
            break;
        
        case hashRoute.AddMovie:
            views.showAddMovies();
            break;
        
        case hashRoute.MediaList:
            views.showMediaList();
            break;
        
        case hashRoute.UserList:
            views.showUserList();
            break;

        default:
            views.showHomePage();
    }
/* 
    // sjekk login etterpå
    if(cachedAuthState === null){
        cachedAuthState = await checkValidKey();
    }

    if(!cachedAuthState && (hash === "#Movies" || hash === "#Profile")){
        window.location.hash = "#Login";
    } */
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);