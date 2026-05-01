# TAB 5 — MISCELLANEOUS

## NovaDash · Tools, Conventions, Inventory & Optimizations

---

## 5.1 Tools & Technology Stack

### Build Infrastructure

| Tool | Version | Role |
|------|---------|------|
| **Turborepo** | `^2.4.2` | Monorepo task orchestration with DAG-based pipeline caching |
| **pnpm** | `10.4.1` | Workspace-aware package manager with strict dependency hoisting |
| **Node.js** | `≥ 20` | JavaScript runtime (enforced via `engines` in root `package.json`) |

### Application Framework

| Tool | Version | Role |
|------|---------|------|
| **Next.js** | `15.x` | React server-rendering framework with App Router |
| **React** | `19.x` (via Next.js 15) | UI component runtime |
| **TypeScript** | `^5.x` | Static type system for all source files |

### UI & Styling

| Tool | Version | Role |
|------|---------|------|
| **Tailwind CSS** | `^3.x` | Utility-first CSS framework consuming CSS custom property tokens |
| **shadcn/ui** | Registry-based | Component scaffolding and Radix UI adaptation layer |
| **class-variance-authority (CVA)** | `^0.7.x` | Type-safe component variant resolution |
| **tailwind-merge** | `^2.x` | Tailwind class conflict resolution in `cn()` |
| **clsx** | `^2.x` | Conditional class string composition |
| **next-themes** | `^0.x` | React context-based light/dark theme management |
| **lucide-react** | `^0.x` | Consistent SVG icon library (Play, Pause, Flame, Brain, etc.) |

### Radix UI Primitive Packages

| Package | Usage |
|---------|-------|
| `@radix-ui/react-tabs` | `Tabs` compound |
| `@radix-ui/react-dialog` | `Dialog` and `Sheet` compounds |
| `@radix-ui/react-select` | `Select` compound |
| `@radix-ui/react-checkbox` | `Checkbox` primitive |
| `@radix-ui/react-tooltip` | `Tooltip` compound |
| `@radix-ui/react-popover` | `Popover` compound |
| `@radix-ui/react-avatar` | `Avatar` compound |
| `@radix-ui/react-progress` | `Progress` primitive |
| `@radix-ui/react-separator` | `Separator` primitive |
| `@radix-ui/react-switch` | `Switch` primitive |
| `@radix-ui/react-slider` | `Slider` primitive |
| `@radix-ui/react-scroll-area` | `ScrollArea` compound |
| `@radix-ui/react-alert-dialog` | `AlertDialog` compound |
| `@radix-ui/react-label` | `Label` primitive |

### Data Visualization & Interaction

| Tool | Role |
|------|------|
| **recharts** | SVG charting engine (AreaChart, BarChart) wrapped by `ChartContainer` |
| **@hello-pangea/dnd** | Drag-and-drop engine for `TaskBoard` Kanban columns |
| **date-fns** | Date arithmetic in `StreakCalendar` (subDays, startOfWeek, addDays, format) |
| **react-day-picker** | Calendar date-picker wrapped by `Calendar` primitive |
| **sonner** | Toast notification engine wrapped by `Toaster` |

### Developer Tooling

| Tool | Role |
|------|------|
| **ESLint** | Static code analysis — shared rules via `packages/eslint-config` |
| **TypeScript Compiler** | Strict type-checking — shared config via `packages/typescript-config` |
| **PostCSS** | Tailwind CSS processing pipeline |
| **Git** | Version control with conventional commit messages |

---

## 5.2 Commit Conventions

NovaDash follows the **Conventional Commits** specification throughout the development history. All 32 commits (excluding the initial commit) conform to the format:

```
<type>(<scope>): <description>
```

### Commit Types Used

| Type | Count | Meaning |
|------|-------|---------|
| `feat` | 28 | New feature or component introduced |
| `chore` | 1 | Non-functional maintenance task (config setup) |
| `refactor` | 1 | Code restructuring without behaviour change |
| `fix` | 1 | Bug fix (build errors, import path corrections) |

### Scope Taxonomy

| Scope | Commits | Represents |
|-------|---------|------------|
| `(ui)` | 15 | Addition of a primitive component to `packages/ui/src/components/` |
| `(blocks)` | 6 | Addition of a composite block to `packages/ui/src/blocks/` |
| `(pages)` | 5 | Assembly of a route page in `apps/web/app/` |
| `(hooks)` | 1 | Addition of a custom hook to `packages/ui/src/hooks/` |
| `(types)` | 1 | Definition of domain TypeScript interfaces |
| `(core)` | 1 | Cross-cutting refactor of the core library |
| *(none)* | 2 | Root-level changes (globals.css, Next.js scaffold) |

### Convention Compliance Assessment

The commit history demonstrates **strict scope discipline**: the `(ui)` scope is never applied to block commits, and the `(blocks)` scope is never applied to primitive commits. This reflects the developer's consistent awareness of the architectural layer being modified at each commit point.

---

## 5.3 Component Inventory (Verified Count)

### `packages/ui/src/components/` — Atomic Primitives

| # | File | Exported Members |
|---|------|-----------------|
| 1 | `button.tsx` | `Button`, `buttonVariants` |
| 2 | `card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| 3 | `badge.tsx` | `Badge`, `badgeVariants` |
| 4 | `avatar.tsx` | `Avatar`, `AvatarImage`, `AvatarFallback` |
| 5 | `progress.tsx` | `Progress` |
| 6 | `input.tsx` | `Input` |
| 7 | `textarea.tsx` | `Textarea` |
| 8 | `label.tsx` | `Label` |
| 9 | `tabs.tsx` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| 10 | `dialog.tsx` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` |
| 11 | `select.tsx` | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectValue`, `SelectSeparator` |
| 12 | `checkbox.tsx` | `Checkbox` |
| 13 | `tooltip.tsx` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` |
| 14 | `popover.tsx` | `Popover`, `PopoverTrigger`, `PopoverContent` |
| 15 | `separator.tsx` | `Separator` |
| 16 | `chart.tsx` | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle` |
| 17 | `skeleton.tsx` | `Skeleton` |
| 18 | `switch.tsx` | `Switch` |
| 19 | `slider.tsx` | `Slider` |
| 20 | `scroll-area.tsx` | `ScrollArea`, `ScrollBar` |
| 21 | `calendar.tsx` | `Calendar` |
| 22 | `table.tsx` | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` |
| 23 | `alert.tsx` | `Alert`, `AlertDescription`, `AlertTitle` |
| 24 | `alert-dialog.tsx` | `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogAction`, `AlertDialogCancel` |
| 25 | `sheet.tsx` | `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose` |
| 26 | `sonner.tsx` | `Toaster` |

**Total: 26 primitive modules | ~70 individually exported sub-components**

---

### `packages/ui/src/blocks/` — Composite Blocks

| # | File | Exported Members | Lines of Code |
|---|------|-----------------|---------------|
| 1 | `focus-timer.tsx` | `FocusTimer` | 64 |
| 2 | `productivity-chart.tsx` | `ProductivityChart` | 109 |
| 3 | `ai-insight-card.tsx` | `AIInsightCard` | 106 |
| 4 | `habit-tracker.tsx` | `HabitTracker` | 112 |
| 5 | `streak-calendar.tsx` | `StreakCalendar` | 147 |
| 6 | `task-board.tsx` | `TaskBoard` | 214 |

**Total: 6 composite block modules | 752 lines of block code**

---

### `packages/ui/src/hooks/` — Custom Hooks

| # | File | Exported Members | Lines of Code |
|---|------|-----------------|---------------|
| 1 | `use-focus-timer.ts` | `useFocusTimer` | 39 |

**Total: 1 hook module**

---

### `packages/ui/src/types/` — Domain Interfaces

| # | File | Interfaces & Types |
|---|------|--------------------|
| 1 | `task.ts` | `Task`, `TaskStatus`, `TaskPriority` |
| 2 | `habit.ts` | `Habit`, `HabitFrequency` |
| 3 | `insight.ts` | `Insight`, `InsightType`, `InsightPriority` |
| 4 | `analytics.ts` | `FocusSession`, `AnalyticsData` |
| 5 | `activity.ts` | `ActivityRecord` |

**Total: 5 type modules | 12 named exports**

---

### `apps/web/app/` — Application Pages

| # | Route | File | Blocks Used |
|---|-------|------|-------------|
| 1 | `/` | `page.tsx` | `ProductivityChart`, `AIInsightCard`, `HabitTracker` |
| 2 | `/focus` | `focus/page.tsx` | `FocusTimer` |
| 3 | `/tasks` | `tasks/page.tsx` | `TaskBoard` |
| 4 | `/habits` | `habits/page.tsx` | `StreakCalendar`, `HabitTracker` |
| 5 | `/analytics` | `analytics/page.tsx` | `ProductivityChart`, `AIInsightCard` |
| 6 | *(layout)* | `layout.tsx` | `ThemeProvider` |

**Total: 5 route pages + 1 root layout**

---

## 5.4 Refactoring Efforts

### Refactor 1 — CBSD Compliance Pass (Commit `97b09b5`, Apr 29)
**Scope:** `packages/ui/package.json`, `packages/ui/src/blocks/streak-calendar.tsx`
**Nature:** Structural correction — package export map misalignment
**Change:** Corrected the `package.json` export entries to accurately reflect the `@workspace/ui/*` alias path conventions established in the `tsconfig.json` path mappings. Resolved `streak-calendar.tsx` import paths that were using relative references instead of the canonical workspace alias.
**Impact:** Restored correct module resolution for all six block components and eliminated build-time `Module not found` errors introduced by the cross-package boundary configuration.

### Refactor 2 — Full Import Path Normalisation (Commit `66398bd`, Apr 29)
**Scope:** All 6 block files, all 26+ primitive component files, `apps/web` configuration files
**Nature:** Cross-cutting import path standardisation
**Change:** Replaced all relative import paths (e.g., `../components/card`) within `packages/ui/src/blocks/` with canonical workspace alias paths (e.g., `@workspace/ui/components/card`). Corrected Tailwind `content` globs in `apps/web/tailwind.config.ts` to include `../../packages/ui/src/**/*.tsx`. Fixed CSS `@layer` directive ordering in `globals.css`.
**Impact:** Achieved a clean `turbo run build` exit across both `packages/ui` and `apps/web`, resolving all CSS purge, module resolution, and TypeScript path alias failures.

---

## 5.5 Optimizations

### Optimization 1 — Memoized Month Label Computation (StreakCalendar)
**Location:** `packages/ui/src/blocks/streak-calendar.tsx`
**Implementation:**
```tsx
const monthLabels = React.useMemo(() => {
  // O(weeks) loop to derive month boundary positions
}, [weeksData])
```
**Rationale:** The month label derivation iterates over the `weeksData` array (up to 16 weeks = 112 elements) to identify month boundaries. Without memoization, this computation would re-execute on every parent re-render. `React.useMemo` caches the result and recomputes only when `weeksData` (derived from `data` and `weeks` props) changes. This is particularly significant in `HabitsPage`, where `generateMockStreakData()` is called inline — the calendar data is stable per render, making memoization effective.

### Optimization 2 — Optimistic Drag State (TaskBoard)
**Location:** `packages/ui/src/blocks/task-board.tsx`
**Implementation:** Local `boardData` state is updated synchronously within `onDragEnd` before the `onTaskMove` callback is invoked.
**Rationale:** Separating local board rendering state from parent state prevents the UI from waiting for the parent's `setTasks` call to propagate before reflecting the drop result. The user perceives immediate, zero-latency feedback on card placement.

### Optimization 3 — Tooltip Context Hoisting (StreakCalendar)
**Location:** `packages/ui/src/blocks/streak-calendar.tsx`
**Implementation:**
```tsx
<TooltipProvider delayDuration={100}>
  <div className="flex flex-1 gap-1">
    {weeksData.map(...)} {/* up to 112 Tooltip instances */}
  </div>
</TooltipProvider>
```
**Rationale:** `TooltipProvider` is rendered once at the block level rather than once per cell. Radix UI's tooltip context is shared across all 112 `Tooltip` instances, avoiding redundant React context creation and subscription overhead for each cell.

### Optimization 4 — CSS Custom Property Design Token System
**Location:** `apps/web/app/globals.css`
**Rationale:** Using CSS custom properties (e.g., `hsl(var(--primary))`) rather than hardcoded colour values enables the entire application's colour scheme to switch between light and dark mode by toggling a single CSS class (`.dark`) on the `<html>` element. No JavaScript colour calculations or component re-renders are required for theme switching — the browser's CSS cascade handles all visual updates natively.

### Optimization 5 — Variant Lookup Maps (AIInsightCard)
**Location:** `packages/ui/src/blocks/ai-insight-card.tsx`
**Implementation:**
```tsx
const typeConfig = {
  productivity: { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
  focus:        { icon: Brain,      color: "text-purple-500", bg: "bg-purple-500/10" },
  health:       { icon: Sparkles,   color: "text-green-500",  bg: "bg-green-500/10" },
  general:      { icon: Lightbulb,  color: "text-amber-500",  bg: "bg-amber-500/10" },
}
```
**Rationale:** Object lookup maps (`O(1)`) replace `switch`/`if-else` chains (`O(n)`) for resolving visual configuration from discriminated union values. This pattern also makes adding new `InsightType` variants a purely additive operation — no branching logic needs modification.

---

## 5.6 Summary Statistics

| Metric | Value |
|--------|-------|
| Total commits (excl. initial) | 32 |
| Development duration | ~3 weeks (Apr 8 – Apr 29, 2026) |
| Primitive component modules | 26 |
| Composite block modules | 6 |
| Custom hook modules | 1 |
| Domain type modules | 5 |
| Application page routes | 5 |
| Total block code (lines) | 752 |
| Patterns identified | 19 |
| External library dependencies | 14+ |
| Refactoring commits | 2 |
| Build fix commits | 1 |
| Monorepo packages | 4 (`ui`, `typescript-config`, `eslint-config`, `web`) |
