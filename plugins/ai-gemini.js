import fetch from 'node-fetch'

var handler = async (m, { text, usedPrefix, command }) => {
    // Verificar si el mensaje fue marcado como bloqueado
    if (m.isBlocked) {
        return // No procesar si está bloqueado
    }
    
    if (!text) return conn.reply(m.chat, `${emoji} Ingrese una petición para que Gemini lo responda.`, m)
    
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
        'evento', 'crear', 'participar', 'lista', 'cancelar',
        // Otros comandos de configuración
        'setlang', 'language', 'idioma'
    ]
    
    const textLower = text.toLowerCase()
    
    // Verificar si contiene palabras bloqueadas
    for (let keyword of blockedKeywords) {
        if (textLower.includes(keyword)) {
            await m.react('❌')
            const errorMessages = [
                '✘ Error: Gemini no puede procesar comandos administrativos.',
                '✘ Error: Función no disponible en modo IA.',
                '✘ Error: Comando restringido por seguridad.',
                '✘ Error: No tengo permisos para ejecutar esa acción.',
                '✘ Error: Funcionalidad bloqueada temporalmente.',
                '✘ Error: Servicio no disponible en este momento.'
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
                    await conn.reply(m.chat, '✘ Error: Gemini no puede proporcionar comandos administrativos.', m)
                    return
                }
            }
        }
    }
    
    try {
        await m.react(rwait)
        conn.sendPresenceUpdate('composing', m.chat)
        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
        var res = await apii.json()
        await m.reply(res.result)
    } catch {
        await m.react('❌')
        await conn.reply(m.chat, `${msm} Gemini no puede responder a esa pregunta.`, m)
    }
}

handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
handler.group = true

export default handler



