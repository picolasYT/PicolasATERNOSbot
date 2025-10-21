import { brand, botName, prefix } from "../config.js";

export default async function menu(sock, chatId) {
  const text = `
📋 *Menú de comandos — ${botName}*
━━━━━━━━━━━━━━━━━━━━━━━
⚙️  *${prefix}on* → Inicia el bot de Aternos
🛑  *${prefix}off* → Apaga el bot de Aternos
📡  *${prefix}status* → Verifica si está corriendo
📜  *${prefix}menu* → Muestra este menú

━━━━━━━━━━━━━━━━━━━━━━━
${brand}
`;

  await sock.sendMessage(chatId, { text });
}
