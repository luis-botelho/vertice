import type {VercelRequest, VercelResponse} from '@vercel/node';

export function allowMethods(
  request: VercelRequest,
  response: VercelResponse,
  methods: string[],
): boolean {
  if (request.method && methods.includes(request.method)) {
    return true;
  }

  response.setHeader('Allow', methods.join(', '));
  response.status(405).json({error: 'Method not allowed'});
  return false;
}

export function jsonError(
  response: VercelResponse,
  status: number,
  message: string,
): void {
  response.status(status).json({error: message});
}

export function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}
