// When a user adds a movie for the first time it wil be added to the DB
// So other can pick it out from a list and we dont get alot of entries of the same movies

// Downside here is that if the first person to ever add the movie writes the wrong title it will effect everyone
// Solution might be to add Admin / Moderators who can go in and do changes to the DB!

import { movieExists } from "../movieService.mjs";

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