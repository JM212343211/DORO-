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

let handler = async (m, { conn, args, isOwner }) => {
    let clanes = cargarClanes()
    let user = global.db.data.users[m.sender]
    if (!user || !user.clan) return m.reply('❌ No perteneces a ningún clan.')
    let clan = clanes[user.clan]
    if (!isOwner && clan.lider !== m.sender) return m.reply('❌ Solo el líder o owner puede cambiar el banner.')
    let url = args[0]
    if (!url || !/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(url)) return m.reply('❌ Escribe la URL válida de banner.')
    clan.banner = url
    guardarClanes(clanes)
    m.reply('🖼️ Banner del clan actualizado.')
}
handler.help = ['clan banner <url>']
handler.tags = ['rpg']
handler.command = ['clan banner']

export default handler