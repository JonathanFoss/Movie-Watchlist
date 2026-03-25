import { getUserId } from "../Middleware/getUserId.mjs"

export async function getUserMovies() {
    const userID = await getUserId();

    if (!userID) return alert("Could not get user ID");

    try {
        const response = await fetch(`movies/userlist?userID=${userID}`);
        if (!response.ok) throw new Error("Failed to fetch user movies");

        const movies = await response.json();
        return movies
    } catch (err) {
        console.error(err);
    }
}