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
  if (!clan) return m.reply('❌ Clan no encontrado.')
  let cantidad = parseInt(args[0])
  if (!cantidad || isNaN(cantidad) || cantidad < 1) return m.reply('❌ Escribe una cantidad válida a donar.')
  if (user.coin === undefined) user.coin = 0
  if (user.coin < cantidad) return m.reply('❌ No tienes suficiente dinero para donar.')
  if (!clan.miembros?.length) return m.reply('❌ No hay miembros en el clan.')

  user.coin -= cantidad
  // Repartir entre todos los miembros
  let reparto = Math.floor(cantidad / clan.miembros.length)
  let restantes = cantidad - (reparto * clan.miembros.length)
  for (let miembro of clan.miembros) {
    if (!global.db.data.users[miembro]) continue
    if (global.db.data.users[miembro].coin === undefined) global.db.data.users[miembro].coin = 0
    global.db.data.users[miembro].coin += reparto
  }
  // Si sobra por la división, dáselo al líder
  if (restantes > 0 && global.db.data.users[clan.lider]) {
    global.db.data.users[clan.lider].coin += restantes
  }
  // Estadística de donaciones
  if (clan.logrosData) clan.logrosData.donaciones = (clan.logrosData.donaciones || 0) + cantidad
  guardarClanes(clanes)
  m.reply(`🤝 Has donado *${cantidad}* monedas. Cada miembro del clan ha recibido *${reparto}* monedas${restantes > 0 ? ` (el líder recibió +${restantes})` : ''}.`)
}
handler.help = ['clan donar <cantidad>']
handler.tags = ['rpg']
handler.command = ['clan donar']

export default handler