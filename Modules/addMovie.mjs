async function addMovie(title) {

    const userResponse = document.getElementById("respone");

    try {
        const res = await fetch("/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Unknown error");
        }

        if (res.ok) {
            userResponse.innerText = `${title} is now added to the database!`;
        }

        return data;
    } catch (err) {
        console.error(err);

        userResponse.innerText = `${err.message}`;

        return null;
    }
}

export default addMovie;