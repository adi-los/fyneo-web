/** Cached gateway base URL resolved from /api/config */
let _cachedGateway: string | null = null;

interface AppConfig {
  gateway: string;
}

/**
 * Returns the backend base URL (e.g. "http://localhost:4000").
 * Fetches /api/config on the first call and caches the result.
 * Falls back to "http://localhost:4000" if the request fails.
 */
export async function getGateway(): Promise<string> {
  if (_cachedGateway) return _cachedGateway;

  try {
    // Works in both browser (relative URL) and server-side (needs absolute URL).
    const base =
      typeof window !== 'undefined'
        ? ''
        : process.env.NEXT_PUBLIC_INTERNAL_URL ?? 'http://localhost:3000';

    const res = await fetch(`${base}/api/config`);
    if (!res.ok) throw new Error(`/api/config responded ${res.status}`);

    const config: AppConfig = await res.json();
    // Gateway may already include protocol; if not, prepend http://
    const gw = config.gateway.startsWith('http')
      ? config.gateway
      : `http://${config.gateway}`;

    _cachedGateway = gw;
    return gw;
  } catch (err) {
    console.warn('[config] Could not fetch /api/config, falling back to localhost:4000', err);
    return 'http://localhost:4000';
  }
}
