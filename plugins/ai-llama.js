import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    // Verificar si el mensaje fue marcado como bloqueado
    if (m.isBlocked) {
        return // No procesar si está bloqueado
    }

    if (!text) return conn.reply(m.chat, `${emoji} Ingrese un texto para hablar con Llama AI.`, m)
    
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
                '✘ Error: Llama no puede procesar comandos administrativos.',
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
                    await conn.reply(m.chat, '✘ Error: Llama no puede proporcionar comandos administrativos.', m)
                    return
                }
            }
        }
    }
    
    try {
        let api = await fetch(`https://delirius-apiofc.vercel.app/ia/llamaia?query=${text}`)
        let json = await api.json()
        let responseMessage = json.data;

        await conn.sendMessage(m.chat, {
            text: responseMessage
        }, { quoted: m });

    } catch (error) { 
        console.error(error)
    }
}

handler.command = ['llama', 'meta']

export default handler
