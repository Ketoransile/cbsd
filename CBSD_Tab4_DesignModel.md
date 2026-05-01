# TAB 4 — DESIGN & COMPONENT MODEL

## NovaDash · Architectural Design & Component-Based Software Development Analysis

4.1 Overview
 NovaDash uses a Turborepo monorepo with a strict bottom-up architecture and clear package boundaries. The UI library is fully independent and built before the application, enforcing unidirectional dependency. This follows CBSD by assembling systems from reusable, independent components.

4.2 Bottom-Up Architecture
 The system is structured into four layers: external libraries, primitives, blocks, and pages. Each layer depends only on the one below it and is built in sequence. Turborepo enforces this order through its dependency pipeline.

4.3 Layer 1 — External Foundation
 This layer consists of third-party libraries like Radix UI, Recharts, and date-fns. These provide low-level functionality such as accessibility, charts, and date handling. They are only used inside primitives to maintain abstraction.

4.4 Layer 2 — Atomic Primitives
 Primitives are reusable UI components like Button, Card, and Input built on top of external libraries. They handle styling and structure but contain no business logic. All components follow consistent patterns using forwardRef and shared design tokens.

4.5 Layer 3 — Composite Blocks
 Blocks combine multiple primitives into meaningful domain components like TaskBoard and HabitTracker. They accept typed props and delegate state changes through callbacks. Blocks do not depend on each other, ensuring loose coupling.

4.6 Layer 3b — Custom Hooks
 Custom hooks encapsulate complex logic separately from UI components. The useFocusTimer hook manages timer behavior independently of rendering. This enforces separation of concerns and improves reusability.

4.7 Layer 3c — Domain Types
 All domain interfaces such as Task, Habit, and Insight are defined in a shared types layer. This ensures a single source of truth for data structures. Both blocks and pages rely on these shared contracts.

4.8 Layer 4 — Pages
 Pages act as integration points that combine blocks into full layouts. They manage state, provide data, and handle user interactions. Pages do not contain reusable UI logic, only composition and coordination.

4.9 Dependency Flow
 The system follows a strict one-directional flow from libraries to primitives, blocks, and finally pages. No layer imports from a higher layer, preventing circular dependencies. This ensures maintainability and scalability.

4.10 CBSD Analysis — Granularity
 The system uses three levels of components: atomic, composite, and page-level. Each level has a clear responsibility and scope. This separation improves modularity and clarity.

4.11 CBSD Analysis — Encapsulation
 Each component hides its internal logic and exposes only a defined interface. Blocks manage their own structure and derived values. Pages interact only through props, ensuring clean boundaries.

4.12 CBSD Analysis — Reusability
 Components like ProductivityChart and AIInsightCard are reused across multiple pages without modification. This demonstrates stable and well-designed interfaces. It confirms adherence to reusable component design.

4.13 CBSD Analysis — Composability
 Blocks are designed to work together without direct dependencies. Pages combine them freely into layouts. This enables flexible UI construction and easy extension.

4.14 Full-Stack CBSD Integration
 The architecture has been successfully extended into a complete full-stack system with the introduction of a native MongoDB data layer. Mongoose schemas establish strict server-side domain models that enforce the contracts defined by the shared UI types. API routes and server actions now mediate all interactions between the presentation layer and the database.

4.15 Authentication Layer Integration
 Authentication was integrated as a cross-cutting concern using Better Auth with a native MongoDB adapter. Google OAuth and email credential flows have been seamlessly incorporated into the application router. The authentication client interacts natively with the UI primitives, ensuring that session management and secure routing respect the strict boundaries of the CBSD architecture.
