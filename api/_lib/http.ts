import type {VercelRequest, VercelResponse} from '@vercel/node';

const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:4173',
  'https://luis-botelho.github.io',
];

function getAllowedOrigins(): string[] {
  const configured = process.env.CORS_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configured?.length ? configured : defaultOrigins;
}

export function applyCors(
  request: VercelRequest,
  response: VercelResponse,
): boolean {
  const origin = request.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (origin && (allowedOrigins.includes('*') || allowedOrigins.includes(origin))) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }

  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return true;
  }

  return false;
}

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
