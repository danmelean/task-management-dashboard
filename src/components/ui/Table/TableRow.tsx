import type { ComponentPropsWithoutRef } from "react";

interface TableRowProps extends ComponentPropsWithoutRef<"tr"> {}

export function TableRow({ className = "", ...props }: TableRowProps) {
  return <tr className={className} {...props} />;
}
