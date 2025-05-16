import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { signJwt } from "@/lib/jwt";

export async function POST(req) {
  try {
    const { usernameOrEmail, password } = await req.json();
    console.log("Received login req: ", usernameOrEmail);

    if (!usernameOrEmail || !password) {
      console.log("Missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Find user by email or username
    const result = await db.query(
      `SELECT user_id, username, email, hashed_password FROM users
      WHERE email = $1 OR username = $1
      LIMIT 1;`,
      [usernameOrEmail]
    );

    console.log("DB query result: ", result.rows);

    if (!result.rows.length) {
      console.log("Invalid credentials");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = result.rows[0];

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      console.log("Invalid credentials: Password mismatch")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = signJwt({ id: user.user_id, username: user.username, email: user.email });
    console.log("Generated JWT token: ", token);

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    console.log("Login successful")

    return response;
  } catch (error) {
    console.error("Login error: ", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}