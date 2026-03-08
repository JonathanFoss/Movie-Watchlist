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

        // Brukere må ha disse to!
        if (!username) {
                throw new Error("You must have a username!");
                
        }

        if (!password) {
                throw new Error("You must have a password!");
        }

    const hashedPassword = encryptPassword(password);

    const result = await pool.query(
        `INSERT INTO users 
        (id, username, password, consent, created_at)
        VALUES (DEFAULT, $1, $2, $3, NOW())
        RETURNING id`,
        [username, hashedPassword, JSON.stringify(consent)]
    );

    return { id: result.rows[0].id };
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
     WHERE validationkey = $2 AND validation_expire > NOW()
     RETURNING id, username`,
    [newUsername, validationKey]
  );

  return result.rows[0] || null;
}

export async function deleteUserByKey(validationKey) {
  const result = await pool.query(
    `DELETE FROM users
     WHERE validationkey = $1 AND validation_expire > NOW()
     RETURNING id`,
    [validationKey]
  );

  return result.rows[0] ? true : false;
}