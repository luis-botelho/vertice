import type {VercelRequest, VercelResponse} from '@vercel/node';
import {getAdminSupabase} from './_lib/supabase';
import {allowMethods, jsonError, readString} from './_lib/http';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  if (!allowMethods(request, response, ['POST'])) {
    return;
  }

  const body = request.body ?? {};
  const name = readString(body.name);
  const cnpj = readString(body.cnpj);
  const whatsapp = readString(body.whatsapp);
  const city = readString(body.city);
  const message = readString(body.message);
  if (!name || !whatsapp || !message) {
    jsonError(response, 400, 'Nome, WhatsApp e mensagem são obrigatórios.');
    return;
  }

  const {data, error} = await getAdminSupabase()
    .from('contact_requests')
    .insert({name, cnpj, whatsapp, city, message})
    .select('id, created_at')
    .single();

  if (error) {
    console.error('Failed to create contact request', error);
    jsonError(response, 500, 'Não foi possível enviar a mensagem.');
    return;
  }

  response.status(201).json({request: data});
}
