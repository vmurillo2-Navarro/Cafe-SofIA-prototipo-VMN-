export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ ok: false, error: 'Método no permitido.' });
  }

  response.setHeader('Cache-Control', 'no-store, max-age=0');

  const backendUrl = process.env.APPS_SCRIPT_URL;
  const backendToken = process.env.Apps_Script_token;
  if (!backendUrl || !backendToken) {
    return response.status(500).json({ ok: false, error: 'Falta configurar el backend.' });
  }

  const payload = Buffer.from(JSON.stringify({ token: backendToken })).toString('base64url');
  const separator = backendUrl.includes('?') ? '&' : '?';

  try {
    const backendResponse = await fetch(
      `${backendUrl}${separator}api=catalog&payload=${encodeURIComponent(payload)}&t=${Date.now()}`
    );
    const result = await backendResponse.json();
    return response.status(backendResponse.ok && result.ok ? 200 : 502).json(result);
  } catch (error) {
    return response.status(502).json({ ok: false, error: 'No se pudo consultar el catálogo real.' });
  }
}