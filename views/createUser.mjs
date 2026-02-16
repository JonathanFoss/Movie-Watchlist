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
        console.log(data);
      }
      catch (error) {
        console.log(error);
      }

}

async function showUserCreation() {

    const htmlBody = document.body;
    

    const div = document.createElement("div");
    div.id = "showUserCreation";
    htmlBody.appendChild(div);
    
        div.innerHTML = `

            <input id="username" placeholder="Username"></input>
            <input id="password" placeholder="Password"></input>
            <button id="submitNewUser">Create User</button>
            <br/>
            <input type="checkbox" id="ToS"> Terms of Service</input>
            <input type="checkbox" id="Privacy"> Privacy Settings</input>
        
        `;

    let inputElements = document.querySelector("input");
    inputElements.setAttribute("autocomplete", "off");

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


      
}



export default showUserCreation;