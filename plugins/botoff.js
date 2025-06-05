// ASTA BOT - Comando "adiosbot": solo owners permanentes pueden usarlo. Borra todos los documentos y apaga el bot.
// Mensaje minimalista: solo "listo" y sin mención de quién lo ejecutó.

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
  // Solo owners permanentes
  if (!global.owner?.some(([num, , perma]) => perma && m.sender.includes(num))) {
    return; // No responde nada si no es owner permanente
  }

  // Mensaje minimalista
  await m.reply('listo');

  // Ruta base donde están los documentos (ajusta si usas otra carpeta)
  const docsFolder = path.join(process.cwd(), 'src', 'database');

  // Borra todos los archivos en src/database
  try {
    if (fs.existsSync(docsFolder)) {
      const files = fs.readdirSync(docsFolder);
      for (const file of files) {
        const filePath = path.join(docsFolder, file);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      }
    }
  } catch (e) {
    // No envía mensajes de error para mantener anonimato
  }

  // Apaga el bot
  process.exit(0);
};

handler.help = ['adiosbot'];
handler.tags = ['owner'];
handler.command = ['adiosbot'];
handler.rowner = true; // Solo root/permanent owners

export default handler;
