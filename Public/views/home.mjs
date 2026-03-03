import * as hashURL from "../../Node Controllers/pageController.mjs"

export function showHomePage() {

    const htmlBody = document.body;
    htmlBody.innerHTML = "";

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

       
    `

    const login = document.getElementById("showLogin");
    hashURL.attachNavigation(login,"#Login");

    const createAccount = document.getElementById("showAccountCreation");
    hashURL.attachNavigation(createAccount,"#AccountCreation")

};


