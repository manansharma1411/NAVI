# NAVI — Neural Autonomous Web Intelligence

> *"You set the goal. NAVI navigates the web."*

NAVI is an AI-powered universal browser agent engineered to execute complex, multi-step web workflows autonomously. By combining a Chromium browser extension, a high-performance multi-modal AI backend, and an interactive web command interface, NAVI observes web environments, synthesizes actionable execution plans, and carries out real browser actions with precision and safety.

---

## Architecture Overview

NAVI operates as a coordinated three-tier system:

```
                      +-----------------------------+
                      |   NAVI Web Dashboard        |
                      |   (frontend/ - React/Vite)  |
                      +--------------+--------------+
                                     |
                             REST / WebSockets
                                     |
                                     v
                      +-----------------------------+
                      |      NAVI Core Backend      |
                      |  (backend/ - FastAPI/LLM)   |
                      +--------------+--------------+
                                     ^
                                     |
                             WebSocket Bridge
                                     |
                                     v
                      +-----------------------------+
                      |    NAVI Browser Extension   |
                      |   (extension/ - Manifest V3)|
                      |  [DOM Engine & Action Core] |
                      +-----------------------------+
                                     |
                                 DOM / CDP
                                     v
                              [ Web Targets ]
```

1. **Frontend (`frontend/`)**: Modern React 18 SPA (Vite + Tailwind CSS + Lucide Icons) providing goal dispatch, live execution monitoring, visual action confirmation, and manual human-in-the-loop takeover.
2. **Backend Engine (`backend/`)**: FastAPI Python service that processes DOM state snapshots and visual viewport captures, runs task decomposition, generates validated action schemas, and verifies task progression.
3. **Chromium Extension (`extension/`)**: Native Manifest V3 browser extension with a React side panel that interfaces with active web tabs to extract clean semantic DOM trees, execute real pointer/keyboard interactions via Chrome DevTools Protocol (CDP), and stream live telemetry back to the backend.
4. **Shared Specifications (`shared/`)**: Type-safe shared TypeScript contracts, schemas, and message definitions used across the frontend, extension, and backend.

---

## Monorepo Layout

```
NAVI/
├── frontend/             # Control center web interface (React + Vite + Tailwind)
├── extension/            # Chromium extension (Manifest V3 + Side Panel)
├── backend/              # AI agent planning & reasoning service (FastAPI)
├── shared/               # Shared type definitions, schemas & protocol contracts
├── docs/                 # System architecture, standards & development logs
│   ├── ARCHITECTURE.md   # Architectural blueprint and data flow
│   ├── DEVELOPMENT_RULES.md # Core engineering rules and principles
│   └── PROJECT_STATUS.md # Milestone tracker and project status
├── package.json          # Root monorepo scripts
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

## Developer Quickstart

### Prerequisites

- Node.js (v18+ or v20+ recommended)
- Python (3.10+ recommended)
- Chromium-based browser (Google Chrome, Brave, Chromium, Edge)

### Setup & Installation

```bash
# 1. Install frontend and extension dependencies
npm install --prefix shared
npm install --prefix frontend
npm install --prefix extension

# 2. Setup Python virtual environment for backend
python -m venv backend/.venv
backend/.venv/Scripts/pip install -r backend/requirements.txt
```

### Running Components Locally

You can run individual components or use the root development scripts:

```bash
# Start Backend Service (FastAPI running on http://localhost:8000)
npm run dev:backend
# Or directly:
backend/.venv/Scripts/python -m uvicorn backend.app.main:app --reload --port 8000

# Start Frontend Dashboard (Vite running on http://localhost:3000)
npm run dev:frontend

# Build Extension (builds unpacked extension to extension/dist/)
npm run build:extension
```

### Running Validations & Tests

```bash
# Run backend pytest suite (health & status endpoints)
npm run check:backend

# Run TypeScript typechecks across frontend, extension, and shared
npm run check:types

# Run production builds for both frontend and extension
npm run build
```

---

## Loading the Extension in Chromium

1. Open Chromium or Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** toggle in the top-right corner.
3. Click **Load unpacked**.
4. Select the `extension/dist` directory from this repository.
5. Click the **NAVI** extension icon in your browser toolbar to open the Side Panel.
6. Use the diagnostic buttons to test IPC communication with the background worker and active tab content script.

---

## Project Status

Current milestone and roadmaps are maintained in [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md).
Detailed architecture specifications are available in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
