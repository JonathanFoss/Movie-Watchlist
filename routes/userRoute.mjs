import express from "express";
import { addUser, deleteUser } from "../userService.mjs";
import requireConsent from "../middleware/consentMiddleware.mjs";

const userRouter = express.Router();

// Opprett bruker
userRouter.post("/", requireConsent, async (req, res) => {
  try {
    const { username, password, consent } = req.body;
    const user = await addUser(username, password, consent);
    res.status(201).json({ message: "User created", userId: user.id });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

// Slett bruker
userRouter.delete("/:id", async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default userRouter;
