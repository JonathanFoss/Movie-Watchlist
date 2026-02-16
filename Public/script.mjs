// Her legges inn kode

import createUser from "../views/createUser.mjs";
import showMovies from "../views/userMovieList.mjs";
import { showUserInfo } from "../views/editUser.mjs";

const isUserLoggedIn = localStorage.getItem("userToken");

if (!isUserLoggedIn) {
    createUser();
}

if(isUserLoggedIn) {
    showUserInfo()
}

