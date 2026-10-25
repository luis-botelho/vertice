import type {VercelRequest, VercelResponse} from '@vercel/node';
import {allowMethods, applyCors, jsonError, readString} from '../_lib/http';

const hasSupabase =
  Boolean(process.env.SUPABASE_URL) && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY) && Boolean(process.env.SUPABASE_ANON_KEY);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  if (applyCors(request, response)) {
    return;
  }

  if (!allowMethods(request, response, ['POST'])) {
    return;
  }

  const email = readString(request.body?.email).toLowerCase();
  const password = readString(request.body?.password);
  if (!email || !password) {
    jsonError(response, 400, 'E-mail e senha são obrigatórios.');
    return;
  }

  if (!hasSupabase) {
    jsonError(response, 503, 'Serviço de autenticação não configurado.');
    return;
  }

  try {
    const {getAuthSupabase, getAdminSupabase} = await import('../_lib/supabase');
    const {data, error} = await getAuthSupabase().auth.signInWithPassword({email, password});
    if (error || !data.session || !data.user) {
      jsonError(response, 401, 'Credenciais inválidas.');
      return;
    }

    const {data: profile, error: profileError} = await getAdminSupabase()
      .from('representative_profiles')
      .select('role, is_active')
      .eq('user_id', data.user.id)
      .maybeSingle();

    if (profileError || !profile || !profile.is_active) {
      jsonError(response, 403, 'Usuário sem acesso ao portal de representantes.');
      return;
    }

    response.status(200).json({
      accessToken: data.session.access_token,
      expiresAt: data.session.expires_at,
      user: {id: data.user.id, email: data.user.email, role: profile.role},
    });
  } catch (err) {
    console.error('Login error', err);
    jsonError(response, 500, 'Erro ao autenticar.');
  }
}
