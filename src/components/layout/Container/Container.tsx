import type { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <div className="max-w-7xl w-full mx-auto px-6">{children}</div>;
}
