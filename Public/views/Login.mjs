import hashRoute from "../../Modules/hashRoutes.mjs";
import * as hashURL from "../../Modules/pageController.mjs"
import { loadLanguage, t } from '../frontend_i18n.mjs';

async function userLogin(inputUsername, inputPassword) {

    const lang = navigator.language.startsWith("no") ? "no" : "en";
    await loadLanguage(lang);

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
            alert(t("login_failed"));
            return false;
        }

        if (data.validationKey) {
            localStorage.setItem("validatedUser", JSON.stringify({
                username: inputUsername,
                validationKey: data.validationKey
            }));
        }

        console.log(t("login_sucess"), data);
        return true;

    } catch (error) {
        console.error(t("network_error"), error);
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

    loginButton.addEventListener("click", async () => {
        //console.log(username.value, userpassword.value);

        const success = await userLogin(username.value,userpassword.value);

        if (success) {

        htmlBody.innerHTML += `
        <br/>
        <br/>
        Login successful, redirecting shortly..

        `

        setTimeout(() => {
            hashURL.redirect(hashRoute.Home);
            hashURL.refresh();
        }, 3000);
    }
    })

    const cancel = document.getElementById("cancel");
    hashURL.attachNavigation(cancel,"#Home");

};