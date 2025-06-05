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

let handler = async (m, { args, isOwner }) => {
    let clanes = cargarClanes()
    let user = global.db.data.users[m.sender]
    if (!user || !user.clan) return m.reply('❌ No perteneces a ningún clan.')
    let clan = clanes[user.clan]
    if (!isOwner && clan.lider !== m.sender) return m.reply('❌ Solo el líder o owner puede cambiar el color.')
    let hex = args[0]
    if (!hex || !/^#[0-9A-Fa-f]{6}$/.test(hex)) return m.reply('❌ Escribe un color HEX válido, ejemplo: !clan color #1a2b3c')
    clan.color = hex
    guardarClanes(clanes)
    m.reply('🎨 Color del clan actualizado.')
}
handler.help = ['clan color <#hex>']
handler.tags = ['rpg']
handler.command = ['clan color']

export default handler


