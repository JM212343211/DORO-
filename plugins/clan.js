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
    if (!user) return m.reply('❌ Usa !comenzar para iniciar en el sistema RPG.')
    if (!user.rpg) user.rpg = {}
    if (!user.clan) user.clan = null

    let name = args.join(' ')
    if (!isOwner && user.clan) return m.reply('❌ Ya perteneces a un clan. Sal primero con !clan salir')
    if (!isOwner && Object.values(clanes).some(c => c.nombre?.toLowerCase() === name.toLowerCase()))
        return m.reply('❌ Ya existe un clan con ese nombre.')
    if (!isOwner && !name) return m.reply('❌ Escribe el nombre del clan. Ejemplo: !clan crear LosGuerreros')
    if (!isOwner && (!user.rpg || !user.rpg.class || isNaN(user.rpg.class) || user.rpg.class < 1))
        return m.reply('❌ Debes tener personaje creado (usa !comenzar y elige clase) para crear un clan.')

    let id = 'clan_' + (Date.now() + Math.floor(Math.random() * 1000))
    let creador = m.sender
    clanes[id] = {
        nombre: name || ('Clan_' + Math.floor(Math.random() * 9999)),
        descripcion: 'Un clan misterioso...',
        emblema: '🏰',
        logo: null,
        banner: null,
        color: null,
        tipo: 'Aventureros',
        premium: false,
        miembros: [creador],
        solicitudes: [],
        aliados: [],
        enemigos: [],
        logros: [],
        ranking: 0,
        logrosData: {
            victorias: 0,
            derrotas: 0,
            donaciones: 0,
            cofres: 0,
            mejoras: 0
        },
        bienvenida: '¡Bienvenido al clan!',
        lider: creador,
        nivel: 1,
        vida: 2000,
        dinero: 500,
        exp: 0,
        cooldown: 0,
        historial: [],
        mensajes: [],
        mejoras: {
            vida: 0,
            dinero: 0,
            fuerza: 0,
            especial: 0
        },
        cofre: {
            ultima: 0,
            abiertoPor: []
        }
    }
    user.clan = id
    guardarClanes(clanes)
    m.reply(`🏰 Clan creado: *${clanes[id].nombre}* (ID: ${id})\n👑 Líder: @${creador.split('@')[0]}`, null, { mentions: [creador] })
}
handler.help = ['clan crear <nombre>']
handler.tags = ['rpg']
handler.command = ['clan crear']

export default handler
