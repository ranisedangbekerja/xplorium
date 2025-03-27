"use client";
import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { SocialSignUp } from "./SocialSignUp";
import { Press_Start_2P } from "next/font/google";
import { useRouter } from "next/navigation";

// Gunakan font Press Start 2P
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Registration failed");
    } else {
      router.push("/login");
    }

    setLoading(false);
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
        Sign Up to Xplorium
      </h1>

      {/* Input Field */}
      <FormInput
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        className={`mt-4 h-14 w-full text-[10px] border-gray-300 ${pressStart2P.className}`}
      />

      <FormInput
        name="email"
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className={`mt-4 h-14 w-full text-[10px] border-gray-300 ${pressStart2P.className}`}
      />

      <PasswordInput
        name="password"
        value={formData.password}
        onChange={handleChange}
        className={`mt-4 h-14 w-full text-[10px] border-gray-300 ${pressStart2P.className}`}
      />

      {/* Error */}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {/* Garis pemisah */}
      <div className="shrink-0 mt-6 border border-black h-[1.5px]" />

      {/* Tombol Sign Up */}
      <button
        type="submit"
        onClick={handleSubmit}
        className={`px-4 py-3 mt-6 text-xs text-white bg-black rounded-md 
                    hover:bg-gray-800 transition-all duration-200 
                    active:scale-95 ${pressStart2P.className}`}
      >
        {/* Sign Up */}
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Tombol Sign Up dengan Google */}
      <SocialSignUp />

      {/* Login Link */}
      <div className="flex justify-center gap-2 mt-5 text-xs">
        <p>Already have an account?</p>
        <button className="font-medium underline text-blue-600 hover:text-blue-800"
        onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    </form>
  );
};
