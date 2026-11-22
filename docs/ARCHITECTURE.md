# NAVI System Architecture

## 1. System Vision

NAVI (Neural Autonomous Web Intelligence) is an agentic system designed to bridge high-level human objectives with low-level web browser execution. Rather than running in an isolated headless container disconnected from user session context, NAVI leverages an in-browser Chromium extension paired with an intelligent reasoning backend and a real-time web command center.

---

## 2. Component Topology

```
+-----------------------------------------------------------------------------------+
|                                 USER INTERFACE                                    |
|                                                                                   |
|   +---------------------------------------------------------------------------+   |
|   |                        NAVI Web Dashboard (frontend/)                     |   |
|   |   - Goal Submission & Parameterization                                    |   |
|   |   - Real-Time Action Stream & Execution Log                               |   |
|   |   - Manual Override & Human-in-the-Loop Interventions                     |   |
|   |   - Session History & Verification Highlights                             |   |
|   +-------------------------------------+-------------------------------------+   |
+-----------------------------------------|-----------------------------------------+
                                          |
                                    REST / WebSockets
                                          |
+-----------------------------------------v-----------------------------------------+
|                              INTELLIGENCE & ORCHESTRATION                         |
|                                                                                   |
|   +---------------------------------------------------------------------------+   |
|   |                        NAVI Core Backend (backend/)                       |   |
|   |                                                                           |   |
|   |   +---------------------+   +---------------------+   +---------------+   |   |
|   |   | Planner & Reasoning |   | DOM Parser / Filter |   | State Machine |   |   |
|   |   | (Multi-Modal LLM)   |   | & Element Labeling  |   | & Guardrails  |   |   |
|   |   +---------------------+   +---------------------+   +---------------+   |   |
|   |                                                                           |   |
|   |   +-------------------------------------------------------------------+   |   |
|   |   | Action Protocol Dispatcher (Validates & Schematizes Actions)      |   |   |
|   |   +-------------------------------------------------------------------+   |   |
|   +-------------------------------------+-------------------------------------+   |
+-----------------------------------------|-----------------------------------------+
                                          |
                              WebSocket Bridge (shared/ schemas)
                                          |
+-----------------------------------------v-----------------------------------------+
|                               EXECUTION ENVIRONMENT                               |
|                                                                                   |
|   +---------------------------------------------------------------------------+   |
|   |                      NAVI Browser Extension (extension/)                  |   |
|   |                                                                           |   |
|   |   +------------------------+             +----------------------------+   |   |
|   |   | Background Worker      | <---------> | Content Scripts            |   |   |
|   |   | - WebSocket connection |             | - DOM inspection & hashing |   |   |
|   |   | - Tab management       |             | - Highlight & overlay cues |   |   |
|   |   | - Session lifecycle    |             | - Synthetic event fallback |   |   |
|   |   +-----------+------------+             +-------------+--------------+   |   |
|   |               |                                        |                  |   |
|   |               v                                        v                  |   |
|   |   +-------------------------------------------------------------------+   |   |
|   |   | CDP Engine (chrome.debugger) / Real Event Dispatcher              |   |   |
|   |   | - Trusted Click, Type, Scroll, Navigation, Screenshot Capture      |   |   |
|   |   +-------------------------------------------------------------------+   |   |
|   +-------------------------------------+-------------------------------------+   |
+-----------------------------------------|-----------------------------------------+
                                          |
                                    Native Browser
                                          |
                                          v
                              [ Target Web Application ]
```

---

## 3. Communication & Data Flow Lifecycle

Each agent loop iteration follows a deterministic Observe-Plan-Act-Verify cycle:

```
    [ 1. Observe ]
    Extension captures tab state:
    - Pruned, accessible DOM tree with stable element IDs
    - High-resolution viewport screenshot
    - Current URL and navigation state
          │
          ▼
    [ 2. Transmit ]
    Extension sends StateObservation payload to Backend via WebSocket.
          │
          ▼
    [ 3. Analyze & Plan ]
    Backend Multi-Modal Agent:
    - Correlates DOM elements with visual coordinates
    - Evaluates distance to target goal
    - Synthesizes atomic next action (click, type, scroll, keypress, wait, finish)
          │
          ▼
    [ 4. Guard & Validate ]
    Action undergoes schema validation and safety boundary check
    (e.g., verifying against financial transaction or destructive action policies).
          │
          ▼
    [ 5. Execute ]
    Action command dispatched to Extension.
    Extension executes action using trusted CDP events or high-fidelity DOM dispatch.
          │
          ▼
    [ 6. Verify & Feedback ]
    Extension captures state post-action and reports execution status back to Backend.
    Telemetry broadcast to Frontend dashboard for user observation.
```

---

## 4. Subsystem Details

### 4.1 Frontend (`frontend/`)
- **Technology**: Modern TypeScript Single-Page Application.
- **Responsibilities**:
  - Live status telemetry and step-by-step audit visualization.
  - Interactive Goal Input with parameter constraints.
  - Human intervention controls (Pause, Resume, Stop, Manual Takeover).
  - Visual display of agent attention (element bounding boxes / screenshots).

### 4.2 Extension (`extension/`)
- **Technology**: Manifest V3 Chromium Extension.
- **Responsibilities**:
  - Direct connection to active tab context.
  - Clean DOM parsing and accessible tree extraction without bloated styling tags.
  - Reliable element resolution and action execution using `chrome.debugger` (CDP) for authentic clicks, keypresses, and navigation.
  - Transparent visual cues (e.g., subtle overlay indicators) showing what NAVI is inspecting.

### 4.3 Backend (`backend/`)
- **Technology**: Fast asynchronous Python or Node.js service.
- **Responsibilities**:
  - Agent state machine management.
  - Prompt construction and multi-modal LLM orchestration.
  - Plan decomposition and error recovery mechanisms.
  - Persistent execution logs and token usage tracking.

### 4.4 Shared (`shared/`)
- **Technology**: TypeScript / JSON Schema contracts.
- **Responsibilities**:
  - Universal message format across WebSocket channels.
  - Action schema definitions (`ClickAction`, `TypeAction`, `NavigateAction`, etc.).
  - Error definitions and error code catalogs.

---

## 5. Security & Safety Principles

1. **Explicit Permissions**: The extension only attaches to tabs explicitly authorized by the user.
2. **Secret Isolation**: User credentials and API keys reside exclusively in the backend runtime or local environment, never leaked into page content scripts.
3. **Guardrails for High-Stakes Actions**: Irreversible operations (e.g., checkout buttons, account deletions) require explicit user confirmation via the Dashboard before execution proceeds.
