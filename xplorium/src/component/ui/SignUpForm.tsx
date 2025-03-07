"use client";
import * as React from "react";
import { AuthInput } from "@/component/ui/AuthInput";
import { AuthButton } from "@/component/ui/AuthButton";

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col self-stretch w-full text-xl text-neutral-400"
    >
      <h2 className="self-center text-2xl leading-10 text-center text-black">
        Sign Up to Xplorium
      </h2>

      <AuthInput
        type="text"
        label="Username"
        value={formData.username}
        onChange={(value) => setFormData({ ...formData, username: value })}
      />

      <AuthInput
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
      />

      <AuthInput
        type="password"
        label="Password"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, password: value })}
        showPasswordToggle
      />

      <hr className="mt-5 border border-black border-solid" />

      <AuthButton className="mt-6">Sign Up</AuthButton>

      <AuthButton
        variant="secondary"
        className="mt-2.5 flex items-center justify-center gap-2.5"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/920cba98c3abec977643cd14b87c4a3ae9c40faf6abf3d150d0803b80342766d?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
          alt="Google logo"
          className="object-contain w-[30px] aspect-square"
        />
        <span>Sign Up with Google</span>
      </AuthButton>
    </form>
  );
};
