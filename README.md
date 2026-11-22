# NAVI — Neural Autonomous Web Intelligence

> *"You set the goal. NAVI navigates the web."*

NAVI is an AI-powered universal browser agent engineered to execute complex, multi-step web workflows autonomously. By combining a Chromium browser extension, a high-performance multi-modal AI backend, and an interactive web command interface, NAVI observes web environments, synthesizes actionable execution plans, and carries out real browser actions with precision and safety.

---

## Architecture Overview

NAVI operates as a coordinated three-tier system:

```
                      +-----------------------------+
                      |   NAVI Web Dashboard        |
                      |   (frontend/ - User UI)     |
                      +--------------+--------------+
                                     |
                             REST / WebSockets
                                     |
                                     v
                      +-----------------------------+
                      |      NAVI Core Backend      |
                      |  (backend/ - Planner/LLM)   |
                      +--------------+--------------+
                                     ^
                                     |
                             WebSocket Bridge
                                     |
                                     v
                      +-----------------------------+
                      |    NAVI Browser Extension   |
                      |   (extension/ - Chromium)   |
                      |  [DOM Engine & Action Core] |
                      +-----------------------------+
                                     |
                                 DOM / CDP
                                     v
                              [ Web Targets ]
```

1. **Frontend (`frontend/`)**: Modern web dashboard providing goal dispatch, live execution monitoring, visual action confirmation, and manual human-in-the-loop takeover.
2. **Backend Engine (`backend/`)**: Multi-modal reasoning engine that processes DOM state snapshots and visual viewport captures, runs hierarchical task decomposition, generates validated action schemas, and verifies task progression.
3. **Chromium Extension (`extension/`)**: Native browser extension that interfaces with active web tabs to extract clean semantic DOM trees, execute real pointer/keyboard interactions via DOM events or Chrome DevTools Protocol (CDP), and stream live telemetry back to the backend.
4. **Shared Specifications (`shared/`)**: Type-safe shared contracts, schemas, WebSocket protocol definitions, and telemetry formats used across the frontend, extension, and backend.

---

## Monorepo Layout

```
NAVI/
├── frontend/             # Control center web interface
├── extension/            # Chromium/Chrome extension (Manifest V3)
├── backend/              # AI agent planning & reasoning service
├── shared/               # Shared type definitions, schemas & protocol contracts
├── docs/                 # System architecture, standards & development logs
│   ├── ARCHITECTURE.md   # Architectural blueprint and data flow
│   ├── DEVELOPMENT_RULES.md # Core engineering rules and principles
│   └── PROJECT_STATUS.md # Milestone tracker and project status
├── .env.example          # Environment variables template
├── .gitignore            # Git exclusion configuration
└── README.md             # Project manifesto and setup guide
```

---

## Core Engineering Principles

- **Authentic Execution**: Never simulate or fake browser actions. NAVI performs real interactions against web environments.
- **No Deceptive Signals**: Absolute transparency in logs, errors, and progress reporting. No artificial success indicators.
- **Modular Decoupling**: Strict separation of concerns between extension action primitives, backend reasoning loops, and UI presentation.
- **Human-in-the-Loop Safety**: User steering, confirmation gates for destructive actions, and transparent audit trails.

For detailed guidelines, see [docs/DEVELOPMENT_RULES.md](docs/DEVELOPMENT_RULES.md).

---

## Getting Started

### Prerequisites

- Node.js (v18+ or v20+ recommended)
- Python (3.10+ recommended)
- Chromium-based browser (Google Chrome, Brave, Chromium, Edge)
- API keys for multi-modal model provider (e.g., Google Gemini API)

### Environment Configuration

Copy the example environment template:

```bash
cp .env.example .env
```

Populate the required keys inside `.env` before starting services.

---

## Project Status

Current milestone and roadmaps are maintained in [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md).
Detailed architecture specifications are available in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
