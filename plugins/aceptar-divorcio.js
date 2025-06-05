let handler = async (m, { conn, usedPrefix }) => {
    // Emojis para el divorcio confirmado
    const corazonRotoEmoji = '💔';
    const llorandoEmoji = '😭';
    const anilloEmoji = '💍';
    const tristezaEmoji = '😢';
    const liberacionEmoji = '🕊️';
    const documentoEmoji = '📄';
    const funeralEmoji = '⚰️';
    const lluviaEmoji = '🌧️';
    const solEmoji = '☀️';
    const nuevoComienzo = '🌅';
    const martilloEmoji = '⚖️';
    const checkEmoji = '✅';
    
    let user = m.sender;
    
    // Verificar si hay solicitud de divorcio pendiente
    if (!global.db.data.divorceRequests || !global.db.data.divorceRequests[user]) {
        return m.reply(`${tristezaEmoji} *¡NO HAY SOLICITUD DE DIVORCIO PENDIENTE!* ${tristezaEmoji}\n\n${anilloEmoji} Primero usa *${usedPrefix}divorcio* para solicitar el divorcio\n\n${nuevoComienzo} *¿O tal vez prefieres seguir casado/a?* ${solEmoji}`);
    }

    // Verificar que no haya pasado mucho tiempo (15 minutos)
    let divorceRequest = global.db.data.divorceRequests[user];
    let timeElapsed = Date.now() - divorceRequest.requestTime;
    let maxTime = 15 * 60 * 1000; // 15 minutos
    
    if (timeElapsed > maxTime) {
        delete global.db.data.divorceRequests[user];
        return m.reply(`${lluviaEmoji} *¡SOLICITUD DE DIVORCIO EXPIRADA!* ${lluviaEmoji}\n\n${tristezaEmoji} Has tardado demasiado en decidir. La solicitud ha expirado.\n\n${anilloEmoji} Si realmente quieres divorciarte, haz una nueva solicitud con *${usedPrefix}divorcio*\n\n${solEmoji} *¿Quizás era una señal para reconsiderar?* ${nuevoComienzo}`);
    }

    let spouse = divorceRequest.spouse;
    let marriageKey = divorceRequest.marriageKey;

    // Verificar que el matrimonio aún exista
    if (!global.db.data.marriages[marriageKey]) {
        delete global.db.data.divorceRequests[user];
        return m.reply(`${tristezaEmoji} *¡ERROR EN EL SISTEMA!* ${tristezaEmoji}\n\n${documentoEmoji} El matrimonio ya no existe en los registros.\n\n${nuevoComienzo} *Parece que ya eres libre* ${liberacionEmoji}`);
    }

    // Obtener información del matrimonio antes de eliminarlo
    let marriage = global.db.data.marriages[marriageKey];
    let marriageDate = marriage.marriageDate;
    let marriageTime = marriage.marriageTime;

    // Calcular duración del matrimonio
    let marriageDateObj = new Date(marriageDate.split('/').reverse().join('-'));
    let currentDate = new Date();
    let durationMs = currentDate - marriageDateObj;
    let durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));

    // CONFIRMAR Y EJECUTAR EL DIVORCIO
    delete global.db.data.marriages[marriageKey];
    delete global.db.data.divorceRequests[user];

    let userName = user.split('@')[0];
    let spouseName = spouse.split('@')[0];

    let mensaje = `${martilloEmoji} *¡DIVORCIO OFICIALMENTE CONSUMADO!* ${martilloEmoji}\n\n`;
    mensaje += `${funeralEmoji} **CERTIFICADO DE DIVORCIO** ${funeralEmoji}\n`;
    mensaje += `${corazonRotoEmoji}━━━━━━━━━━━━━━━━━━━━━━━${corazonRotoEmoji}\n\n`;
    mensaje += `${documentoEmoji} **Ex-Cónyuges:**\n`;
    mensaje += `${tristezaEmoji} @${userName} ${corazonRotoEmoji} @${spouseName}\n\n`;
    mensaje += `${anilloEmoji} **Detalles del matrimonio finiquitado:**\n`;
    mensaje += `${lluviaEmoji} Fecha de matrimonio: ${marriageDate} a las ${marriageTime}\n`;
    mensaje += `${llorandoEmoji} Fecha de divorcio: ${new Date().toLocaleDateString('es-ES')}\n`;
    mensaje += `${checkEmoji} Duración del matrimonio: ${durationDays} días\n\n`;
    
    // Mensaje motivacional según la duración
    if (durationDays < 1) {
        mensaje += `${funeralEmoji} *"Récord mundial: el matrimonio más corto de la historia"* ${funeralEmoji}\n`;
    } else if (durationDays < 7) {
        mensaje += `${tristezaEmoji} *"Una semana de amor... que se sintió como una eternidad"* ${tristezaEmoji}\n`;
    } else if (durationDays < 30) {
        mensaje += `${lluviaEmoji} *"Un mes de experiencias... algunas buenas, otras no tanto"* ${lluviaEmoji}\n`;
    } else {
        mensaje += `${solEmoji} *"Fue hermoso mientras duró. Tiempo de seguir adelante"* ${solEmoji}\n`;
    }
    
    mensaje += `\n${liberacionEmoji} **RESOLUCIÓN JUDICIAL:**\n`;
    mensaje += `${checkEmoji} Ambas partes quedan libres de toda obligación matrimonial\n`;
    mensaje += `${anilloEmoji} Ambos pueden contraer nuevo matrimonio inmediatamente\n`;
    mensaje += `${nuevoComienzo} Se les desea lo mejor en sus futuras relaciones\n\n`;
    mensaje += `${solEmoji} *"Que este final sea el comienzo de algo mejor"* ${liberacionEmoji}\n\n`;
    mensaje += `${documentoEmoji} **Divorcio procesado exitosamente** ${martilloEmoji}`;

    await conn.reply(m.chat, mensaje, m, { mentions: [user, spouse] });
};

handler.help = ['confirmardivorcio'];
handler.tags = ['fun', 'social'];
handler.command = ['confirmardivorcio', 'confirmar', 'sidivorcio'];
handler.group = true;
handler.register = true;

export default handler;


