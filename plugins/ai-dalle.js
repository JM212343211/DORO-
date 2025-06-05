// - OfcKing >> https://github.com/Fer280809

import axios from 'axios';

const handler = async (m, { conn, args }) => {
    // Verificar si el mensaje fue marcado como bloqueado
    if (m.isBlocked) {
        return // No procesar si está bloqueado
    }

    if (!args[0]) {
        await conn.reply(m.chat, `${emoji} Por favor, proporciona una descripción para generar la imagen.`, m);
        return;
    }

    const prompt = args.join(' ');
    
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
    
    const promptLower = prompt.toLowerCase()
    
    // Verificar si contiene palabras bloqueadas
    for (let keyword of blockedKeywords) {
        if (promptLower.includes(keyword)) {
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
        if (pattern.test(promptLower)) {
            // Verificar si menciona algún comando bloqueado
            for (let keyword of blockedKeywords) {
                if (promptLower.includes(keyword)) {
                    await m.react('❌')
                    await conn.reply(m.chat, '✘ Error: No puedo generar imágenes relacionadas con comandos administrativos.', m)
                    return
                }
            }
        }
    }

    const apiUrl = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${prompt}`;

    try {
        conn.reply(m.chat, `${emoji2} Espere un momento...`, m)

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        await conn.sendMessage(m.chat, { image: Buffer.from(response.data) }, { quoted: m });
    } catch (error) {
        console.error('Error al generar la imagen:', error);
        await conn.reply(m.chat, `${msm} No se pudo generar la imagen, intenta nuevamente mas tarde.`, m);
    }
};

handler.command = ['dalle'];
handler.help = ['dalle'];
handler.tags = ['tools'];

export default handler;

