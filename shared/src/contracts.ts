/**
 * NAVI Shared Contracts & Type Definitions
 * Neural Autonomous Web Intelligence
 */

export type AgentExecutionState =
  | 'idle'
  | 'planning'
  | 'executing'
  | 'waiting_for_user'
  | 'paused'
  | 'completed'
  | 'failed';

export type ActionType =
  | 'click'
  | 'type'
  | 'scroll'
  | 'navigate'
  | 'wait'
  | 'press_key'
  | 'extract'
  | 'complete';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DOMNodeSnapshot {
  id: string;
  tagName: string;
  role?: string;
  text?: string;
  attributes: Record<string, string>;
  bounds: BoundingBox;
  isClickable: boolean;
  isInput: boolean;
  isVisible: boolean;
}

export interface PageObservation {
  url: string;
  title: string;
  tabId: number;
  timestamp: string;
  viewport: {
    width: number;
    height: number;
    scrollX: number;
    scrollY: number;
  };
  interactableElements: DOMNodeSnapshot[];
  screenshotBase64?: string;
}

export interface AgentAction {
  id: string;
  stepNumber: number;
  type: ActionType;
  targetElementId?: string;
  targetSelector?: string;
  coordinates?: { x: number; y: number };
  value?: string;
  reasoning: string;
  timestamp: string;
}

export interface ExecutionResult {
  actionId: string;
  success: boolean;
  error?: string;
  durationMs: number;
  resultingUrl?: string;
  timestamp: string;
}

export interface TelemetryEvent {
  id: string;
  sessionId: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  category: 'agent' | 'extension' | 'backend' | 'user';
  message: string;
  data?: Record<string, unknown>;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  service: string;
  version: string;
  timestamp: string;
}

export interface BackendStatusResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  service: string;
  version: string;
  environment: string;
  uptimeSeconds: number;
  activeSessions: number;
  agentReady: boolean;
  timestamp: string;
  components: {
    orchestrator: boolean;
    planner: boolean;
    bridge: boolean;
  };
}

// Extension message bridge contracts
export type ExtensionBridgeMessageType =
  | 'NAVI_PING_BACKGROUND'
  | 'NAVI_PONG_BACKGROUND'
  | 'NAVI_PING_CONTENT'
  | 'NAVI_PONG_CONTENT'
  | 'NAVI_GET_ACTIVE_TAB'
  | 'NAVI_ACTIVE_TAB_INFO';

export interface ExtensionBridgeMessage<T = unknown> {
  type: ExtensionBridgeMessageType;
  payload?: T;
  timestamp: string;
  source: 'sidepanel' | 'background' | 'content';
}
