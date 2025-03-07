interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({ children, className = "", onClick }: ButtonProps) {
  return (
    <button
      className={`w-full p-2 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
