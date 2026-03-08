import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000
});

export async function checkUserValidKey(username, validationKey){
    try {

        if (!username || !validationKey) {
            return false;
        }

        const result = await pool.query(
            "SELECT validationkey FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length === 0) {
            return false;
        }

        const dbKey = result.rows[0]?.validationkey;

        if (!dbKey) {
            return false;
        }

        return dbKey.toString() === validationKey.toString();

    } catch (error) {
        console.error("Database error:", error);
        return false;
    }
}