# ⚙️ Picolas ATERNOS Bot 💬  
Bot de WhatsApp para controlar tu servidor de **Aternos** desde el celular.  
Podés iniciarlo, apagarlo o revisar su estado con simples comandos desde WhatsApp 😎  

---

## 🚀 Comandos disponibles
| Comando | Descripción |
|----------|--------------|
| `.on` | 🔥 Inicia tu bot de Aternos |
| `.off` | 🛑 Apaga tu bot de Aternos |
| `.status` | 📡 Verifica si está corriendo |
| `.menu` | 📋 Muestra el menú de ayuda |

---

## 🧩 Requisitos
- Termux o PC con **Node.js 18+**
- Una cuenta de WhatsApp (la del OWNER)
- Tu proyecto **PicolasBOTaternos-2.0** en una carpeta aparte

---

## 📱 Instalación rápida en Termux (una sola línea)

> ⚠️ Reemplazá `TU_USUARIO` por tu nombre real de GitHub

```bash
pkg update -y && pkg install git nodejs -y && git clone https://github.com/picolasYT/PicolasATERNOSbot && cd PicolasATERNOSbot && npm install && npm start
```
📷 Luego escaneá el QR que aparece en Termux con tu WhatsApp
👉 (Configuración → Dispositivos vinculados → Vincular dispositivo)

🧠 Configuración
Editá el archivo config.js

Cambiá tu número de WhatsApp en formato internacional:

js
Copiar código
export const owner = "549XXXXXXXXXX@s.whatsapp.net";
Listo ✅

👑 Créditos
👤 Autor: Picolas
🌐 Proyecto original: PicolasBOTaternos-2.0
💬 Desarrollado con Baileys + Node.js

💥 Soporte
Si el bot no responde o se desconecta:

Volvé a ejecutar node index.js

Si pide QR de nuevo, escanealo otra vez

Asegurate de que la carpeta /auth no se haya borrado

⭐ ¡Dale una estrellita si te gustó el proyecto! ⭐
