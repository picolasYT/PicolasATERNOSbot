import { exec } from "child_process";
import { owner } from "../config.js";

export default async function off(sock, chatId, body, sender) {
  if (sender !== owner) {
    await sock.sendMessage(chatId, {
      text: "❌ No estás autorizado para usar este comando.",
    });
    return;
  }

  await sock.sendMessage(chatId, { text: "🛑 Apagando PicolasBOTaternos..." });
  exec("pkill -f 'PicolasBOTaternos-2.0'", () => {
    sock.sendMessage(chatId, { text: "📴 PicolasBOT detenido." });
  });
}
