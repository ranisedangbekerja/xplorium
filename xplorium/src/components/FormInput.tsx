import React from "react";

interface FormInputProps {
  label: string;
  type?: string;
  className?: string; // Tambahkan className di props
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
      className={`border border-gray-300 rounded-lg px-4 py-2 w-full ${className}`}
    />
  );
};
