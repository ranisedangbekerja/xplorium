import { Pool } from "pg";

// const connectionString = process.env.POSTGRES_URL;
const connectionString = process.env.NEON_URL;

if (!connectionString) {
  throw new Error("Database URL is missing in .env.local");
}

export const db = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});