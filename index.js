import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import P from "pino";
import qrcode from "qrcode-terminal";
import cron from "node-cron";
import * as comandos from "./comandos/index.js";
import { owner, prefix, botName, timezone, brand } from "./config.js";

// 🔁 Variables globales
let reportTask = null;
let horarioReporte = "0 12 * * *"; // opcional: mensaje diario de prueba

// 🚀 Inicialización del bot
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    auth: state,
    version,
  });

  sock.ev.on("creds.update", saveCreds);

  // 🔐 QR y reconexión
  sock.ev.on("connection.update", ({ connection, qr }) => {
    if (qr) {
      console.log("\n📱 Escaneá este código QR con tu WhatsApp:\n");
      qrcode.generate(qr, { small: true });
    }
    if (connection === "open") {
      console.log(`✅ ${botName} conectado a WhatsApp`);
      scheduleReport(horarioReporte, sock);
    }
    if (connection === "close") {
      console.log("⚠️ Conexión cerrada, reintentando...");
      startBot();
    }
  });

  // ⏰ Cron opcional (solo ping de prueba)
  function scheduleReport(expr, sockInstance) {
    if (reportTask) reportTask.stop();
    reportTask = cron.schedule(
      expr,
      async () => {
        await sockInstance.sendMessage(owner, {
          text: `🕛 Ping diario activo - ${brand}`,
        });
      },
      { timezone: timezone }
    );
    console.log("⏰ Cron programado:", expr, `(${timezone})`);
  }

  // 🔎 Extraer texto del mensaje
  const getText = (m) =>
    m?.message?.conversation ||
    m?.message?.extendedTextMessage?.text ||
    m?.message?.imageMessage?.caption ||
    m?.message?.videoMessage?.caption ||
    "";

  // ⚙️ Router de comandos
  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const m = messages[0];
      const chatId = m?.key?.remoteJid;
      if (!chatId) return;

      const body = getText(m).trim();
      if (!body.startsWith(prefix)) return;

      const cmd = body.split(/\s+/)[0].slice(1).toLowerCase();
      const sender = m?.key?.participant || chatId;

      const comando = comandos[cmd];
      if (typeof comando === "function") {
        await comando(sock, chatId, body, sender);
      }
    } catch (err) {
      console.error("❌ Error procesando mensaje:", err.message);
    }
  });
}

startBot();
