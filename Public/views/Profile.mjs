import * as hashURL from "../../Modules/pageController.mjs"

const validatedUser = localStorage.getItem("validatedUser");
const user = validatedUser ? JSON.parse(validatedUser) : null;

export function showUserInfo() {

    document.body.innerHTML = "";

    if (!user) {
        window.location.hash = "#Login";
        return;
    }

    const div = document.createElement("div");
    div.innerHTML = `
        <h1>${user.username}'s Profile</h1>

        Username:
        <input id="username" autocomplete="off" placeholder="New Username" />
        <button id="submitChanges">Apply Changes</button>
        <button id="deleteAccount">Delete Account</button>
        <br/>
        <h4> show date for creation? </h4>
        <button id="back">Back</button>
    `;

    document.body.appendChild(div);

    document.getElementById("submitChanges").addEventListener("click", () => {
        const usernameInput = document.getElementById("username").value;

        editUser(user.validationKey, usernameInput);

        let updatedValidKey = JSON.stringify({
            username : usernameInput,
            validationKey : user.validationKey
        });

        localStorage.setItem("validatedUser", updatedValidKey);

        setTimeout(() => {
            hashURL.refresh();
        }, 2000);


    });

    document.getElementById("deleteAccount").addEventListener("click", () => {
        if (confirm("Are you sure you want to delete your account?")) {
            deleteUser(user.validationKey);
        }
    });

    document.getElementById("back").addEventListener("click", () => {
        hashURL.back();
    })
}

export async function editUser(userToken, newUsername) {
    try {
        const response = await fetch(`/users/${userToken}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newUsername })
        });

        console.log(await response.json());

    } catch (error) {
        console.log(error);
    }
}

async function deleteUser(userToken) {
    try {
        const response = await fetch(`/users/${userToken}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(await response.json());

    } catch (error) {
        console.log(error);
    }

    localStorage.removeItem("validatedUser");
    localStorage.removeItem("validationKey");

    window.location.reload();
}