import * as hashURL from "../../Modules/pageController.mjs"


async function createNewUser(username, password, consent){

        try {
            const response = await fetch("/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, consent })
        });

        const data = await response.json();
        if (!response.ok) {
            // Hvis 401 eller annen feilstatus
            alert(data.message);
            return;
        }
        //console.log(data);
        if (response.ok) {
            hashURL.redirect("#Login");
            // REDIRECT TO LOGIN?
        }

      }
      catch (error) {
        console.log(error);
      }

}

export async function showUserCreation() {

    const htmlBody = document.body;
    htmlBody.innerHTML = "";
    

    const div = document.createElement("div");
    div.id = "showUserCreation";
    htmlBody.appendChild(div);
    
        div.innerHTML = `

            <input id="username" placeholder="Username" autocomplete="off"></input>
            <input id="password" placeholder="Password" autocomplete="off" type="password"></input>
            <button id="submitNewUser">Create User</button>
            <button id="cancel">Cancel</button> 
            <br/>
            <input type="checkbox" id="ToS"> Terms of Service</input>
            <input type="checkbox" id="Privacy"> Privacy Settings</input>

            <div id="consent">

                <div id="consentTos">
                <h5>ToS</h5>
                <p>By using this app, the user agrees to the Terms of Service.

                Users own all their personal data. The app only has the right to store and use this data to provide the app experience.

                The app may modify or remove user data if it believes rules are being broken (this is a school project).

                Users must accept the ToS and Privacy Policy to create an account and use the app.

                The app is provided “as is” and may receive updates occasionally.

                Users are responsible for their own actions on the app.

                Users may delete their personal data at any time, which will be fully removed from the app.
                </p>
                </div>
            <br>
                <div id="consentPrivacy">
                <h5> Privacy Settings </h5>
                    <p>
                    This app collects basic information about you:

                    Username

                    Password (encrypted)

                    Acceptance of Terms of Service (ToS) and Privacy Policy

                    These are required so the app can support multiple users and track movies for each user, giving each user a personalized movie list.

                    Passwords are stored encrypted.

                    Your information will not be shared with third parties (note: all files are public because this is a school project).

                    Users can withdraw consent at any time; doing so will prevent access to the app.

                    User data is deleted upon account deletion.

                    Users must accept the ToS and Privacy Policy when creating an account.
                    </p>
                </div>
            </div>

        
        `;

    /* let inputElements = document.querySelector("input");
    inputElements.setAttribute("autocomplete", "off"); */

    const createUser = document.getElementById("submitNewUser");
    createUser.addEventListener("click", () => {
        //console.log(document.querySelector("#username").value, document.querySelector("#password").value);
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        const ToS = document.querySelector("#ToS").checked;
        const Privacy = document.querySelector("#Privacy").checked;

        const consent = {
            "tos" : ToS,
            "privacy" : Privacy
        }

        console.log(username, password, consent);

        // Sender det til appen
        createNewUser(username, password, consent);
    });

    const cancel = document.getElementById("cancel");
    hashURL.attachNavigation(cancel,"#Home");


      
};
