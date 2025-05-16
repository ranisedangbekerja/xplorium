import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10) // Salt = 10

    // Insert user into database
    const result = await db.query(
      `INSERT INTO users (username, email, hashed_password, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
      RETURNING *;`,
      [username, email, hashedPassword]
    );

    if (!result.rows.length) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    return NextResponse.json({ message: "User registered successfully" }, { status: 200 });

  } catch (error) {
    console.error("Registration error: ", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}