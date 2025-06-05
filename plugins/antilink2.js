export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (!m.isGroup) return;
    
    // Acceder a la base de datos del chat
    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    let bot = global.db.data.settings[this.user.jid] || {};
    
    // No hacer nada si el mensaje es del bot
    if (m.fromMe) return true;
    
    // Manejar comandos de activación/desactivación
    if (isAdmin && m.text) {
        const text = m.text.toLowerCase();
        
        // Comando para activar antilink3
        if (text === 'antilink3 on') {
            if (chat.antiLink3) {
                await conn.sendMessage(m.chat, { text: '❗ El antilink3 ya estaba activado en este grupo.' });
            } else {
                chat.antiLink3 = true;
                await conn.sendMessage(m.chat, { 
                    text: `*╭━━━━━━━━━━━━━━━╮*
*┃    ✅ ANTILINK3 ACTIVADO    ┃*
*╰━━━━━━━━━━━━━━━╯*

Se ha activado la protección contra enlaces.
Ahora se eliminarán los mensajes que contengan links y se advertirá al usuario.`
                });
            }
            return true;
        }
        
        // Comando para desactivar antilink3
        if (text === 'antilink3 off') {
            if (!chat.antiLink3) {
                await conn.sendMessage(m.chat, { text: '❗ El antilink3 ya estaba desactivado en este grupo.' });
            } else {
                chat.antiLink3 = false;
                await conn.sendMessage(m.chat, { 
                    text: `*╭━━━━━━━━━━━━━━━╮*
*┃    ❌ ANTILINK3 DESACTIVADO    ┃*
*╰━━━━━━━━━━━━━━━╯*

Se ha desactivado la protección contra enlaces.
Los usuarios podrán compartir links sin restricciones.`
                });
            }
            return true;
        }
    }
    
    // Patrones para detectar enlaces
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi;
    const whatsappLinkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/gi;
    
    // Obtener el texto del mensaje
    const messageText = m.text || m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    
    // Verificar si contiene enlaces
    const containsLink = linkRegex.test(messageText) || whatsappLinkRegex.test(messageText);
    
    // Verificar si antiLink3 está activado (usando antiLink3 en lugar de antiLink)
    if (containsLink && chat.antiLink3) {
        // Solo actuar si no es admin y el bot es admin
        if (!isAdmin && isBotAdmin) {
            // Borrar el mensaje
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
            
            // Enviar mensaje de advertencia
            await conn.sendMessage(m.chat, { 
                text: `*╭━━━━━━━━━━━━━━━╮*
*┃    🚫 ALERTA DE LINK 🚫    ┃*
*╰━━━━━━━━━━━━━━━╯*

*@${m.sender.split('@')[0]}* ha compartido un enlace ⚠️

*📌 Acción:* Mensaje eliminado
*⚠️ Advertencia:* Has obtenido una advertencia por infringir las reglas del grupo.

*ℹ️ Recuerda:* No está permitido compartir links en este grupo.`,
                mentions: [m.sender]
            });
            
            // Enviar comando de warn (como si fuera un comando enviado por un admin)
            await conn.sendMessage(m.chat, { 
                text: `#warn @${m.sender.split('@')[0]} rompiste la regla de mandar link en este grupo`,
                mentions: [m.sender]
            });
        }
    }
    
    return true;
}
