import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`bg-gray-900 border border-gray-800 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
