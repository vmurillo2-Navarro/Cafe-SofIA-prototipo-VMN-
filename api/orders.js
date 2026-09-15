export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ ok: false, error: 'Método no permitido.' });
  }

  const backendUrl = process.env.APPS_SCRIPT_URL;
  if (!backendUrl) {
    return response.status(500).json({ ok: false, error: 'Falta configurar APPS_SCRIPT_URL.' });
  }
  const backendToken = process.env.Apps_Script_token;
  if (!backendToken) {
    return response.status(500).json({ ok: false, error: 'Falta configurar Apps_Script_token.' });
  }

  try {
    const body = JSON.stringify({ ...request.body, token: backendToken });
    const payload = Buffer.from(body).toString('base64url');
    const separator = backendUrl.includes('?') ? '&' : '?';
    const backendResponse = await fetch(
      `${backendUrl}${separator}api=order&payload=${encodeURIComponent(payload)}`
    );
    const responsePayload = await backendResponse.json();
    return response.status(backendResponse.ok && responsePayload.ok ? 200 : 502).json(responsePayload);
  } catch (error) {
    return response.status(502).json({ ok: false, error: 'No se pudo contactar al backend.' });
  }
}