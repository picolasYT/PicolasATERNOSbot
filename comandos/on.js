import { exec } from "child_process";
import { owner } from "../config.js";

export default async function on(sock, chatId, body, sender) {
  if (sender !== owner) {
    await sock.sendMessage(chatId, {
      text: "❌ No estás autorizado para usar este comando.",
    });
    return;
  }

  await sock.sendMessage(chatId, { text: "🚀 Iniciando PicolasBOTaternos..." });

  exec("cd ../PicolasBOTaternos-2.0 && node index.js", (err) => {
    if (err) {
      sock.sendMessage(chatId, {
        text: "❌ Error al iniciar: " + err.message,
      });
    } else {
      sock.sendMessage(chatId, {
        text: "🔥 PicolasBOTaternos iniciado correctamente.",
      });
    }
  });
}
