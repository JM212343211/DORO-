// Plugin bloqueador de comandos en IA
let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Lista de comandos que queremos bloquear
    const blockedCommands = [
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
    
    // Patrones que indican que están pidiendo un comando
    const commandPatterns = [
        /(?:pon|escribe|usa|ejecuta|activa|haz)\s*\.?([a-zA-Z]+)/gi,
        /(?:comando|command)\s*\.?([a-zA-Z]+)/gi,
        /\.([a-zA-Z]+)/g,
        /(?:^|\s)([a-zA-Z]+)(?:\s|$)/g
    ]
    
    if (!text) return // Si no hay texto, no hacer nada
    
    let textToCheck = text.toLowerCase()
    let isCommandRequest = false
    let detectedCommand = ''
    
    // Verificar si el texto contiene patrones de solicitud de comandos
    for (let pattern of commandPatterns) {
        let matches = textToCheck.match(pattern)
        if (matches) {
            for (let match of matches) {
                let cleanMatch = match.replace(/[^a-zA-Z]/g, '').toLowerCase()
                if (blockedCommands.includes(cleanMatch)) {
                    isCommandRequest = true
                    detectedCommand = cleanMatch
                    break
                }
            }
            if (isCommandRequest) break
        }
    }
    
    // Verificar frases específicas que indican solicitud de comandos
    const suspiciousPhases = [
        'pon el comando',
        'escribe el comando',
        'usa el comando',
        'ejecuta el comando',
        'activa el comando',
        'haz el comando',
        'dame el comando',
        'quiero el comando',
        'necesito el comando'
    ]
    
    for (let phrase of suspiciousPhases) {
        if (textToCheck.includes(phrase)) {
            isCommandRequest = true
            break
        }
    }
    
    // Si se detecta una solicitud de comando bloqueado
    if (isCommandRequest) {
        await m.react('❌')
        
        const errorMessages = [
            '✘ Error: No puedo procesar comandos administrativos.',
            '✘ Error: Función no disponible en modo IA.',
            '✘ Error: Comando restringido por seguridad.',
            '✘ Error: No tengo permisos para ejecutar esa acción.',
            '✘ Error: Funcionalidad bloqueada temporalmente.',
            '✘ Error: Servicio no disponible en este momento.'
        ]
        
        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)]
        await conn.reply(m.chat, randomError, m)
        
        // Bloquear la ejecución del comando original
        return true // Esto evita que continúe al siguiente handler
    }
    
    return false // Permitir que continúe normalmente
}

// Configurar el handler para que se ejecute ANTES que las IAs
handler.before = true // Esto hace que se ejecute antes que otros plugins
handler.priority = 1 // Prioridad alta para ejecutarse primero

export default handler


