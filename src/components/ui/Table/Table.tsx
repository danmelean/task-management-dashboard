import type { ComponentPropsWithoutRef } from "react";

interface TableProps extends ComponentPropsWithoutRef<"table"> {}

export function Table({ className, ...props }: TableProps) {
  return (
    <table
      className={`
            w-full 
            border-collapse
            ${className}
        `}
      {...props}
    />
  );
}
