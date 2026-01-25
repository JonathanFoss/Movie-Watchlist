const movies = [];

export default function checkDuplicateMovie(movies) {
  return function (req, res, next) {
    const { title } = req.body;

    const exists = movies.some(
      movie => movie.title.toLowerCase() === title.toLowerCase()
    );

    if (exists) {
      return res.status(409).json({ error: "Movie already exists" });
    }

    next();
  };
}
