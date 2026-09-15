# Mi progreso — Café SofIA

## Clase 5 · De un prompt a una app publicada en Internet (tramo final)
- [x] Etapa 0 · Punto de partida: llegaste a Claude Code — proyecto abierto en VS Code y Claude Code respondiendo
- [x] Etapa 1 · GitHub — código publicado en github.com/vmurillo2-Navarro/Cafe-SofIA-prototipo-VMN-
- [x] Etapa 2 · Vercel — URL pública — https://cafe-sof-ia-prototipo-vmn.vercel.app/

## Clase 6 · Conectar con el mundo real
- [x] Etapa 3 · La arquitectura, como un restaurante — identificó frontend y backend
- [x] Etapa 4 · Conectar el frontend con el backend — Vercel y Apps Script responden por POST
- [x] Etapa 5 · Variables de entorno — nombres configurados en Vercel y Apps Script
- [x] Etapa 6 · El token entre servidores — HITO 2 — autenticación validada por POST
- [ ] Etapa 7 · Los métodos de pago
- [ ] Etapa 8 · El panel de administración: la trastienda
- [ ] Etapa 9 · Usar el panel: carta, insumos, stock y transferencias
- [ ] Etapa 10 · SofIA en modo real

## Notas de contexto
_(Lo importante para retomar. Sin claves ni contraseñas.)_
- URL de Apps Script: https://script.google.com/macros/s/AKfycbx_yabgOItGrrUDvR00b51JYlRtGOe2jzgk1aZqIpqLxcXfObQpuMsPfx_GnMnwMNPC/exec
- Acceso público de Apps Script corregido; el endpoint responde con `SofIA · ADEN LAB`.
- Compra de prueba completada: la tienda confirmó el pedido y Apps Script registró la venta, caja y stock.
- Variables elegidas: Vercel `APPS_SCRIPT_URL` y `Apps_Script_token`; Apps Script `API_Token`.
- Pendiente — pegar la versión protegida de `doPost` en Apps Script y republicar como nueva versión.
- Transferencia bancaria implementada localmente: BAC San José, alias Banco, BAC; queda pendiente republicar Apps Script y probar el estado pendiente.
