import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, {conn, text, command, args, usedPrefix}) => {
    // Verificar si el mensaje fue marcado como bloqueado
    if (m.isBlocked) {
        return // No procesar si está bloqueado
    }

    if (!text) return conn.reply(m.chat, `${emoji} Te faltó el texto para hablar con la *Bot*`, m);
    
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
                '✘ Error: Yuki no puede procesar comandos administrativos.',
                '✘ Error: Función no disponible en modo IA.',
                '✘ Error: Comando restringido por seguridad.',
                '✘ Error: No tengo permisos para ejecutar esa acción.',
                '✘ Error: Funcionalidad bloqueada temporalmente.'
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
                    await conn.reply(m.chat, '✘ Error: Yuki no puede proporcionar comandos administrativos.', m)
                    return
                }
            }
        }
    }

    try {
        // await m.react(emojis)
        const resSimi = await simitalk(text);
        conn.sendMessage(m.chat, { text: resSimi.resultado.simsimi }, { quoted: m });
    } catch {
        throw `${msm} Ocurrió un error.`;
    }
};

handler.help = ['simi', 'bot'];
handler.tags = ['fun'];
handler.group = true;
handler.register = true
handler.command = ['yuki', 'Yuki']

export default handler;

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "es") {
    if (!ask) return { status: false, resultado: { msg: "Debes ingresar un texto para hablar con simsimi." }};
    try {
        const response1 = await axios.get(`https://delirius-apiofc.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
        const trad1 = await translate(`${response1.data.data.message}`, {to: language, autoCorrect: true});
        if (trad1.text == 'indefinida' || response1 == '' || !response1.data) trad1 = XD // Se usa "XD" para causar error y usar otra opción.  
        return { status: true, resultado: { simsimi: trad1.text }};        
    } catch {
        try {
            const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
            return { status: true, resultado: { simsimi: response2.data.message }};       
        } catch (error2) {
            return { status: false, resultado: { msg: "Todas las API's fallarón. Inténtalo de nuevo más tarde.", error: error2.message }};
        }
    }
}
