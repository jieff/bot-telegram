const { Telegraf } = require('telegraf');

const bot = new Telegraf('6736322812:AAGVGs97SuHt157A3OhgOK3grKaMa8g8k6g');

// Mensagem de boas-vindas
bot.start((ctx) => {
    const welcomeMessage = `
    Bem-vindo à Farmácia Sempre Forte! 🌟
    Como posso ajudar você hoje?
    Para fazer um pedido, digite /pedido.
    `;
    ctx.reply(welcomeMessage);
});

// Comando /pedido para iniciar um pedido
bot.command('pedido', (ctx) => {
    ctx.reply('Por favor, diga os itens que deseja pedir para entrega.');
});

// Responder à mensagem do cliente
bot.on('text', (ctx) => {
    const pedido = ctx.message.text;
    // Aqui você pode processar o pedido e tomar as ações necessárias, como registrar o pedido, configurar a entrega, etc.
    ctx.reply(`Seu pedido de "${pedido}" foi recebido. Entraremos em contato em breve para confirmar a entrega.`);
});

// Iniciar o bot
bot.launch().then(() => {
    console.log('O bot está funcionando!');
}).catch((err) => {
    console.error('Erro ao iniciar o bot:', err);
});
