# Etapas — detalle para el profe virtual

Este archivo es tu material de referencia. Para cada etapa tienes: **Objetivo**, **Conceptos** (para explicar en simple), **Prompt(s)** exactos, y **Checkpoint** (lo que confirma que la etapa terminó). Recuerda las reglas de oro: un paso a la vez, detente y espera al alumno, cada prompt en bloque copiable. Habla siempre de "tú", en español neutro.

---

# CLASE 5 · De un prompt a una app publicada en Internet (tramo final)

> En esta skill, la Clase 5 es solo su **tramo final**: el alumno ya hizo en el navegador el prototipo, lo pasó a código e instaló VS Code y Claude Code. Aquí lo llevas a **guardar el código en GitHub** y **publicarlo en Vercel**. La clase **termina con la URL pública**: el e-commerce en Internet, todavía sin backend ni cobros (eso es la Clase 6).

---

## Etapa 0 · Punto de partida: llegaste a Claude Code

**Objetivo:** dar la bienvenida al alumno que viene de armar su prototipo en el navegador y confirmar que su taller está listo para arrancar.

**Explica (en simple):**
- Si el alumno ya te está hablando por Claude Code, hizo lo más difícil de imaginar: tiene un **prototipo aprobado** convertido en **código real** (ese fue el **HITO 1** 🏆), su proyecto **abierto en VS Code** y **Claude Code conectado**. ¡Felicítalo!
- Ahora empieza la segunda parte: **publicar la app en Internet** y, más adelante, darle su **trastienda**. El viaje completo: GitHub → Vercel (¡ahí queda en línea y **termina la Clase 5**!) → y en la **Clase 6**: backend → pagos → panel de administración y modo real.
- Su rol no cambió: **es el director de producto**. Decide y valida; la IA ejecuta.
- Van a ir **paso a paso**. Él marca el ritmo. Cuando algo no se entienda, se pregunta sin culpa.
- **Modo "Preguntar":** recuérdale mantener Claude Code en modo "Preguntar" (que pida autorización antes de cada acción) hasta que domine el flujo.

**Confirma antes de avanzar:** ¿Tiene el proyecto abierto en VS Code y Claude Code respondiendo? Si todavía no llegó hasta acá (le falta crear el prototipo, descargar el código o instalar VS Code / Claude Code), dile que primero complete esa parte con la guía del navegador **"Café SofIA — El prototipo"** y vuelva.

---

## Etapa 1 · GitHub: guardar tu código

**Objetivo:** subir el proyecto a GitHub.

**Conceptos:**
- **GitHub** es un servicio en Internet para guardar proyectos: una nube especializada en código que guarda toda la historia de cambios y permite compartir. Resuelve tres miedos: hacer un cambio que rompe todo y no poder volver atrás, que se rompa la computadora y perder todo, y querer compartir el proyecto. Además, **Vercel toma el código desde GitHub**: sin GitHub no hay publicación.

**Pasos:**
1. **Crear cuenta:** entrar a `github.com`, "Sign up", completar correo, contraseña y un **nombre de usuario claro y profesional** (aparece en las direcciones). Verificar el correo.
2. **Subir el código con Claude Code** (prompt para pegar aquí, en Claude Code):
```
Inicializa Git en este proyecto, crea un repositorio en mi cuenta de GitHub y
sube el código. Guíame paso a paso y avísame si necesitas que autorice algo o
que ingrese a GitHub.
```
En modo "Preguntar" te va a ir pidiendo autorización. GitHub puede pedir autorizar la conexión entre la computadora y la cuenta: es un paso normal de seguridad.

**Buenas prácticas (menciónalas):** guardar cada vez que algo funciona; poner nombres claros a los cambios ("Agrego botón de volver" es mejor que "cambios"); subir con frecuencia.

**⚠️ Regla de oro:** NUNCA subir claves secretas a GitHub (contraseñas, llaves de pago). Un repositorio puede ser público. Las llaves van en variables de entorno (Etapa 5), nunca en el repositorio.

**Checkpoint:** el código está visible en un repositorio de GitHub.

---

## Etapa 2 · Vercel: tu app en Internet — el momento esperado

**Objetivo:** publicar la app y obtener una URL pública.

**Conceptos:**
- **Vercel** toma el proyecto que está en GitHub y lo **publica** (lo "despliega", en inglés *deploy*): lo pone en un servidor siempre encendido y da una dirección web. **Desplegar** = copiar la app a una computadora especial, siempre encendida y conectada, para que cualquiera la abra sin depender de tu máquina. Tiene un plan gratuito suficiente.

**Pasos:**
1. **Crear cuenta:** entrar a `vercel.com` y elegir **"Continue with GitHub"**. Autorizar la conexión. (Por eso hicimos GitHub primero: es lo que le permite a Vercel ver los repositorios.)
2. **Desplegar** (puedes guiarlo con este prompt en Claude Code):
```
Despliega este proyecto en Vercel y dame la URL pública. Guíame paso a paso e
indícame qué tengo que confirmar en Vercel.
```
En Vercel: importa su repositorio (lo reconoce como React + Vite solo), hace clic en **Deploy** (tarda menos de un minuto) y recibe la **URL pública** (algo como `mi-cafe.vercel.app`).

**🎉 El momento esperado:** que abra esa dirección en su teléfono y se la pase a alguien. Su app ya existe para el mundo. Celébralo de verdad.

**Actualización automática:** de ahora en adelante, cada cambio que suba a GitHub se publica solo en Vercel. Cambias algo, Claude Code lo sube, y en segundos la web muestra la versión nueva.

**Si un deploy falla:** que no entre en pánico. Vercel dice qué falló en un registro. Que copie ese texto entero y te lo dé: se resuelve en una o dos vueltas.

**Checkpoint:** la URL pública abre y funciona en el teléfono.

---

## 🎓 Cierre de la Clase 5

Aquí **termina la Clase 5**. Recapitula con el alumno lo que logró: de una idea en palabras a un **e-commerce publicado en Internet**, con su código guardado en GitHub y una dirección que cualquiera puede abrir. Celébralo: es la primera vez que su app existe fuera de su computadora.

Aclárale lo que todavía **no** tiene, para que no se sorprenda: la app se ve y se navega, pero **todavía no guarda ventas ni cobra**. Eso llega en la **Clase 6**.

Marca las Etapas 0-2 en `PROGRESO-CAFE.md` y **pregúntale si quiere seguir ahora o retomar en otra sesión**. Si corta, dile que cuando vuelva escriba "quiero seguir con mi café" y que retoman en la Etapa 3.

---

# CLASE 6 · Conectar con el mundo real

> A partir de aquí empieza la **Clase 6**, completa. Es la continuación directa de la Clase 5. Se asume que el alumno ya tiene su e-commerce **en GitHub y publicado en Vercel, con URL pública**, pero todavía sin backend ni cobros. En esta clase su app se conecta con el mundo real: **guarda las ventas** (Google Apps Script + Google Sheets), **cobra de verdad** (Mercado Pago y transferencia), suma **el otro lado del mostrador** —el panel de administración— y termina con **SofIA gestionando el café en modo real**. Igual que antes: el alumno dirige, la IA ejecuta.
>
> **Lo que el alumno ya trae de clases anteriores:** su **backend en Google Apps Script**, publicado y con su dirección pública, con **SofIA en modo simulador** (el reloj acelerado, las ventas inventadas y el "tick") y con **el correo al que se piden las reposiciones** ya configurado. La skill construye sobre eso: no enseña a crear el Apps Script. Si un alumno llega sin ese backend, no avances con la Etapa 4: primero tiene que resolverlo con su docente.
>
> **Recordatorio clave (repítelo cada vez que toque el backend, desde la Etapa 4):** el Apps Script **no** se publica por GitHub. Los archivos `.gs` se pegan a mano en el editor de Apps Script y se republican como **"Nueva versión"**.

---

## Etapa 3 · La arquitectura, como un restaurante

**Objetivo:** entender las piezas del backend antes de conectarlas. Etapa conceptual (no hay que "hacer", hay que entender).

**Explica con la analogía del restaurante:**
- **Frontend — el comedor y el mesero:** todo lo que el cliente ve y toca (pantallas, botones, carta, colores). Es lo que ya construyó.
- **Backend — la cocina:** lo que pasa detrás y el cliente no ve (se procesa el pedido, se descuenta stock, se registra la venta). En este proyecto lo hace **Google Apps Script**.
- **API — la comanda:** el mecanismo por el que el comedor y la cocina se piden cosas, con un formato acordado. El papelito que el mesero lleva a la cocina.
- **Mercado Pago — la terminal de pago:** el intermediario que maneja el dinero de forma segura, como el aparato donde pasas la tarjeta. La app no guarda tarjetas: delega el cobro. (Este método se puede reemplazar por otra plataforma de pago según el país.)
- **Webhook — la campana de "pedido listo":** un aviso automático que un servicio le manda a otro cuando pasa algo, sin que nadie pregunte "¿ya pasó?". Cuando Mercado Pago aprueba el pago, "toca la campana" y el backend se entera al instante.
- **Variables de entorno — la caja fuerte:** donde se guardan las llaves secretas, lejos del comedor. En este proyecto, esa caja fuerte es Vercel.

**Checkpoint:** el alumno puede explicar con sus palabras qué es el frontend y el backend. Hazle una pregunta simple para comprobar (por ejemplo: "¿la carta que ve el cliente es frontend o backend?").

---

## Etapa 4 · Conectar el frontend con el backend

**Objetivo:** que el e-commerce le avise a Apps Script cuando hay una venta.

**Conceptos:**
- **Serverless:** un tipo de servidor que no tienes que encender ni mantener. Se escriben pequeñas funciones que se ejecutan solas cuando llega un pedido, hacen su tarea y se apagan. Vercel, además de publicar, corre estas funciones (maneja el cobro).
- **Cómo se hablan:** cuando Vercel necesita avisar algo a la planilla, arma un mensaje y lo envía a la dirección pública de Apps Script. Ese envío se llama **POST**, y viaja en un formato de texto ordenado llamado **JSON**. Apps Script tiene una única puerta de entrada que recibe todos los mensajes y decide qué hacer.

**Antes de conectar — trae tu cocina al proyecto (una sola vez):**

Tu backend (los archivos `.gs`) vive en el editor de Apps Script, en Internet, **fuera de la carpeta del proyecto**. Por eso Claude Code todavía no lo ve. En esta etapa y, sobre todo, en las Etapas 6, 7, 8 y 10 hay que modificar ese `.gs`, y para escribir código que encaje con el tuyo (tus funciones, tus hojas, tu formato JSON) Claude necesita **leerlo**. Tráelo como un **espejo de referencia**:

1. En el editor de Apps Script, abre tu archivo de código, selecciona todo (`Ctrl+A`) y cópialo.
2. En VS Code, crea una carpeta `apps-script/` y, adentro, un archivo `Codigo.gs`. Pega ahí el código y guarda. (Si tienes varios `.gs`, uno por archivo, con el mismo nombre.)
3. Pídele a Claude Code que lo proteja para que nunca llegue a GitHub (prompt para pegar aquí):
```
Agrega la carpeta apps-script/ a mi .gitignore. Es una copia de referencia de mi
backend de Apps Script, solo para que la leas; no se despliega desde aquí.
```

**⚠️ Tres cosas para no confundir (explícaselas):**
- 🪞 **Es un espejo, no el original.** El backend de verdad sigue viviendo en el editor de Apps Script. **Editar este archivo local NO cambia nada en producción.**
- 🔁 **El flujo para actualizar el backend no cambia:** Claude escribe el código → tú lo pegas en el editor de Apps Script → republicas como **"Nueva versión"**.
- 🔒 **Nunca a GitHub.** Por eso el `.gitignore`. Aunque los tokens viven en las Script Properties (no en el código), mantenemos el `.gs` fuera del repositorio por las dudas.

Cada vez que cambies el `.gs` en Apps Script, vuelve a pegar la versión nueva en `apps-script/Codigo.gs` para que Claude siga viendo lo actual.

**Pasos:**
1. Copiar la **dirección pública de Apps Script** (la que obtuvo al publicar su proyecto de Apps Script). Guardarla.
2. En Vercel: **Settings → Environment Variables → Add New**. Nombre: `APPS_SCRIPT_URL` (puede elegir el nombre). Valor: la URL que copió.
3. **Redeploy** (¡importante!): volver a publicar para que Vercel tome la variable nueva. Sin esto, sigue con la configuración vieja.
4. Pedirle a Claude Code que escriba el código de conexión (prompt para pegar aquí):
```
Analiza todo mi proyecto antes de realizar cambios, incluido el backend de Apps
Script que está en la carpeta apps-script/. Quiero conectar este e-commerce con
mi backend de Google Apps Script. La URL del backend está en la variable de
entorno APPS_SCRIPT_URL (reemplaza por el nombre de tu variable). Identifica el
momento exacto en el que una compra se confirma correctamente y, en ese punto,
envía un POST al backend con toda la información del pedido. El aviso al
backend tiene que salir desde una función serverless de Vercel, no desde el
navegador: ni la URL del backend ni, más adelante, el token pueden quedar
visibles para el cliente. Del lado de Apps Script, haz que el backend reciba ese pedido y, por cada compra, descuente el
stock de los insumos según la receta, sume el importe a la caja y anote la
venta, reutilizando las funciones que ya tiene mi simulador y sin romperlo.
Implementa el código con buenas prácticas, separando la lógica en funciones
reutilizables, manejando errores y explicando cada cambio. Luego guarda en mi
GitHub los cambios del e-commerce y dime qué código tengo que pegar en Apps Script.
```
5. **Publicar la cocina.** Los cambios del e-commerce se publican solos al subirse a GitHub, pero el backend **no**: copiar el código que indicó Claude, pegarlo en el editor de Apps Script y publicar como **"Nueva versión"** (**Implementar → Administrar implementaciones → el lápiz → Nueva versión**). Hay que editar la implementación existente, no crear una nueva: así la URL no cambia y sigue coincidiendo con la que cargó en Vercel. Recordarle también actualizar su espejo en `apps-script/`. ⚠️ Si se salta este paso, la cocina sigue sin saber recibir pedidos.

**Checkpoint:** la variable está cargada en Vercel (con redeploy), Claude Code implementó y subió el código de conexión, y el alumno publicó el backend como "Nueva versión".

---

## Etapa 5 · Variables de entorno: la caja fuerte

**Objetivo:** entender y usar bien las variables de entorno.

**Conceptos:**
- Una **variable de entorno** es como un **cajón etiquetado dentro de una caja fuerte**. El cajón tiene un nombre (por ejemplo `MP_ACCESS_TOKEN`) y adentro está la llave real. El código conoce el nombre del cajón, pero la llave solo existe dentro de la caja fuerte. Aquí la caja fuerte es **Vercel**. Nunca se suben a GitHub ni viajan al navegador.
- Ejemplos del café SofIA: `MP_ACCESS_TOKEN` (clave de Mercado Pago para cobrar), `APPS_SCRIPT_URL` (a dónde avisar la venta), `APPS_SCRIPT_TOKEN` (contraseña compartida para los avisos), `ADMIN_PASSWORD` (contraseña del panel de administración).

**🏷️ LOS NOMBRES LOS ELIGE EL ALUMNO — dilo una vez acá y recuérdalo en cada etapa que cargue una variable.**

Todos los nombres que aparecen en esta guía son **ejemplos**. El alumno puede llamarlas como quiera: `MI_CLAVE_DEL_CAFE`, `CLAVE_ADMIN`, lo que le resulte claro. El nombre es la etiqueta del cajón, no la llave.

Pero hay una regla que **no** se puede romper: el nombre tiene que ser **el mismo en tres lugares**.

| Dónde | Qué pasa si no coincide |
|---|---|
| 1. El nombre que carga en Vercel | — |
| 2. El nombre que escribe **en el prompt** que te pega | Claude escribe código que busca un cajón que no existe |
| 3. El nombre que queda en el código | La app compila bien y falla en producción, sin decir por qué |

**Este es el error más difícil de encontrar de todo el curso**, porque no da error al construir: da error recién cuando el alumno prueba, y el mensaje no señala el nombre. Así que, cada vez que le des un prompt con un nombre de variable adentro, **dile explícitamente que reemplace ese nombre por el suyo si eligió otro**.

**Lo que NO tiene que coincidir:** un lado con el otro. El token compartido puede llamarse de una forma en Vercel y de otra en Apps Script — son dos etiquetas para la misma llave. Ahí lo que tiene que ser idéntico es el **valor**, carácter por carácter.

**Anota sus nombres en `PROGRESO-CAFE.md`** apenas los elija. En la próxima sesión no vas a acordarte, y él tampoco.

**⚠️ El error más peligroso:** escribir una clave secreta en el código y subirla a GitHub; cualquiera podría verla y usar tu cuenta de pago. **Regla de oro: las llaves van siempre en variables de entorno, nunca en el repositorio.**

**Checkpoint:** el alumno entiende la analogía del cajón y sabe dónde cargar una variable en Vercel (Settings → Environment Variables).

---

## Etapa 6 · La contraseña secreta entre servidores — HITO 2

**Objetivo:** proteger el backend con un token compartido.

**Conceptos:**
- La dirección de Apps Script es pública: cualquiera podría enviarle mensajes. Para que **solo tu Vercel** pueda escribir en la planilla, los dos comparten un **token**: una clave que tiene que coincidir de los dos lados. Vercel manda el mensaje con el token; Apps Script compara: si coincide, ejecuta; si no, responde "no autorizado". Si algún día cambias el token, hay que actualizarlo en los **dos** lugares.

**Pasos:**
1. **Crear el token:** inventa uno largo y difícil de adivinar, por ejemplo `sofia_2026_8Gx9LqP2mK71ZrA`. Guárdalo.
2. **En Vercel:** Settings → Environment Variables → Add New. Nombre (por ejemplo `APPS_SCRIPT_TOKEN`), Valor: el token. Guardar y **Redeploy**.
3. **En Apps Script:** abrir el proyecto → **Project Settings → Script Properties → Add Script Property**. Property (por ejemplo `API_TOKEN`), Value: **exactamente el mismo token**. Guardar.
4. Pedirle a Claude Code que implemente la autenticación. **Antes de dárselo, reemplaza los dos nombres por los que eligió el alumno** (prompt para pegar aquí):
```
Estoy conectando mi e-commerce en React desplegado en Vercel con un backend en
Google Apps Script. Ya configuré en Vercel una variable de entorno llamada
APPS_SCRIPT_TOKEN y en Apps Script una Script Property llamada API_TOKEN, las
dos con exactamente el mismo valor. Quiero que implementes la autenticación
mediante ese token: antes de ejecutar cualquier lógica de POST, compara el token
recibido con el almacenado en las Script Properties. Si no coincide, responde
con un error de "no autorizado" y no ejecutes ninguna otra acción. Si coincide,
continúa normalmente con el procesamiento del pedido. Antes de cambiar nada,
analiza la estructura del proyecto para elegir el mejor lugar y reutilizar
código si ya existe una función para las llamadas HTTP. Luego guarda el cambio
en mi GitHub.
```
*(Si el alumno pregunta por qué no dice "error 401": Apps Script no puede devolver códigos de estado HTTP, sus respuestas siempre salen como correctas. El "no autorizado" viaja dentro del mensaje, y funciona igual.)*

5. **Publicar la cocina.** Parte de ese cambio es código del backend, y el backend **no se publica por GitHub**: copiar el código nuevo, pegarlo en el editor de Apps Script y publicar como **"Nueva versión"** (**Implementar → Administrar implementaciones → el lápiz → Nueva versión**, editando la implementación existente para que la URL no cambie). Recordarle también actualizar su espejo en `apps-script/`. ⚠️ Si se salta este paso, la cocina sigue sin verificar nada y el alumno cree que llegó al HITO 2 sin tenerlo.

**Checkpoint (HITO 2):** 🎉 el frontend está conectado con el backend de forma segura. El e-commerce ya puede comunicarse con la base de datos y enviar las compras.

---

## Etapa 7 · Los métodos de pago

**Objetivo:** integrar los dos métodos de cobro. Patrón común: Vercel maneja el cobro o la validación y después le avisa a Apps Script para registrar la venta.

### 7a · Mercado Pago (automático)

**Cómo funciona (cuéntalo como una secuencia):**
1. El cliente toca "Mercado Pago". 2. Vercel crea el pago (función `/api/checkout`) y devuelve un link. 3. El cliente paga en la pantalla oficial de Mercado Pago. 4. Mercado Pago avisa con el **webhook** (`/api/mp/webhook`) cuando se aprueba. 5. Se registra la venta: Vercel le avisa a Apps Script para descontar stock, sumar a caja y anotar la venta.

**Conectarlo (una sola vez):**
1. Crear o usar la cuenta de cobro en `mercadopago.com`: la cuenta **donde se quiere recibir el dinero**.
2. Entrar al panel de desarrolladores (`mercadopago.com.ar/developers`, o el de su país) → **Tus integraciones → Crear aplicación**, y elegir **Checkout Pro**. ⚠️ Sin crear la aplicación, las credenciales no aparecen.
3. Dentro de la aplicación, copiar el **Access Token de prueba** (empieza con `TEST-`), para probar sin dinero real.
4. Cargarlo como variable de entorno en Vercel (por ejemplo `MP_ACCESS_TOKEN`) y hacer **Redeploy**. Sin Redeploy, el cobro falla con "No pudimos iniciar el pago".
5. Pedirle a Claude Code que implemente el cobro. **Reemplaza el nombre de la variable por el que eligió el alumno** (prompt para pegar aquí):
```
Necesito que implementes el flujo completo de pago con Mercado Pago Checkout Pro.
Ya creé la variable de entorno en Vercel con el nombre MP_ACCESS_TOKEN. Cuando
un pago se apruebe, registra la venta en mi backend de Apps Script usando la
conexión que ya existe (la URL y el token que usa hoy mi app). La venta tiene
que registrarse una sola vez y solo cuando el pago está aprobado: si hoy mi app
ya avisa al backend antes de pagar, reemplaza ese aviso en vez de sumar otro.
No modifiques el diseño del e-commerce. Respeta la estructura actual del
proyecto. Si hace falta cambiar algo en Apps Script, usa la copia de la carpeta
apps-script/ y dime qué código tengo que pegar. Guarda en mi GitHub los cambios
del e-commerce. Si necesitas información adicional, pregúntame antes de
continuar.
```
6. **Probarlo con dinero de prueba** (guíalo paso a paso):
   - En el **sitio publicado**, no en su computadora: Mercado Pago tiene que poder avisarle al webhook desde Internet, y a su computadora no llega.
   - Pagar con una **tarjeta de prueba**, que encuentra en su panel de desarrolladores. El resultado lo decide el **nombre del titular**: `APRO` aprueba el pago y `OTHE` lo rechaza.
   - Alcanza con que Mercado Pago muestre el **pago aprobado**. No le pidas buscar la venta en la planilla: mientras el simulador esté encendido, queda mezclada con las ventas que inventa SofIA. Que la venta llegue a la planilla y mueva stock y caja se comprueba en la **Etapa 10**, con el simulador apagado.
7. Cuando todo funciona con la clave de prueba, reemplazarla en Vercel por la de **producción** (con su Redeploy) para cobrar de verdad.

**⚠️** El Access Token mueve dinero: no compartirlo, no pegarlo en un chat, no subirlo al repositorio. Vive solo en las variables de entorno de Vercel.

### 7b · Transferencia (manual)

Lo distinto: **necesita la confirmación de una persona**.
1. El cliente ve y copia el **alias** y transfiere desde su banco o billetera. 2. Vercel registra el pedido (función `/api/pay/transfer`) y lo manda a Apps Script como **pendiente**. 3. La venta todavía no cuenta (no descuenta stock ni suma a caja). 4. La persona a cargo revisa el comprobante y entra al **panel de administración**. 5. Solo ahí, al confirmar, Apps Script registra la venta.

**Antes del prompt, pídele el alias real** de la cuenta donde va a recibir las transferencias (o el CBU, o el número, según su país). Si no se lo da a Claude, va a inventar uno de ejemplo, y es fácil que quede publicado.

**Implementarlo** (prompt para pegar aquí, con **su** alias):
```
Quiero agregar una nueva forma de pago llamada Transferencia. El pago será
manual. El objetivo es que el cliente pueda copiar el alias de la cuenta del
café, que es [ALIAS DEL ALUMNO], y realizar la transferencia desde su banco,
app de pago o billetera virtual. El pedido tiene que quedar registrado en mi
backend de Apps Script como pendiente, sin descontar stock ni sumar a la caja.
Más adelante un administrador lo va a confirmar desde un panel de administración
que todavía no existe: se construye en una etapa posterior, así que por ahora no
construyas ningún panel. Si hace falta cambiar algo en Apps Script, usa la copia
de la carpeta apps-script/ y dime qué código tengo que pegar. Guarda en mi
GitHub los cambios del e-commerce.
```
(Dato: este método también sirve en otros países con plataformas como SIMPE Móvil o Yappy.)

**Publicar la cocina (vale para la 7a y la 7b).** Si Claude cambió código de Apps Script en cualquiera de las dos, pegarlo en el editor de Apps Script y publicar como **"Nueva versión"** (**Implementar → Administrar implementaciones → el lápiz → Nueva versión**, editando la implementación existente para que la URL no cambie). Recordarle también actualizar su espejo en `apps-script/`. ⚠️ En la 7b casi seguro hay cambios: hasta ahora el backend descuenta stock y suma a la caja con cada pedido, y sin publicar la versión nueva la transferencia se registra como venta en vez de quedar pendiente.

**Cómo se prueba:** la transferencia no se puede probar completa en esta etapa, porque para confirmarla hace falta el panel. Confirmarla queda para la **Etapa 9**. Por ahora alcanza con que el pedido aparezca como pendiente en su planilla.

**Checkpoint:** un pago de prueba con Mercado Pago sale aprobado, y un pedido por transferencia aparece como pendiente en la planilla.

---

## Clase 6 · Segunda parte: el panel de administración y el modo real

> Aquí la Clase 6 pasa del lado del cliente al **otro lado del mostrador**. Se asume que el alumno completó las Etapas 3-7: su e-commerce ya está conectado a Google Apps Script + Google Sheets y cobra con al menos un método de pago. Ahora se construye el lugar desde donde se gestiona el café.
>
> **Antes de tocar el backend aquí:** si todavía no lo hizo, pídele al alumno que traiga su(s) `.gs` a la carpeta `apps-script/` del proyecto (ver Etapa 4) para que tengas el backend a la vista y escribas parches que encajen. Recuérdale mantener ese espejo actualizado: cada cambio en Apps Script, que lo pegue también ahí.

---

## Etapa 8 · El panel de administración: la trastienda

**Objetivo:** construir el panel `/admin` con un prompt, dejar bien puestas las dos llaves de seguridad y publicarlo funcionando.

**⚠️ Antes de arrancar, verifica lo mismo que en las Etapas 4 y 6:** que el alumno tenga su `.gs` copiado y **actualizado** en la carpeta `apps-script/`. Esta etapa toca el backend; sin el espejo vas a escribir código que no encaja con el suyo.

---

### 1) Qué es el panel (analogía del mostrador)

- Lo que construyó hasta ahora es lo que **ve el cliente**: el comedor y el mesero (la carta, el flujo de compra, el pago). Pero un café de verdad necesita una **trastienda**: un lugar donde el administrador cargue productos, reponga lo que se agota, revise los pagos que entran, corrija un precio. Ese lugar es el **panel de administración**.
- Vive en una dirección aparte —`tu-sitio.vercel.app/admin`— y **solo entra quien tiene la contraseña del equipo**.
- La diferencia con construir el e-commerce: ahora el pedido a la IA es más **una decisión de negocio** que una pantalla atractiva. No describes una vista bonita: describes **operaciones**.

**Qué permite hacer** (preséntalo en este orden, es el del material):

| Sección | Para qué sirve |
|---|---|
| **Pedidos** | Cuando el stock está bajo, SofIA pide reposición al proveedor y el pedido aparece acá para que el administrador confirme cuando llega al café. **Esta sección se construye en la Etapa 10**: los pedidos los crea el modo real, así que antes no existen. Cuéntaselo para que no la busque ahora. |
| **Transferencias por confirmar** | Los pagos por transferencia quedan pendientes hasta que el administrador ve el comprobante y los aprueba. |
| **Cafés** | Crear, editar, ocultar o activar cada café de la carta (nombre, precio, foto, descripción y su insumo). |
| **Insumos y stock** | Crear insumos (las cápsulas), ver el stock y cargarlo. |

---

### 2) Las dos llaves (que no las confunda — es lo más importante de la etapa)

| La llave | Dónde vive | Para qué sirve |
|---|---|---|
| La **contraseña del panel** (ej. `ADMIN_PASSWORD`) | Variable de entorno en Vercel | La clave que teclea el equipo en el login del panel. |
| El **token servidor-a-servidor** (ej. `ADMIN_APPS_SCRIPT_TOKEN` en Vercel = `ADMIN_TOKEN` en Apps Script) | Vercel ↔ Apps Script | Contraseña entre los dos servidores. El **valor** debe ser idéntico en los dos lados o el backend responde "no autorizado". |

**⚠️ Regla de oro (repítela):** el token servidor-a-servidor **jamás viaja al navegador** — lo agrega Vercel al reenviar el pedido. Así, aunque alguien sepa la contraseña del panel, no puede hablarle directo al Apps Script. Y **ninguna** de las dos llaves se sube nunca a GitHub: viven en variables de entorno.

**🏷️ Los nombres son ejemplos** (ver Etapa 5). El alumno les pone los que quiera; lo importante es que use **el mismo nombre** al cargarlas en Vercel, al escribir el prompt y en el código. Fíjate qué nombres eligió —los anotaste en `PROGRESO-CAFE.md`— y usa **los suyos** en todo lo que sigue.

---

### 3) Antes del prompt: cargar las llaves

Guíalo paso a paso, esperando confirmación en cada uno:

1. **Inventar el token servidor-a-servidor.** Largo y difícil de adivinar, igual que en la Etapa 6. Por ejemplo `admin_2026_7Kd4WzQ9pL3XvB`. Que lo guarde: va en dos lugares.
2. **En Vercel** (Settings → Environment Variables → Add New), cargar **dos** variables. Que elija los nombres y **te los diga**; los ejemplos son solo eso:
   - La contraseña del panel (ej. `ADMIN_PASSWORD`) → la clave que va a teclear el equipo en el login.
   - El token servidor-a-servidor (ej. `ADMIN_APPS_SCRIPT_TOKEN`) → el valor del paso 1.
3. **Redeploy en Vercel.** ⚠️ Sin esto, el panel va a decir "El panel no está configurado" aunque las variables estén bien cargadas. Es el olvido más común de la etapa.
4. **En Apps Script** (Project Settings → Script Properties → Add Script Property), cargar la propiedad del token (ej. `ADMIN_TOKEN`) con **exactamente el mismo valor** del paso 1. El nombre puede ser distinto al de Vercel; el valor, no.

**Anota los tres nombres que eligió en `PROGRESO-CAFE.md`** antes de seguir. Los vas a necesitar para armar el prompt del paso siguiente y para diagnosticar si algo falla.

**Recuérdale:** el panel también usa la variable con la URL de Apps Script (ej. `APPS_SCRIPT_URL`), que ya cargó en la Etapa 4. Si cambió su URL de Apps Script desde entonces, hay que actualizarla o el panel no encuentra el backend.

---

### 4) Un buen prompt cubre 5 preguntas

Menciónalas para que el alumno dirija con criterio, no para que las copie:

| # | Elemento | La pregunta que responde |
|---|---|---|
| 1 | Quién ingresa | Solo el equipo. ¿Con qué se protege el acceso? |
| 2 | Qué gestiona | ¿Cafés, insumos, stock, pagos? ¿Qué se puede crear y editar? |
| 3 | Dónde viven los datos | ¿En la misma planilla de Google Sheets existente? |
| 4 | Qué NO puede pasar | Que se registre una venta sin confirmar. |
| 5 | Cómo se conecta | Con las variables de entorno y las propiedades de Apps Script. |

---

### 5) El prompt (lo pega aquí, en Claude Code)

**⚠️ Antes de dárselo: reemplaza los nombres de las variables por los que él eligió.** En el prompt van escritos los del ejemplo; si sus nombres son otros, hay que cambiarlos en el texto o Claude va a escribir código que busca cajones que no existen.

```
Analiza todo mi proyecto antes de tocar nada, incluido el backend de Apps Script
que está en la carpeta apps-script/. Quiero agregar un panel de administración
en la ruta /admin, separado del e-commerce del cliente. Tiene que actualizarse
solo cada pocos segundos, sin que haya que recargar la página.

Debe pedir una contraseña (ya la cargué como variable de entorno con el nombre
ADMIN_PASSWORD en Vercel) y permitir: crear y editar cafés (nombre, precio,
foto, descripción y su insumo), ocultarlos o volver a activarlos en vez de
borrarlos, crear/editar insumos, cargar stock, ver alertas de stock bajo, y
confirmar o descartar los pagos por transferencia que hoy quedan pendientes.

Los datos van en la misma planilla de Google Sheets vía el Apps Script que ya
tengo, usando el token servidor-a-servidor que cargué en Vercel como
ADMIN_APPS_SCRIPT_TOKEN y en las Script Properties como ADMIN_TOKEN. La
contraseña del panel y ese token NUNCA deben viajar al navegador.

Lo que se cree o edite desde el panel tiene que verse en el e-commerce: la carta
de la tienda (cafés, precios y disponibilidad) tiene que leerse de la planilla,
no quedar escrita en el código.

Asegúrate de que la ruta /admin funcione también en producción, no solo en
local. Muéstrame primero el plan y haz los cambios de a uno.
```

Recuérdale: **mejorar el prompt con IA e iterar** lo que se va creando. El panel no sale perfecto de una: nace de un prompt claro y varias vueltas.

**Por qué el prompt dice "cada pocos segundos" y no "en tiempo real":** una planilla de Google no funciona en tiempo real, y cada consulta a Apps Script tarda unos segundos. Si Claude hace que el panel consulte sin parar, se vuelve lento para todos. Y fíjate que el panel **todavía no tiene la sección de Pedidos**: esa se construye en la Etapa 10, junto con el modo real que crea los pedidos.

---

### 6) Después del prompt: lo que tiene que hacer él

**a) El backend del panel suele ser un archivo `.gs` NUEVO.** Esto confunde a todos: hasta ahora el alumno venía **modificando** su archivo; acá probablemente reciba uno **aparte** (en el proyecto de referencia se llama `Admin.gs`) que convive con los que ya tiene. Dile que le pregunte explícitamente a Claude: *"¿este código va en un archivo nuevo o dentro del que ya tengo?"*.

**b) La puerta de entrada tiene que rutear las acciones del panel.** El `doPost` que ya existe debe reconocer las acciones que empiezan con `admin_` y mandarlas al archivo nuevo. Si esto falta, el panel abre pero cada botón responde algo del estilo *"Falta instalar Admin.gs en este proyecto"*.

**c) Republicar como "Nueva versión".** Igual que siempre: pegar en el editor de Apps Script y **Implementar → Administrar implementaciones → el lápiz → Nueva versión**. Editando la implementación existente, para que la URL no cambie.

**d) La ruta `/admin` en producción.** Una app de una sola página necesita que el servidor sepa que `/admin` no es un archivo: hay que redirigirla al `index.html`. En Vercel se hace con un archivo `vercel.json` en la raíz:

```json
{ "rewrites": [{ "source": "/admin", "destination": "/index.html" }] }
```

⚠️ **Si esto falta, pasa lo más desmoralizante posible:** el panel funciona perfecto en la computadora del alumno y da **404** en el sitio publicado. Si te dice "anda local pero no en Vercel", esto es lo primero que hay que mirar.

---

### 7) Probarlo y diagnosticar

Que abra `tu-sitio.vercel.app/admin` y escriba la clave. **Hay tres respuestas posibles**, y cada una dice exactamente qué falta:

| Lo que ve | Qué significa |
|---|---|
| *"El panel no está configurado"* | Falta la variable de la contraseña en Vercel, falta el **Redeploy**, o el nombre que cargó no es el que quedó en el código. El problema no es la clave. |
| *"Clave incorrecta"* | La variable está bien cargada; lo que no coincide es lo que tecleó. |
| Entra al panel | 🎉 |

Si entra pero los botones fallan con "no autorizado", el problema es la **otra** llave: el token de Vercel y la propiedad de Apps Script no tienen el mismo **valor**, o falta republicar el Apps Script como "Nueva versión".

**Cuando algo no cuadra, revisa siempre los nombres primero.** Pídele que te muestre cómo se llaman exactamente sus variables en Vercel y compáralas con las que quedaron escritas en el código. Un nombre distinto no da error al construir: falla recién al usarlo, y el mensaje nunca dice cuál es.

**Checkpoint:** el panel abre en `tu-sitio.vercel.app/admin` **en producción**, el alumno entra con su clave y ve sus cafés e insumos reales. Cargó las dos llaves en Vercel (con Redeploy) y el `ADMIN_TOKEN` gemelo en las Script Properties. Sabe explicar la diferencia entre las dos llaves.

---

## Etapa 9 · Usar el panel: carta, insumos, stock y transferencias

**Objetivo:** que el alumno opere el café desde el panel: entrar, entender cómo se guardan los datos, crear/editar, reponer stock y confirmar pagos por transferencia.

**1) Entrar al panel.** Ya lo probó al cerrar la Etapa 8, así que no repitas la explicación completa: pídele que abra `tu-sitio.vercel.app/admin` y entre. Si algo falla, las tres respuestas del login y cómo diagnosticarlas están en la Etapa 8, sección 7.

**2) El modelo de datos (la idea que más sorprende).** Todo el café vive en una planilla de Google Sheets, repartido en hojas:

| Hoja | Qué guarda |
|---|---|
| `carta` | Los cafés: nombre, precio, si está activo. **Ojo: aquí NO hay stock del café.** |
| `insumos` | Las materias primas (las cápsulas). Acá vive **el único stock numérico real**, con su umbral mínimo y su costo. |
| `recetas` | La tabla puente: "el café X consume tal cantidad del insumo Y". |
| `presentación` | La cara de cada café: foto, descripción, etiqueta, intensidad. |

- **Un café no tiene stock propio.** Su disponibilidad se **calcula** mirando su receta y el stock de sus insumos. Si un Ristretto necesita 1 cápsula y hay 40 cápsulas, hay Ristretto. Cuando las cápsulas llegan a 0, el café **desaparece solo** de la carta, sin que nadie lo oculte.
- La hoja `presentación` está aparte a propósito, para no ensuciar la hoja `carta` que usa el motor de SofIA.

**3) Crear y editar: el CRUD.** CRUD = las cuatro cosas que se hacen con cualquier dato: **C**rear (Create), **L**eer (Read), **A**ctualizar (Update) y **B**orrar (Delete). El panel es, en el fondo, un CRUD sobre la planilla. Detrás de cada botón hay una acción del backend:

| Operación | En el panel | La acción por detrás |
|---|---|---|
| Leer | Ver la lista de cafés, insumos y pagos | `admin_list` |
| Crear / Actualizar café | "+ Nuevo café" o "Editar" | `admin_upsert_item` |
| Crear / Actualizar insumo | "+ Nuevo insumo" o "Editar" | `admin_upsert_insumo` |
| Cargar stock | "+ Agregar stock" | `admin_set_stock` |
| Ocultar café | "Ocultar / Activar" | `admin_upsert_item` (campo activo) |

- **No hay "Borrar" definitivo para los cafés:** en vez de eliminarlos, se **ocultan** (quedan inactivos). Se conserva el historial y es fácil de revertir. Es una **decisión de negocio, no técnica**: la IA podría hacer cualquiera de las dos.

**4) Renovar stock y alertas.** Con **"+ Agregar stock"** el panel muestra el stock actual y deja escribir cuánto sumar (sirve para reponer o corregir a mano). Cada insumo tiene un **umbral mínimo**: si el stock queda **igual o por debajo**, el insumo está **BAJO** y su fila se resalta como alerta (en el tablero de SofIA, en rojo). La alerta no es solo un color: es un dato guardado (`alerta_disparada`) que se prende tras una venta real y **se apaga sola** al reponer.
- **⚠️ Aclárale esto o se va a confundir:** las alertas **solo funcionan de verdad en modo real**. En modo simulado SofIA repone al instante en su mundo de mentira, así que no hace falta avisarle a nadie. Si el alumno prueba ahora y no ve alertas, no está roto: todavía está en simulación (el interruptor llega en la Etapa 10).

**5) Confirmar los pagos por transferencia** (aquí el panel se vuelve imprescindible). Mercado Pago se confirma solo; la transferencia **no** —nadie del banco le avisa al café—, así que queda **pendiente** hasta que un humano la aprueba. El flujo:
1. El cliente transfiere → su pedido aparece en **"Transferencias por confirmar"**. Todavía **no** cuenta como venta (no descuenta stock ni suma a caja).
2. El administrador revisa el comprobante (fuera del sistema).
3. **Confirmar** → recién ahí la venta entra de verdad: descuenta stock, suma a caja, registra la venta. **Descartar** → la marca como no concretada, sin tocar nada (para los pedidos que el cliente nunca terminó de pagar).

**Probarlo** (es la prueba de la transferencia que quedó pendiente en la Etapa 7). Hazlo con él, paso a paso:
1. Que haga una **compra por transferencia** en su propia app. No hace falta transferir dinero de verdad: es una prueba.
2. Que entre al panel y vea el pedido en **"Transferencias por confirmar"**.
3. Que lo **confirme** y compruebe que **deja de estar pendiente**.

No le pidas comparar el stock ni la caja: mientras el simulador esté encendido, SofIA vende y repone al mismo tiempo, y los números no sirven para comprobar nada. Que la venta confirmada mueva stock y caja se comprueba en la **Etapa 10**, con el simulador apagado.

**Checkpoint:** el alumno entró al panel, reconoce dónde vive cada dato (y por qué el café no tiene stock propio), cargó stock de un insumo y **confirmó una transferencia de prueba**, que dejó de estar pendiente. Pregunta de comprensión sugerida: *"¿Por qué una transferencia queda pendiente y un pago de Mercado Pago no?"*

---

## Etapa 10 · SofIA en modo real

**Objetivo:** que el alumno **construya** el modo real con un prompt (el interruptor, el reloj real, el latido y los pedidos al proveedor), lo **encienda** con sus propias manos, ajuste el **criterio de compra** de SofIA y entienda por qué toda acción con consecuencias pasa por una confirmación humana.

**⚠️ Antes de arrancar, verifica dos cosas:**
1. Que el alumno tenga su `.gs` copiado y **actualizado** en la carpeta `apps-script/` (ver Etapa 4). Sin ese espejo no puedes leer su backend y vas a escribir código que no encaja con el suyo.
2. Que tenga presente el flujo del backend: **tú escribes el código → él lo pega en el editor de Apps Script → republica como "Nueva versión".** El Apps Script NO se publica por GitHub. Repítelo, es el olvido más común de esta etapa.

**Ubícalo:** esta es la última etapa. Todo lo que hizo hasta aquí fue un café que funciona; esto es el café **gestionándose solo**.

---

### 1) El concepto: un interruptor de pared

Explícalo así, sin apuro:

Hasta ahora SofIA vivía en un **ensayo general**. Inventaba clientes, corría un reloj acelerado y reponía el stock al instante. No era una mentira: era un simulador, la forma de ver **cómo piensa** sin arriesgar nada.

El modo real apaga el ensayo. Y es literalmente un interruptor: una fila en la hoja `config` llamada `modo_real`, que vale `true` o `false`. Nada más. Alrededor hay dos funciones cortitas: una que **lee** si está encendido (`esModoReal_`, mirar si la luz está prendida) y otra que lo **enciende o apaga** (`setModoReal`, la mano en la palanca). La palanca queda a la vista como un **switch en el tablero de SofIA**: el alumno lo toca y el tablero llama a esa función. **Arranca apagado** y es **totalmente reversible**.

**🏷️ Estos nombres también son ejemplos.** La clave de la planilla y las funciones pueden llamarse como el alumno prefiera; lo que importa es que sean **las mismas** que Claude escriba en su código. Cuando termine, pídele a Claude que te diga **cómo llamó a cada una** y anótalas en `PROGRESO-CAFE.md`: algunas, como la que crea el latido, el alumno las va a tener que ejecutar a mano más adelante.

| Aspecto | Modo simulado | Modo real |
|---|---|---|
| Las ventas | Las inventa el sistema al azar | Son las compras reales de la app |
| El reloj | Acelerado e inventado (1 min = 1 hora) | La fecha y hora reales de su zona horaria |
| El motor viejo (`tick`) | Hace vivir al café | Se apaga solo: detecta el modo real y sale sin hacer nada |
| Qué la mantiene viva | Un "tick" cada minuto | Un **latido** cada 15 minutos reales |
| Cuando falta stock | Repone al instante | **NO** repone: deja un pedido al proveedor y manda un mail |
| Las alertas de stock | No hacen falta | Se marcan tras cada venta real, para que el admin las vea |

**La fila que más importa es la anteúltima.** Hazla notar: en modo real **SofIA deja de tener manos**. Decide, pide y avisa, pero no toca el stock ni la caja. Eso queda para cuando una persona confirme en el panel.

---

### 2) Las cuatro piezas que se van a construir

Preséntalas de a una, para que el alumno sepa qué está pidiendo cuando pegue el prompt:

1. **El interruptor.** La fila `modo_real` en `config`, las dos funciones que la leen y la escriben, y el switch en el tablero de SofIA para prenderlo y apagarlo.
2. **El reloj real.** Cada registro guarda un sello de día y hora. En simulado es un número inventado; en real tiene que ser la fecha y hora de verdad, en su zona horaria. Y el `tick` viejo debe salir de inmediato cuando el modo real está prendido — **no hay que borrar nada**, el disparador puede seguir corriendo en vacío.
3. **El latido.** Un disparador de Apps Script que despierta a SofIA **cada 15 minutos reales**. En cada latido revisa si hay insumos bajos. Además, en cuatro horarios fijos (apertura, mediodía, tarde y cierre) deja un "pulso de vida": un comentario, un balance, una señal de que está ahí. **Una vez por día cada uno**, no una vez por latido.
4. **Los pedidos al proveedor.** Cuando un insumo queda BAJO, SofIA crea un pedido **pendiente** y manda el mail. Stock y caja no se mueven. Su ciclo de vida:
   - **Lo crea (pendiente):** calcula cuánto comprar, revisa que la caja alcance y deja el pedido + mail.
   - **Lo consulta antes de volver a pedir:** si ese insumo ya tiene un pedido en camino, no lo pide de nuevo; deja un mensaje al equipo.
   - **El administrador confirma la llegada** desde el panel: recién ahí se suma el stock, se descuenta de la caja y se apaga la alerta.
   - **O lo cancela:** no toca stock ni caja, y el insumo sigue bajo (así que SofIA lo volverá a pedir).

**Sobre la tercera viñeta del punto 4, insiste:** sin la regla de "no pedir dos veces", cada latido generaría un pedido nuevo y un mail nuevo. Cuatro pedidos por hora del mismo insumo. Es el detalle que parece menor y es el que rompe todo.

---

### 3) El prompt (lo pega aquí, en Claude Code)

```
Analiza todo mi proyecto antes de tocar nada, incluido el backend de Apps Script
que está en la carpeta apps-script/. Quiero agregar el MODO REAL a mi café.

El interruptor: una clave "modo_real" en la hoja config que vale true o false,
con una función que la lee y otra que la enciende o apaga, y un switch en el
tablero de SofIA para prenderlo y apagarlo. Tiene que arrancar apagado y ser
reversible.

Cuando el modo real está encendido:
1. El tick de la simulación no hace nada: no avanza el reloj ni inventa ventas.
   No lo borres, solo que salga de inmediato.
2. El día y la hora que se guardan en cada registro salen del reloj real de mi
   zona horaria, no del reloj simulado.
3. Después de cada venta real, marca como alerta los insumos que quedaron en o
   por debajo de su umbral mínimo, para que se vean en el panel /admin.
4. SofIA NO repone stock sola: cuando un insumo está bajo, crea un pedido al
   proveedor en estado pendiente y manda el mail al correo de reposición que ya
   está configurado en mi backend. El stock y la caja se tocan recién cuando
   alguien confirma la llegada desde /admin.
5. Antes de pedir, revisa si ese insumo ya tiene un pedido pendiente. Si lo
   tiene, no lo pidas de nuevo: deja un mensaje para el equipo.
6. Antes de crear un pedido, valida en el código, no solo en las instrucciones
   de SofIA, que el costo no supere el saldo de la caja. Si no alcanza, pide
   una cantidad menor o no pidas, y deja un mensaje para el equipo.

El latido: una función disparada cada 15 minutos reales que solo actúa en modo
real. En cada latido revisa si hay insumos bajos. Además, una vez por día en
horarios fijos (apertura, mediodía, tarde y cierre), SofIA deja un comentario
breve; el del cierre incluye el balance del día. Fuera del horario del café no
hace nada. Agrega también una función para crear ese disparador y otra para
borrarlo.

En el panel /admin: agrega una sección de Pedidos donde se vean los pedidos al
proveedor pendientes, y se pueda confirmar que llegaron (indicando la cantidad
que llegó, por si no coincide con la pedida) o cancelarlos. Al confirmar, recién
ahí se suma el stock, se descuenta de la caja y se apaga la alerta. Al cancelar,
no se toca nada. Guarda en mi GitHub los cambios del panel.

Respeta la estructura y el estilo de mi código actual. Muéstrame primero el plan
y haz los cambios de a uno.
```

**Dile antes de que lo pegue:** esto no sale perfecto de una. El prompt abre la conversación, no la cierra. Que lea el plan, pregunte lo que no entienda y pida ajustes.

**Sobre la zona horaria:** pregúntale en qué país está el café. El código de referencia usa la zona de Argentina; si el alumno está en otro lado, tiene que pedirle a Claude la suya, o el reloj "real" le va a marcar una hora ajena.

---

### 4) Después del prompt: tres pasos que hace él, en este orden

El código que devuelve Claude **todavía no está vivo**. Guíalo uno por uno y espera confirmación entre cada uno:

1. **Publicar el backend.** Pegar el código en el editor de Apps Script y republicar como **"Nueva versión"**. Si se salta esto, la URL sigue sirviendo la versión vieja y **nada de lo que sigue funciona**. Es el error número uno de esta etapa. (La sección de Pedidos del panel, en cambio, se publica sola cuando Claude la sube a GitHub, como cualquier cambio del e-commerce.)
2. **Crear el latido.** En el editor de Apps Script, ejecutar **una sola vez** la función que crea el disparador (en el proyecto de referencia, `crearTriggerLatido` — usa el nombre que Claude haya puesto en el suyo). Google va a pedir permisos la primera vez: es normal, que acepte. Esto **no se hace con un prompt**: es un botón del editor.
3. **Prender el interruptor.** Abrir el tablero de SofIA y encender el switch del modo real. No hace falta republicar: el estado queda guardado en la hoja `config`. Si el switch no aparece, que recargue el tablero; si sigue sin aparecer, casi seguro falta el paso 1.

Recién ahí SofIA está gestionando de verdad. **Celébralo:** su café acaba de dejar de ser una demo.

---

### 5) Probarlo (hazlo con él, paso a paso)

- Que haga **dos compras** en su app: una **con tarjeta de prueba** y otra **por transferencia**, confirmada en el panel. Así se completan las pruebas que quedaron pendientes en las Etapas 7 y 9. "Real" acá significa "en modo real", no con dinero de verdad: si su Mercado Pago ya está en producción, una tarjeta verdadera cobra en serio.
- Cada venta tiene que aparecer en la hoja `ventas`, con el día y la hora de verdad (no un número), y tiene que haber **bajado el stock y subido la caja**. Con el simulador apagado, esos números ya sirven para comprobar.
- Que baje a propósito el stock de un insumo por debajo de su umbral desde `/admin` y espere un latido. Tiene que aparecer un **pedido pendiente** en la sección Pedidos del panel, y el mail en **el correo de reposición** que ya tenía configurado. **El stock NO se repone solo:** eso es exactamente lo que queremos ver.
  - ⏱️ **Avísale antes, o va a creer que está roto:** un latido puede tardar **hasta 15 minutos**, y **fuera del horario del café no hace nada**. Para no esperar, que ejecute **a mano la función del latido** desde el editor de Apps Script (que le pregunte a Claude cómo se llama). Si la clase es fuera del horario del café, que le pida a Claude cuál es ese horario: que no pase nada a esa hora es lo esperado.
- Que confirme ese pedido desde la sección Pedidos del panel. Ahí sí sube el stock, baja la caja y se apaga la alerta.

**Para apagarlo:** el mismo switch del tablero. Vuelve la simulación, intacta. Díselo: saber que puede volver atrás le baja la ansiedad de encenderlo.

---

### 6) El criterio de compra: lo decide el alumno

Ahora que el modo real está encendido, SofIA "despierta" cada 15 minutos, mira el café y, si hay algo por agotarse, actúa. **Pero su forma de comprar tiene reglas, y esas reglas las escribe el alumno.** Esta parte no es técnica: es su manual del empleado.

- Reponer **solo lo que está BAJO**, nunca lo que está OK, aunque tenga ganas de tener colchón.
- Comprar **holgado, no lo justo**: dejar el stock cómodamente por encima del umbral, apuntando al doble. La cuenta es `(2 × umbral − stock actual)`. Ej.: umbral 20, quedan 19 → no pide 1, pide unas 21.
- **Cuidar la caja:** mirar el saldo antes de comprar; si no alcanza, comprar menos.
- **Revisar los pedidos en camino** antes de comprar, para no pedir dos veces lo mismo.

**Dónde viven estas reglas — y acá está la lección de la etapa.** Están en dos lugares distintos, y la diferencia importa:

| Tipo de regla | Dónde vive | Qué tan fuerte es |
|---|---|---|
| "Repón solo lo BAJO", "compra holgado" | En el **texto de instrucciones** que recibe SofIA (su prompt de sistema, dentro del `.gs`) | Se le **pide**. El modelo casi siempre obedece, pero es una instrucción, no una barrera. |
| "No gastes más de lo que hay en caja" | En el **código**, como validación antes de ejecutar la compra | Se le **obliga**. No se puede desobedecer. |

**Al modelo se le pide; al código se le obliga.** Por eso la plata está protegida por código, no por buenas intenciones. Es el concepto más valioso de toda la clase: cuando algo NO puede pasar, no alcanza con pedirlo bien.

**Prompt para ajustar el criterio** (opcional pero muy recomendado — es donde el alumno ve que dirigir una IA a veces es reescribir un párrafo):
```
En mi backend de Apps Script hay un texto que le da las instrucciones a SofIA
(su prompt de sistema, con las reglas de compra). Muéstrame ese texto tal como
está hoy. Quiero ajustar sus reglas: que cuando reponga un insumo BAJO apunte
al doble del umbral, calculando la cantidad como (2 × umbral − stock actual), y
que siga sin comprar nunca insumos en estado OK. Muéstrame el texto actual y el
nuevo, uno al lado del otro, para que yo lo apruebe antes de cambiar nada.
```

Después de este cambio hay que **volver a pegar el `.gs` en Apps Script y republicar como "Nueva versión"**, igual que siempre.

---

### 7) El cerebro es intercambiable (concepto, no paso)

SofIA piensa con un modelo de lenguaje, pero es un **"enchufe" configurable**: hoy usa un modelo de OpenAI, pero podría conectarse a otro sin cambiar el resto del café. El café no se entera de a cuál cerebro está enchufado: solo recibe decisiones y **las valida igual**.

---

**La idea grande de la clase:** la inteligencia artificial **nunca toca la caja ni el depósito con sus propias manos** —siempre hay una confirmación humana entre su decisión y el efecto real—, y eso es exactamente lo que la hace **confiable**.

**Checkpoint (cierre del proyecto):** 🎉 el alumno **construyó el modo real** (interruptor, reloj real, latido y pedidos al proveedor), publicó el backend como versión nueva, creó el disparador del latido y **encendió el interruptor**. Comprobó que una venta con tarjeta y una por transferencia llegan a la planilla, descuentan stock y suman a la caja, que un insumo bajo genera un pedido pendiente y un mail —y que **el stock no se repone solo**—, y que al confirmar en `/admin` recién ahí se mueven stock y caja. Sabe apagarlo desde el switch del tablero, y entiende dónde vive el criterio de compra: **al modelo se le pide, al código se le obliga**.

**Si algo no funciona, el orden de sospecha es siempre el mismo:** ¿republicó como "Nueva versión"? → ¿ejecutó una vez la función que crea el latido? → ¿encendió el switch del modo real en el tablero? Nueve de cada diez veces falta el primero.

---

## 🎓 Cierre de la Clase 6 y del proyecto

Recapitula el viaje completo de las dos clases: de una idea en palabras a un e-commerce publicado, con backend, cobros de verdad **y una trastienda desde la que se gobierna el café** — incluido el momento en que SofIA deja de simular y empieza a gestionar de verdad, siempre con un humano confirmando lo que tiene consecuencias. Refuerza lo perdurable: **el método** (dirigir a la IA con claridad, evaluar con criterio, iterar con paciencia) vale más que cualquier botón, porque las herramientas cambian. Marca todas las etapas como completas en `PROGRESO-CAFE.md`.
