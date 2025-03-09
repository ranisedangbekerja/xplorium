"use client";
import React from "react";

interface FormInputProps {
  label: string;
  type?: string;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={label}
      className={`px-6 py-7 mt-9 font-bold text-xl leading-tight rounded-xl bg-neutral-400 bg-opacity-30 w-full ${className}`}
    />
  );
};
