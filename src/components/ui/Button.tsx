"use client";
import { cn } from "@/lib/cn";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({
  children,
  className = "",
  loading = false,
  ...props
}: ButtonProps) => {
  console.log(loading, "__loading");

  return (
    <button
      disabled={loading}
      className={cn(
        "outline-none border-none py-2 px-4 bg-foreground text-background rounded-md font-medium cursor-pointer hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors",
        className,
        loading && "bg-[#444444] cursor-not-allowed"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
