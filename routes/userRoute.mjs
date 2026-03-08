import express from "express";
import { addUser, deleteUserByKey, updateUsernameByKey } from "../Node Controllers/userServiceDB.mjs"
import requireConsent from "../Middleware/consentMiddleware.mjs";

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

// Oppdater brukernavn via validationKey
userRouter.patch("/:validationKey", async (req, res) => {
  try {
    const { newUsername } = req.body;
    const validationKey = req.params.validationKey;

    if (!newUsername) {
      return res.status(400).json({ message: "newUsername is required" });
    }

    if (!validationKey) {
      return res.status(401).json({ message: "Validation key missing" });
    }

    // Her bør du ha funksjon som finner bruker via validKey
    const updatedUser = await updateUsernameByKey(validationKey, newUsername);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or key expired" });
    }

    res.json({ message: "Username updated", userId: updatedUser.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Slett bruker via validationKey
userRouter.delete("/:validationKey", async (req, res) => {
  try {
    const validationKey = req.params.validationKey;

    if (!validationKey) {
      return res.status(401).json({ message: "Validation key missing" });
    }

    const success = await deleteUserByKey(validationKey);

    if (!success) {
      return res.status(404).json({ message: "User not found or key expired" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default userRouter;
