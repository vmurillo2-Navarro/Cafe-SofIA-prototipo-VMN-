export default async function handler(request, response) {
  if (!['GET', 'POST'].includes(request.method)) {
    return response.status(405).json({ ok: false, error: 'Método no permitido.' });
  }

  response.setHeader('Cache-Control', 'no-store, max-age=0');

  const password = request.headers['x-admin-password'];
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return response.status(401).json({ ok: false, error: 'Clave incorrecta.' });
  }

  const backendUrl = process.env.APPS_SCRIPT_URL;
  const backendToken = process.env.Apps_Script_token;
  if (!backendUrl || !backendToken) {
    return response.status(500).json({ ok: false, error: 'Falta configurar el backend administrativo.' });
  }

  const action = request.method === 'GET' ? 'admin_list' : request.body.action;
  const body = JSON.stringify({
    tipo: 'admin',
    action,
    data: request.method === 'POST' ? request.body.data : undefined,
    token: backendToken,
  });
  const payload = Buffer.from(body).toString('base64url');
  const separator = backendUrl.includes('?') ? '&' : '?';

  try {
    const backendResponse = await fetch(
      `${backendUrl}${separator}api=admin&payload=${encodeURIComponent(payload)}&t=${Date.now()}`
    );
    const result = await backendResponse.json();
    return response.status(backendResponse.ok && result.ok ? 200 : 502).json(result);
  } catch (error) {
    return response.status(502).json({ ok: false, error: 'No se pudo contactar al backend.' });
  }
}
