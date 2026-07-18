import { Container } from "../Container";

export function Header() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <Container>
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
                    <span className="text-sm text-gray-500">
                        Daniel
                    </span>
                </div>
            </Container>
        </header>
    );
}