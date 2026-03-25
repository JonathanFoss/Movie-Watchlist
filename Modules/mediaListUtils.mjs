export async function getAllMedia() {
    try {
        const response = await fetch("/movies");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

export async function addMediaEntry(userID, movieID, rating, status) {

    const userEntry = { userID, movieID, rating, status };

    try {
            await fetch("/movies/addMovie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userEntry)});
    }
    catch (error) {
        console.log(error);
    }
   
    
}