"use client";
import React from "react";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { SocialSignUp } from "./SocialSignUp";

export const SignUpForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col self-end mt-20 max-w-full w-[685px] max-md:mt-10"
    >
      <h1 className="text-4xl leading-none text-center max-md:mr-1.5 max-md:max-w-full">
        Sign Up to Xplorium
      </h1>

      <FormInput label="Username" className="mt-24 max-md:mt-10" />

      <FormInput label="Email Address" type="email" />

      <PasswordInput />

      <div className="shrink-0 mt-7 border border-black border-solid h-[3px]" />

      <button
        type="submit"
        className="px-3 py-6 mt-9 text-base text-white bg-black rounded-lg min-h-[67px]"
      >
        Sign Up
      </button>

      <SocialSignUp />

      <div className="flex gap-5 self-end mt-6 leading-tight max-md:mr-1.5">
        <p>Already Have an Account?</p>
        <button className="font-medium underline"
       // onClick={() => router.push("/login")} 
        >
          Login</button>
      </div>
    </form>
  );
};
