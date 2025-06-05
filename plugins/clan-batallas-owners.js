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
  if (!isOwner) return m.reply('❌ Solo los owners pueden usar este comando.')
  let clanes = cargarClanes()
  let clanName = args[0]
  let texto = args.slice(1).join(' ')
  if (!clanName || !texto) return m.reply('❌ Uso: !clan batallas <nombre-clan> <texto>')
  let clanId = Object.keys(clanes).find(id => clanes[id].nombre?.toLowerCase() === clanName.toLowerCase())
  if (!clanId) return m.reply('❌ Clan no encontrado por nombre.')
  if (!clanes[clanId].historial) clanes[clanId].historial = []
  clanes[clanId].historial.push({ text: texto, fecha: Date.now() })
  guardarClanes(clanes)
  m.reply('🗡️ Registro de batalla agregado al historial del clan.')
}
handler.help = ['clan batallas <nombre> <texto>']
handler.tags = ['rpg']
handler.command = ['clan batallas']

export default handler