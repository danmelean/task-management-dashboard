import type { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
}

type ButtonVariant = "primary" | "secondary" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
} as const;

const baseStyles = `
       inline-flex 
       items-center 
       justify-center 

       rounded-md
       
       px-4 
       py-2  
       font-medium 
       
       bg-blue-500
       text-white 

       hover:bg-blue-600

       disabled:opacity-50
       disabled:cursor-not-allowed
       `;

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]} 
        ${className}
        `}
      {...props}
    />
  );
};
