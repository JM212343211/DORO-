import db from '../lib/database.js'

/**
 * Comando: shopbot / allbot
 * Información sobre cómo comprar un bot completo
 */
let handler = async (m, { conn, usedPrefix, command }) => {
    // Definir emojis
    const emojis = {
        bot: '🤖',
        info: 'ℹ️',
        shop: '🛒',
        check: '✅',
        warning: '⚠️',
        money: '💰',
        star: '⭐',
        fire: '🔥',
        vip: '💠',
        time: '⏰',
        diamond: '💎',
        phone: '📱',
        message: '💬'
    };
    
    // Crear bordes y divisores
    const border = '┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓';
    const borderEnd = '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛';
    const divider = '┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫';
    
    // Número de contacto
    const contactNumber = '+524181450063';
    
    // Crear mensaje
    const texto = `
${emojis.shop} *COMPRA TU PROPIO BOT* ${emojis.shop}
${border}
${emojis.bot} *BOT PERSONAL COMPLETO* ${emojis.bot}
${divider}
${emojis.check} *INCLUYE:*

${emojis.diamond} Bot instalado en tu número
${emojis.diamond} Todas las funciones activadas
${emojis.diamond} Soporte técnico personalizado
${emojis.diamond} Actualizaciones automáticas
${emojis.diamond} Hosting incluido por 1 mes
${emojis.diamond} Personalización de nombre y logo
${divider}
${emojis.money} *PRECIO:* Consultar directamente
${emojis.time} *TIEMPO DE ENTREGA:* 24-48 horas
${divider}
${emojis.warning} *PARA COMPRAR:*

${emojis.phone} *CONTACTA DIRECTAMENTE:*
   *${contactNumber}*

${emojis.message} *Mensaje sugerido:*
   _"Hola, quiero comprar un bot completo"_
${divider}
${emojis.info} *IMPORTANTE:*
Solicita ver demos y testimonios de clientes
antes de realizar cualquier pago.
${borderEnd}`;

    // Enviar mensaje con banner
    await conn.sendMessage(m.chat, {
        text: texto,
        contextInfo: {
            externalAdReply: {
                title: `${emojis.shop} COMPRA TU BOT PERSONAL`,
                body: `Bot completo con todas las funciones`,
                thumbnail: await (await fetch('https://i.ibb.co/BsJs1r8/bank.png')).buffer(),
                sourceUrl: 'https://wa.me/' + contactNumber.replace('+', '')
            }
        }
    }, { quoted: m });
    
    // Reaccionar al mensaje
    await m.react('🛒');
    
    // Si el usuario está en un grupo, enviar también la información por privado
    if (m.isGroup) {
        const privateText = `
${emojis.bot} *COMPRA TU BOT PERSONAL* ${emojis.bot}

${emojis.phone} *Contacto directo:* ${contactNumber}

${emojis.info} *¿Qué hacer?*
Envía un mensaje por WhatsApp al número indicado con el texto:
_"Hola, quiero comprar un bot completo"_

${emojis.warning} *¡Oferta por tiempo limitado!*
No pierdas la oportunidad de tener tu propio bot.`;

        await conn.sendMessage(m.sender, { text: privateText });
        await m.reply('✅ Te he enviado la información de contacto también al privado.');
    }
}

handler.help = ['shopbot', 'allbot']
handler.tags = ['info']
handler.command = ['shopbot', 'allbot', 'comprarbot', 'botcompleto'] 
handler.register = true 

export default handler