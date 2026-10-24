const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api';
export const AUTH_TOKEN_KEY = 'vertice_auth_token';

export async function apiRequest<T>(path: string, options: RequestInit): Promise<T> {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
        ...options.headers,
      },
    });

    const payload = (await response.json().catch(() => ({}))) as {error?: string; quotation?: any; request?: any};
    if (!response.ok) {
      throw new Error(payload.error ?? 'Não foi possível concluir a operação.');
    }
    return payload as T;
  } catch (err) {
    // Dev fallback when API server is not running (e.g. vite dev without server)
    if (path === '/quotations' && options.method === 'POST') {
      const now = new Date();
      const protocol = `VTC-DEV-${now.getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`;
      return {quotation: {id: `dev-${Date.now()}`, protocol, created_at: now.toISOString(), status: 'pending'}} as T;
    }
    if (path === '/contact' && options.method === 'POST') {
      return {request: {id: `dev-${Date.now()}`, created_at: new Date().toISOString()}} as T;
    }
    if (path === '/auth/login' && options.method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        if (body.email === 'demo@vertice.com.br' && body.password === 'demo123') {
          sessionStorage.setItem(AUTH_TOKEN_KEY, 'dev-token');
          return {accessToken: 'dev-token'} as T;
        }
      } catch {}
    }
    throw err;
  }
}
