import express from "express";

import movieRouter from "./routes/movieRoute.mjs";
import userRouter from "./routes/userRoute.mjs";
import loginRouter from "./routes/loginRoute.mjs"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/movies", movieRouter);



app.get("/", (req, res) => {

    res.json({ message: "Movie watchlist API running" });
    
})

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})