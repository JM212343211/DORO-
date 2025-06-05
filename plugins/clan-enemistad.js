import fs from 'fs'
import path from 'path'
const DB_PATH = path.resolve('src/database/clanes.json')

function cargarClanes() {
    if (!fs.existsSync(DB_PATH)) return {}
    try { return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) } catch { return {} }
}
function guardarClanes(clanes) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
    fs.writeFileSync(DB_PATH, JSON.stringify(clanes, null, 2))
}

let handler = async (m, { args }) => {
    let clanes = cargarClanes()
    let user = global.db.data.users[m.sender]
    if (!user || !user.clan) return m.reply('❌ No perteneces a ningún clan.')
    let clan = clanes[user.clan]
    let name = args.join(' ')
    let enemigoId = Object.keys(clanes).find(id => clanes[id].nombre?.toLowerCase() === name.toLowerCase())
    if (!enemigoId) return m.reply('❌ Clan no encontrado.')
    if (clan.enemigos.includes(enemigoId)) return m.reply('⚔️ Ya son enemigos.')
    clan.enemigos.push(enemigoId)
    clanes[enemigoId].enemigos.push(user.clan)
    guardarClanes(clanes)
    m.reply(`⚔️ Ahora tienes enemistad con *${clanes[enemigoId].nombre}*`)
}
handler.help = ['clan enemistad <nombre>']
handler.tags = ['rpg']
handler.command = ['clan enemistad']

export default handler


