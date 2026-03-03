import * as hashURL from "../../Node Controllers/pageController.mjs"

async function userLogin(inputUsername, inputPassword) {
    
    // !!!!!!!!!!!!!
    // FIKS DET HER!
    const postData = {
        username: inputUsername,
        password: inputPassword
    };
    // !!!!!!!!!!!!!

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        const data = await response.json();

        if (!response.ok) {
            // Hvis 401 eller annen feilstatus
            alert(data.message);
            return;
        }

        console.log("Login success:", data);

    } catch (error) {
        console.error("Network error:", error);
    }
};

export function showUserLogin() {
    const htmlBody = document.body;

    const div = document.createElement("div");
    div.id = "showUserCreation";
    htmlBody.appendChild(div);

    htmlBody.innerHTML =
    `

        <input placeholder="Username" id="username"></input>
        <input placeholder="Password" id="password" type="password" autocomplete="off"></input>
        <button id="login">Login</button>
        <button id="cancel">Cancel</button>
    
    `;

    const loginButton = document.getElementById("login");
    const username = document.getElementById("username");
    const userpassword = document.getElementById("password");

    loginButton.addEventListener("click", () => {
        console.log(username.value, userpassword.value);
        userLogin(username.value,userpassword.value);
    })

    const cancel = document.getElementById("cancel");
    hashURL.attachNavigation(cancel,"#Home");

};