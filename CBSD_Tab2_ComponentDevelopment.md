# TAB 2 — COMPONENT DEVELOPMENT

## NovaDash · Per-Day Component Construction Log

---

## DAY 1 — April 8, 2026 | Monorepo Scaffold & UI Package Initialization

### Components / Structures Built
- Turborepo workspace root (`turbo.json`, `pnpm-workspace.yaml`, root `package.json`)
- Shared `packages/typescript-config` (3 presets: `base`, `nextjs`, `react-library`)
- Shared `packages/eslint-config` (2 rule sets: `next`, `library`)
- `packages/ui` directory scaffold with 8 sub-directories and `cn()` utility

### Composition & Design Decisions

**Monorepo Root:**
Engineered the workspace using Turborepo's task pipeline model, defining explicit `dependsOn: ["^build"]` relationships to guarantee that `packages/ui` always builds before `apps/web`. The `turbo.json` pipeline encodes five tasks — `build`, `dev`, `lint`, `check-types`, `clean` — each with appropriate caching and persistence flags.

**Shared Configuration Packages:**
Constructed shared TypeScript and ESLint packages as first-class workspace members rather than root-level config files. This architectural decision enforces consistent compilation rules across all current and future packages without duplication. Each TypeScript preset (`base.json`, `nextjs.json`, `react-library.json`) uses `extends` chaining, ensuring incremental specialisation.

**`packages/ui` Scaffold:**
Established the eight-directory taxonomy that governs the entire component architecture:
- `src/components/` — atomic UI primitives (shadcn/ui layer)
- `src/blocks/` — composite domain components
- `src/hooks/` — encapsulated behavioural logic
- `src/layouts/` — page-level layout wrappers
- `src/types/` — domain TypeScript interfaces
- `src/utils/` — shared utility functions
- `src/lib/` — library wrappers (e.g., `utils.ts` with `cn()`)
- `src/styles/` — package-level global CSS

The `cn()` utility (combining `clsx` and `tailwind-merge`) was established as the sole class-name composition primitive for the entire library, enforcing consistent Tailwind conflict resolution across all components.

**Separation of Concerns:**
Configuration concerns (TypeScript, ESLint), structural concerns (directory taxonomy), and utility concerns (`cn()`) were each isolated into their own packages or modules. No business logic was introduced at this stage.

---

## DAY 2 — April 10, 2026 | Next.js Application Scaffold & Button Primitive

### Components / Structures Built
- `apps/web` — Next.js 15 App Router application with 5 route stubs
- `apps/web/components/providers.tsx` — `ThemeProvider` wrapper
- `apps/web/app/globals.css` — full CSS custom property design token system
- `packages/ui/src/components/button.tsx` — `Button` atomic primitive

### Composition & Design Decisions

**`apps/web` Application:**
Constructed the consumer application using Next.js 15's App Router, establishing the root layout with the `Inter` Google Font, `ThemeProvider` context, and `suppressHydrationWarning` for dark-mode compatibility. Route stubs (`/analytics`, `/habits`, `/history`, `/tasks`, `/focus`) were scaffolded as empty page modules, establishing the navigation contract before any block-level content was composed.

**`ThemeProvider`:**
Constructed as a client-side wrapper component delegating to `next-themes`, exposing `attribute="class"` theme switching with `enableSystem` for OS-preference detection. Isolated in `components/providers.tsx` as a pure composition concern separated from the layout's HTML structure.

**Global CSS Design Token System:**
Composed the semantic colour token layer in `globals.css` using CSS custom properties scoped to `:root` (light) and `.dark` selectors. Defined twenty-one semantic tokens (background, foreground, card, primary, secondary, muted, accent, destructive, border, input, ring, and their foregrounds). This token layer serves as the single authoritative source for all visual theming, consumed by every primitive via Tailwind's `hsl(var(--token))` pattern.

**`Button` Primitive:**
Engineered as the first production atomic component using `class-variance-authority` (CVA). The variant matrix comprises:
- **6 variant axes:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **4 size axes:** `default`, `sm`, `lg`, `icon`

CVA's `cva()` function generates a type-safe class resolver, eliminating ad-hoc conditional class strings. The component forwards all native `<button>` HTML attributes via `React.ButtonHTMLAttributes`, ensuring full DOM compatibility without prop drilling.

---

## DAY 3 — April 11, 2026 | Card, Badge, Progress & Avatar Primitives

### Components / Structures Built
- `packages/ui/src/components/card.tsx` — 6-member compound component family
- `packages/ui/src/components/badge.tsx` — `Badge` variant primitive
- `packages/ui/src/components/avatar.tsx` — `Avatar`, `AvatarImage`, `AvatarFallback`
- `packages/ui/src/components/progress.tsx` — `Progress` indicator primitive

### Composition & Design Decisions

**`Card` Compound Family:**
Constructed as a compound component pattern with six individually exported members: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Each sub-component maps to a distinct structural role (container, header row, title typography, description typography, scrollable body, action footer), enforcing strict layout responsibility decomposition. Every block in the codebase (`FocusTimer`, `HabitTracker`, `TaskBoard`, `AIInsightCard`, `ProductivityChart`, `StreakCalendar`) uses this compound family as its outermost structural wrapper.

**`Badge` Primitive:**
Implemented with a CVA variant system (`default`, `secondary`, `destructive`, `outline`) providing a reusable label atom. Used across all blocks for priority indicators (`TaskBoard`), session type labels (`FocusTimer`), streak counts (`HabitTracker`), and date annotations.

**`Avatar` Compound:**
Constructed using Radix UI's Avatar primitive, decomposing into `Avatar` (root), `AvatarImage` (lazy-loaded image with `onLoadingStatusChange`), and `AvatarFallback` (graceful text/icon degradation). Used by `AIInsightCard` for insight-type icon display and by `TaskBoard` for task assignee rendering.

**`Progress` Primitive:**
Engineered wrapping Radix UI's `ProgressPrimitive.Root` and `ProgressPrimitive.Indicator`, applying a CSS transform (`translateX`) to animate the fill bar. Consumed by `FocusTimer` (session elapsed progress) and `HabitTracker` (daily completion ratio).

---

## DAY 4 — April 13, 2026 | Form Primitives, Tabs & Interaction Components

### Components / Structures Built
- `packages/ui/src/components/input.tsx` — `Input` text field primitive
- `packages/ui/src/components/textarea.tsx` — `Textarea` multiline primitive
- `packages/ui/src/components/label.tsx` — `Label` accessible form label
- `packages/ui/src/components/tabs.tsx` — `Tabs` compound component (4 members)
- `packages/ui/src/components/dialog.tsx` — `Dialog` modal compound
- `packages/ui/src/components/select.tsx` — `Select` dropdown compound
- `packages/ui/src/components/checkbox.tsx` — `Checkbox` toggle primitive

### Composition & Design Decisions

**Form Primitives (`Input`, `Textarea`, `Label`):**
Constructed as thin wrappers over native HTML elements, applying the design token system via `cn()` and forwarding all native attributes. `Label` wraps Radix UI's `LabelPrimitive.Root`, ensuring accessible `htmlFor` associations are enforced at the primitive level. These three components collectively form the atomic layer for all future form-containing blocks.

**`Tabs` Compound:**
Constructed using Radix UI's headless tab primitives (`TabsPrimitive.Root`, `List`, `Trigger`, `Content`). `TabsTrigger` uses the `data-[state=active]` CSS attribute selector for active-state styling, enabling zero-JavaScript visual feedback. This compound is subsequently composed within `ProductivityChart` to implement the weekly/monthly chart toggle.

**`Dialog`, `Select`, `Checkbox`:**
Each engineered as Radix UI compound wrappers with full keyboard navigation and ARIA attribute management handled at the primitive level. `Select` decomposes into `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator` — providing a complete controlled dropdown atom. `Checkbox` exposes `data-[state=checked]` for visual styling and is adopted by `HabitTracker` for per-habit completion toggling.

---

## DAY 5 — April 15, 2026 | Overlay Primitives, Chart Wrapper & State Primitives

### Components / Structures Built
- `packages/ui/src/components/tooltip.tsx` — `Tooltip` compound (4 members)
- `packages/ui/src/components/popover.tsx` — `Popover` compound (3 members)
- `packages/ui/src/components/separator.tsx` — `Separator` layout primitive
- `packages/ui/src/components/chart.tsx` — `ChartContainer` + 4 chart sub-components
- `packages/ui/src/components/skeleton.tsx` — `Skeleton` loading placeholder
- `packages/ui/src/components/switch.tsx` — `Switch` toggle primitive
- `packages/ui/src/components/slider.tsx` — `Slider` range input primitive

### Composition & Design Decisions

**`Tooltip` Compound:**
Constructed using Radix UI's portal-based tooltip primitives (`TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`). `TooltipProvider` establishes a React context boundary that manages shared `delayDuration` across all tooltip instances in a subtree. This provider pattern is subsequently leveraged in `StreakCalendar`, which wraps its entire cell grid in a single `TooltipProvider` to avoid redundant context instantiation.

**`Chart` Compound System:**
Engineered as a typed abstraction layer over Recharts. `ChartContainer` accepts a `ChartConfig` object (mapping data keys to label and colour metadata) and injects CSS custom properties into a scoped container div, enabling Recharts components to reference theme-aware colours without prop threading. `ChartTooltipContent` renders a formatted tooltip from the Recharts `payload` API. This abstraction insulates `ProductivityChart` from direct Recharts API coupling.

**`Skeleton` Primitive:**
Implemented as a single `div` element with a CSS pulse animation applied via Tailwind. Deliberately minimal by design — the component carries no state or props beyond `className`, enabling arbitrary shape composition at the block layer. Used by `AIInsightCard` to compose a full-card skeleton layout.

---

## DAY 6 — April 17, 2026 | Navigation Primitives, Notification Layer & Domain Type System

### Components / Structures Built
- `packages/ui/src/components/scroll-area.tsx` — `ScrollArea` + `ScrollBar`
- `packages/ui/src/components/calendar.tsx` — `Calendar` date-picker component
- `packages/ui/src/components/table.tsx` — `Table` compound family (7 members)
- `packages/ui/src/components/alert.tsx` — `Alert` + `AlertDescription`
- `packages/ui/src/components/alert-dialog.tsx` — `AlertDialog` compound
- `packages/ui/src/components/sheet.tsx` — `Sheet` off-canvas panel compound
- `packages/ui/src/components/sonner.tsx` — `Toaster` toast notification wrapper
- `packages/ui/src/types/task.ts` — `Task`, `TaskStatus`, `TaskPriority` interfaces
- `packages/ui/src/types/habit.ts` — `Habit`, `HabitFrequency` interfaces
- `packages/ui/src/types/insight.ts` — `Insight`, `InsightType`, `InsightPriority` interfaces
- `packages/ui/src/types/analytics.ts` — `FocusSession`, `AnalyticsData` interfaces
- `packages/ui/src/types/activity.ts` — `ActivityRecord` interface

### Composition & Design Decisions

**`ScrollArea` Compound:**
Constructed using Radix UI's scroll area primitives with a custom `ScrollBar` overlay, replacing native browser scrollbars for cross-platform visual consistency. `ScrollArea` is adopted by `TaskBoard` to enable horizontal Kanban column scrolling within a fixed-height container.

**Domain Type System:**
Engineered five TypeScript interface modules co-located within `packages/ui/src/types/`. Placing type definitions in the shared library package (rather than in `apps/web`) establishes them as the single contractual source of truth: both block components and page-level consumers import from `@workspace/ui/types/*`, guaranteeing structural consistency across the package boundary. The `Task` interface defines `TaskStatus` as a union literal type (`"todo" | "in-progress" | "done" | "archived"`), enabling exhaustive discriminated union patterns in `TaskBoard`. The `Habit` interface uses `completionHistory: Record<string, boolean>` as a date-keyed lookup, directly driving the completion logic in `HabitTracker`.

---

## DAY 7 — April 20, 2026 | First Composite Block Triad (FocusTimer, useFocusTimer, ProductivityChart)

### Components / Structures Built
- `packages/ui/src/blocks/focus-timer.tsx` — `FocusTimer` composite block
- `packages/ui/src/hooks/use-focus-timer.ts` — `useFocusTimer` custom hook
- `packages/ui/src/blocks/productivity-chart.tsx` — `ProductivityChart` composite block

### Composition & Design Decisions

**`useFocusTimer` Hook:**
Engineered as a custom React hook encapsulating the complete Pomodoro session lifecycle. Internal state: `timeLeft` (integer seconds), `isRunning` (boolean), `sessionType` (`"work" | "break"`). Derived state: `progress` (computed as elapsed-over-duration percentage for each session type). Side effect: a `useEffect` with `setTimeout` drives the countdown and auto-transitions between session types on expiry. The hook returns a typed interface (`timeLeft`, `progress`, `isRunning`, `sessionType`, `toggleTimer`, `resetTimer`) consumed exclusively by `FocusTimer`. This design enforces the principle that timer behaviour is entirely decoupled from timer presentation.

**`FocusTimer` Composite Block:**
Constructed by composing 6 primitive components: `Card` (container), `CardHeader` (layout), `CardTitle` (label), `CardFooter` (controls), `Button` (play/pause and reset actions), `Progress` (session elapsed indicator), `Badge` (session type label). Delegates all state to `useFocusTimer` via destructuring. Renders conditional icon content (`Play` vs. `Pause`) based on `isRunning` — the only conditional logic within the component is presentational. Contains zero business logic.

**`ProductivityChart` Composite Block:**
Composed by integrating 12 primitive and sub-primitive components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `Select` (metric toggle), `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `ChartContainer`, `ChartTooltip`. Maintains two items of local state: `metric` (controlled `Select` value, `"focus" | "tasks"`) and the active tab (`"weekly" | "monthly"`). Renders `AreaChart` for weekly data and `BarChart` for monthly data, both sourcing colour from the `chartConfig` keyed by the selected metric. Demonstrates highest primitive composition count of any single block in the library.

---

## DAY 8 — April 22, 2026 | Domain-Specific Block Triad (AIInsightCard, HabitTracker, StreakCalendar)

### Components / Structures Built
- `packages/ui/src/blocks/ai-insight-card.tsx` — `AIInsightCard` composite block
- `packages/ui/src/blocks/habit-tracker.tsx` — `HabitTracker` composite block
- `packages/ui/src/blocks/streak-calendar.tsx` — `StreakCalendar` composite block

### Composition & Design Decisions

**`AIInsightCard` Composite Block:**
Constructed with a dual-render path controlled by the `isLoading` boolean prop. In the loading path, composed a skeleton card layout using `Skeleton` components shaped to match the populated layout's dimensions — enabling a seamless transition without layout shift. In the data path, integrated `Card`, `Badge`, `Button`, `Avatar`, `AvatarFallback` (repurposed as an icon container via `AvatarFallback + Icon`), and `Skeleton`. Applied a `typeConfig` lookup object mapping `InsightType` → `{ icon, color, bg }` and a `priorityConfig` map resolving `InsightPriority` → `Badge` variant. Typed against the `Insight` interface from `@workspace/ui/types/insight`. The `onActionClick` callback prop delegates action handling upward to the consuming page.

**`HabitTracker` Composite Block:**
Constructed integrating `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `Badge`, `Progress`, `Checkbox`, and `Button`. Implements completion state lookup via `habit.completionHistory[dateString]`, where `dateString` is derived from local `useState<Date>` initialised to `new Date()`. Computes `completionPercentage` as a derived value from the habits array, rendered by the `Progress` primitive. The `Checkbox` `onCheckedChange` handler delegates to the `onToggleHabit` prop — enforcing Inversion of Control: the block signals intent without owning the mutation.

**`StreakCalendar` Composite Block:**
Engineered as the most algorithmically complex block in the library. Constructed a `weeks × 7` day grid using `date-fns` functions (`subDays`, `startOfWeek`, `addDays`, `format`). Applied `React.useMemo` to derive month boundary labels — preventing redundant computation on re-renders driven by parent state changes. Each cell renders a `Tooltip` (via `TooltipProvider` → `TooltipTrigger` → `TooltipContent`) displaying the date and activity level. A 5-level intensity colour scale maps completion levels (0–4) to `bg-muted`, `bg-primary/30`, `bg-primary/60`, `bg-primary/80`, `bg-primary`. Integrated `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `Tooltip`, `TooltipProvider`, `TooltipTrigger`, `TooltipContent` — the highest primitive integration count of any visualisation block.

---

## DAY 9 — April 24, 2026 | Dashboard Overview & Focus Page Assembly

### Components / Structures Built
- `apps/web/app/page.tsx` — `DashboardPage` (root route)
- `apps/web/app/focus/page.tsx` — `FocusPage` (dedicated Pomodoro surface)

### Composition & Design Decisions

**`DashboardPage`:**
Assembled as the primary integration surface composing three blocks: `ProductivityChart`, `AIInsightCard` (rendered twice via `mockInsights.map()`), and `HabitTracker`. Laid out using a `lg:grid-cols-7` responsive CSS grid: the left 4 columns host the chart and insight cards; the right 3 columns host the habit tracker. Hydrated blocks with typed mock data conforming to `Habit[]` and `Insight[]` interfaces. Demonstrates unidirectional data flow: the page owns data, blocks receive it via props, and blocks surface interaction events via callback props (`onToggleHabit` in `HabitTracker` is left wired but without a handler — intentionally deferred to the dedicated Habits page). This page validates the multi-block composition pattern against the actual DOM at runtime for the first time.

**`FocusPage`:**
Constructed as a full-height layout page (`h-[calc(100vh-4rem)]`) using a 12-column grid. The left column (`col-span-4`) renders `FocusTimer` in a sticky container. The right column (`col-span-8`) renders a structured placeholder panel with descriptive copy indicating the deferred `TaskBoard` integration point. This deliberate stub enforces the architectural principle that page layout is established before all block dependencies are resolved.

---

## DAY 10 — April 27, 2026 | TaskBoard Block & Tasks Page

### Components / Structures Built
- `packages/ui/src/blocks/task-board.tsx` — `TaskBoard` kanban composite block
- `apps/web/app/tasks/page.tsx` — `TasksPage` stateful Kanban management page

### Composition & Design Decisions

**`TaskBoard` Composite Block:**
Engineered as the most compositionally complex block in the library, integrating primitives from 5 distinct component families: `Card`, `CardHeader`, `CardContent` (task card structure), `Badge` (priority and count labels), `ScrollArea`, `ScrollBar` (horizontal column overflow), `Avatar`, `AvatarFallback` (assignee display), and `@hello-pangea/dnd` (`DragDropContext`, `Droppable`, `Draggable`).

Internal state: a `Record<TaskStatus, Task[]>` board map (`boardData`) initialised from the incoming `tasks` prop via `useEffect`. The `onDragEnd` handler performs optimistic state mutation — splicing the moved task from its source column array and inserting it at the destination index before delegating to `onTaskMove`. The `COLUMNS` constant defines the three rendered Kanban columns (`todo`, `in-progress`, `done`) as an ordered array, enabling column header generation via a single `.map()`. `getPriorityColor` and `getStatusIcon` are pure utility functions within the block that resolve visual encoding from task data without external dependencies.

**`TasksPage`:**
Constructed as a stateful React client component (`"use client"`), initialising a `Task[]` state array with 5 seed tasks spanning all three visible statuses. The `handleTaskMove` function serves as the Mediator: it receives drag events surfaced by `TaskBoard` and reconciles them against page-level state via an immutable `.map()` transform. The page owns all mutation; the block owns all presentation and interaction geometry.

---

## DAY 11 — April 29, 2026 | Habits & Analytics Pages, Refactor & Build Fix

### Components / Structures Built
- `apps/web/app/habits/page.tsx` — `HabitsPage` full habit management surface
- `apps/web/app/analytics/page.tsx` — `AnalyticsPage` metrics and insights surface
- Refactored: `packages/ui/src/blocks/streak-calendar.tsx`, `packages/ui/package.json`
- Fixed: all import paths across 6 blocks and all 20+ UI primitives

### Composition & Design Decisions

**`HabitsPage`:**
Assembled as the most compositionally rich page, integrating `StreakCalendar`, `HabitTracker`, and two raw stat cards. Implemented `generateMockStreakData()` — a 90-day date-iteration loop producing `Record<string, number>` activity data — as an inline function, keeping data generation concern local to the page without polluting block interfaces. `StreakCalendar` receives `data={generateMockStreakData()}` and `weeks={16}`. `HabitTracker` receives `habits` and `onToggleHabit`, the latter implemented as an immutable `completionHistory` merge via `setHabits`. Demonstrates the full Observer-via-props pattern: `HabitTracker` observes `habits` state changes and re-renders reactively.

**`AnalyticsPage`:**
Constructed as the analytics reporting surface, composing four KPI stat card elements (raw JSX, no additional block abstraction required), `ProductivityChart` (reused without modification), and a column of three `AIInsightCard` instances. Demonstrated block reusability: both `ProductivityChart` and `AIInsightCard` are consumed identically across `DashboardPage` and `AnalyticsPage` without any props interface changes, validating the block abstraction boundary.

**Refactoring Pass:**
Refactored the `packages/ui` export map and `StreakCalendar` to resolve cross-package resolution failures. Corrected all import paths from relative paths to canonical `@workspace/ui/*` alias paths across all 6 block files and all primitive components, ensuring the `tsconfig.json` path alias system is the sole resolution mechanism.

**Build Fix:**
Resolved Tailwind `content` glob misconfigurations, CSS `@layer` ordering violations in `globals.css`, and `tsconfig.json` `paths` alias misalignments, restoring the full `turbo run build` pipeline to a clean exit state.
