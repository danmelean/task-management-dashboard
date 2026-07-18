import type { ComponentPropsWithoutRef } from "react";

interface TableHeadProps extends ComponentPropsWithoutRef<"th"> {}

export function TableHead({ className = "", ...props }: TableHeadProps) {
  return (
    <th
      className={`
    px-4
    py-3
    text-left
    text-sm
    font-semibold
    background-color: #575757;
    ${className}
    `}
      {...props}
    />
  );
}
