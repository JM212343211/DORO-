// Juego: Adivina la palabra por emojis
const quiz = [
  // Comida
  { emojis: "🍕🧀🍅", ans: "pizza" },
  { emojis: "🍔🍟", ans: "hamburguesa" },
  { emojis: "🌮🌶️", ans: "taco" },
  { emojis: "🍝🍅", ans: "espagueti" },
  { emojis: "🍣🐟", ans: "sushi" },
  { emojis: "🧊🍦", ans: "helado" },
  { emojis: "☕️☀️", ans: "cafe" },
  { emojis: "🥛🐄", ans: "leche" },
  { emojis: "🍰🎂", ans: "pastel" },
  { emojis: "🍪🍫", ans: "galleta" },
  
  // Frutas
  { emojis: "🐍🍏", ans: "manzana" },
  { emojis: "🍌🐒", ans: "platano" },
  { emojis: "🍓❤️", ans: "fresa" },
  { emojis: "🍊☀️", ans: "naranja" },
  { emojis: "🍇🍷", ans: "uva" },
  { emojis: "🥥🌴", ans: "coco" },
  { emojis: "🍑💗", ans: "durazno" },
  
  // Deportes
  { emojis: "⚽️🥅", ans: "futbol" },
  { emojis: "🏀🏆", ans: "basquet" },
  { emojis: "🎾🎯", ans: "tenis" },
  { emojis: "🏊‍♂️💧", ans: "natacion" },
  { emojis: "🥊👊", ans: "boxeo" },
  { emojis: "🏈🏟️", ans: "futbol americano" },
  { emojis: "⚾️🏟️", ans: "beisbol" },
  
  // Transporte
  { emojis: "🚗💨", ans: "carrera" },
  { emojis: "✈️☁️", ans: "avion" },
  { emojis: "🚢🌊", ans: "barco" },
  { emojis: "🚲🚴‍♂️", ans: "bicicleta" },
  { emojis: "🚂🛤️", ans: "tren" },
  { emojis: "🚁🌪️", ans: "helicoptero" },
  { emojis: "🏍️💨", ans: "moto" },
  
  // Animales
  { emojis: "🐶🐾", ans: "perro" },
  { emojis: "🦁👑", ans: "rey leon" },
  { emojis: "🐱😸", ans: "gato" },
  { emojis: "🐘👂", ans: "elefante" },
  { emojis: "🦒📏", ans: "jirafa" },
  { emojis: "🐧❄️", ans: "pinguino" },
  { emojis: "🦅🏔️", ans: "aguila" },
  { emojis: "🐯🟠", ans: "tigre" },
  { emojis: "🐼⚫️⚪️", ans: "oso panda" },
  { emojis: "🦈🌊", ans: "tiburon" },
  { emojis: "🐙🌊", ans: "pulpo" },
  { emojis: "🦋🌺", ans: "mariposa" },
  
  // Tecnología
  { emojis: "🎮👾", ans: "videojuego" },
  { emojis: "📱💬", ans: "celular" },
  { emojis: "💻⌨️", ans: "computadora" },
  { emojis: "📺📡", ans: "television" },
  { emojis: "🎧🎵", ans: "audifonos" },
  { emojis: "📷📸", ans: "camara" },
  { emojis: "🤖🔧", ans: "robot" },
  
  // Entretenimiento
  { emojis: "🎬🍿", ans: "cine" },
  { emojis: "🎭🎪", ans: "teatro" },
  { emojis: "🎵🎤", ans: "musica" },
  { emojis: "📚📖", ans: "libro" },
  { emojis: "🎨🖌️", ans: "pintura" },
  { emojis: "🎪🤡", ans: "circo" },
  { emojis: "🎯🏹", ans: "tiro al blanco" },
  
  // Profesiones
  { emojis: "👨‍⚕️🏥", ans: "doctor" },
  { emojis: "👨‍🍳🍳", ans: "chef" },
  { emojis: "👨‍🚒🔥", ans: "bombero" },
  { emojis: "👮‍♂️🚔", ans: "policia" },
  { emojis: "👨‍🏫📚", ans: "maestro" },
  { emojis: "👨‍✈️✈️", ans: "piloto" },
  { emojis: "👨‍🔧🔧", ans: "mecanico" },
  
  // Lugares
  { emojis: "🏖️🌊", ans: "playa" },
  { emojis: "🏔️❄️", ans: "montaña" },
  { emojis: "🏜️🐪", ans: "desierto" },
  { emojis: "🌆🏙️", ans: "ciudad" },
  { emojis: "🏠🏡", ans: "casa" },
  { emojis: "🏫📚", ans: "escuela" },
  { emojis: "🏥⚕️", ans: "hospital" },
  { emojis: "🏦💰", ans: "banco" },
  
  // Clima/Naturaleza
  { emojis: "☀️🌞", ans: "sol" },
  { emojis: "🌙⭐", ans: "luna" },
  { emojis: "🌧️☔", ans: "lluvia" },
  { emojis: "❄️☃️", ans: "nieve" },
  { emojis: "🌈☔", ans: "arcoiris" },
  { emojis: "🌪️💨", ans: "tornado" },
  { emojis: "⚡️🌩️", ans: "tormenta" },
  
  // Objetos cotidianos
  { emojis: "⏰🔔", ans: "despertador" },
  { emojis: "🔑🚪", ans: "llave" },
  { emojis: "✂️📝", ans: "tijeras" },
  { emojis: "🔨🔧", ans: "martillo" },
  { emojis: "💡⚡", ans: "bombilla" },
  { emojis: "🕯️🔥", ans: "vela" },
  { emojis: "🪑🏠", ans: "silla" },
  { emojis: "🛏️😴", ans: "cama" },
  
  // Emociones/Estados
  { emojis: "😂🤣", ans: "risa" },
  { emojis: "😢💧", ans: "tristeza" },
  { emojis: "😴💤", ans: "sueño" },
  { emojis: "😡🔥", ans: "enojo" },
  { emojis: "❤️💕", ans: "amor" },
  { emojis: "😱👻", ans: "miedo" },
  
  // Festividades
  { emojis: "🎄🎅", ans: "navidad" },
  { emojis: "🎃👻", ans: "halloween" },
  { emojis: "💖💕", ans: "san valentin" },
  { emojis: "🎂🎉", ans: "cumpleaños" },
  { emojis: "🎆🎊", ans: "año nuevo" },
  
  // Más complejos
  { emojis: "🌍🚀", ans: "espacio" },
  { emojis: "🔬🧪", ans: "ciencia" },
  { emojis: "⚖️👨‍⚖️", ans: "justicia" },
  { emojis: "🏆🥇", ans: "campeon" },
  { emojis: "💰💎", ans: "tesoro" },
  { emojis: "🎪🎭", ans: "espectaculo" },
  { emojis: "🌋🔥", ans: "volcan" },
  { emojis: "🏰👑", ans: "castillo" },
];

// Comando para iniciar el quiz
let emojiQuizHandler = async (m, { conn }) => {
  let q = quiz[Math.floor(Math.random() * quiz.length)];
  conn.emojiquiz = conn.emojiquiz || {};
  conn.emojiquiz[m.sender] = q.ans.toLowerCase();
  m.reply(`🤔 ¿Qué es?\n${q.emojis}\n\n💡 *Pista:* ¡Piensa bien!\n\nResponde con: !emojires <respuesta>`);
};

emojiQuizHandler.help = ['emojiquiz'];
emojiQuizHandler.tags = ['game'];
emojiQuizHandler.command = ['emojiquiz', 'adivinaemoji', 'emojitest'];

// Comando para responder
let emojiResponseHandler = async (m, { conn, text }) => {
  conn.emojiquiz = conn.emojiquiz || {};
  
  if (!conn.emojiquiz[m.sender]) {
    return m.reply('❌ No tienes ninguna pregunta activa. Usa *!emojiquiz* para empezar a jugar! 🎮');
  }
  
  if (!text) {
    return m.reply('❌ Debes escribir tu respuesta. Ejemplo: *!emojires pizza* 🍕');
  }
  
  let answer = text.toLowerCase().trim();
  let correctAnswer = conn.emojiquiz[m.sender];
  
  // Verificar diferentes variaciones de la respuesta
  let isCorrect = false;
  let variations = [
    correctAnswer,
    correctAnswer.replace(/\s+/g, ''), // sin espacios
    correctAnswer.replace('rey leon', 'reyLeon'),
    correctAnswer.replace('rey leon', 'leon'),
    correctAnswer.replace('futbol americano', 'futbolamericano'),
    correctAnswer.replace('san valentin', 'sanvalentin'),
    correctAnswer.replace('año nuevo', 'añonuevo'),
    correctAnswer.replace('oso panda', 'osopanda'),
    correctAnswer.replace('tiro al blanco', 'tiroalblanco')
  ];
  
  // Verificar si la respuesta coincide con alguna variación
  if (variations.some(v => v === answer || v.includes(answer) || answer.includes(v))) {
    isCorrect = true;
  }
  
  if (isCorrect) {
    delete conn.emojiquiz[m.sender];
    let responses = [
      '🎉 ¡Correcto! ¡Eres genial! 🌟',
      '✅ ¡Excelente! ¡Lo adivinaste! 🎊',
      '🏆 ¡Perfecto! ¡Eres un maestro de los emojis! 👑',
      '🎯 ¡Bingo! ¡Respuesta correcta! 🎈',
      '⭐ ¡Fantástico! ¡Lo lograste! 🎆',
      '🎪 ¡Increíble! ¡Tienes razón! 🎭'
    ];
    let randomResponse = responses[Math.floor(Math.random() * responses.length)];
    m.reply(`${randomResponse}\n\n💡 La respuesta era: *${correctAnswer}*\n\n🎮 ¿Quieres jugar otra vez? Usa *!emojiquiz*`);
  } else {
    let hints = [
      '❌ ¡Incorrecto! 🤔 Intenta de nuevo...',
      '❌ ¡No es esa! 💭 Piensa un poco más...',
      '❌ ¡Casi! 🧐 Pero no es la respuesta correcta...',
      '❌ ¡Ups! 😅 Esa no es la respuesta...',
      '❌ ¡Nop! 🤷‍♂️ Sigue intentando...'
    ];
    let randomHint = hints[Math.floor(Math.random() * hints.length)];
    m.reply(`${randomHint}\n\n💡 *Pista:* Mira bien los emojis y piensa... 🤯\n\nUsa: *!emojires <tu respuesta>*`);
  }
};

emojiResponseHandler.help = ['emojires'];
emojiResponseHandler.tags = ['game'];
emojiResponseHandler.command = ['emojires', 'emojirespuesta', 'responderemoji'];

export { emojiQuizHandler as default, emojiResponseHandler };
