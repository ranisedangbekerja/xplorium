import React from "react";

export const FormInput = ({
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
