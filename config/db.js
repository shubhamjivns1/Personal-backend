import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,
    ssl: {
        rejectUnauthorized: false,
    },
});

// 🔥 VERY IMPORTANT: Health check
const checkDBConnection = async () => {
    try {
        const conn = await pool.getConnection();
        await conn.ping();
        conn.release();
        console.log("MySQL Pool Ready ✅");
    } catch (err) {
        console.error("MySQL Pool Error ❌", err.message);
    }
};

// Run once on startup
checkDBConnection();

// 🔥 Export safe query function
export const db = {
    query: async (sql, params) => {
        try {
            return await pool.query(sql, params);
        } catch (err) {
            console.error("DB Query Error:", err.message);

            // Recheck connection if failed
            await checkDBConnection();
            throw err;
        }
    },
};
