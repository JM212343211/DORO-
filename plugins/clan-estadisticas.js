let handler = async (m, { conn, usedPrefix, command, args }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : args[0] && args[0].replace(/[^0-9]/g, '').length > 5
      ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      : m.sender

  let user = global.db.data.users[who]
  if (!user) return m.reply('No se encontraron datos para ese usuario.')
  if (!user.cmds) return m.reply('Aún no ha usado ningún comando.')

  let cmds = user.cmds
  let total = Object.values(cmds).reduce((a, b) => a + b, 0)
  let lista = Object.entries(cmds)
    .sort((a, b) => b[1] - a[1])
    .map(([cmd, n], i) => `${i + 1}. ${usedPrefix}${cmd} — *${n}* vez${n > 1 ? 'es' : ''}`)
    .join('\n')

  let text = `📊 *Comandos usados por @${who.replace(/@.+/, '')}:*\n\nHa usado *${total}* comandos en total.\n\n${lista}`
  m.reply(text, null, { mentions: [who] })
}
handler.help = ['cmdstats [@usuario|numero]']
handler.tags = ['info']
handler.command = ['cmdstats', 'estadisticas', 'statscomando']

export default handler