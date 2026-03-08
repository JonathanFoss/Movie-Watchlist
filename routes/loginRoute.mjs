import express from "express";
import { checkPassword } from "../Node Controllers/userServiceDB.mjs";
import { giveUserValidKey } from "../Node Controllers/userLoggedIn.mjs";
import { generateValidKey } from "../Modules/validationKey.mjs";
import { checkUserValidKey } from "../Middleware/checkUserValidKey.mjs";

const loginRouter = express.Router();

/* ================= LOGIN ================= */

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const valid = await checkPassword(username, password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const validationKey = generateValidKey();
  const saveValidKey = await giveUserValidKey(username, validationKey);

  if (!saveValidKey) {
    return res.status(500).json({ message: "Could not set login key!" });
  }

  return res.status(200).json({
    message: "Login successful",
    validationKey: validationKey
  });
});

/* ================= VALIDATE ================= */

loginRouter.post("/validate", async (req, res) => {
  const { username, validationKey } = req.body;
  
  const valid = await checkUserValidKey(username, validationKey);

  if (!valid) {
    return res.status(401).json({ valid: false });
  }

  res.json({ valid: true });
  //console.log("Validate request body:", req.body);
});

export default loginRouter;