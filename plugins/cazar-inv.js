// SISTEMA DE INVENTARIO DE CAZA (SOLO VISUALIZACIÓN)
let inventoryHandler = async (m, { conn, usedPrefix }) => {
    let users = global.db.data.users
    let senderId = m.sender
    
    // Inicializar inventarios si no existen
    if (!users[senderId].animals) users[senderId].animals = {}
    if (!users[senderId].trophies) users[senderId].trophies = {}
    if (!users[senderId].huntJunk) users[senderId].huntJunk = {}
    
    let animalInventory = Object.keys(users[senderId].animals).filter(animal => users[senderId].animals[animal] > 0)
    let trophyInventory = Object.keys(users[senderId].trophies).filter(trophy => users[senderId].trophies[trophy] > 0)
    let junkInventory = Object.keys(users[senderId].huntJunk).filter(junk => users[senderId].huntJunk[junk] > 0)
    
    if (animalInventory.length === 0 && trophyInventory.length === 0 && junkInventory.length === 0) {
        m.reply(`🎒 *INVENTARIO DE CAZA VACÍO* 🎒
        
📦 No tienes nada en tu inventario de caza
🏹 Ve a cazar primero con *${usedPrefix}cazar*`)
        return
    }
    
    let message = `🎒 *INVENTARIO DE CAZA* 🏹\n`
    
    // Mostrar animales disponibles
    if (animalInventory.length > 0) {
        message += `\n🦌 *ANIMALES CAPTURADOS:*\n`
        animalInventory.forEach(animal => {
            let quantity = users[senderId].animals[animal]
            message += `• ${animal}: ${quantity}x\n`
        })
    }
    
    // Mostrar trofeos disponibles
    if (trophyInventory.length > 0) {
        message += `\n🏆 *TROFEOS OBTENIDOS:*\n`
        trophyInventory.forEach(trophy => {
            let quantity = users[senderId].trophies[trophy]
            message += `• ${trophy}: ${quantity}x\n`
        })
    }
    
    // Mostrar objetos basura/comunes si existen
    if (junkInventory.length > 0) {
        message += `\n🗑️ *OBJETOS VARIOS:*\n`
        junkInventory.forEach(junk => {
            let quantity = users[senderId].huntJunk[junk]
            message += `• ${junk}: ${quantity}x\n`
        })
    }
    
    // Contar totales
    let totalAnimals = animalInventory.reduce((sum, animal) => sum + users[senderId].animals[animal], 0)
    let totalTrophies = trophyInventory.reduce((sum, trophy) => sum + users[senderId].trophies[trophy], 0)
    let totalJunk = junkInventory.reduce((sum, junk) => sum + users[senderId].huntJunk[junk], 0)
    let totalItems = totalAnimals + totalTrophies + totalJunk
    
    message += `\n📊 *RESUMEN:*
• Animales: ${totalAnimals}
• Trofeos: ${totalTrophies}
• Otros objetos: ${totalJunk}
• **Total de elementos: ${totalItems}**`
    
    // Mensaje motivacional basado en el inventario
    if (totalItems >= 100) {
        message += `\n\n👑 *¡Eres un coleccionista legendario!*`
    } else if (totalItems >= 50) {
        message += `\n\n⭐ *¡Excelente colección de caza!*`
    } else if (totalItems >= 20) {
        message += `\n\n🏹 *¡Buen progreso como cazador!*`
    } else {
        message += `\n\n🌱 *¡Sigue cazando para expandir tu colección!*`
    }
    
    conn.reply(m.chat, message, m)
}

// COMANDO PARA VER VALOR DEL INVENTARIO DE CAZA
let valueHandler = async (m, { conn, usedPrefix }) => {
    let users = global.db.data.users
    let senderId = m.sender
    
    if (!users[senderId].animals) users[senderId].animals = {}
    if (!users[senderId].trophies) users[senderId].trophies = {}
    
    let animalPrices = {
        "Conejo": 8, "Ardilla": 6, "Pato": 10, "Ciervo": 25,
        "Jabalí": 30, "Lobo": 45, "Oso": 60, "Águila": 100,
        "León": 150, "Tigre": 250, "Dragón": 400, "Fénix": 600
    }
    
    let trophyPrices = {
        "Pluma Rara": 12, "Cuerno Pequeño": 20, "Piel de Calidad": 35,
        "Colmillo Afilado": 50, "Garra Poderosa": 70, "Cuerno Dorado": 120,
        "Piel Legendaria": 180, "Corona de Bestia": 350, "Cofre de Cazador": 300,
        "Reliquia Ancestral": 550, "Cofre Mítico": 900
    }
    
    let animalValue = 0
    let trophyValue = 0
    
    // Calcular valor de animales
    for (let animal of Object.keys(users[senderId].animals)) {
        if (users[senderId].animals[animal] > 0) {
            animalValue += users[senderId].animals[animal] * (animalPrices[animal] || 1)
        }
    }
    
    // Calcular valor de trofeos
    for (let trophy of Object.keys(users[senderId].trophies)) {
        if (users[senderId].trophies[trophy] > 0) {
            trophyValue += users[senderId].trophies[trophy] * (trophyPrices[trophy] || 1)
        }
    }
    
    let totalValue = animalValue + trophyValue
    let currentCoins = users[senderId].coin || 0
    let netWorth = totalValue + currentCoins
    
    let message = `💎 *VALORACIÓN DE INVENTARIO DE CAZA* 💎

🦌 *Valor de animales:* ${animalValue} ${moneda}
🏆 *Valor de trofeos:* ${trophyValue} ${moneda}
💰 *Monedas actuales:* ${currentCoins} ${moneda}

📊 *VALOR TOTAL DEL INVENTARIO:* ${totalValue} ${moneda}
🏆 *PATRIMONIO TOTAL:* ${netWorth} ${moneda}`

    // Clasificación por riqueza
    if (netWorth >= 8000) {
        message += `\n\n👑 *¡REY DE LA CAZA!* - Eres legendariamente rico`
    } else if (netWorth >= 4000) {
        message += `\n\n💎 *MAESTRO CAZADOR* - Tienes una fortuna impresionante`
    } else if (netWorth >= 2000) {
        message += `\n\n⭐ *CAZADOR EXPERTO* - Tu colección es valiosa`
    } else if (netWorth >= 800) {
        message += `\n\n🏹 *CAZADOR HÁBIL* - Vas por muy buen camino`
    } else {
        message += `\n\n🌱 *CAZADOR NOVATO* - ¡Sigue cazando para prosperar!`
    }
        
    conn.reply(m.chat, message, m)
}

// Handler para inventario de caza
let inventoryHandlerExport = inventoryHandler
inventoryHandlerExport.tags = ['game']
inventoryHandlerExport.help = ['invcaza']
inventoryHandlerExport.command = ['invcaza', 'inventariocaza', 'huntinv']
inventoryHandlerExport.register = true

// Handler para valorar caza
let valueHandlerExport = valueHandler
valueHandlerExport.tags = ['game']  
valueHandlerExport.help = ['valorarcaza']
valueHandlerExport.command = ['valorarcaza', 'valuehunt', 'patrimoniocaza']
valueHandlerExport.register = true

export { inventoryHandlerExport as invcaza }
export { valueHandlerExport as valorarcaza }
