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

let handler = async (m, { isOwner }) => {
  let clanes = cargarClanes()
  let user = global.db.data.users[m.sender]
  if (!user || !user.clan) return m.reply('❌ No perteneces a ningún clan.')
  let clan = clanes[user.clan]
  if (!clan) return m.reply('❌ Clan no encontrado.')

  let ahora = Date.now()
  let cooldown = clan.premium ? 12 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // premium: 12h, normal: 24h
  if (clan.cofre.abiertoPor.includes(m.sender) && (ahora - clan.cofre.ultima < cooldown)) {
    const faltante = Math.ceil((clan.cofre.ultima + cooldown - ahora) / 1000 / 60)
    return m.reply(`⏳ Solo puedes abrir el cofre cada ${clan.premium ? '12' : '24'} horas. Faltan ${faltante} minutos.`)
  }

  // Recompensa random (más si es premium)
  let recompensa = clan.premium ? Math.floor(800 + Math.random() * 1200) : Math.floor(400 + Math.random() * 900)
  clan.dinero += recompensa
  clan.cofre.ultima = ahora
  if (!clan.cofre.abiertoPor.includes(m.sender)) clan.cofre.abiertoPor.push(m.sender)
  if (clan.logrosData) clan.logrosData.cofres = (clan.logrosData.cofres || 0) + 1
  guardarClanes(clanes)

  m.reply(`🎁 ¡Has abierto el cofre del clan!\n💰 El clan recibe *${recompensa}* monedas.\n\nTotal actual: ${clan.dinero}`)
}
handler.help = ['clan cofre']
handler.tags = ['rpg']
handler.command = ['clan cofre']

export default handler