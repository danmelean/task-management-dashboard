# AGENTS.md

## Project

Task Management Dashboard

## Goals

- Learn React through practical implementation to deliver frontend features end-to-end.
- Establish strong React fundamentals (correct mental models).
- Prioritize readability over clever code.
- Improve UI consistency and styling decisions.
- Favor composition over inheritance.
- Support efficient and meaningful frontend testing strategies.
- Strengthen frontend architecture and code maintainability.
- Keep components small and focused

## Tech Stack

- Next.js
- React
- Typescript
- Tailwind CSS v4
- ESLint

## Component Guidelines

- One component per file.
- Export components as named functions.
- Avoid default exports unless required by Next.js
- Prefer composition over large configurable components.
- Extract reusable logic into custom hooks.

## Styling

- Use Tailwind utilities.
- Avoid inline styles.
- Keep spacing consistent.
- Reuse design tokens.

## Naming

- PascalCase for components.
- cameCase for variables and functions.
- kebab-case for route folders.

## State

- Keep state as local as possible.
- Don't intrudice global state until it's needed.

# Testing

- Test user behavior, not implementation details.
- Prefer React Testing Library.

## Learning Principle

- When introducing a new React concept, explain why it exists before using it.

## AI Collaboration

- Explain architectural decisions.
- Prefer simple implementations ver advanced abstraactions.
- Do not introduce libraries unless they solve a real problem.
- Build features incrementally.
- When multiple approaches exists, explain the trade-off
