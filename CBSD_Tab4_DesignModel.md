# TAB 4 — DESIGN & COMPONENT MODEL

## NovaDash · Architectural Design & Component-Based Software Development Analysis

---

## 4.1 Overview

NovaDash is architected as a **Turborepo monorepo** implementing a strict **bottom-up, layered component model**. The architecture enforces a unidirectional dependency graph: the shared UI library (`packages/ui`) is constructed independently of and prior to the consumer application (`apps/web`). No component in `packages/ui` imports from `apps/web`. This boundary is the foundational architectural constraint of the entire system.

The design follows the CBSD principle of **constructing systems from pre-fabricated, independently deployable components** — in this case, Radix UI headless primitives serve as the lowest-level pre-fabricated units, which are then adapted, composed, and assembled into progressively higher-order domain abstractions.

---

## 4.2 Bottom-Up Architecture

The NovaDash component architecture is constructed in four distinct ascending layers, each dependent exclusively on layers below it:

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: PAGES          apps/web/app/**                    │
│  (Integration Surface)   DashboardPage, HabitsPage,         │
│                          TasksPage, AnalyticsPage, FocusPage │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3: BLOCKS         packages/ui/src/blocks/            │
│  (Composite Components)  FocusTimer, HabitTracker,          │
│                          TaskBoard, ProductivityChart,       │
│                          AIInsightCard, StreakCalendar       │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2: PRIMITIVES     packages/ui/src/components/        │
│  (Atomic UI Components)  Button, Card, Badge, Progress,     │
│                          Avatar, Input, Tabs, Select,        │
│                          Checkbox, Tooltip, Chart,           │
│                          Skeleton, ScrollArea, Table...      │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1: FOUNDATION     Radix UI, Recharts, date-fns,      │
│  (External Primitives)   class-variance-authority,          │
│                          tailwind-merge, clsx, next-themes  │
└─────────────────────────────────────────────────────────────┘
```

**Construction sequence:**
Layer 1 → Layer 2 → Layer 3 → Layer 4

Each layer is constructed only after the layer beneath it is stable and exported. The Turborepo pipeline enforces this order at build time via `"dependsOn": ["^build"]`.

---

## 4.3 Component Layers

### Layer 1 — External Foundation (Third-Party Primitives)

The foundation layer consists of third-party libraries that provide accessible, unstyled, or minimally styled primitives:

| Library | Role |
|---------|------|
| `@radix-ui/*` | Headless, accessible UI primitives (Tabs, Dialog, Select, Checkbox, Tooltip, ScrollArea, Avatar, Progress, Separator, Popover, AlertDialog, Sheet) |
| `recharts` | SVG-based charting engine (AreaChart, BarChart, CartesianGrid, XAxis, YAxis) |
| `date-fns` | Date arithmetic utilities (subDays, startOfWeek, addDays, format) |
| `class-variance-authority` | Type-safe component variant system |
| `tailwind-merge` + `clsx` | Conflict-resolving Tailwind class composition (via `cn()`) |
| `next-themes` | React context-based theme switching |
| `@hello-pangea/dnd` | Drag-and-drop interaction engine (DragDropContext, Droppable, Draggable) |
| `react-day-picker` | Calendar date-picking primitive |
| `sonner` | Toast notification system |

These libraries are **never imported directly by blocks or pages**. They are exclusively consumed within Layer 2 primitives, maintaining a clean abstraction boundary.

---

### Layer 2 — Atomic Primitives (`packages/ui/src/components/`)

The primitive layer comprises **twenty-four atomic UI components** adapted from the Radix UI / shadcn/ui ecosystem. Each primitive:

1. **Wraps a single external dependency** (or is a pure styled element)
2. **Applies the NovaDash design token system** via `cn(defaultStyles, className)`
3. **Forwards all native HTML attributes** via `React.forwardRef`
4. **Exposes zero business logic** — purely structural and visual

**Complete Primitive Inventory:**

| Component | Family | External Dependency |
|-----------|--------|---------------------|
| `Button` | Interaction | CVA (no Radix) |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Layout | None (styled divs) |
| `Badge` | Display | CVA (no Radix) |
| `Avatar`, `AvatarImage`, `AvatarFallback` | Display | `@radix-ui/react-avatar` |
| `Progress` | Feedback | `@radix-ui/react-progress` |
| `Input` | Form | None (styled input) |
| `Textarea` | Form | None (styled textarea) |
| `Label` | Form | `@radix-ui/react-label` |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Navigation | `@radix-ui/react-tabs` |
| `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` | Overlay | `@radix-ui/react-dialog` |
| `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectValue`, `SelectSeparator` | Form | `@radix-ui/react-select` |
| `Checkbox` | Form | `@radix-ui/react-checkbox` |
| `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | Overlay | `@radix-ui/react-tooltip` |
| `Popover`, `PopoverTrigger`, `PopoverContent` | Overlay | `@radix-ui/react-popover` |
| `Separator` | Layout | `@radix-ui/react-separator` |
| `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent` | Data Viz | `recharts` |
| `Skeleton` | Feedback | None (styled div) |
| `Switch` | Form | `@radix-ui/react-switch` |
| `Slider` | Form | `@radix-ui/react-slider` |
| `ScrollArea`, `ScrollBar` | Layout | `@radix-ui/react-scroll-area` |
| `Calendar` | Form | `react-day-picker` |
| `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | Data Display | None (styled table) |
| `Alert`, `AlertDescription` | Feedback | None (styled divs) |
| `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogAction`, `AlertDialogCancel` | Overlay | `@radix-ui/react-alert-dialog` |
| `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter` | Overlay | `@radix-ui/react-dialog` (re-used) |
| `Toaster` | Feedback | `sonner` |

**Total atomic primitives:** 24 component modules (60+ individually exported sub-components)

---

### Layer 3 — Composite Blocks (`packages/ui/src/blocks/`)

The block layer comprises **six domain-specific composite components**, each constructed by integrating multiple Layer 2 primitives into a cohesive, domain-meaningful unit. Blocks are the primary units of CBSD composition.

**Block Inventory & Primitive Composition:**

| Block | Primitives Consumed | Hook Dependency | Domain Type |
|-------|--------------------|-----------------| ------------|
| `FocusTimer` | Card (family), Button, Progress, Badge | `useFocusTimer` | None (internal state via hook) |
| `ProductivityChart` | Card (family), ChartContainer, ChartTooltip, Tabs (family), Select (family) | None | None |
| `AIInsightCard` | Card (family), Badge, Button, Avatar (family), Skeleton | None | `Insight` |
| `HabitTracker` | Card (family), Badge, Progress, Checkbox, Button | None | `Habit` |
| `StreakCalendar` | Card (family), Tooltip (family), TooltipProvider | None | None (`Record<string, number>`) |
| `TaskBoard` | Card (family), Badge, ScrollArea, ScrollBar, Avatar (family) | None | `Task`, `TaskStatus` |

**Block Design Principles:**
1. **No direct third-party library imports** — all external libraries are accessed through Layer 2 primitives only
2. **Typed props interfaces** — every block declares an explicit `interface XxxProps` typed against Layer 3 domain types
3. **Inversion of Control via callback props** — mutation callbacks (`onToggleHabit`, `onTaskMove`, `onActionClick`) are always optional and delegated to the consuming page
4. **No cross-block imports** — no block imports another block, eliminating horizontal coupling

---

### Layer 3b — Custom Hooks (`packages/ui/src/hooks/`)

One custom hook is implemented in the library:

**`useFocusTimer`** (`src/hooks/use-focus-timer.ts`)
- Encapsulates the Pomodoro session state machine
- Manages three state variables: `timeLeft`, `isRunning`, `sessionType`
- Derives one computed value: `progress`
- Manages one side effect: `useEffect` countdown with `setTimeout`
- Returns a typed action interface: `toggleTimer`, `resetTimer`
- Consumed exclusively by `FocusTimer` block

This hook constitutes the sole instance of extracted behavioural logic in the library. Its existence validates the architectural principle that complex side-effect logic must not reside in presentational block components.

---

### Layer 3c — Domain Types (`packages/ui/src/types/`)

Five TypeScript interface modules define the domain data contracts:

| Module | Interfaces | Union Types |
|--------|-----------|-------------|
| `types/task.ts` | `Task` | `TaskStatus`, `TaskPriority` |
| `types/habit.ts` | `Habit` | `HabitFrequency` |
| `types/insight.ts` | `Insight` | `InsightType`, `InsightPriority` |
| `types/analytics.ts` | `FocusSession`, `AnalyticsData` | None |
| `types/activity.ts` | `ActivityRecord` | None |

Co-locating types in `packages/ui` rather than in `apps/web` is a deliberate architectural constraint: it ensures that the data contract is defined at the component layer, not at the application layer. Pages must conform to the library's type system — not the inverse.

---

### Layer 4 — Pages (`apps/web/app/`)

The page layer is the final integration surface. Pages are responsible for:
1. **Data provisioning** — supplying typed mock (or real) data to blocks
2. **State ownership** — managing mutable state via `useState`
3. **Mediation** — handling block callback events and reconciling state changes
4. **Layout** — arranging blocks within responsive CSS grids

**Page Inventory:**

| Page | Route | Blocks Consumed | State |
|------|-------|----------------|-------|
| `DashboardPage` | `/` | `ProductivityChart`, `AIInsightCard` (×2), `HabitTracker` | None (read-only) |
| `FocusPage` | `/focus` | `FocusTimer` | None (hook-internal) |
| `TasksPage` | `/tasks` | `TaskBoard` | `Task[]` via `useState` |
| `HabitsPage` | `/habits` | `StreakCalendar`, `HabitTracker` | `Habit[]` via `useState` |
| `AnalyticsPage` | `/analytics` | `ProductivityChart`, `AIInsightCard` (×3) | None (read-only) |

---

## 4.4 Dependency Flow

The strict unidirectional dependency flow across the monorepo is enforced at multiple levels:

```
External Libraries (Radix UI, Recharts, date-fns, @hello-pangea/dnd)
       ↓
packages/ui/src/components/  (Atomic Primitives — Layer 2)
       ↓
packages/ui/src/types/       (Domain Interfaces — Layer 3c)
       ↓
packages/ui/src/hooks/       (Custom Hooks — Layer 3b)
       ↓
packages/ui/src/blocks/      (Composite Blocks — Layer 3)
       ↓
apps/web/app/**/page.tsx     (Integration Pages — Layer 4)
```

**Cross-package import path:** `@workspace/ui/blocks/*`, `@workspace/ui/components/*`, `@workspace/ui/types/*`, `@workspace/ui/hooks/*`

This alias system — configured in both `packages/ui/tsconfig.json` and `apps/web/tsconfig.json` — serves as the enforced API surface of the UI package. No relative imports cross the package boundary.

**Prohibited flows (never present in the codebase):**
- `apps/web` → relative import into `packages/ui` source
- `packages/ui/blocks/*` → import from `apps/web`
- `packages/ui/blocks/*` → import from another block in `packages/ui/blocks/*`
- `packages/ui/components/*` → import from `packages/ui/blocks/*`

---

## 4.5 CBSD Formal Analysis

### Component Granularity
The architecture operates at three levels of component granularity:
- **Fine-grained (Atomic):** `Button`, `Badge`, `Skeleton`, `Progress` — single-purpose, stateless, no domain knowledge
- **Medium-grained (Composite):** `FocusTimer`, `HabitTracker`, `AIInsightCard` — domain-aware, typed against domain interfaces, encapsulate limited interaction state
- **Coarse-grained (Page):** `DashboardPage`, `TasksPage`, `HabitsPage` — own application state, mediate between blocks, define layout

### Encapsulation
Each block encapsulates its:
- Primitive composition (internal rendering structure is hidden from pages)
- Derived computations (e.g., `completionPercentage` in `HabitTracker`, `progress` in `useFocusTimer`)
- Interaction geometry (e.g., drag-and-drop column management in `TaskBoard`)

Pages interact with blocks exclusively through the declared props interface, never through internal state inspection.

### Reusability
Two blocks are demonstrably reused without modification:
- `ProductivityChart` — consumed by `DashboardPage` and `AnalyticsPage`
- `AIInsightCard` — consumed by `DashboardPage` (×2) and `AnalyticsPage` (×3)

This validates the block abstraction boundary: the component's internal structure is stable across different integration contexts.

### Composability
`DashboardPage` demonstrates that blocks compose without coupling: `ProductivityChart`, `AIInsightCard`, and `HabitTracker` coexist in a shared CSS grid without any inter-block communication. They are assembled as independent units by the page mediator.
