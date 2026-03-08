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

export async function giveUserValidKey(username, validationKey) {

    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 24); // 24 timer session

    const result = await pool.query(
        `UPDATE users 
         SET validationkey = $1,
             validation_expire = $2
         WHERE username = $3
         RETURNING id`,
        [validationKey, expireTime, username]
    );

    //console.log("Updating validation key for:", username);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0].id;
}