"use client";

import React, { useState } from "react";

interface PasswordInputProps {
  className?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ className = "" }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
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
