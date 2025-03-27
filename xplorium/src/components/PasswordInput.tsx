"use client";

import React, { useState } from "react";

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ name, value, onChange, className = "" }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      <input
        name={name}
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full pr-10"
      />
      <img
        src={isPasswordVisible ? "/onpassword.png" : "/offpassword.png"}
        alt="Toggle Password Visibility"
        className="absolute right-4 top-[40%] -translate-y-1/2 w-7 h-7 cursor-pointer"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      />
    </div>
  );
};
