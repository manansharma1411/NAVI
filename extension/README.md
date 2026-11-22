# NAVI — Browser Extension

## Scope & Responsibility
The `extension/` package implements the Manifest V3 Chromium extension that interfaces directly with target web pages.

### Planned Capabilities
- **Background Service Worker**: Manages WebSocket lifecycle, tab attachment, and message routing.
- **Content Scripts**: Extracts clean, token-efficient DOM trees, generates stable element markers, and overlays visual attention indicators.
- **Execution Engine**: Executes trusted user actions (clicks, keyboard input, scrolls, navigation) via Chrome DevTools Protocol (`chrome.debugger`) and native events.
- **Observation Capture**: Takes synchronized viewport screenshots and extracts accessibility metadata.

*Implementation scheduled for Phase 3.*
