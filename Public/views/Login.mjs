import * as hashURL from "../../Modules/pageController.mjs"

async function userLogin(inputUsername, inputPassword) {
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: inputUsername,
                password: inputPassword
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login failed");
            return false;
        }

        // Lagre login-data i localStorage
        if (data.validationKey) {
            localStorage.setItem("validatedUser", JSON.stringify({
                username: inputUsername,
                validationKey: data.validationKey
            }));
        }

        if (response.ok) {
                    hashURL.redirect("#Home");
                }

        console.log("Login success:", data);
        return true;

    } catch (error) {
        console.error("Network error:", error);
        return false;
    }
}

export function showUserLogin() {
    const htmlBody = document.body;

    const div = document.createElement("div");
    div.id = "showUserCreation";
    htmlBody.appendChild(div);

    htmlBody.innerHTML =
    `

        <input placeholder="Username" id="username" autocomplete="off"></input>
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