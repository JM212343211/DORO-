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
    let aliadoId = Object.keys(clanes).find(id => clanes[id].nombre?.toLowerCase() === name.toLowerCase())
    if (!aliadoId) return m.reply('❌ Clan no encontrado.')
    if (clan.aliados.includes(aliadoId)) return m.reply('🤝 Ya son aliados.')
    clan.aliados.push(aliadoId)
    clanes[aliadoId].aliados.push(user.clan)
    guardarClanes(clanes)
    m.reply(`🤝 Ahora eres aliado de *${clanes[aliadoId].nombre}*`)
}
handler.help = ['clan alianza <nombre>']
handler.tags = ['rpg']
handler.command = ['clan alianza']

export default handler


