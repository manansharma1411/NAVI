# NAVI Design System & UI Architecture

## 1. Design Vision & Brand Identity

**NAVI** (*Neural Autonomous Web Intelligence*) is an autonomous web browser agent designed for developers and knowledge workers. The design language reflects precision, architectural depth, and restrained aesthetics inspired by tools like **Linear**, **Raycast**, **Arc**, and **Perplexity**.

> **Tagline**: *"You set the goal. NAVI navigates the web."*

### Design Philosophy
- **Restrained Dark Theme**: Uses dark slate and charcoal bases (`#090D16`, `#0F1626`) rather than harsh pure black (`#000000`).
- **Precision Accents**: Electric Indigo (`#6366F1`) and Neon Cobalt Blue (`#3B82F6`) provide high visual focus. Violet (`#8B5CF6`) is reserved sparingly for perception/vision highlights.
- **Micro-Depth**: Surfaces layer via subtle `1px` translucent highlights (`inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`) and dark diffused drop shadows rather than heavy borders.
- **Functional Typography**: Clear distinction between human directives (Inter Sans) and telemetry tokens/code (JetBrains Mono).
- **Subtle Motion**: Animations communicate state changes (task dispatch, step progress, modal opening, toast notifications) without decorative fluff.

---

## 2. Design Tokens

### 2.1 Color Palette

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| `background` | `#090D16` | Main viewport canvas |
| `surface-200` | `#0F1626` | Sidebars, panels, cards, base UI layers |
| `surface-100` | `#141C2E` | Elevated cards, dropdown menus, modals |
| `surface-50` | `#1A2338` | Interactive hover states, active pill backgrounds |
| `surface-border` | `#1E293B` | Default structural border |
| `border-subtle` | `rgba(255, 255, 255, 0.06)` | Translucent inner card dividers |
| `brand-500` | `#6366F1` | Primary Electric Indigo |
| `brand-600` | `#4F46E5` | Primary action button fill |
| `brand-accent` | `#3B82F6` | Neon Cobalt Blue (links, active cursor, CDP cues) |
| `brand-violet` | `#8B5CF6` | Visual perception frames / screenshots |
| `status-success` | `#10B981` | Verified actions, online health, active tab |
| `status-warning` | `#F59E0B` | Standby states, human approval required |
| `status-error` | `#EF4444` | Action failures, disconnected endpoints |

### 2.2 Typography Scale

- **Sans Stack**: `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`
- **Mono Stack**: `JetBrains Mono, Fira Code, Consolas, monospace`

| Scale | Size | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display / H1** | 20px - 24px (`1.25rem - 1.5rem`) | `font-bold` | `-0.025em` | Page Titles |
| **Section / H2** | 14px - 16px (`0.875rem - 1rem`) | `font-semibold` | `-0.015em` | Card Headers, Dialog Titles |
| **Body** | 12px - 13px (`0.75rem - 0.8125rem`) | `font-normal` | `normal` | General descriptions, options |
| **Caption / Label** | 10px - 11px (`0.625rem - 0.6875rem`) | `font-medium` | `0.02em` | Uppercase section badges, tags |
| **Code / Monospace** | 10px - 11px (`0.625rem - 0.6875rem`) | `font-mono` | `normal` | DOM selectors, CDP coordinates, timings |

### 2.3 Elevation & Shadows

- `shadow-subtle-border`: `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` (Provides a crisp top edge on cards).
- `shadow-elevated`: `0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
- `shadow-modal`: `0 20px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`
- `shadow-glow-brand`: `0 0 20px -3px rgba(99, 102, 241, 0.25)`

---

## 3. Component Architecture (`frontend/src/components/ui/`)

| Component | File | Variants / Features |
| :--- | :--- | :--- |
| **Button** | `Button.tsx` | `primary`, `secondary`, `outline`, `ghost`, `danger`. Sizes: `sm`, `md`, `lg`. Supports loading spinners and left/right icon slots. |
| **IconButton** | `IconButton.tsx` | Square icon button for toolbars and modal close triggers. Full ARIA accessibility. |
| **Input** | `Input.tsx` | Styled text field with optional `leftIcon`, `rightIcon`, label, helper hint, and error states. |
| **Textarea** | `Textarea.tsx` | Multi-line goal input with character counting and keyboard submission cues (`⌘↵`). |
| **Tooltip** | `Tooltip.tsx` | Accessible hover/focus tooltip with smooth micro-fade animation. |
| **Dropdown** | `Dropdown.tsx` | Floating menu with keyboard shortcuts, dividers, danger actions, and click-outside dismissal. |
| **Badge** & **Kbd** | `Badge.tsx` | Status tags (`neutral`, `brand`, `success`, `warning`, `error`, `outline`) and keyboard shortcut pills (`<Kbd>⌘K</Kbd>`). |
| **StatusIndicator** | `StatusIndicator.tsx` | Pulsing real-time connection dot (`online`, `busy`, `standby`, `error`, `offline`). |
| **Dialog** | `Dialog.tsx` | Modal dialog with dark backdrop blur, escape listener, and click-outside detection. |
| **Toast** | `ToastContext.tsx` | Global toast notification provider (`useToast()`) with auto-dismiss and slide-down animations. |
| **Skeleton** | `Skeleton.tsx` | Shimmer placeholder blocks (`text`, `circular`, `rectangular`) for loading states. |
| **EmptyState** | `EmptyState.tsx` | Balanced empty state container with icon, title, description, and primary CTA. |
| **ErrorState** | `ErrorState.tsx` | Isolated error boundary display with stack diagnostics and retry buttons. |
| **LoadingIndicator** | `LoadingIndicator.tsx` | Sleek minimal spinning loader (`sm`, `md`, `lg`). |
| **NavigationItem** | `NavigationItem.tsx` | Sidebar/header navigation pill with active indicator and keyboard shortcut badge. |
| **Divider** | `Divider.tsx` | Subtle line divider with optional centered uppercase label. |
| **Card** | `Card.tsx` | Container surface (`default`, `elevated`, `interactive`). |

---

## 4. UX & Interaction Patterns

1. **Global Command Palette (`⌘K` / `Ctrl+K`)**:
   - Built into the header and accessible from anywhere via keyboard shortcut.
   - Allows instant navigation, goal template loading, and quick docs access.
2. **Keyboard Ergonomics**:
   - `⌘ + Enter` / `Ctrl + Enter`: Dispatches the goal from the composer.
   - `ESC`: Closes any active modal, dialog, or command palette.
   - `⌘K`: Toggles the command palette.
3. **Graceful Connection States**:
   - Instead of broken screens or blank states when the backend is offline, the workspace shows an informative alert banner with the exact target URL and resolution instructions.
