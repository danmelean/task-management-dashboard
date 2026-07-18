import type { PropsWithChildren } from "react";
import { Container } from "../Container";
import { Header } from "../Header";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Container>
        <main className="py-8">{children}</main>
      </Container>
    </>
  );
}
