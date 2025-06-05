/* 
- Flux Ai Imagen By  
- https://whatsapp.com/channel/0029VbAoYE99hXF1wm3zmQ21
*/
import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Verificar si el mensaje fue marcado como bloqueado
  if (m.isBlocked) {
    return // No procesar si está bloqueado
  }

  if (!text) return conn.reply(m.chat, `${emoji} Por favor, ingresé un termino para generar una imagen.`, m)
  
  // Verificación adicional de seguridad para comandos bloqueados
  const blockedKeywords = [
    // Comandos de owner
    'addowner', 'delowner', 'owner', 'setowner',
    // Comandos de administración
    'ban', 'unban', 'kick', 'promote', 'demote', 'banuser', 'unbanuser',
    'enable', 'disable', 'on', 'off', 'autoadmin',
    // Comandos de sistema
    'restart', 'reiniciar', 'update', 'exec', 'eval',
    'backup', 'copia', 'restore', 'reset', 'cleanfiles', 'cleartmp', 'vaciartmp',
    // Comandos de prefijo y configuración
    'setprefix', 'prefix', 'resetprefix', 'setpp', 'setbio', 'setstatus',
    'setname', 'setimage', 'setpfp', 'setavatar', 'setbanner', 'setmoneda',
    // Comandos de broadcast y grupos
    'broadcastgroup', 'bc', 'broadcast', 'bcgc', 'grouplist', 'listgroup',
    'join', 'invite', 'leave', 'salir', 'newgc', 'creargc',
    // Comandos de plugins y archivos
    'deleteplugin', 'saveplugin', 'getplugin', 'plugin', 'savejs', 'savefile',
    'deletefile', 'get', 'fetch',
    // Comandos de usuarios y premium
    'addcoins', 'añadircoin', 'removecoin', 'quitarcoin',
    'addexp', 'añadirxp', 'removexp', 'quitarxp',
    'userpremium', 'addprem', 'delprem', 'remove',
    'deletedatauser', 'resetuser',
    // Comandos de bloqueo y listas
    'block', 'unblock', 'listblock', 'blocklist',
    'listban', 'banlist', 'banchat', 'unbanchat',
    // Comandos especiales
    'codigo', 'dsowner', 'delai', 'let', 'reunion', 'meeting',
    'addcmd', 'setcmd', 'delcmd', 'cmdlist', 'listcmd',
    'evento', 'crear', 'participar', 'lista', 'cancelar'
  ]
  
  const textLower = text.toLowerCase()
  
  // Verificar si contiene palabras bloqueadas
  for (let keyword of blockedKeywords) {
    if (textLower.includes(keyword)) {
      await m.react('❌')
      const errorMessages = [
        '✘ Error: No puedo generar imágenes de comandos administrativos.',
        '✘ Error: Contenido restringido por seguridad.',
        '✘ Error: No puedo crear imágenes de comandos del sistema.',
        '✘ Error: Solicitud bloqueada por políticas de seguridad.',
        '✘ Error: Función no disponible para este tipo de contenido.'
      ]
      const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)]
      await conn.reply(m.chat, randomError, m)
      return
    }
  }
  
  // Verificar patrones de solicitud de comandos
  const commandPatterns = [
    /(?:pon|escribe|usa|ejecuta|activa|haz)\s*\.?([a-zA-Z]+)/gi,
    /(?:comando|command)\s*\.?([a-zA-Z]+)/gi,
    /dame\s*(?:el\s*)?comando/gi,
    /quiero\s*(?:el\s*)?comando/gi,
    /necesito\s*(?:el\s*)?comando/gi
  ]
  
  for (let pattern of commandPatterns) {
    if (pattern.test(textLower)) {
      // Verificar si menciona algún comando bloqueado
      for (let keyword of blockedKeywords) {
        if (textLower.includes(keyword)) {
          await m.react('❌')
          await conn.reply(m.chat, '✘ Error: No puedo generar imágenes relacionadas con comandos administrativos.', m)
          return
        }
      }
    }
  }

  await m.react('🕓')

  try {
    const result = await fluximg.create(text);
    if (result && result.imageLink) {
      await m.react('✅')
      await conn.sendMessage(
        m.chat,
        {
          image: { url: result.imageLink },
          caption: `*\`Resultados De:\`* ${text}`,
        },
        { quoted: m }
      );
    } else {
      throw new Error("No se pudo crear la imagen. Intentar otra vez.");
    }
  } catch (error) {
    console.error(error);
    conn.reply(
      m.chat,
      "Se produjo un error al crear la imagen.",
      m
    );
  }
};

handler.help = ["flux *<texto>*"];
handler.tags = ["ai"];
handler.command = ["flux"];

export default handler;

const fluximg = {
  defaultRatio: "2:3", 

  create: async (query) => {
    const config = {
      headers: {
        accept: "*/*",
        authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com",
        "user-agent": "Postify/1.0.0",
      },
    };

    try {
      const response = await axios.get(
        `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(
          query
        )}&aspect_ratio=${fluximg.defaultRatio}`,
        config
      );
      return {
        imageLink: response.data.image_link,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
