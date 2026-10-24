import type {VercelRequest, VercelResponse} from '@vercel/node';
import {allowMethods} from './_lib/http';

export default function handler(request: VercelRequest, response: VercelResponse): void {
  if (!allowMethods(request, response, ['GET'])) {
    return;
  }

  response.status(200).json({status: 'ok'});
}
