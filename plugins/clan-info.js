import fs from 'fs'
import path from 'path'
const DB_PATH = path.resolve('src/database/clanes.json')

function cargarClanes() {
    if (!fs.existsSync(DB_PATH)) return {}
    try { return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) } catch { return {} }
}

let handler = async (m, { conn, args, isOwner }) => {
    let clanes = cargarClanes()
    let user = global.db.data.users[m.sender]
    let clanId = user.clan
    if (!isOwner && !clanId) return m.reply('❌ No perteneces a ningún clan.')
    if (isOwner && args[0]) clanId = Object.keys(clanes).find(id => clanes[id].nombre?.toLowerCase() === args.join(' ').toLowerCase())
    let clan = clanes[clanId]
    if (!clan) return m.reply('❌ Clan no encontrado.')
    let miembros = clan.miembros.map(u => '@' + u.split('@')[0]).join(', ')
    let info = `🏰 *${clan.nombre}* ${clan.premium ? '🌟 (Premium)' : ''}\n`
    info += (clan.descripcion ? `${clan.descripcion}\n` : '')
    info += `👑 Líder: @${clan.lider.split('@')[0]}\n`
    info += `💪 Vida: ${clan.vida}\n`
    info += `💰 Dinero: ${clan.dinero}\n`
    info += `🎖️ Experiencia: ${clan.exp}\n`
    info += `🔧 Mejoras: Vida[${clan.mejoras.vida}] Fuerza[${clan.mejoras.fuerza}] Dinero[${clan.mejoras.dinero}]${clan.premium ? ' Especial[' + clan.mejoras.especial + ']' : ''}\n`
    info += `👥 Miembros: ${clan.miembros.length}\n`
    info += `👤 ${miembros}\n`
    if (clan.aliados.length) info += `🤝 Aliados: ${clan.aliados.map(id => clanes[id]?.nombre || id).join(', ')}\n`
    if (clan.enemigos.length) info += `⚔️ Enemigos: ${clan.enemigos.map(id => clanes[id]?.nombre || id).join(', ')}\n`
    if (clan.mensajes.length) info += `\n💬 Últimos mensajes:\n${clan.mensajes.slice(-3).map(m => `- @${m.autor.split('@')[0]}: ${m.texto}`).join('\n')}`
    if (clan.historial.length) info += `\n🗡️ *Historial de batallas:*\n${clan.historial.slice(-5).map(h=>h.text).join('\n')}`
    m.reply(info, null, { mentions: clan.miembros })
}
handler.help = ['clan info']
handler.tags = ['rpg']
handler.command = ['clan info']

export default handler

