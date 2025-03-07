"use client";
import * as React from "react";
import { SignUpForm } from "../component/ui/SignUpForm";
import { LoginSection } from "@/component/ui/LoginSection";

const SignIn: React.FC = () => {
  return (
    <main className="pl-20 bg-white max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col">
        <section className="w-[62%] max-md:ml-0 max-md:w-full">
          <div className="my-auto max-md:mt-10 max-md:max-w-full">
            <SignUpForm />
          </div>
        </section>

        <section className="ml-5 w-[38%] max-md:ml-0 max-md:w-full">
          <LoginSection />
        </section>
      </div>
    </main>
  );
};

export default SignIn;
