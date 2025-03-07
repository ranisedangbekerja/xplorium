"use client";
import * as React from "react";

interface AuthButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  className = "",
}) => {
  const baseStyles = "p-3 text-base rounded-lg text-center w-full";
  const variantStyles = {
    primary: "bg-black text-white",
    secondary: "border border-black border-solid bg-transparent text-black",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
