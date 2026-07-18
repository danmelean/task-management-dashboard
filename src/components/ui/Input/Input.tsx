import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: boolean;
}

const baseStyles = `
    box-sizing:border-box 
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5) 
    transition:border-color 0.2s ease-in-out
    border 1px solid
    border-radius:0.375rem
    padding:0.5rem 0.75rem 
    width:100%
`;

export const Input = ({ error = false, className, ...props }: InputProps) => {
  return (
    <input
      className={`
                ${baseStyles}
                ${error ? "border-red-500 focus:border-red-500 focus:ring focus:ring-red-200" : ""}
                ${className}
            `}
      {...props}
    />
  );
};
