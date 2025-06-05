import { randomBytes } from "crypto"
import axios from "axios"

let handler = async (m, { conn, text }) => {
    // Verificar si el mensaje fue marcado como bloqueado
    if (m.isBlocked) {
        return // No procesar si está bloqueado
    }

    if (!text) throw `${emoji} ¿Cómo puedo ayudarte hoy?`;
    
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
                '✘ Error: Demo no puede procesar comandos administrativos.',
                '✘ Error: Función no disponible en modo Demo.',
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
                    await conn.reply(m.chat, '✘ Error: Demo no puede proporcionar comandos administrativos.', m)
                    return
                }
            }
        }
    }
    
    try {
        conn.reply(m.chat, m);
        let data = await chatGpt(text);
        await conn.sendMessage(m.chat, { 
            text: '*Demo:* ' + data
        }, { quoted: m });

    } catch (err) {
        m.reply('error cik:/ ' + err);
    }
}

handler.help = ['demo *<texto>*'];
handler.command = ['demo', 'openai'];
handler.tags = ['ai'];
handler.group = true;

export default handler;

async function chatGpt(query) {
    try {
        const { id_ } = (await axios.post("https://chat.chatgptdemo.net/new_chat", { user_id: "crqryjoto2h3nlzsg" }, { headers: { "Content-Type": "application/json" } })).data;

        const json = { "question": query, "chat_id": id_, "timestamp": new Date().getTime() };

        const { data } = await axios.post("https://chat.chatgptdemo.net/chat_api_stream", json, { headers: { "Content-Type": "application/json" } });
        const cek = data.split("data: ");

        let res = [];

        for (let i = 1; i < cek.length; i++) {
            if (cek[i].trim().length > 0) {
                res.push(JSON.parse(cek[i].trim()));
            }
        }

        return res.map((a) => a.choices[0].delta.content).join("");

    } catch (error) {
        console.error("Error parsing JSON:", error);
        return 404;
    }
}


