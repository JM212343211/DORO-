import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = 'ゲ◜៹ New Member ៹◞ゲ'
  let txt1 = 'ゲ◜៹ Bye Member ៹◞ゲ'
  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `*\n *╭━〔👑 *ASTA-BOT* 👑  〕* \n *┋* \n *┋「 🎉 *¡BIENVENIDO/A!* 👋 」* \n *┋* \n *┋* 「 ${groupMetadata.subject} 」 \n *┋* \n *╰━★ 「*.   @${m.messageStubParameters[0].split`@`[0]} . *」* \n *╭━━━━━━ * \n *┋❖ Le las reglas de la descricion* \n *┋❀ Espero que te la lleves bien * \n *┋❖ Haora somos* ${groupSize} \n *┗━━━━━━━━━━━━━━━┅ ⳹* \n  ${global.welcom2}`    
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }
  
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `* *╭━〔👑 *ASTA-BOT* 👑  〕* \n *┋* \n *┋「  *¡ADIOS!* 👋 」* \n *┋* \n *┋* 「 ${groupMetadata.subject} 」 \n *┋* \n *╰━★ 「*.   @${m.messageStubParameters[0].split`@`[0]} . *」* \n *╭━━━━━━ * \n *┋❖ Que bueno se fue un mas* \n *┋❀ Jamás te quisimos aquí* \n *┋❖ Haora somos* ${groupSize} \n *┗━━━━━━━━━━━━━━━┅ ⳹* \n  ${global.welcom2}`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }}
