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
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...request.body, token: backendToken }),
    });
    const payload = await backendResponse.json();
    return response.status(backendResponse.ok && payload.ok ? 200 : 502).json(payload);
  } catch (error) {
    return response.status(502).json({ ok: false, error: 'No se pudo contactar al backend.' });
  }
}