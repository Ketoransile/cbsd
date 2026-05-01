# TAB 3 — INTEGRATION PATTERNS

## NovaDash · Design Patterns Identified Per Development Day

---

> All patterns documented here are directly evidenced in the committed source code.
> Pattern names follow standard GoF, enterprise, and React-ecosystem classification.

---

## DAY 1 — April 8, 2026

### Pattern 1: Pipeline Pattern (Turborepo Task Graph)
**Location:** `turbo.json`
**Evidence:**
```json
"build": { "dependsOn": ["^build"] },
"lint": { "dependsOn": ["^lint"] }
```
**Description:** The `"^build"` syntax in Turborepo defines a topological dependency: every package's `build` task must complete before any package that depends on it can build. This constitutes a directed acyclic graph (DAG) pipeline where `packages/ui` is always resolved and built prior to `apps/web`. This is an implementation of the **Pipeline Pattern**, commonly used in build systems and stream processors, enforcing correct data/artifact flow through a multi-stage execution graph.

---

### Pattern 2: Shared Kernel (Monorepo Configuration Packages)
**Location:** `packages/typescript-config/`, `packages/eslint-config/`
**Evidence:** Both packages are declared in `pnpm-workspace.yaml` and consumed via `"extends"` in per-package `tsconfig.json` files.
**Description:** Extracting shared configuration into dedicated workspace packages implements the **Shared Kernel** pattern from Domain-Driven Design — a bounded context shared by multiple consumers. TypeScript and ESLint rules are authored once and propagated via package resolution, preventing configuration drift across all workspace members.

---

## DAY 2 — April 10, 2026

### Pattern 3: Provider Pattern (ThemeProvider Context)
**Location:** `apps/web/components/providers.tsx`, `apps/web/app/layout.tsx`
**Evidence:**
```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```
**Description:** The `ThemeProvider` component implements the **Provider Pattern** — a React-specific instantiation of the **Mediator Pattern** — establishing a React context that broadcasts the active theme value to all descendant components. No child component needs to know how theme detection or switching is implemented; they simply consume the context. This decouples theming infrastructure from component implementations.

### Pattern 4: Token System / Abstract Factory (CSS Custom Properties)
**Location:** `apps/web/app/globals.css`
**Evidence:** Twenty-one CSS custom properties defined on `:root` and `.dark`, consumed as `hsl(var(--primary))` by all Tailwind utilities.
**Description:** The CSS custom property design token layer implements an **Abstract Factory** for visual values: consuming components request a token (e.g., `--primary`) without knowing the concrete colour value. Switching from light to dark mode is achieved by redefining the token values on `.dark`, not by altering component styles. This is equivalent to the Factory's `ConcreteFactory` substitution at theme-switch time.

---

## DAY 3 — April 11, 2026

### Pattern 5: Compound Component Pattern (Card, Avatar)
**Location:** `packages/ui/src/components/card.tsx`, `packages/ui/src/components/avatar.tsx`
**Evidence:**
```tsx
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
export { Avatar, AvatarImage, AvatarFallback }
```
**Description:** Both families implement the **Compound Component Pattern** — a set of related components that share an implicit contract and are designed to be composed together. Each sub-component handles a distinct structural concern (container, header, body, footer; image, fallback) while remaining individually importable. This pattern enables consumers to selectively omit or reorder sub-components without the parent component needing to know the composition structure.

### Pattern 6: Variant Strategy Pattern (CVA)
**Location:** `packages/ui/src/components/badge.tsx`, `packages/ui/src/components/button.tsx`
**Evidence:**
```tsx
const badgeVariants = cva("...", {
  variants: { variant: { default: "...", secondary: "...", destructive: "...", outline: "..." } }
})
```
**Description:** `class-variance-authority` implements a **Strategy Pattern** for visual variant resolution. The `cva()` function defines a strategy interface (the variant map), and each variant key represents a concrete strategy (a set of Tailwind classes). At render time, the component selects the appropriate strategy based on the `variant` prop, producing the correct class string. This replaces conditional class logic (`if variant === 'destructive'`) with a declarative, type-safe strategy registry.

---

## DAY 4 — April 13, 2026

### Pattern 7: Adapter Pattern (Radix UI Wrappers)
**Location:** `packages/ui/src/components/tabs.tsx`, `packages/ui/src/components/dialog.tsx`, `packages/ui/src/components/select.tsx`, `packages/ui/src/components/checkbox.tsx`
**Evidence:**
```tsx
const TabsTrigger = React.forwardRef<..., ...>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn(..., className)} {...props} />
))
```
**Description:** Each shadcn/ui component implements the **Adapter Pattern**: it wraps the Radix UI primitive's interface (which provides accessibility and behaviour) and exposes it through a styled, design-system-aware interface. The `cn(defaultStyles, className)` pattern within each `forwardRef` wrapper adapts the raw Radix API to the NovaDash design token system without modifying the underlying primitive. This allows the design system to change visual rules without altering Radix's interaction behaviour.

---

## DAY 5 — April 15, 2026

### Pattern 8: Façade Pattern (ChartContainer)
**Location:** `packages/ui/src/components/chart.tsx`
**Evidence:**
```tsx
export function ChartContainer({ config, children, className }: ChartContainerProps) {
  // Injects CSS vars from config, renders ResponsiveContainer wrapper
}
```
**Description:** `ChartContainer` implements the **Façade Pattern** over the Recharts library. It hides the complexity of `ResponsiveContainer`, CSS variable injection, `ChartStyle` management, and config object processing behind a single component interface. `ProductivityChart` interacts only with `ChartContainer` and receives chart colour values from it implicitly — Recharts internals are entirely invisible to the consuming block.

### Pattern 9: Null Object Pattern (Skeleton)
**Location:** `packages/ui/src/components/skeleton.tsx`, `packages/ui/src/blocks/ai-insight-card.tsx`
**Evidence:**
```tsx
if (isLoading) {
  return <Card>...<Skeleton className="h-4 w-3/4" />...</Card>
}
```
**Description:** The `Skeleton` component in combination with the `isLoading` guard in `AIInsightCard` implements the **Null Object Pattern**: rather than rendering `null` or a spinner during data loading, a structurally identical but content-free version of the component is rendered. This eliminates layout shift (the skeleton occupies the same geometry as the populated card) and provides accessible loading feedback without conditional logic complexity at the consuming page layer.

---

## DAY 6 — April 17, 2026

### Pattern 10: Single Source of Truth (Domain Type System)
**Location:** `packages/ui/src/types/`
**Evidence:** All block components import types exclusively from `@workspace/ui/types/*`; all page components import the same types via the same path.
```tsx
import type { Task, TaskStatus } from "@workspace/ui/types/task"
import type { Habit } from "@workspace/ui/types/habit"
import type { Insight } from "@workspace/ui/types/insight"
```
**Description:** Co-locating all domain type interfaces within `packages/ui/src/types/` establishes a **Single Source of Truth** for data contracts. Both the block layer (`packages/ui/src/blocks/`) and the page layer (`apps/web/app/`) import from the same type definitions. Structural changes to a domain entity (e.g., adding a field to `Task`) propagate automatically to all consumers via TypeScript's type checker, eliminating interface drift.

---

## DAY 7 — April 20, 2026

### Pattern 11: Separation of Concerns via Custom Hook (useFocusTimer)
**Location:** `packages/ui/src/hooks/use-focus-timer.ts`, `packages/ui/src/blocks/focus-timer.tsx`
**Evidence:**
```tsx
// Block: delegates all state to hook
const { timeLeft, progress, isRunning, sessionType, toggleTimer, resetTimer } = useFocusTimer()
// Hook: owns all timer logic
const [timeLeft, setTimeLeft] = useState(25 * 60)
useEffect(() => { ... }, [isRunning, timeLeft, sessionType])
```
**Description:** The `useFocusTimer` / `FocusTimer` pair implements a strict **Separation of Concerns** between behavioural and presentational layers — a React-ecosystem application of the **Model-View separation** principle. The hook (`useFocusTimer`) serves as the Model: it owns all state (`timeLeft`, `isRunning`, `sessionType`), derives computed values (`progress`), and manages side effects (`useEffect` countdown). The block (`FocusTimer`) serves as the View: it receives model state and renders it without any logic of its own. The hook is independently testable without mounting any React component.

### Pattern 12: Observer Pattern (Props-Driven Reactive Updates)
**Location:** `packages/ui/src/blocks/productivity-chart.tsx`
**Evidence:**
```tsx
const [metric, setMetric] = React.useState("focus")
<Select value={metric} onValueChange={setMetric}>
<Area dataKey={metric} ... />
```
**Description:** The `ProductivityChart` implements the **Observer Pattern** via React's controlled component model. The `Select` component observes the `metric` state and triggers `setMetric` on change. The `Area` component observes `metric` as its `dataKey` prop and re-renders accordingly. This is a declarative, React-native implementation of Observer: state is the Subject; the chart and the select are Observers that re-render whenever the subject changes.

---

## DAY 8 — April 22, 2026

### Pattern 13: Inversion of Control via Callback Props (HabitTracker)
**Location:** `packages/ui/src/blocks/habit-tracker.tsx`
**Evidence:**
```tsx
interface HabitTrackerProps {
  habits?: Habit[]
  onToggleHabit?: (habitId: string, completed: boolean) => void
}
// Block calls:
onToggleHabit?.(habit.id, checked === true)
```
**Description:** `HabitTracker` implements **Inversion of Control (IoC)** via callback props. The block does not own the `habits` array state, nor does it perform any mutation. It signals user intent upward via the `onToggleHabit` callback, and the consuming page decides how to respond (updating local state, making an API call, etc.). This decouples the block from its data source entirely — the same block can be mounted in any context without modification.

### Pattern 14: Memoization / Derived Computation (StreakCalendar useMemo)
**Location:** `packages/ui/src/blocks/streak-calendar.tsx`
**Evidence:**
```tsx
const monthLabels = React.useMemo(() => {
  // derives month boundary label positions from weeksData
}, [weeksData])
```
**Description:** `StreakCalendar` applies **Memoization** via `React.useMemo` to the month label derivation computation. The `weeksData` array is a stable reference across re-renders unless the `data` or `weeks` props change. By memoizing the derived label array, redundant date-parsing and array-iteration work is eliminated on re-renders triggered by parent state changes unrelated to the calendar data. This is an instance of the **Caching / Flyweight** pattern applied at the component computation level.

---

## DAY 9 — April 24, 2026

### Pattern 15: Composite Pattern (DashboardPage Multi-Block Layout)
**Location:** `apps/web/app/page.tsx`
**Evidence:**
```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
  <div className="col-span-4">
    <ProductivityChart />
    {mockInsights.map(insight => <AIInsightCard key={insight.id} insight={insight} />)}
  </div>
  <div className="col-span-3">
    <HabitTracker habits={mockHabits} />
  </div>
</div>
```
**Description:** `DashboardPage` implements the **Composite Pattern**: it treats individual blocks (`ProductivityChart`, `AIInsightCard`, `HabitTracker`) and collections of blocks (the mapped `AIInsightCard` array) uniformly as children of the page layout grid. The page does not distinguish between single-block and multi-block slots — both are rendered as grid children. This enables the layout to be extended with additional blocks without structural refactoring.

---

## DAY 10 — April 27, 2026

### Pattern 16: Mediator Pattern (TasksPage handleTaskMove)
**Location:** `apps/web/app/tasks/page.tsx`
**Evidence:**
```tsx
const handleTaskMove = (taskId: string, newStatus: TaskStatus, newIndex: number) => {
  setTasks(current =>
    current.map(task =>
      task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date() } : task
    )
  )
}
// Passed to block:
<TaskBoard tasks={tasks} onTaskMove={handleTaskMove} />
```
**Description:** `TasksPage` implements the **Mediator Pattern**: the page acts as a central coordinator that intercepts drag-and-drop events from `TaskBoard` and mediates the corresponding state mutation. `TaskBoard` and the page state do not communicate directly — all communication passes through the `handleTaskMove` mediator function. This prevents `TaskBoard` from needing knowledge of how the parent's state is structured, keeping the block fully decoupled from the state management strategy.

### Pattern 17: Optimistic UI Update Pattern (TaskBoard onDragEnd)
**Location:** `packages/ui/src/blocks/task-board.tsx`
**Evidence:**
```tsx
// Mutates local boardData state before calling onTaskMove
setBoardData(prev => ({ ...prev, [sourceStatus]: sourceCol, [destStatus]: destCol }))
if (onTaskMove) { onTaskMove(draggableId, destStatus, destination.index) }
```
**Description:** `TaskBoard` implements the **Optimistic UI Update** pattern: the drag result is immediately reflected in local component state (`boardData`) before the `onTaskMove` callback propagates the change to the parent. This gives the user instant visual feedback regardless of async processing latency in the parent. The pattern trades consistency guarantees for perceived performance, a common and appropriate tradeoff in interactive UI components.

---

## DAY 11 — April 29, 2026

### Pattern 18: Component Reuse / Open-Closed Principle (ProductivityChart, AIInsightCard)
**Location:** `apps/web/app/analytics/page.tsx`, `apps/web/app/page.tsx`
**Evidence:** Both `ProductivityChart` and `AIInsightCard` are imported and rendered identically in both `DashboardPage` and `AnalyticsPage` without modification.
**Description:** The reuse of `ProductivityChart` and `AIInsightCard` across two independent pages — without altering their implementations — validates adherence to the **Open-Closed Principle**: components are open for extension (via props) but closed for modification. The block's props interface acts as the extension mechanism; the page supplies different data without the block needing to change.

### Pattern 19: Immutable State Update Pattern (HabitsPage handleToggleHabit)
**Location:** `apps/web/app/habits/page.tsx`
**Evidence:**
```tsx
setHabits(current => current.map(h => {
  if (h.id === id) {
    return { ...h, completionHistory: { ...h.completionHistory, [dateStr]: completed } }
  }
  return h
}))
```
**Description:** `HabitsPage`'s `handleToggleHabit` function applies the **Immutable Update Pattern**: the `habits` array and the `completionHistory` record are never mutated in place. Instead, a new array is produced via `.map()`, and within the matched habit, a new `completionHistory` object is produced via object spread (`{ ...h.completionHistory, [dateStr]: completed }`). This ensures React's referential equality checks correctly trigger re-renders and prevents shared-reference bugs.
