# NovaDash

Modern AI-Powered Personal Productivity Dashboard built with React 19, TypeScript, Next.js 15, and Turborepo.

## Architecture

NovaDash follows **Component-Based Software Development (CBSD)** principles with a bottom-up composition architecture.

## Monorepo Structure

```
novadash/
├── apps/
│   └── web/          # Next.js 15 consumer application
├── packages/
│   ├── ui/           # Shared component library (shadcn/ui primitives + domain blocks)
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── turbo.json        # Turborepo pipeline configuration
└── pnpm-workspace.yaml
```

## Tech Stack

- **React 19** — UI library
- **TypeScript 5.7** — Static type checking
- **Next.js 15** — React framework (App Router)
- **Turborepo** — Monorepo build orchestration
- **shadcn/ui** — Component primitive library
- **Radix UI** — Headless accessible primitives
- **Tailwind CSS 4** — Utility-first CSS framework
- **Recharts** — Data visualization
- **Lucide React** — Icon system

## Getting Started

```bash
pnpm install
pnpm dev
```

## Development

```bash
pnpm build       # Build all packages
pnpm lint        # Lint all packages
pnpm check-types # Type-check all packages
```
