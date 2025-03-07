"use client";
import * as React from "react";

interface AuthInputProps {
  type: "text" | "email" | "password";
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPasswordToggle?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  type,
  label,
  value,
  onChange,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="w-full px-6 py-4 mt-4 font-bold text-xl leading-tight bg-zinc-100 placeholder-neutral-400 focus:outline-none"
        aria-label={label}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/00369246d541bdca5bbc55d8580ae36297034bcb2a8db2b9139c019dbfe4146b?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
            alt={showPassword ? "Hide password" : "Show password"}
            className="object-contain w-[34px] aspect-square"
          />
        </button>
      )}
    </div>
  );
};
