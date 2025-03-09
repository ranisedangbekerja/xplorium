"use client";
import React, { useState } from "react";

export const PasswordInput: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-wrap gap-5 justify-between items-start px-5 pt-5 pb-2 mt-9 font-bold text-xl leading-tight whitespace-nowrap rounded-xl bg-neutral-400 bg-opacity-30 w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="bg-transparent outline-none flex-1"
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="focus:outline-none"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3323680d0ecc017bdc66eaf6c890bf27a8108d36f224eee11264173f410e54d1?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
          className="object-contain shrink-0 aspect-[0.71] w-[34px]"
          alt="Toggle password visibility"
        />
      </button>
    </div>
  );
};
