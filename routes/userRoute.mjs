import express from "express";
import { addUser, deleteUserByUsernameAndKey, updateUsernameByKey } from "../Node Controllers/userServiceDB.mjs";
import requireConsent from "../Middleware/consentMiddleware.mjs";
import { getLang, getMessages } from "../Modules/i18n.mjs";

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const userRouter = express.Router();

userRouter.post("/", requireConsent, async (req, res) => {
  try {
    const lang = getLang(req);
    const messages = await getMessages(lang);

    const { username, password, consent } = req.body;
    const user = await addUser(username, password, consent);

    res.status(201).json({ message: messages.user_created, userId: user.id });
  } catch (err) {
    const lang = getLang(req);
    const messages = await getMessages(lang);
    res.status(409).json({ message: messages.user_create_error || err.message });
  }
});

userRouter.patch("/:validationKey", async (req, res) => {
  try {
    const lang = getLang(req);
    const messages = await getMessages(lang);

    const { newUsername } = req.body;
    const validationKey = req.params.validationKey;

    if (!newUsername) {
      return res.status(400).json({ message: messages.new_username_required });
    }

    if (!validationKey) {
      return res.status(401).json({ message: messages.validation_key_missing });
    }

    const updatedUser = await updateUsernameByKey(validationKey, newUsername);

    if (!updatedUser) {
      return res.status(404).json({ message: messages.user_not_found });
    }

    res.json({ message: messages.username_updated, userId: updatedUser.id });
  } catch (err) {
    const lang = getLang(req);
    const messages = await getMessages(lang);
    res.status(500).json({ message: messages.update_error || err.message });
  }
});

userRouter.delete("/deleteAccount", async (req, res) => {
  try {
    const lang = getLang(req);
    const messages = await getMessages(lang);

    const { username, validationKey } = req.body;

    if (!username || !validationKey) {
      return res.status(400).json({ message: messages.validation_key_missing });
    }

    const success = await deleteUserByUsernameAndKey(username, validationKey);

    if (!success) {
      return res.status(404).json({ message: messages.user_not_found });
    }

    res.json({ message: messages.user_deleted });

  } catch (err) {
    console.error(err);
    const lang = getLang(req);
    const messages = await getMessages(lang);
    res.status(500).json({ message: messages.delete_error || err.message });
  }
});

userRouter.post("/getUserId", async (req, res) => {
    const { username, validationKey } = req.body;

    try {
        const result = await pool.query(
            "SELECT userID FROM users WHERE username=$1 AND validationKey=$2",
            [username, validationKey]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ userID: result.rows[0].userid });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

export default userRouter;