//Código creado para verificar el bot oficial

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    try {
        // Información del bot oficial y creador
        const creatorNumber = '+524181450063';
        const officialBotNumber = '+527461177130';
        const ownerNumber = '+527461177130'; // Número del owner (mismo que el bot oficial en este caso)
        
        // Reacción para indicar que es un comando oficial
        m.react('✅');

        // Construir el mensaje de verificación
        let str = `*🤖 VERIFICACIÓN DE BOT OFICIAL 🤖*\n\n`;
        str += `Este es el *único Bot Oficial* de nuestro servicio.\n\n`;
        str += `*📱 Número del Bot Oficial:* wa.me/${officialBotNumber}\n`;
        str += `*👨‍💻 Creador:* wa.me/${creatorNumber}\n`;
        str += `*👑 Owner Autorizado:* wa.me/${ownerNumber}\n\n`;
        str += `*⚠️ ADVERTENCIA ⚠️*\n`;
        str += `Cualquier otro bot que se haga pasar por oficial es un *SUB-BOT* o *FAKE*.\n`;
        str += `Verifica siempre que estás hablando con el número correcto.`;

        // Enviar mensaje principal (aseguramos que se envíe)
        await conn.sendMessage(m.chat, { 
            text: str,
            mentions: [m.sender]
        });

        // Enviar mensaje con el logo o insignia del bot oficial
        setTimeout(async () => {
            try {
                // URL de una imagen genérica de verificación (reemplazar con tu imagen real)
                const verification = 'https://i.imgur.com/GgMvmJ5.png';
                
                await conn.sendMessage(m.chat, {
                    image: { url: verification },
                    caption: `*🔰 BOT OFICIAL VERIFICADO 🔰*\n\nEste es el único bot oficial. Cualquier otro es una copia o fake.`,
                    mentions: [m.sender]
                });
            } catch (error) {
                console.error('Error al enviar imagen:', error);
                // Si falla enviar la imagen, intentamos un mensaje de texto como respaldo
                await conn.sendMessage(m.chat, {
                    text: `*🔰 BOT OFICIAL VERIFICADO 🔰*\n\nEste es el único bot oficial. Cualquier otro es una copia o fake.`,
                    mentions: [m.sender]
                });
            }
        }, 1000);

        // Enviar mensaje final con confirmación adicional
        setTimeout(async () => {
            try {
                await conn.sendMessage(m.chat, {
                    text: `*📢 IMPORTANTE 📢*\n\nRecuerda que el único número oficial del bot es: *${officialBotNumber}*\n\nPara contactar con el creador: *${creatorNumber}*\n\nNo confíes en otros números que se hagan pasar por este bot.`,
                    mentions: [m.sender]
                });
            } catch (error) {
                console.error('Error al enviar mensaje final:', error);
            }
        }, 2000);
        
    } catch (error) {
        console.error('Error en el comando verificar:', error);
        // Intentar enviar al menos un mensaje básico en caso de error
        await conn.sendMessage(m.chat, {
            text: `*🔰 BOT OFICIAL 🔰*\n\nNúmero oficial: ${officialBotNumber}\nCreador: ${creatorNumber}`
        });
    }
}

handler.help = ['oficial', 'botoficial'];
handler.tags = ['info'];
handler.command = ['oficial', 'botoficial', 'verificación'];

export default handler;
