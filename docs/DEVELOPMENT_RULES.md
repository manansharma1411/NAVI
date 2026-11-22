# NAVI Development Rules & Engineering Standards

These rules are mandatory for all contributors, agents, and sub-systems working on the NAVI codebase. Every pull request, commit, and code modification must comply with these tenets.

---

## 1. Core Engineering Commandments

### 1.1 Never Overwrite Working Functionality Unnecessarily
- Do not refactor or replace tested, functioning code unless explicitly instructed or required by a planned architectural change.
- Perform targeted, surgical edits rather than rewriting entire files.
- Preserve existing comments, docstrings, and edge-case handling.

### 1.2 Do Not Create Fake or Simulated Browser Actions
- NAVI is a genuine autonomous browser agent, not a prototype or illusion.
- Actions executed in the browser must be authentic DOM events or Chrome DevTools Protocol (CDP) commands.
- Never write mocks or simulations that pretend to click, type, or navigate without interacting with the real browser target.

### 1.3 No Hardcoded Fake Success Messages
- Never emit dummy success responses or hardcoded happy-path logs.
- Status messages, state transitions, and step verifications must accurately reflect the real return values and outcome of browser actions.
- If an action fails or times out, report the actual failure and stack trace truthfully.

### 1.4 Keep Components Modular
- Adhere strictly to single-responsibility boundaries.
- Keep the Extension (browser execution), Backend (planning & reasoning), and Frontend (UI & controls) decoupled through explicit schemas in `shared/`.
- Avoid leaking backend dependencies into the extension or browser-specific objects into the backend.

### 1.5 Implement Robust Error Handling & Graceful Degradation
- All async operations, network requests, and DOM queries must have explicit error boundaries, timeouts, and fallback strategies.
- Never swallow exceptions silently. Log structured errors with actionable diagnostic context.
- Support recovery paths (e.g., re-evaluating DOM on navigation, retrying stale element references).

### 1.6 Never Commit Secrets or Credentials
- Under no circumstances should API keys, tokens, passwords, or personal credentials be committed to Git.
- Always use `.env` files for configuration, and reference variables through validated configuration loaders.
- Maintain `.env.example` with sanitized placeholder keys only.

### 1.7 Test Before Declaring a Feature Complete
- A feature is not complete until it has been verified against real targets or rigorous test suites.
- Verify both positive and negative execution paths (e.g., target element not found, network disconnection).
- Document verification steps and observed outcomes.

### 1.8 Keep Dependencies Lean and Strictly Justified
- Do not install heavy libraries or redundant packages when standard library or native browser APIs suffice.
- Every new package added to `package.json` or `pyproject.toml` / `requirements.txt` must have a clear technical justification.

### 1.9 Update Project Status After Each Milestone
- Every phase or milestone completion must be recorded in `docs/PROJECT_STATUS.md`.
- Document decisions made, completed deliverables, newly identified technical debt, and next steps.

---

## 2. Git & Version Control Guidelines

1. **Atomic & Focused Commits**: Each commit must represent a coherent, logical unit of work.
2. **Clear Commit Messages**: Use conventional commit format (e.g., `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).
3. **No Force Pushing**: Never run `git push --force` or rewrite history on published branches.
4. **Clean Branches**: Maintain a clean `main` branch reflecting verified, production-ready increments.
