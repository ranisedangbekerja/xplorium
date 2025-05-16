"use client";

import React from "react";
import { SignUpForm } from "./SignUpForm.jsx";
import { useRouter } from "next/navigation";

export const SignUpPage = () => {
  const router = useRouter();
  return (
    <main className="w-full overflow-hidden bg-white">
      <div className="flex gap-0 max-md:flex-col">
        {/* Bagian Kiri */}
        <section className="w-6/12 max-md:w-full">
          <div className="flex flex-col mt-20 text-xl text-black max-md:mt-10 max-md:max-w-full">
          <img
              src="/back.png"
              className="absolute top-5 left-5 w-[40px] h-auto cursor-pointer"
              alt="Back"
              onClick={() => router.push('/')}
            />

            <SignUpForm />
          </div>
        </section>

        {/* Bagian Kanan (Gambar Full) */}
        <section className="w-6/12 h-screen max-md:w-full">
          <img
            src="/signup.jpg"
            className="object-cover w-full h-full"
            alt="Sign up illustration"
          />
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;
