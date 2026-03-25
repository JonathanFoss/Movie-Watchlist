import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

function normalizeTitle(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "");
}

export async function createMovie(title) {

    const normalizedTitle = normalizeTitle(title);

    const result = await pool.query(
        `
        INSERT INTO movies (title, normalizedTitle)
        VALUES ($1, $2)
        RETURNING *
        `,
        [title, normalizedTitle]
    );

    return result.rows[0];
}