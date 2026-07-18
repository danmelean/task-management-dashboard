import type { ComponentPropsWithoutRef } from "react";

interface TableHeaderProps extends ComponentPropsWithoutRef<"thead"> {}

export function TableHeader({ className = "", ...props }: TableHeaderProps) {
  return <thead className={`bg-gray-700 text-white ${className}`} {...props} />;
}
