"use client";
import React from "react";
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

export const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };
  const router = useRouter();

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
        label="Username or Email"
        className={`mt-4 h-14 w-full text-[10px] border-gray-300 ${pressStart2P.className}`}
      />

      <PasswordInput
        className={`mt-4 h-14 w-full text-[10px] border-gray-300 ${pressStart2P.className}`}
      />

      {/* Garis pemisah */}
      <div className="shrink-0 mt-6 border border-black h-[1.5px]" />

      {/* Tombol Sign Up */}
      <button
        type="submit"
        className={`px-4 py-3 mt-6 text-xs text-white bg-black rounded-md 
                    hover:bg-gray-800 transition-all duration-200 
                    active:scale-95 ${pressStart2P.className}`}
      >
        Login
      </button>

      {/* Tombol Sign Up dengan Google */}
      <SocialSignUp />

      {/* Login Link */}
      <div className="flex justify-center gap-2 mt-5 text-xs">
        <p>Don't have an account?</p>
        <button className="font-medium underline text-blue-600 hover:text-blue-800"
        onClick={() => router.push("/register")} 
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};
