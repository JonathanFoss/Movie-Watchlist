export async function getUserId() {
    const validatedUser = JSON.parse(localStorage.getItem("validatedUser"));
    if (!validatedUser) return null;

    const { username, validationKey } = validatedUser;

    try {
        const response = await fetch("/users/getUserId", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, validationKey })
        });

        if (!response.ok) throw new Error("Could not get user ID");

        const data = await response.json();
        return data.userID;
    } catch (err) {
        console.error(err);
        return null;
    }
}