let userToken = localStorage.getItem("userToken");

export function showUserInfo() {
    const div = document.createElement("div");
    div.innerHTML = `
        Username:
        <input id="username" autocomplete="off" placeholder="New Username" />
        <button id="submitChanges">Apply Changes</button>
        <br/>
        <button id="deleteAccount">Delete Account</button>
    `;

    document.body.appendChild(div);

    const submit = document.getElementById("submitChanges");
    const deleteAccount = document.getElementById("deleteAccount");

    const usernameInput = document.getElementById("username");


    submit.addEventListener("click", () => {
        editUser(userToken, usernameInput.value);
    });

    deleteAccount.addEventListener("click", () => {
        confirm("Are you sure you want to delete your account?")
        deleteUser(userToken);
    })

}

async function editUser(userToken, newUsername) {
    try {
        const response = await fetch(`/users/${userToken}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newUsername })
        });

        const data = await response.json();
        console.log(data);
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

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }

    localStorage.clear("userToken");
    
}
