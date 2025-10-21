import { exec } from "child_process";

export default async function status(sock, chatId) {
  exec("pgrep -f 'PicolasBOTaternos-2.0'", (err, stdout) => {
    if (stdout) {
      sock.sendMessage(chatId, {
        text: "🟢 PicolasBOTaternos está corriendo ✅",
      });
    } else {
      sock.sendMessage(chatId, {
        text: "🔴 PicolasBOTaternos está apagado ❌",
      });
    }
  });
}
