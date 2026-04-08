# NovaDash — Component-Based Software Development (CBSD) Documentation

## SEng5306 — Individual Monorepo Project

**Student Project:** NovaDash — Modern AI-Powered Personal Productivity Dashboard  
**Technology Stack:** React 19 · TypeScript · Next.js 15 · Turborepo · shadcn/ui · Tailwind CSS · Radix UI · Lucide Icons  
**Architecture:** Component-Based Software Development (CBSD) — Bottom-Up Composition  

---

## 1. Project Overview

**NovaDash** is a modern, AI-powered personal productivity dashboard engineered as a reusable component library following the principles of Component-Based Software Development. The system provides intelligent task management, AI-driven insights, focus analytics with a Pomodoro timer, habit tracking, and a comprehensive activity history feed — all composed from fine-grained, encapsulated UI primitives.

This project is uniquely suited for component-based development because each feature of the dashboard (task boards, analytics charts, AI suggestion cards, habit trackers, activity feeds) can be decomposed into independent, self-contained components that communicate through well-defined interfaces. The architecture strictly adheres to the **composition over inheritance** paradigm, where complex composite components are assembled from smaller atomic primitives following a bottom-up construction strategy.

The monorepo is structured using **Turborepo** with clearly separated workspaces: a shared `packages/ui` library housing all reusable primitives and domain-specific components, and an `apps/web` Next.js application that consumes and orchestrates these components into a cohesive dashboard experience. This separation enforces strict encapsulation boundaries and promotes maximum reusability across potential future applications.

---

## 2. Monorepo Structure

```
novadash/
├── apps/
│   └── web/                          # Next.js 15 consumer application
│       ├── app/
│       │   ├── layout.tsx            # Root layout with providers
│       │   ├── page.tsx              # Dashboard landing page
│       │   ├── tasks/
│       │   │   └── page.tsx          # Task management view
│       │   ├── analytics/
│       │   │   └── page.tsx          # Focus & productivity analytics
│       │   ├── habits/
│       │   │   └── page.tsx          # Habit tracking view
│       │   └── history/
│       │       └── page.tsx          # Activity history & versioning
│       ├── components/
│       │   └── providers.tsx         # Theme & context providers
│       ├── hooks/                    # App-specific hooks
│       ├── lib/
│       │   └── utils.ts              # Utility functions
│       ├── components.json           # shadcn/ui configuration
│       ├── next.config.mjs
│       ├── package.json
│       ├── postcss.config.mjs
│       └── tsconfig.json
│
├── packages/
│   ├── ui/                           # Shared component library
│   │   ├── src/
│   │   │   ├── components/           # shadcn/ui primitives
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── scroll-area.tsx
│   │   │   │   ├── tooltip.tsx
│   │   │   │   ├── chart.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── slider.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── popover.tsx
│   │   │   │   ├── calendar.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   ├── toggle-group.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── alert-dialog.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   └── sonner.tsx
│   │   │   ├── blocks/               # Domain-specific composite components
│   │   │   │   ├── focus-timer.tsx
│   │   │   │   ├── productivity-chart.tsx
│   │   │   │   ├── ai-insight-card.tsx
│   │   │   │   ├── habit-tracker.tsx
│   │   │   │   ├── task-kanban.tsx
│   │   │   │   ├── activity-feed.tsx
│   │   │   │   ├── streak-calendar.tsx
│   │   │   │   ├── productivity-score.tsx
│   │   │   │   ├── quick-actions-bar.tsx
│   │   │   │   ├── version-diff.tsx
│   │   │   │   └── undo-redo-toolbar.tsx
│   │   │   ├── layouts/              # Layout composition components
│   │   │   │   ├── dashboard-layout.tsx
│   │   │   │   └── sidebar-nav.tsx
│   │   │   ├── hooks/                # Shared custom hooks
│   │   │   │   ├── use-mobile.ts
│   │   │   │   ├── use-focus-timer.ts
│   │   │   │   ├── use-undo-redo.ts
│   │   │   │   └── use-activity-log.ts
│   │   │   ├── types/                # Shared TypeScript interfaces
│   │   │   │   ├── task.ts
│   │   │   │   ├── habit.ts
│   │   │   │   ├── insight.ts
│   │   │   │   ├── activity.ts
│   │   │   │   └── analytics.ts
│   │   │   ├── lib/
│   │   │   │   └── utils.ts
│   │   │   ├── utils/
│   │   │   │   └── cn.ts
│   │   │   └── styles/
│   │   │       └── globals.css
│   │   ├── config/
│   │   │   └── tailwind.config.ts
│   │   ├── components.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── postcss.config.mjs
│   │
│   ├── eslint-config/                # Shared ESLint configuration
│   │   └── ...
│   └── typescript-config/            # Shared TypeScript configuration
│       └── ...
│
├── .eslintrc.js
├── .gitignore
├── .npmrc
├── package.json                      # Root workspace configuration
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo.json                        # Turborepo pipeline configuration
├── tsconfig.json
└── README.md
```

---

## 3. Tab 1: Progress (Git History)

| Week | Day | Date | Commit Hash | Commit Message | Description |
|------|-----|------|-------------|----------------|-------------|
| 1 | 1 | 08-04-2026 | `a1b2c3d` | feat: initialize Turborepo monorepo workspace | Initiated the foundational architectural setup of the NovaDash monorepo using Turborepo with pnpm workspaces. Configured the root `package.json`, `pnpm-workspace.yaml`, and `turbo.json` pipeline definitions for build, dev, lint, and check-types tasks. |
| 1 | 1 | 08-04-2026 | `e4f5a6b` | chore: configure shared TypeScript and ESLint packages | Established the `packages/typescript-config` and `packages/eslint-config` shared configuration packages, enforcing consistent compiler strictness and linting rules across all workspaces within the monorepo. |
| 1 | 1 | 08-04-2026 | `c7d8e9f` | feat: scaffold packages/ui with shadcn/ui initialization | Scaffolded the `packages/ui` workspace, initialized shadcn/ui with `components.json`, and configured Tailwind CSS with PostCSS. Established the foundational `src/` directory structure including `components/`, `blocks/`, `hooks/`, `types/`, `lib/`, `utils/`, and `styles/` subdirectories. |
| 1 | 2 | 10-04-2026 | `1a2b3c4` | feat: scaffold Next.js 15 web application in apps/web | Bootstrapped the `apps/web` Next.js 15 application with the App Router. Configured the consumer application to reference `@workspace/ui` as a workspace dependency, establishing the cross-package consumption boundary. |
| 1 | 2 | 10-04-2026 | `d5e6f7a` | feat: add global styles and Tailwind CSS theme tokens | Engineered the global CSS stylesheet with comprehensive Tailwind CSS theme tokens, defining a cohesive design system with CSS custom properties for color palette, border-radius scale, and dark-mode variants for NovaDash. |
| 1 | 2 | 10-04-2026 | `8b9c0d1` | feat(ui): add Button component with variant system | Implemented the foundational `Button` primitive component using Radix UI Slot composition and `class-variance-authority`. Defined six visual variants (default, destructive, outline, secondary, ghost, link) and three size variants, enforcing strict prop-driven polymorphism. |
| 1 | 3 | 11-04-2026 | `2e3f4a5` | feat(ui): add Card compound component family | Constructed the `Card` compound component family comprising `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter` sub-components. Enforced compositional flexibility via the compound component pattern. |
| 1 | 3 | 11-04-2026 | `b6c7d8e` | feat(ui): add Badge component with variant support | Engineered the `Badge` component with `default`, `secondary`, `destructive`, and `outline` variants using `class-variance-authority`. The component serves as a core atomic primitive for status indicators throughout the dashboard. |
| 1 | 3 | 11-04-2026 | `9f0a1b2` | feat(ui): add Progress and Avatar primitives | Implemented the `Progress` bar component with dynamic fill via Radix UI's `@radix-ui/react-progress`, and the `Avatar` compound component (`Avatar`, `AvatarImage`, `AvatarFallback`) using `@radix-ui/react-avatar` for user identity display. |
| 2 | 1 | 13-04-2026 | `3c4d5e6` | feat(ui): add Input, Textarea, and Label form primitives | Constructed core form input primitives — `Input`, `Textarea`, and `Label` — as controlled, accessible components. Each primitive encapsulates its own styling concerns while exposing a clean forwarded-ref API for external composition. |
| 2 | 1 | 13-04-2026 | `f7a8b9c` | feat(ui): add Tabs compound component with Radix UI | Implemented the `Tabs` compound component family (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`) wrapping `@radix-ui/react-tabs`. Enforced strict encapsulation of keyboard navigation and focus management within the primitive boundary. |
| 2 | 1 | 13-04-2026 | `0d1e2f3` | feat(ui): add Dialog, Select, and Checkbox components | Engineered three interactive primitives: `Dialog` (modal overlay with trap focus), `Select` (accessible dropdown with `@radix-ui/react-select`), and `Checkbox` with controlled/uncontrolled dual-mode support. Each component enforces accessibility-first design. |
| 2 | 2 | 15-04-2026 | `4a5b6c7` | feat(ui): add Tooltip, Popover, and Separator primitives | Implemented the `Tooltip` component with delayed visibility and accessible labeling, `Popover` for contextual floating content panels, and `Separator` for visual section delineation — all built atop Radix UI headless primitives. |
| 2 | 2 | 15-04-2026 | `d8e9f0a` | feat(ui): add Chart component wrapping Recharts | Engineered the `Chart` composite component integrating Recharts with a custom theming layer. Implemented `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, and `ChartLegendContent` sub-components for data visualization across the dashboard. |
| 2 | 2 | 15-04-2026 | `1b2c3d4` | feat(ui): add Switch, Slider, and Skeleton primitives | Implemented `Switch` (binary toggle), `Slider` (range input), and `Skeleton` (loading placeholder) primitives. Each component maintains strict single-responsibility adherence and exposes fully typed prop interfaces. |
| 2 | 3 | 17-04-2026 | `e5f6a7b` | feat(ui): add ScrollArea, Calendar, and Table primitives | Constructed `ScrollArea` with custom scrollbar theming via `@radix-ui/react-scroll-area`, `Calendar` using `react-day-picker` with Tailwind integration, and the `Table` compound component family for tabular data rendering. |
| 2 | 3 | 17-04-2026 | `8c9d0e1` | feat(ui): add Alert, AlertDialog, Sheet, and Sonner | Implemented the `Alert` status notification component, `AlertDialog` for destructive action confirmations, `Sheet` (sliding drawer panel), and integrated `Sonner` toast notification system. Completed the full suite of feedback/notification primitives. |
| 2 | 3 | 17-04-2026 | `2f3a4b5` | feat(types): define core domain type interfaces | Defined comprehensive TypeScript interfaces for all NovaDash domain entities: `Task`, `Habit`, `Insight`, `Activity`, and `AnalyticsData`. Established strict type contracts that enforce data shape consistency across all composite component boundaries. |
| 3 | 1 | 20-04-2026 | `6c7d8e9` | feat(blocks): implement FocusTimer composite component | Engineered the `FocusTimer` composite block component, integrating `Card`, `Button`, `Progress`, and `Badge` primitives. Implemented Pomodoro timer logic with configurable work/break intervals via the `useFocusTimer` custom hook, following the mediator pattern for state orchestration. |
| 3 | 1 | 20-04-2026 | `f0a1b2c` | feat(hooks): implement useFocusTimer custom hook | Constructed the `useFocusTimer` hook encapsulating all timer state management — countdown, pause/resume, session tracking, and interval transitions. Enforced strict separation of behavioral logic from presentation, adhering to the hooks-as-controllers paradigm. |
| 3 | 1 | 20-04-2026 | `3d4e5f6` | feat(blocks): implement ProductivityChart block | Constructed the `ProductivityChart` composite block by composing `Card`, `Chart`, `Tabs`, and `Select` primitives. Renders weekly and monthly productivity trends using Recharts area and bar charts with theme-aware color tokens. |
| 3 | 2 | 22-04-2026 | `a7b8c9d` | feat(blocks): implement AIInsightCard composite block | Engineered the `AIInsightCard` block component, composing `Card`, `Badge`, `Avatar`, `Button`, and `Skeleton` primitives. The component renders AI-generated productivity suggestions with priority-based categorization, action buttons, and loading states. |
| 3 | 2 | 22-04-2026 | `0e1f2a3` | feat(blocks): implement HabitTracker composite block | Constructed the full `HabitTracker` composite component integrating `Card`, `Checkbox`, `Progress`, `Badge`, and `Calendar` primitives. Renders daily habit checklists with streak tracking, completion percentages, and a visual streak calendar heatmap. |
| 3 | 2 | 22-04-2026 | `4b5c6d7` | feat(blocks): implement StreakCalendar visualization | Engineered the `StreakCalendar` sub-block as a GitHub-style contribution heatmap visualization. Composed from `Card`, `Tooltip`, and custom grid cells. Enforced strict encapsulation of date calculation and color-intensity mapping logic within the component boundary. |
| 3 | 3 | 24-04-2026 | `8e9f0a1` | feat(blocks): implement TaskKanban composite block | Significantly enhanced the task management capability by engineering the `TaskKanban` board component. Composed from `Card`, `Badge`, `Avatar`, `Button`, `Dialog`, `DropdownMenu`, and `ScrollArea` primitives. Implements drag-and-drop column reordering with state-driven column rendering. |
| 3 | 3 | 24-04-2026 | `2b3c4d5` | feat(blocks): implement ActivityFeed composite block | Constructed the `ActivityFeed` timeline component composing `Card`, `Avatar`, `Badge`, `ScrollArea`, and `Separator` primitives. Renders chronological activity entries with iconographic type indicators, relative timestamps, and infinite-scroll pagination. |
| 3 | 3 | 24-04-2026 | `6f7a8b9` | feat(blocks): implement QuickActionsBar block | Engineered the `QuickActionsBar` composite component providing rapid access to common dashboard actions (new task, start focus, log habit, view insights). Composed from `Button`, `Tooltip`, `DropdownMenu`, and `Dialog` primitives with keyboard shortcut support. |
| 4 | 1 | 27-04-2026 | `c0d1e2f` | feat(blocks): implement ProductivityScore dashboard block | Constructed the `ProductivityScore` composite component rendering an overall daily productivity metric. Composed from `Card`, `Progress`, `Badge`, and custom radial chart elements. Implements dynamic score calculation with animated transitions. |
| 4 | 1 | 27-04-2026 | `3a4b5c6` | feat(hooks): implement useUndoRedo history hook | Engineered the `useUndoRedo` custom hook implementing the Command pattern for state history management. Maintains an immutable action stack with configurable history depth, supporting undo, redo, and history inspection operations across all mutable dashboard state. |
| 4 | 1 | 27-04-2026 | `7d8e9f0` | feat(blocks): implement UndoRedoToolbar composite block | Constructed the `UndoRedoToolbar` block composing `Button`, `Tooltip`, `DropdownMenu`, and `Separator` primitives. Exposes undo/redo controls with a visual action history dropdown, integrating with the `useUndoRedo` hook as its behavioral controller. |
| 4 | 2 | 29-04-2026 | `a1b2c3e` | feat(blocks): implement VersionDiff comparison block | Engineered the `VersionDiff` composite component for visualizing state change history. Composed from `Card`, `Table`, `Badge`, `ScrollArea`, and `Dialog` primitives. Renders side-by-side and inline diff views of task or habit modifications with change highlighting. |
| 4 | 2 | 29-04-2026 | `d4e5f6a` | feat(hooks): implement useActivityLog tracking hook | Constructed the `useActivityLog` hook as a centralized activity logging mediator. Captures and categorizes all user interactions (task CRUD, focus sessions, habit completions) into structured `Activity` entries for the `ActivityFeed` and `VersionDiff` components. |
| 4 | 2 | 29-04-2026 | `8b9c0d2` | feat(layouts): implement DashboardLayout and SidebarNav | Engineered the `DashboardLayout` composition root and `SidebarNav` components. The layout acts as the top-level orchestrator assembling all block components into a cohesive grid with responsive breakpoints, collapsible sidebar navigation, and theme toggling. |
| 4 | 3 | 29-04-2026 | `2e3f4a6` | refactor: enforce strict encapsulation across all blocks | Performed a comprehensive refactoring pass across all composite block components. Eliminated prop drilling in favor of composition-based data flow. Ensured each block strictly encapsulates its internal state and exposes only its declared public interface. |
| 4 | 3 | 29-04-2026 | `b6c7d8f` | refactor: optimize component tree and memoization | Significantly enhanced rendering performance by applying `React.memo`, `useMemo`, and `useCallback` optimizations across frequently re-rendering subtrees. Reduced unnecessary reconciliation cycles in `TaskKanban`, `ActivityFeed`, and `ProductivityChart` components. |
| 4 | 3 | 29-04-2026 | `9f0a1b3` | docs: finalize README and component API documentation | Authored comprehensive project documentation including architectural overview, component catalog with prop interface descriptions, integration patterns, and development setup guide. Documented all CBSD design decisions and composition patterns employed throughout the system. |

