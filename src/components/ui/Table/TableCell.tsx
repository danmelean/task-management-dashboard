import type { ComponentPropsWithoutRef } from "react";

interface TableCellProps extends ComponentPropsWithoutRef<"td"> {}

export function TableCell({ className = "", ...props }: TableCellProps) {
  return (
    <td
      className={`
        px-4
        py-3
        ${className}  
      `}
      {...props}
    />
  );
}
