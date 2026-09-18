import { useState, useRef, useEffect } from "react";
import { Mic, Send, Coffee, ShoppingBag, BarChart3, QrCode, ArrowLeft, Sparkles, Check } from "lucide-react";

// ---------- Datos de ejemplo (placeholder, no reales) ----------
const MENU = [
  { id: "espresso", nombre: "Espresso", precio: 900, cat: "Café", stock: 100, desc: "Cápsula intensa, un shot puro." },
  { id: "capuchino", nombre: "Capuchino", precio: 1400, cat: "Café", stock: 100, desc: "Espresso, leche vaporizada y espuma." },
  { id: "latte", nombre: "Latte", precio: 1400, cat: "Café", stock: 100, desc: "Suave, con más leche que espuma." },
  { id: "mch", nombre: "Mocha", precio: 1600, cat: "Café", stock: 10, desc: "Espresso, chocolate y leche vaporizada." },
  { id: "des", nombre: "Espresso descafeinado", precio: 950, cat: "Café", stock: 10, desc: "Todo el ritual, sin cafeína." },
  { id: "che", nombre: "Chocolate caliente", precio: 1300, cat: "Otros", stock: 10, desc: "Para los días de lluvia en el campus." },
];

const VENTAS_HOY = [
  { hora: "07h", monto: 8 }, { hora: "08h", monto: 22 }, { hora: "09h", monto: 34 },
  { hora: "10h", monto: 19 }, { hora: "11h", monto: 27 }, { hora: "12h", monto: 41 },
  { hora: "13h", monto: 30 }, { hora: "14h", monto: 12 },
];

const GASTOS = [
  { concepto: "Reposición cápsulas — mixto", monto: 145000, fecha: "Hoy, 09:14" },
  { concepto: "Leche y lácteos", monto: 38500, fecha: "Ayer, 16:40" },
  { concepto: "Vasos y tapas", monto: 21000, fecha: "Ayer, 11:02" },
];

// ---------- Utilidades ----------
const colones = (n) => "₡" + n.toLocaleString("es-CR");

function useOrbState(estado) {
  // estado: idle | escuchando | pensando | hablando
  const cfg = {
    idle: { color: "#6C68A6", scale: 1, speed: "4s" },
    escuchando: { color: "#5AC8FA", scale: 1.06, speed: "1.6s" },
    pensando: { color: "#F4C863", scale: 1.04, speed: "1s" },
    hablando: { color: "#9B5CF6", scale: 1.12, speed: "0.6s" },
  };
  return cfg[estado] || cfg.idle;
}

// ---------- Orbe de SofIA ----------
function Orbe({ estado = "idle", size = 96 }) {
  const s = useOrbState(estado);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, ${s.color}, #16123a 75%)`,
        boxShadow: `0 0 ${size * 0.5}px ${s.color}55, inset 0 0 ${size * 0.2}px rgba(255,255,255,0.15)`,
        transform: `scale(${s.scale})`,
        transition: "transform 0.5s ease, background 0.5s ease",
        animation: `sofia-breathe ${s.speed} ease-in-out infinite`,
        flexShrink: 0,
      }}
    />
  );
}

// ---------- Pantalla: Bienvenida ----------
function Bienvenida({ onStart }) {
  return (
    <div className="screen center">
      <div className="stars" />
      <Orbe estado="idle" size={140} />
      <h1 className="hero-title">
        Café <span className="accent-gold">SofIA</span>
      </h1>
      <p className="hero-sub">El primer café del campus atendido por una inteligencia artificial.</p>
      <button className="btn-primary btn-xl" onClick={onStart}>
        Tocá para pedir <Sparkles size={20} style={{ marginLeft: 8 }} />
      </button>
      <p className="hero-hint">También podés hablarle. SofIA escucha y responde por voz o por texto.</p>
    </div>
  );
}

// ---------- Pantalla: Pedido (chat) ----------
function Pedido({ menu, carrito, setCarrito, onIrPago, onVolver }) {
  const [mensajes, setMensajes] = useState([
    { de: "sofia", texto: "¡Hola! Soy SofIA. ¿Qué te gustaría tomar hoy? Puedo contarte qué tenemos disponible." },
  ]);
  const [input, setInput] = useState("");
  const [estadoOrbe, setEstadoOrbe] = useState("idle");
  const [seleccion, setSeleccion] = useState(null);
  const [esperandoNombre, setEsperandoNombre] = useState(false);
  const esperandoNombreRef = useRef(false);
  const scrollRef = useRef(null);

  function registrarInteraccion(tipo, detalle) {
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo: "registrar_interaccion", interaccion: { tipo, detalle } }),
    }).catch(() => {});
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [mensajes]);

  useEffect(() => {
    const ultimo = mensajes[mensajes.length - 1];
    if (!ultimo || ultimo.de !== "sofia" || !window.speechSynthesis) return;
    const decir = () => {
      const voces = window.speechSynthesis.getVoices();
      const voz = voces.find((item) => /^es(-|_)/i.test(item.lang) && /female|mujer|paulina|monica|luciana/i.test(item.name))
        || voces.find((item) => /^es(-|_)/i.test(item.lang));
      const mensaje = new SpeechSynthesisUtterance(ultimo.texto);
      mensaje.lang = voz?.lang || "es-CR";
      mensaje.rate = 0.96;
      mensaje.pitch = 1.08;
      mensaje.volume = 1;
      if (voz) mensaje.voice = voz;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(mensaje);
    };
    decir();
  }, [mensajes]);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.qty, 0);

  function agregarAlCarrito(producto) {
    registrarInteraccion("seleccion_producto", producto.id);
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) return prev.map((p) => (p.id === producto.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...producto, qty: 1 }];
    });
    setEstadoOrbe("pensando");
    setTimeout(() => {
      setMensajes((m) => [
        ...m,
        { de: "user", texto: `Quiero un ${producto.nombre}` },
        {
          de: "sofia",
          texto:
            producto.stock <= 5
              ? `Sumé un ${producto.nombre} a tu pedido. Ojo: nos quedan pocas unidades hoy, así que puede que sea de las últimas.`
              : `Listo, agregué un ${producto.nombre} (${colones(producto.precio)}). ¿Algo más?`,
        },
      ]);
      setEstadoOrbe("hablando");
      setTimeout(() => setEstadoOrbe("idle"), 900);
    }, 500);
  }

  function enviarTexto(textoEntrada = input) {
    if (!textoEntrada.trim()) return;
    const texto = textoEntrada.trim();
    const textoLower = texto.toLowerCase();
    registrarInteraccion("mensaje_cliente", texto);
    setMensajes((m) => [...m, { de: "user", texto }]);
    setInput("");
    setEstadoOrbe("pensando");
    setTimeout(() => {
      const textoPlano = textoLower
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[¿?¡!,.]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const palabrasNombre = textoPlano.split(" ");
      const presentacion = textoPlano.match(/^(?:me llamo|soy)\s+([a-záéíóúüñ]+(?:\s+[a-záéíóúüñ]+){0,2})$/i);
      const nombreDicho = presentacion ? presentacion[1] : textoPlano;
      const esNombre = esperandoNombreRef.current
        && (Boolean(presentacion) || (palabrasNombre.length <= 3
          && palabrasNombre.every((palabra) => /^[a-záéíóúüñ]+$/i.test(palabra))))
        && !menu.some((producto) => nombreDicho === producto.nombre.toLowerCase());
      const esPreguntaDeStock = /stock|queda|disponib|tenes|hay caf|tipos de caf|que caf/.test(
        textoLower
      );
      const esPreguntaDeMenu = /menú|menu|carta|qué opciones|que opciones|qué vend|que vend/.test(textoLower);
      const esPreguntaDeRecomendacion = /recomend|cuál me|cual me|qué me sugerís|que me sugeris|clima|calor|frío|frio|lluv/.test(
        textoLower
      );
      const esSaludo = /^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey)( sofia)?(?: soy .+)?$/.test(textoPlano)
        || textoPlano.startsWith("hola sofia ");
      const esPreguntaIdentidad = /eres una persona|sos una persona|eres humana|eres un chatbot|eres ia|eres una ia|qué eres|que eres|quién eres|quien eres/.test(
        textoLower
      );
      const esPreguntaProyecto = /cómo funcionas|como funcionas|cómo estás hecha|como estas hecha|cómo te construyeron|como te construyeron|cómo funciona(?: el| tu)? proyecto|como funciona(?: el| tu)? proyecto|cómo funciona sofia|como funciona sofia|explica(?:me)? tu proyecto|explícame tu proyecto|qué hay detrás|que hay detras|qué pasa con mis datos|que pasa con mis datos|cómo tomas decisiones|como tomas decisiones|cómo trabaja sofia|como trabaja sofia|qué puedes hacer|que puedes hacer|qué haces exactamente|que haces exactamente|cómo está construida|como esta construida|cómo fue creada|como fue creada|transparencia/.test(
        textoLower
      );
      const esPreguntaError = /puedes equivocarte|podés equivocarte|inventas respuestas|puedes mentir/.test(textoLower);
      const esPreguntaHumano = /hablar con una persona|hablar con alguien|hablar con un humano|atención humana/.test(
        textoLower
      );
      const match = menu.find((p) => textoLower.includes(p.nombre.toLowerCase().split(" ")[0]));

      if (esSaludo) {
        esperandoNombreRef.current = true;
        setEsperandoNombre(true);
        setMensajes((m) => [
          ...m,
          {
            de: "sofia",
            texto: "¡Hola! Qué lindo recibirte en Café SofIA. ¿Con quién tengo el gusto? Así te atiendo como corresponde.",
          },
        ]);
        setEstadoOrbe("hablando");
        setTimeout(() => setEstadoOrbe("idle"), 900);
      } else if (esNombre) {
        esperandoNombreRef.current = false;
        setEsperandoNombre(false);
        const nombre = nombreDicho.split(" ").map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
        setMensajes((m) => [
          ...m,
          {
            de: "sofia",
            texto: `¡Mucho gusto, ${nombre}! Soy SofIA y estoy para ayudarte. ¿Te cuento qué tenemos disponible o ya sabés qué café querés pedir?`,
          },
        ]);
        setEstadoOrbe("hablando");
        setTimeout(() => setEstadoOrbe("idle"), 900);
      } else if (esPreguntaIdentidad) {
        setMensajes((m) => [
          ...m,
          {
            de: "sofia",
            texto:
              "Soy SofIA, una inteligencia artificial. No soy una persona, aunque me encanta charlar como si lo fuera. Tomo pedidos y gestiono el cobro; el café lo prepara siempre alguien del campus.",
          },
        ]);
        setEstadoOrbe("hablando");
        setTimeout(() => setEstadoOrbe("idle"), 900);
      } else if (esPreguntaProyecto) {
        setMensajes((m) => [
          ...m,
          {
            de: "sofia",
            texto:
              "Soy la interfaz de un proyecto de café con IA. La web muestra la carta y recibe tu pedido; un backend seguro consulta el inventario real, registra ventas e interacciones y conecta el chat con un modelo de lenguaje. Yo no invento stock ni precios: para esos datos consulto el sistema. Las claves quedan en el servidor, y una persona del campus prepara y entrega cada café.",
          },
        ]);
        setEstadoOrbe("hablando");
        setTimeout(() => setEstadoOrbe("idle"), 900);
      } else if (esPreguntaError) {
        setMensajes((m) => [
          ...m,
          {
            de: "sofia",
            texto:
              "Sí, puedo equivocarme, pero nunca invento datos de stock, precios o ventas: si no tengo la información real, te lo digo directamente en vez de adivinar.",
          },
        ]);
        setEstadoOrbe("hablando");
        setTimeout(() => setEstadoOrbe("idle"), 900);
      } else if (esPreguntaHumano) {
        setMensajes((m) => [
          ...m,
          {
            de: "sofia",
            texto: "Por supuesto. Si preferís hablar con una persona, avisá en el mostrador y alguien del equipo te atiende enseguida.",
          },
        ]);
        setEstadoOrbe("hablando");
        setTimeout(() => setEstadoOrbe("idle"), 900);
      } else if (esPreguntaDeRecomendacion) {
        const haceCalor = /calor|caluroso|caliente afuera/.test(textoLower);
        const recomendado = haceCalor ? menu[0] : menu.find((p) => p.id === "latte") || menu[0];
        const razon = haceCalor
          ? "algo corto e intenso rinde mejor cuando aprieta el calor"
          : "en Costa Rica el clima suele ser cálido casi todo el año, así que un café suave con leche entra bien en cualquier momento";
        setMensajes((m) => [
          ...m,
          {
            de: "sofia",
            texto: `Te recomiendo el ${recomendado.nombre} (${colones(recomendado.precio)}) — ${razon}. ¿Te lo sumo al pedido?`,
          },
        ]);
        setEstadoOrbe("hablando");
        setTimeout(() => setEstadoOrbe("idle"), 900);
      } else if (esPreguntaDeStock) {
        const detalle = menu.map((p) => `${p.nombre}: ${p.stock} unidades`).join(", ");
        setMensajes((m) => [
          ...m,
          { de: "sofia", texto: `Este es el stock real ahora mismo — ${detalle}. ¿Querés que te agregue alguno?` },
        ]);
        setEstadoOrbe("hablando");
        setTimeout(() => setEstadoOrbe("idle"), 900);
      } else if (esPreguntaDeMenu) {
        const detalle = menu.map((p) => `${p.nombre} (${colones(p.precio)})`).join(", ");
        setMensajes((m) => [
          ...m,
          { de: "sofia", texto: `Hoy tenemos: ${detalle}. Decime cuál te gustaría y te lo sumo al pedido.` },
        ]);
        setEstadoOrbe("hablando");
        setTimeout(() => setEstadoOrbe("idle"), 900);
      } else if (match) {
        agregarAlCarritoDesdeTexto(match);
      } else {
        setMensajes((m) => [
          ...m,
          {
            de: "sofia",
            texto:
              "No estoy segura de haber entendido bien eso. Puedo contarte el menú, el stock, recomendarte algo, o sumar un producto directo a tu pedido — probá preguntarme o elegí una opción de abajo.",
          },
        ]);
        setEstadoOrbe("idle");
      }
    }, 700);
  }

  function hablarConSofia() {
    const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Reconocimiento) {
      setMensajes((m) => [...m, { de: "sofia", texto: "Tu navegador no habilita el micrófono. Puedes escribirme y te responderé igual." }]);
      return;
    }
    const reconocimiento = new Reconocimiento();
    reconocimiento.lang = "es-CR";
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;
    setEstadoOrbe("escuchando");
    reconocimiento.onresult = (event) => enviarTexto(event.results[0][0].transcript);
    reconocimiento.onerror = () => setEstadoOrbe("idle");
    reconocimiento.onend = () => setEstadoOrbe("idle");
    reconocimiento.start();
  }

  function agregarAlCarritoDesdeTexto(producto) {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) return prev.map((p) => (p.id === producto.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...producto, qty: 1 }];
    });
    setMensajes((m) => [
      ...m,
      { de: "sofia", texto: `Perfecto, sumé un ${producto.nombre} (${colones(producto.precio)}). ¿Algo más?` },
    ]);
    setEstadoOrbe("hablando");
    setTimeout(() => setEstadoOrbe("idle"), 900);
  }

  return (
    <div className="screen">
      <TopBar titulo="Hacé tu pedido" onVolver={onVolver} />
      <div className="pedido-layout">
        <div className="chat-col">
          <div className="chat-header">
            <Orbe estado={estadoOrbe} size={56} />
            <div>
              <div className="chat-header-name">SofIA</div>
              <div className="chat-header-status">
                {estadoOrbe === "pensando" ? "está pensando…" : estadoOrbe === "hablando" ? "respondiendo" : "esperando tu pedido"}
              </div>
            </div>
          </div>
          <div className="chat-msgs" ref={scrollRef}>
            {mensajes.map((m, i) => (
              <div key={i} className={`msg ${m.de === "user" ? "msg-user" : "msg-sofia"}`}>
                {m.texto}
              </div>
            ))}
          </div>
          <div className="chat-input-row">
            <button className="mic-btn" title="Hablarle a SofIA" onClick={hablarConSofia}>
              <Mic size={20} />
            </button>
            <input
              className="chat-input"
              placeholder="Escribile a SofIA…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviarTexto()}
            />
            <button className="send-btn" onClick={enviarTexto}>
              <Send size={18} />
            </button>
          </div>
        </div>

        <div className="menu-col">
          <div className="menu-col-title">Carta de hoy</div>
          <div className="menu-grid">
            {menu.length === 0 && <p className="qr-note">Consultando el catálogo real…</p>}
            {menu.map((p) => (
              <button key={p.id} className="menu-card" onClick={() => agregarAlCarrito(p)} disabled={!p.disponible || p.stock <= 0}>
                <div className="menu-card-top">
                  <span className="menu-card-name">{p.nombre}</span>
                  {p.stock <= 5 && <span className="tag-bajo">quedan {p.stock}</span>}
                </div>
                <p className="menu-card-desc">{p.desc}</p>
                <div className="menu-card-price">{p.disponible === false || p.stock <= 0 ? "Agotado" : colones(p.precio)}</div>
              </button>
            ))}
          </div>

          <div className="carrito-box">
            <div className="carrito-title">
              <ShoppingBag size={18} /> Tu pedido
            </div>
            {carrito.length === 0 ? (
              <p className="carrito-vacio">Todavía no agregaste nada.</p>
            ) : (
              <>
                <div className="carrito-lista">
                  {carrito.map((item) => (
                    <div className="carrito-item" key={item.id}>
                      <span>
                        {item.qty}× {item.nombre}
                      </span>
                      <span>{colones(item.precio * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="carrito-total">
                  <span>Total</span>
                  <span>{colones(total)}</span>
                </div>
                <button className="btn-primary btn-full" onClick={onIrPago}>
                  Ir a pagar con QR
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Pantalla: Pago QR ----------
function Pago({ carrito, onConfirmar, onVolver }) {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.qty, 0);
  const [pagado, setPagado] = useState(false);
  const [metodo, setMetodo] = useState("transferencia");
  const [cliente, setCliente] = useState({ nombre: "", telefono: "", email: "" });
  const [clienteReconocido, setClienteReconocido] = useState(null);
  const [buscandoCliente, setBuscandoCliente] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function confirmarPago() {
    if (!cliente.nombre.trim() || !cliente.telefono.trim() || !cliente.email.trim()) {
      setError("Completa tu nombre, teléfono y correo para registrar tu pedido.");
      return;
    }
    setEnviando(true);
    setError("");
    try {
      const respuesta = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: metodo === "transferencia" ? "pedido_transferencia" : "pedido_confirmado",
          referencia: `web-${Date.now()}`,
          items: carrito.map((item) => ({ id: item.id, cantidad: item.qty })),
          cliente,
        }),
      });
      const resultado = await respuesta.json();
      if (!respuesta.ok || !resultado.ok) throw new Error(resultado.error || "No se pudo registrar el pedido.");
      setClienteReconocido(resultado.cliente || resultado.pedido?.cliente || null);
      setPagado(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setEnviando(false);
    }
  }

  async function buscarCliente(event) {
    const nombre = event.target.value;
    setCliente({ ...cliente, nombre });
    if (nombre.trim().length < 3) return;
    setBuscandoCliente(true);
    try {
      const respuesta = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "buscar_cliente", nombre }),
      });
      const resultado = await respuesta.json();
      if (resultado.ok && resultado.cliente) {
        setCliente((actual) => ({ ...actual, ...resultado.cliente, nombre }));
        setClienteReconocido({ ...resultado.cliente, recurrente: true });
      }
    } catch (lookupError) {
      // La compra sigue disponible aunque la búsqueda no responda.
    } finally {
      setBuscandoCliente(false);
    }
  }

  if (pagado) {
    return (
      <div className="screen center">
        <div className="check-circle">
          <Check size={48} color="#0B0A1F" />
        </div>
        <h2 className="confirm-title">{metodo === "transferencia" ? "Pedido recibido" : "¡Listo, gracias!"}</h2>
        <p className="confirm-sub">
          {metodo === "transferencia"
            ? `Tu transferencia quedó pendiente de confirmación. Te avisaremos cuando el pago sea validado.${clienteReconocido?.recurrente ? ` Qué bueno verte de nuevo, ${clienteReconocido.nombre}.` : ""}`
            : `${clienteReconocido?.recurrente ? `Qué bueno verte de nuevo, ${clienteReconocido.nombre}. ` : ""}Tu pedido ya está en preparación. SofIA avisa cuando esté listo para retirar.`}
        </p>
        <button className="btn-primary btn-xl" onClick={onConfirmar}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="screen center">
      <TopBar titulo="Elegí cómo pagar" onVolver={onVolver} floating />
      <div className="payment-methods">
        <button className={`nav-btn ${metodo === "transferencia" ? "nav-btn-activo" : ""}`} onClick={() => setMetodo("transferencia")}>
          Transferencia bancaria
        </button>
        <button className={`nav-btn ${metodo === "qr" ? "nav-btn-activo" : ""}`} onClick={() => setMetodo("qr")}>
          QR de prueba
        </button>
      </div>
      <div className="customer-form" style={{ display: "grid", gap: 8, width: "min(100%, 360px)", margin: "12px 0" }}>
        <p className="qr-hint">Déjanos tus datos para identificarte en futuras visitas.</p>
        <input className="chat-input" type="text" placeholder="Nombre completo" value={cliente.nombre} onChange={buscarCliente} />
        {buscandoCliente && <span className="qr-note">Buscando tus datos…</span>}
        <input className="chat-input" type="tel" placeholder="Teléfono" value={cliente.telefono} onChange={(event) => setCliente({ ...cliente, telefono: event.target.value })} />
        <input className="chat-input" type="email" placeholder="Correo electrónico" value={cliente.email} onChange={(event) => setCliente({ ...cliente, email: event.target.value })} />
      </div>
      {metodo === "transferencia" ? (
        <>
          <p className="qr-hint">Transfiere el total y conserva el comprobante.</p>
          <div className="qr-box bank-details">
            <p><strong>BAC San José</strong></p>
            <p>Alias: Banco, BAC</p>
            <p>IBAN: CR91010200009291412574</p>
          </div>
        </>
      ) : (
        <>
          <p className="qr-hint">Escaneá este código con la app de la universidad para pagar desde tu cuenta.</p>
          <div className="qr-box">
            <QrCode size={180} color="#0B0A1F" />
          </div>
        </>
      )}
      <div className="qr-total">{colones(total)}</div>
      <button className="btn-primary btn-xl" onClick={confirmarPago} disabled={enviando}>
        {enviando ? "Enviando…" : metodo === "transferencia" ? "Ya realicé la transferencia" : "Simular pago confirmado"}
      </button>
      {error && <p className="qr-note">No se registró el pedido: {error}</p>}
      <p className="qr-note">
        {metodo === "transferencia" ? "La venta se registra cuando el administrador confirme el comprobante." : "En la versión real, esta pantalla se actualiza sola al detectar el pago."}
      </p>
    </div>
  );
}

// ---------- Pantalla: Transparencia pública ----------
function Transparencia({ menu, onVolver }) {
  const totalHoy = VENTAS_HOY.reduce((a, b) => a + b.monto, 0);
  const maxVenta = Math.max(...VENTAS_HOY.map((v) => v.monto));
  const stockCritico = menu.filter((p) => p.stock <= 5);
  const totalGastos = GASTOS.reduce((a, b) => a + b.monto, 0);

  return (
    <div className="screen">
      <TopBar titulo="Transparencia — cómo funciona SofIA" onVolver={onVolver} />
      <p className="transp-intro">
        Café SofIA opera solo, sin caja registradora tradicional. Esta pantalla es pública: cualquiera puede ver en
        tiempo real cómo van las ventas, el inventario y los gastos del café.
      </p>
      <div className="tcard transp-project-card">
        <div className="tcard-label">Cómo funciona el proyecto</div>
        <div className="project-steps">
          <div><strong>1. La web</strong><span>Muestra la carta, consulta disponibilidad y recibe pedidos.</span></div>
          <div><strong>2. SofIA</strong><span>Conversa, explica el sistema y consulta datos reales antes de responder.</span></div>
          <div><strong>3. El backend</strong><span>Registra ventas, clientes, interacciones, stock y agenda en el sistema operativo del café.</span></div>
          <div><strong>4. El equipo</strong><span>Confirma pagos, recibe reposiciones y prepara cada producto. La IA no manipula alimentos.</span></div>
        </div>
        <p className="project-note">Las claves de conexión no se exponen en el navegador. Si un dato no está disponible, SofIA debe decirlo en lugar de inventarlo.</p>
      </div>
      <div className="transp-grid">
        <div className="tcard">
          <div className="tcard-label">Ventas de hoy</div>
          <div className="tcard-number">{totalHoy} cafés</div>
          <div className="bars">
            {VENTAS_HOY.map((v) => (
              <div className="bar-col" key={v.hora}>
                <div className="bar" style={{ height: `${(v.monto / maxVenta) * 60}px` }} />
                <span className="bar-label">{v.hora}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tcard">
          <div className="tcard-label">Stock por producto</div>
          {menu.map((p) => (
            <div className="stock-row" key={p.id}>
              <span className="stock-name">{p.nombre}</span>
              <div className="stock-bar-track">
                <div
                  className="stock-bar-fill"
                  style={{ width: `${Math.min(p.stock, 50) * 2}%`, background: p.stock <= 5 ? "#FF7A9C" : "#3ED6A3" }}
                />
              </div>
              <span className="stock-qty">{p.stock}</span>
            </div>
          ))}
          {stockCritico.length > 0 && (
            <p className="stock-alert">⚠ Stock bajo en: {stockCritico.map((p) => p.nombre).join(", ")}</p>
          )}
        </div>

        <div className="tcard">
          <div className="tcard-label">Últimos gastos</div>
          {GASTOS.map((g, i) => (
            <div className="gasto-row" key={i}>
              <div>
                <div className="gasto-concepto">{g.concepto}</div>
                <div className="gasto-fecha">{g.fecha}</div>
              </div>
              <div className="gasto-monto">{colones(g.monto)}</div>
            </div>
          ))}
          <div className="gasto-total">
            <span>Total de gastos recientes</span>
            <span>{colones(totalGastos)}</span>
          </div>
        </div>

        <div className="tcard">
          <div className="tcard-label">Estado de SofIA</div>
          <div className="estado-sofia">
            <Orbe estado="idle" size={64} />
            <div>
              <div className="estado-nombre">En línea</div>
              <p className="estado-desc">
                SofIA solo toma pedidos y gestiona el cobro. La preparación y manipulación del café la hace personal
                del campus, nunca la IA.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="transp-footer">Los datos operativos se consultan desde el sistema del café; la preparación y las decisiones humanas siguen siendo responsabilidad del equipo.</p>
    </div>
  );
}

// ---------- Barra superior ----------
function TopBar({ titulo, onVolver, floating }) {
  return (
    <div className={`topbar ${floating ? "topbar-floating" : ""}`}>
      <button className="back-btn" onClick={onVolver}>
        <ArrowLeft size={20} />
      </button>
      <span className="topbar-title">{titulo}</span>
    </div>
  );
}

// ---------- Navegación inferior (público) ----------
function NavInferior({ pantalla, ir }) {
  if (pantalla === "bienvenida") return null;
  return (
    <div className="nav-inferior">
      <button className={`nav-btn ${pantalla === "pedido" ? "nav-btn-activo" : ""}`} onClick={() => ir("pedido")}>
        <Coffee size={18} /> Pedir
      </button>
      <button
        className={`nav-btn ${pantalla === "transparencia" ? "nav-btn-activo" : ""}`}
        onClick={() => ir("transparencia")}
      >
        <BarChart3 size={18} /> Transparencia
      </button>
    </div>
  );
}

function Admin() {
  const [password, setPassword] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function cargarDatos(clave = password) {
    setCargando(true);
    setError("");
    try {
      const respuesta = await fetch("/api/admin", { headers: { "x-admin-password": clave } });
      const resultado = await respuesta.json();
      if (!respuesta.ok || !resultado.ok) throw new Error(resultado.error || "No se pudo cargar el panel.");
      setDatos(resultado);
      setAutenticado(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setCargando(false);
    }
  }

  async function ejecutar(action, data) {
    setCargando(true);
    setError("");
    try {
      const respuesta = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ action, data }),
      });
      const resultado = await respuesta.json();
      if (!respuesta.ok || !resultado.ok) throw new Error(resultado.error || "La acción no pudo completarse.");
      setDatos(resultado);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setCargando(false);
    }
  }

  async function cambiarModoReal(event) {
    await ejecutar("admin_set_mode_real", { enabled: event.target.checked });
  }

  async function confirmarPedidoProveedor(item) {
    const cantidad = window.prompt(`Cantidad recibida de ${item.nombre}:`, String(item.cantidad));
    if (cantidad === null) return;
    const cantidadRecibida = Number(cantidad);
    if (!Number.isFinite(cantidadRecibida) || cantidadRecibida < 0) {
      setError("La cantidad recibida debe ser un número igual o mayor que cero.");
      return;
    }
    await ejecutar("admin_confirm_supplier_order", { pedidoId: item.pedido_id, cantidadRecibida });
  }

  if (!autenticado) {
    return (
      <div className="app-root">
        <style>{`.app-root{font-family:Lato,sans-serif;background:linear-gradient(180deg,#0B0A1F 0%,#120E33 45%,#0B0A1F 100%);color:#EAE9FB;min-height:100vh;width:100%;display:flex;flex-direction:column}.screen{flex:1;display:flex;flex-direction:column;padding:28px 32px;position:relative;overflow-y:auto}.screen.center{align-items:center;justify-content:center;text-align:center;gap:14px}.hero-title{font-family:Space Grotesk,sans-serif;font-size:44px;font-weight:700;margin:10px 0 0}.hero-sub{color:#B9B6E8;font-size:16px;max-width:420px;margin:0}.chat-input{background:#1A1740;border:1px solid #2C2A55;color:#EAE9FB;border-radius:999px;padding:10px 16px;font-family:inherit;font-size:14px;outline:none;width:min(100%,360px);box-sizing:border-box}.btn-primary{background:linear-gradient(120deg,#7C3AED,#9B5CF6);color:#fff;border:none;border-radius:999px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:12px 20px}.btn-xl{font-size:16px;padding:14px 24px}.qr-note{color:#FF7A9C;font-size:12px;margin-top:10px}`}</style>
        <div className="screen center">
          <h1 className="hero-title">Trastienda</h1>
          <p className="hero-sub">Panel privado de Café SofIA</p>
          <input className="chat-input" type="password" placeholder="Contraseña del panel" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button className="btn-primary btn-xl" onClick={() => cargarDatos()} disabled={cargando || !password}>
            {cargando ? "Entrando…" : "Entrar"}
          </button>
          {error && <p className="qr-note">{error}</p>}
        </div>
      </div>
    );
  }

  const transferencias = datos?.transferencias || [];
  const pedidosProveedor = datos?.pedidos_proveedor || [];
  return (
    <div className="app-root">
      <style>{`.app-root{font-family:Lato,sans-serif;background:linear-gradient(180deg,#0B0A1F 0%,#120E33 45%,#0B0A1F 100%);color:#EAE9FB;min-height:100vh;width:100%;display:flex;flex-direction:column}.screen{width:100%;max-width:1100px;box-sizing:border-box;margin:0 auto;padding:28px 32px;position:relative}.topbar{display:flex;align-items:center;gap:12px;margin-bottom:22px}.back-btn{background:rgba(255,255,255,.08);border:0;color:#EAE9FB;width:38px;height:38px;border-radius:50%;cursor:pointer}.topbar-title{font-family:Space Grotesk,sans-serif;font-size:22px;font-weight:700}.transp-intro{color:#B9B6E8;font-size:14px;margin-bottom:18px}.transp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.tcard{background:#141233;border:1px solid rgba(155,92,246,.18);border-radius:18px;padding:18px;min-width:0}.tcard-label{font-family:Space Grotesk,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#B9B6E8;margin-bottom:12px}.tcard p{margin:8px 0;color:#EAE9FB}.gasto-row{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:13px;padding:10px 0;border-bottom:1px solid #2C2A55}.gasto-row:last-child{border-bottom:0}.nav-btn{background:#1E1A45;border:1px solid rgba(155,92,246,.25);color:#EAE9FB;border-radius:10px;padding:8px 12px;cursor:pointer;font-family:inherit;font-size:12px}.nav-btn:hover{border-color:#9B5CF6}.btn-primary{background:linear-gradient(120deg,#7C3AED,#9B5CF6);color:#fff;border:0;border-radius:999px;font-weight:700;cursor:pointer;padding:12px 20px;margin-top:20px}.btn-xl{font-size:15px;padding:13px 24px}@media(max-width:720px){.screen{padding:20px 16px}.transp-grid{grid-template-columns:1fr}.gasto-row{align-items:flex-start;flex-direction:column}}`}</style>
      <div className="screen">
        <TopBar titulo="Trastienda" onVolver={() => { window.location.href = "/"; }} />
        <p className="transp-intro">Cafés, insumos, stock y transferencias pendientes.</p>
        <div className="tcard">
          <div className="tcard-label">Modo real</div>
          <label className="mode-toggle">
            <input type="checkbox" checked={Boolean(datos.modo_real)} onChange={cambiarModoReal} disabled={cargando} />
            <span>{datos.modo_real ? "Activo" : "Apagado"}</span>
          </label>
          <p className="qr-note">Apagado = simulador. Activo = ventas y reloj reales.</p>
        </div>
        <div className="transp-grid">
          <div className="tcard">
            <div className="tcard-label">Cafés</div>
            {(datos.carta || []).map((item) => <p key={item.id_item}>{item.nombre} · {colones(item.precio)}</p>)}
          </div>
          <div className="tcard">
            <div className="tcard-label">Insumos y stock</div>
            {(datos.insumos || []).map((item) => {
              const bajo = Boolean(item.alerta_disparada) || Number(item.stock) <= Number(item.umbral_min);
              return (
                <p key={item.id_insumo}>
                  {item.nombre}: {item.stock}
                  {bajo && <strong className="stock-alert"> · Stock bajo</strong>}
                </p>
              );
            })}
          </div>
          <div className="tcard">
            <div className="tcard-label">Transferencias pendientes</div>
            {transferencias.length === 0 && <p>No hay transferencias pendientes.</p>}
            {transferencias.map((item) => (
              <div className="gasto-row" key={item.orderId}>
                <span>{item.orderId} · {colones(Number(item.monto) || 0)}</span>
                <span>
                  <button className="nav-btn" onClick={() => ejecutar("admin_confirm_transfer", { orderId: item.orderId })}>Confirmar</button>
                  <button className="nav-btn" onClick={() => ejecutar("admin_discard_transfer", { orderId: item.orderId })}>Descartar</button>
                </span>
              </div>
            ))}
          </div>
          <div className="tcard">
            <div className="tcard-label">Pedidos al proveedor</div>
            {pedidosProveedor.length === 0 && <p>No hay pedidos pendientes.</p>}
            {pedidosProveedor.map((item) => (
              <div className="gasto-row" key={item.pedido_id}>
                <span>{item.nombre} · {item.cantidad} {item.unidad} · {colones(Number(item.costo_total) || 0)}</span>
                <span>
                  <button className="nav-btn" onClick={() => confirmarPedidoProveedor(item)}>Recibido</button>
                  <button className="nav-btn" onClick={() => ejecutar("admin_cancel_supplier_order", { pedidoId: item.pedido_id })}>Cancelar</button>
                </span>
              </div>
            ))}
          </div>
        </div>
        {error && <p className="qr-note">{error}</p>}
        <button className="btn-primary btn-xl" onClick={() => cargarDatos()} disabled={cargando}>
          {cargando ? "Actualizando…" : "Actualizar"}
        </button>
      </div>
    </div>
  );
}

// ---------- App principal ----------
export default function CafeSofiaPrototipo() {
  const [pantalla, setPantalla] = useState("bienvenida");
  const [carrito, setCarrito] = useState([]);
  const [menu, setMenu] = useState(MENU);
  const [catalogoError, setCatalogoError] = useState("");

  useEffect(() => {
    fetch("/api/catalog")
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
        if (!resultado.ok || !Array.isArray(resultado.productos)) throw new Error(resultado.error || "No se pudo consultar el catálogo.");
        setMenu(resultado.productos);
      })
      .catch(() => setCatalogoError("No pudimos actualizar el inventario real; intenta recargar la página."));
  }, []);

  if (window.location.pathname === "/admin") return <Admin />;

  function irInicio() {
    setCarrito([]);
    setPantalla("bienvenida");
  }

  return (
    <div className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Lato:wght@400;700;900&display=swap');

        .app-root {
          font-family: 'Lato', sans-serif;
          background:
            radial-gradient(1.5px 1.5px at 10% 15%, #fff, transparent),
            radial-gradient(1px 1px at 80% 25%, #cbd0ff, transparent),
            radial-gradient(1.5px 1.5px at 60% 70%, #fff, transparent),
            radial-gradient(1px 1px at 30% 85%, #cbd0ff, transparent),
            radial-gradient(1.5px 1.5px at 90% 60%, #fff, transparent),
            linear-gradient(180deg, #0B0A1F 0%, #120E33 45%, #0B0A1F 100%);
          color: #EAE9FB;
          min-height: 640px;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        @keyframes sofia-breathe {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.25); }
        }
        .screen { flex: 1; display: flex; flex-direction: column; padding: 28px 32px; position: relative; overflow-y: auto; }
        .screen.center { align-items: center; justify-content: center; text-align: center; gap: 14px; }

        .hero-title { font-family: 'Space Grotesk', sans-serif; font-size: 44px; font-weight: 700; margin: 10px 0 0; }
        .accent-gold { color: #F4C863; }
        .hero-sub { color: #B9B6E8; font-size: 16px; max-width: 420px; margin: 0; }
        .hero-hint { color: #7B78A8; font-size: 13px; margin-top: 6px; }

        .btn-primary {
          background: linear-gradient(120deg, #7C3AED, #9B5CF6);
          color: #fff; border: none; border-radius: 999px; font-family: 'Lato', sans-serif;
          font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
        }
        .btn-xl { padding: 16px 34px; font-size: 17px; margin-top: 10px; }
        .btn-full { width: 100%; padding: 13px 0; font-size: 15px; margin-top: 12px; }

        .topbar { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
        .topbar-floating { position: absolute; top: 28px; left: 32px; margin: 0; }
        .back-btn { background: rgba(255,255,255,0.08); border: none; color: #EAE9FB; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .topbar-title { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; }

        .pedido-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; flex: 1; min-height: 0; }
        .chat-col { display: flex; flex-direction: column; background: #141233; border: 1px solid rgba(155,92,246,0.18); border-radius: 20px; padding: 18px; min-height: 0; }
        .chat-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .chat-header-name { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 16px; }
        .chat-header-status { font-size: 12px; color: #8683B0; }
        .chat-msgs { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding: 4px 2px; min-height: 120px; }
        .msg { max-width: 85%; padding: 9px 13px; border-radius: 16px; font-size: 14px; line-height: 1.4; }
        .msg-user { align-self: flex-end; background: linear-gradient(120deg, #7C3AED, #9B5CF6); color: #fff; border-bottom-right-radius: 4px; }
        .msg-sofia { align-self: flex-start; background: #1E1A45; border: 1px solid rgba(155,92,246,0.2); border-bottom-left-radius: 4px; }
        .chat-input-row { display: flex; gap: 8px; margin-top: 12px; align-items: center; }
        .mic-btn, .send-btn { background: #1E1A45; border: 1px solid rgba(155,92,246,0.25); color: #EAE9FB; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
        .chat-input { flex: 1; background: #1A1740; border: 1px solid #2C2A55; color: #EAE9FB; border-radius: 999px; padding: 10px 16px; font-family: inherit; font-size: 14px; outline: none; }
        .chat-input::placeholder { color: #7B78A8; }

        .menu-col { display: flex; flex-direction: column; min-height: 0; overflow-y: auto; }
        .menu-col-title { font-family: 'Space Grotesk', sans-serif; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #B9B6E8; margin-bottom: 10px; }
        .menu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .menu-card { text-align: left; background: #141233; border: 1px solid rgba(155,92,246,0.18); border-radius: 16px; padding: 12px; cursor: pointer; color: #EAE9FB; font-family: inherit; }
        .menu-card:hover { border-color: #9B5CF6; }
        .menu-card-top { display: flex; justify-content: space-between; align-items: center; }
        .menu-card-name { font-weight: 700; font-size: 14px; }
        .tag-bajo { font-size: 10px; background: rgba(255,122,156,0.15); color: #FF7A9C; padding: 2px 6px; border-radius: 20px; font-weight: 700; }
        .menu-card-desc { font-size: 12px; color: #9C9AC9; margin: 4px 0 8px; }
        .menu-card-price { font-weight: 900; color: #F4C863; font-size: 14px; }

        .carrito-box { margin-top: 16px; background: #141233; border: 1px solid rgba(155,92,246,0.18); border-radius: 16px; padding: 14px; }
        .carrito-title { display: flex; align-items: center; gap: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; margin-bottom: 8px; }
        .carrito-vacio { color: #7B78A8; font-size: 13px; }
        .carrito-item { display: flex; justify-content: space-between; font-size: 13px; padding: 4px 0; }
        .carrito-total { display: flex; justify-content: space-between; font-weight: 900; border-top: 1px solid #2C2A55; margin-top: 8px; padding-top: 8px; color: #F4C863; }

        .qr-hint { color: #B9B6E8; max-width: 340px; margin: 60px 0 20px; }
        .qr-box { background: #EAE9FB; padding: 20px; border-radius: 20px; }
        .bank-details { color: #0B0A1F; width: min(100%, 360px); box-sizing: border-box; }
        .bank-details p { margin: 7px 0; }
        .qr-total { font-family: 'Space Grotesk', sans-serif; font-size: 30px; font-weight: 700; margin: 16px 0; color: #F4C863; }
        .qr-note { color: #7B78A8; font-size: 12px; margin-top: 10px; }

        .check-circle { width: 90px; height: 90px; border-radius: 50%; background: #3ED6A3; display: flex; align-items: center; justify-content: center; }
        .confirm-title { font-family: 'Space Grotesk', sans-serif; margin: 4px 0; }
        .confirm-sub { color: #B9B6E8; max-width: 320px; }

        .transp-intro { color: #B9B6E8; font-size: 14px; max-width: 640px; margin-bottom: 18px; }
        .transp-project-card { margin-bottom: 16px; }
        .project-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .project-steps div { display: flex; flex-direction: column; gap: 5px; padding-right: 8px; }
        .project-steps strong { color: #F4C863; font-size: 13px; }
        .project-steps span, .project-note { color: #9C9AC9; font-size: 12px; line-height: 1.45; }
        .project-note { border-top: 1px solid #221E48; margin: 14px 0 0; padding-top: 12px; }
        .transp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .tcard { background: #141233; border: 1px solid rgba(155,92,246,0.18); border-radius: 18px; padding: 16px; }
        .tcard-label { font-family: 'Space Grotesk', sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #B9B6E8; margin-bottom: 8px; }
        .tcard-number { font-family: 'Space Grotesk', sans-serif; font-size: 30px; font-weight: 700; color: #F4C863; margin-bottom: 10px; }
        .bars { display: flex; align-items: flex-end; gap: 6px; height: 70px; }
        .bar-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
        .bar { width: 100%; background: linear-gradient(180deg, #9B5CF6, #F4C863); border-radius: 4px 4px 0 0; }
        .bar-label { font-size: 9px; color: #7B78A8; }
        .stock-row { display: flex; align-items: center; gap: 8px; font-size: 12px; margin-bottom: 7px; }
        .stock-name { width: 90px; flex-shrink: 0; }
        .stock-bar-track { flex: 1; height: 8px; background: #221E48; border-radius: 20px; overflow: hidden; }
        .stock-bar-fill { height: 100%; border-radius: 20px; }
        .stock-qty { width: 24px; text-align: right; font-weight: 700; }
        .stock-alert { color: #FF7A9C; font-size: 12px; margin-top: 8px; }
        .gasto-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px solid #221E48; }
        .gasto-concepto { font-weight: 700; }
        .gasto-fecha { font-size: 11px; color: #7B78A8; }
        .gasto-total { display: flex; justify-content: space-between; font-weight: 900; margin-top: 8px; color: #F4C863; }
        .estado-sofia { display: flex; align-items: center; gap: 14px; }
        .estado-nombre { font-weight: 700; color: #3ED6A3; }
        .estado-desc { font-size: 12px; color: #9C9AC9; margin-top: 4px; }
        .transp-footer { font-size: 11px; color: #565278; margin-top: 16px; text-align: center; }

        .nav-inferior { display: flex; border-top: 1px solid rgba(155,92,246,0.15); }
        .nav-btn { flex: 1; background: none; border: none; color: #7B78A8; padding: 12px 0; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
        .nav-btn-activo { color: #F4C863; }

        @media (max-width: 720px) {
          .pedido-layout { grid-template-columns: 1fr; }
          .project-steps { grid-template-columns: 1fr 1fr; }
          .transp-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {pantalla === "bienvenida" && <Bienvenida onStart={() => setPantalla("pedido")} />}
      {pantalla === "pedido" && (
        <Pedido menu={menu} carrito={carrito} setCarrito={setCarrito} onIrPago={() => setPantalla("pago")} onVolver={irInicio} />
      )}
      {pantalla === "pago" && (
        <Pago carrito={carrito} onConfirmar={irInicio} onVolver={() => setPantalla("pedido")} />
      )}
      {pantalla === "transparencia" && <Transparencia menu={menu} onVolver={irInicio} />}

      {catalogoError && <p className="qr-note">{catalogoError}</p>}

      <NavInferior pantalla={pantalla} ir={setPantalla} />
    </div>
  );
}
