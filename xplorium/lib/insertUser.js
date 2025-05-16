"use server";

import { db } from "@/lib/db";

export async function insertUser(user) {
  try {
    // Check if user exists
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [user.email]);

    if (existingUser.rows.length > 0) {
      console.log("User already exists: ", existingUser.rows[0]);
      return existingUser.rows[0]; // Return existing user
    }

    // Insert new user
    const result = await db.query(
      `INSERT INTO users (username, email, hashed_password, avatar_link, created_at, updated_at)
      VALUES ($1, $2, NULL, $3, NOW(), NOW())
      ON CONFLICT (email) DO UPDATE
      SET username = EXCLUDED.username, avatar_link = EXCLUDED.avatar_link, updated_at = NOW()
      RETURNING *;`,
      [user.username, user.email, user.avatar_link]
    );

    console.log("Inserted new user: ", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting user:", error.message, error.stack);
    throw new Error(`Database error: ${error.message}`);
  }
}