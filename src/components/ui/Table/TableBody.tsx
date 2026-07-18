import type { ComponentPropsWithoutRef } from "react";

interface TableBodyProps extends ComponentPropsWithoutRef<"tbody"> {}

export function TableBody({ className = "", ...props }: TableBodyProps) {
  return <tbody className={className} {...props} />;
}
