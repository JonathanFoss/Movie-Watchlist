import express from "express";
import { addUser, deleteUserByKey, updateUsernameByKey } from "../Node Controllers/userServiceDB.mjs";
import requireConsent from "../Middleware/consentMiddleware.mjs";
import { getLang, getMessages } from "../Modules/i18n.mjs";

const userRouter = express.Router();

// Opprett bruker
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

// Oppdater brukernavn via validationKey
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

// Slett bruker via validationKey
userRouter.delete("/:validationKey", async (req, res) => {
  try {
    const lang = getLang(req);
    const messages = await getMessages(lang);

    const validationKey = req.params.validationKey;

    if (!validationKey) {
      return res.status(401).json({ message: messages.validation_key_missing });
    }

    const success = await deleteUserByKey(validationKey);

    if (!success) {
      return res.status(404).json({ message: messages.user_not_found });
    }

    res.json({ message: messages.user_deleted });
  } catch (err) {
    const lang = getLang(req);
    const messages = await getMessages(lang);
    res.status(500).json({ message: messages.delete_error || err.message });
  }
});

export default userRouter;