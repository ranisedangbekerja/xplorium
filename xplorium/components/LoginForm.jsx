"use client";
import React, { useState } from "react";
import { FormInput } from "./FormInput.jsx";
import { PasswordInput } from "./PasswordInput.jsx";
// import { SocialSignUp } from "./SocialSignUp.jsx";
import { Press_Start_2P } from "next/font/google";
import { useRouter } from "next/navigation";
import { SocialLogin } from "./SocialLogin.jsx";

// Gunakan font Press Start 2P
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      console.log("Sending login request...");
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      console.log("Response status: ", response.status)

      const data = await response.json();
      console.log("Response data: ", data);

      if (!response.ok) {
        console.error("Login error:", error);
        setError(data.error);
        return;
      } else {
        console.log("Login success");
        // Redirect to chatroom on success
        router.push("/chatroom");
      }


    } catch (error) {
      console.error("Login request failed", error);
      setError("Something went wrong. Please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col self-center mt-8 w-[400px] max-w-full sm:max-w-md px-6"
    >
      {/* Judul dengan ukuran lebih kecil */}
      <h1
        className={`text-lg text-center mb-6 leading-tight text-black 
                    ${pressStart2P.className}`}
      >
        Login to Xplorium
      </h1>

      {/* Input Field */}
      <FormInput
        name="username_or_email"
        value={usernameOrEmail}
        label="Username or Email"
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        className={`mt-4 h-14 w-full text-[10px] border-gray-300 ${pressStart2P.className}`}
      />

      <PasswordInput
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`mt-4 h-14 w-full text-[10px] border-gray-300 ${pressStart2P.className}`}
      />

      {/* Garis pemisah */}
      <div className="shrink-0 mt-6 border border-black h-[1.5px]" />

      {/* Tombol Login Up */}
      <button
        type="submit"
        onClick={handleSubmit}
        className={`px-4 py-3 mt-6 text-xs text-white bg-black rounded-md 
                    hover:bg-gray-800 transition-all duration-200 cursor-pointer
                    active:scale-95 ${pressStart2P.className}`}
      >
        Login
      </button>

      {/* Tombol Sign Up dengan Google */}
      {/* <SocialSignUp /> */}
      <SocialLogin />

      {/* Login Link */}
      <div className="flex justify-center gap-2 mt-5 text-xs">
        <p>Don't have an account?</p>
        <button className="font-medium text-blue-600 underline cursor-pointer hover:text-blue-800"
        onClick={() => router.push("/register")} 
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};
