const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api';
export const AUTH_TOKEN_KEY = 'vertice_auth_token';

export async function apiRequest<T>(path: string, options: RequestInit): Promise<T> {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      ...options.headers,
    },
  });

  const payload = (await response.json().catch(() => ({}))) as {error?: string};
  if (!response.ok) {
    throw new Error(payload.error ?? 'Não foi possível concluir a operação.');
  }
  return payload as T;
}
