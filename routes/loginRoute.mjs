import express from "express";
import { checkPassword } from "../userService.mjs";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const valid = await checkPassword(username, password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  res.json({ message: "Login successful!" });
});

export default loginRouter;
