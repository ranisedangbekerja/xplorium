"use client";
import React from "react";
import { SignUpForm } from "./SignUpForm";
import { useRouter } from "next/navigation";

export const SignUpPage: React.FC = () => {
  const router = useRouter();
  return (
    <main className="overflow-hidden pl-20 w-full bg-white max-md:pl-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <section className="w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-20 text-xl text-black max-md:mt-10 max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9e6d4a9dff2db69452665d175c76e80c73df680f2bc7d7c399cefa9dd4db1db?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
              className="object-contain aspect-[0.9] w-[57px]"
              alt="Logo"
            //  onClick={() => router.push("@/app")}
            />
            <SignUpForm />
          </div>
        </section>

        <section className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9218a1f7353e29b98dab27d053342499aa4a992b1f1cb31bb64e7097e751f20d?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
            className="object-contain grow w-full aspect-[0.75] max-md:mt-10 max-md:max-w-full"
            alt="Sign up illustration"
          />
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;
