// Pinterest search funcional y rápida para ASTA Bot - Fer280809
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`✨ Por favor, escribe lo que deseas buscar en Pinterest.\nEjemplo: ${usedPrefix}${command} waifu`);
  }

  await m.react?.('⏳');

  try {
    const res = await axios.get(`https://pinterest-api-zhirrr.vercel.app/api/pin?query=${encodeURIComponent(text)}`);
    const results = res.data.data;

    if (!results || !Array.isArray(results) || results.length === 0) {
      await m.react?.('❌');
      return m.reply('❌ No se encontraron resultados para tu búsqueda en Pinterest.');
    }

    // Envía hasta 5 imágenes al chat, una por mensaje (más compatible)
    let num = 1;
    for (let img of results.slice(0, 5)) {
      await conn.sendMessage(m.chat, {
        image: { url: img.url },
        caption: `🔎 *Pinterest*\n🔸 *Búsqueda:* ${text}\n🔸 *Resultado:* ${num++}\n🔗 [Ver imagen en Pinterest](${img.url})`
      }, { quoted: m });
    }

    await m.react?.('✅');
  } catch (e) {
    await m.react?.('❌');
    m.reply('❌ Hubo un error al buscar en Pinterest o la API está temporalmente fuera de servicio.');
  }
};

handler.help = ["pinterest <texto>"];
handler.tags = ["descargas"];
handler.coin = 1;
handler.group = true;
handler.register = true;
handler.command = ['pinterest', 'pin'];

export default handler;
