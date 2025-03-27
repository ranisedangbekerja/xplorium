import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Tambahkan className di props
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-lg px-4 py-2 w-full ${className}`}
    />
  );
};
