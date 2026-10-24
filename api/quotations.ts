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

  const customer = request.body?.customer;
  const items = request.body?.items;
  if (!customer || !Array.isArray(items) || items.length === 0) {
    jsonError(response, 400, 'Dados do cliente e itens da cotação são obrigatórios.');
    return;
  }

  const requiredCustomerFields = ['razaoSocial', 'cnpj', 'compradorNome', 'whatsapp'];
  if (requiredCustomerFields.some((field) => !readString(customer[field]))) {
    jsonError(response, 400, 'Preencha os dados obrigatórios da empresa.');
    return;
  }

  const sanitizedItems = items.map((item: Record<string, unknown>) => ({
    product_id: readString(item.productId),
    product_name: readString(item.productName),
    sku: readString(item.sku),
    quantity: Number(item.quantity),
  }));
  if (sanitizedItems.some((item) => !item.product_id || !item.product_name || !Number.isInteger(item.quantity) || item.quantity < 1)) {
    jsonError(response, 400, 'Itens da cotação inválidos.');
    return;
  }

  const {data, error} = await getAdminSupabase()
    .from('quotations')
    .insert({
      customer_data: customer,
      items: sanitizedItems,
      status: 'pending',
    })
    .select('id, protocol, created_at')
    .single();

  if (error) {
    console.error('Failed to create quotation', error);
    jsonError(response, 500, 'Não foi possível registrar a cotação.');
    return;
  }

  response.status(201).json({quotation: data});
}
