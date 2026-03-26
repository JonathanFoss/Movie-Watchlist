import { movieExists } from "../Node Controllers/movieService.mjs";

export default async function checkDuplicateMovie(req, res, next) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const exists = await movieExists(title);

  if (exists) {
    return res.status(409).json({ message: "Movie already exists" });
  }

  next();
};