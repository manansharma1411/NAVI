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

export type ConnectionState =
  | 'connected'
  | 'connecting'
  | 'offline'
  | 'cors_or_network_error'
  | 'unconfigured';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly kind: 'network_error' | 'http_error' | 'unconfigured' | 'timeout',
    public readonly status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Resolve the API base URL.
 * In development: defaults to 'http://localhost:8000'.
 * In production: reads VITE_API_BASE_URL. If omitted, returns empty string.
 */
function resolveApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // Fallback only during local Vite development
  if (import.meta.env.DEV) {
    return 'http://localhost:8000';
  }

  return '';
}

export const API_BASE_URL = resolveApiBaseUrl();

export function isApiConfigured(): boolean {
  if (import.meta.env.DEV) return true;
  return API_BASE_URL !== '';
}

/**
 * Centralized fetch utility with timeout and structured error taxonomy.
 */
async function requestWithTimeout<T>(path: string, timeoutMs: number = 10000): Promise<T> {
  if (!isApiConfigured()) {
    throw new ApiError(
      'VITE_API_BASE_URL is not configured in this production deployment. Set VITE_API_BASE_URL in your Vercel project settings.',
      'unconfigured'
    );
  }

  const endpoint = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timer);

    if (!response.ok) {
      throw new ApiError(
        `API request failed with HTTP ${response.status} (${response.statusText})`,
        'http_error',
        response.status
      );
    }

    return (await response.json()) as T;
  } catch (err: unknown) {
    clearTimeout(timer);

    if (err instanceof ApiError) {
      throw err;
    }

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError(
        `Request to ${endpoint} timed out after ${timeoutMs / 1000}s (backend may be spinning up on Render free tier).`,
        'timeout'
      );
    }

    // Usually TypeError: Failed to fetch (CORS blocked, DNS resolution failure, server offline)
    throw new ApiError(
      `Cannot connect to backend at ${API_BASE_URL || 'unknown host'}. Verify that backend is running and CORS allows this origin.`,
      'network_error'
    );
  }
}

export async function checkBackendHealth(): Promise<HealthCheckResponse> {
  return requestWithTimeout<HealthCheckResponse>('/health');
}

export async function getBackendStatus(): Promise<BackendStatusResponse> {
  return requestWithTimeout<BackendStatusResponse>('/api/v1/status');
}
