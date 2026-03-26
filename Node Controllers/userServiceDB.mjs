import { encryptPassword } from "./userEncryption.mjs";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;

export async function addUser(username, password, consent) {
    if (await userExists(username)) {
        throw new Error("User already exists");
    }

        if (!username) {
                throw new Error("You must have a username!");
                
        }

        if (!password) {
                throw new Error("You must have a password!");
        }

    const hashedPassword = encryptPassword(password);

    const result = await pool.query(
        `INSERT INTO users 
        (userId, username, password, consent, created_at)
        VALUES (DEFAULT, $1, $2, $3, NOW())
        RETURNING userId`,
        [username, hashedPassword, JSON.stringify(consent)]
    );

    return { userId: result.rows[0].userId };
}

export async function userExists(username) {
    const result = await pool.query(
        "SELECT 1 FROM users WHERE username = $1",
        [username]
    );

    return result.rows.length > 0;
}

export async function checkPassword(username, password) {
    const result = await pool.query(
        "SELECT password FROM users WHERE username = $1",
        [username]
    );

    console.log("Username:", username);
    console.log("Input password hash:", encryptPassword(password));

    if (result.rows.length === 0) {
        console.log("User not found");
        return false;
    }

    console.log("Stored password:", result.rows[0].password);

    return result.rows[0].password === encryptPassword(password);
}

export async function updateUsernameByKey(validationKey, newUsername) {
  const result = await pool.query(
    `UPDATE users
     SET username = $1
     WHERE validationkey = $2
       AND validation_expire > NOW()
     RETURNING userId, username`,
    [newUsername, validationKey]
  );

  return result.rows[0] || null;
}

export async function deleteUserByUsernameAndKey(username, validationKey) {

  const userResult = await pool.query(
    `SELECT userId FROM users WHERE username = $1 AND validationkey = $2 AND validation_expire > NOW()`,
    [username, validationKey]
  );

  if (!userResult.rows[0]) return false;

  const userId = userResult.rows[0].userid;

  await pool.query(
    `DELETE FROM user_movies WHERE userId = $1`,
    [userId]
  );

  const result = await pool.query(
    `DELETE FROM users WHERE userId = $1 RETURNING userId`,
    [userId]
  );

  return result.rows[0] ? true : false;
}