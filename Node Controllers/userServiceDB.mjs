import { encryptPassword, decryptPassword } from "./userEncryption.mjs";
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
        [username, hashedPassword, JSON.stringify({
            ...consent,
            timestamp: new Date().toISOString()
        })]
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

    // FIX SENERE!

    export async function checkPassword(username, inputPassword) {
        const result = await pool.query(
            "SELECT password FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length === 0) return false;

        return password;
    }

    //

export async function updateUsername(userId, newUsername) {
    if (await userExists(newUsername)) {
        throw new Error("Username already taken");
    }

    const result = await pool.query(
        "UPDATE users SET username = $1 WHERE id = $2 RETURNING *",
        [newUsername, userId]
    );

    return result.rows[0] || null;
}

export async function deleteUser(userId) {
    await pool.query(
        "DELETE FROM users WHERE id = $1",
        [userId]
    );
}