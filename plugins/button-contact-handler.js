/**
 * Manejador para los botones de contacto
 * Procesa las acciones de los botones de contacto del creador
 */

let handler = async (m, { conn }) => {
    // Verificar si el mensaje es una respuesta a un botón
    if (m.quoted && m.quoted.buttons) {
      const buttonId = m.text.trim().toLowerCase()
      
      // Links del creador
      const githubLink = 'https://github.com/Fer280809'
      const numberLink = 'https://wa.me/524181450063'
      
      // Procesar botones de contacto
      if (buttonId === 'github') {
        await conn.sendMessage(m.chat, { 
          text: `✧ *GitHub del creador*\n\n${githubLink}`,
          contextInfo: {
            externalAdReply: {
              title: 'GitHub: Fer280809',
              body: 'Visita el perfil para ver más proyectos',
              thumbnailUrl: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
              sourceUrl: githubLink,
              mediaType: 1,
              showAdAttribution: false
            }
          }
        }, { quoted: m })
      } 
      else if (buttonId === 'whatsapp') {
        await conn.sendMessage(m.chat, { 
          text: `📱 *WhatsApp del creador*\n\n${numberLink}`,
          contextInfo: {
            externalAdReply: {
              title: 'Contacto: Fernando',
              body: 'Toca aquí para chatear',
              thumbnailUrl: 'https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png',
              sourceUrl: numberLink,
              mediaType: 1,
              showAdAttribution: false
            }
          }
        }, { quoted: m })
      }
    }
  }
  
  // Este handler procesa todos los mensajes para capturar los clicks en botones
  handler.all = true
  
  export default handler