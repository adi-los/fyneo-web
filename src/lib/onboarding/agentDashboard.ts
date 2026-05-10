import { getAccessToken } from '../auth';
import { getGateway } from '../config';
import type { AgentDashboardResponse } from './types';

function authHeaders(): Record<string, string> {
  const token = getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchAgentDashboard(date: string): Promise<AgentDashboardResponse> {
  const API_URL = await getGateway();
  const res = await fetch(`${API_URL}/onboarding/agent-dashboard?date=${date}`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message || `HTTP ${res.status}`);
  }
  return res.json();
}
