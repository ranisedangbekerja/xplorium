"use client";
import * as React from "react";
import { AuthButton } from "./AuthButton";

export const LoginSection: React.FC = () => {
  return (
    <section className="flex flex-col grow px-8 py-72 w-full bg-zinc-300 max-md:px-5 max-md:py-24">
      <h2 className="text-2xl leading-10 text-center text-black">
        Already Have an Account?
      </h2>
      <AuthButton className="self-center mt-4 max-w-[284px]">Login</AuthButton>
    </section>
  );
};
