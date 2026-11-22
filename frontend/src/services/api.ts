/// <reference types="vite/client" />

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
  uptime_seconds: number;
  active_sessions: number;
  agent_ready: boolean;
  timestamp: string;
  components: {
    orchestrator: boolean;
    planner: boolean;
    bridge: boolean;
  };
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function checkBackendHealth(): Promise<HealthCheckResponse> {
  const response = await fetch(`${API_BASE}/health`, {
    headers: { 'Accept': 'application/json' }
  });
  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`);
  }
  return response.json();
}

export async function getBackendStatus(): Promise<BackendStatusResponse> {
  const response = await fetch(`${API_BASE}/api/v1/status`, {
    headers: { 'Accept': 'application/json' }
  });
  if (!response.ok) {
    throw new Error(`Status query failed with status ${response.status}`);
  }
  return response.json();
}
