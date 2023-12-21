const { Telegraf, session, Markup } = require('telegraf');

require('dotenv').config();
const bot = new Telegraf(process.env.TOKEN);

bot.use(session());

// Inicialização do bot
bot.start((ctx) => {
    ctx.reply(`Olá! Bem-vindo ao Supermercado Bot. Você gostaria de fazer um pedido ou tem alguma sugestão?`,
        Markup.inlineKeyboard([
            Markup.button.callback(`Fazer um pedido`, 'fazer_pedido'),
            Markup.button.callback(`Deixar uma sugestão`, 'fazer_sugestao')
        ])
    );
});

// Lidar com a escolha de fazer um pedido
bot.action('fazer_pedido', async (ctx) => {
    if (!ctx.session) {
        ctx.session = {};
    }
    ctx.session.state = 'fazendo_pedido';
    await ctx.reply('Por favor, digite os produtos que você deseja pedir.');
});

// Lidar com a escolha de fazer uma sugestão
bot.action('fazer_sugestao', async (ctx) => {
    if (!ctx.session) {
        ctx.session = {};
    }
    ctx.session.state = 'fazendo_sugestao';
    await ctx.reply('Por favor, digite sua sugestão para melhorarmos nossos serviços.');
});

// Captura de texto para pedidos e sugestões
bot.on('text', async (ctx) => {
    const message = ctx.message.text;
    const state = ctx.session ? ctx.session.state || '' : '';

    if (state === 'fazendo_sugestao') {
        console.log(`Sugestão recebida: ${message}`);
        await ctx.reply('Obrigado pela sua sugestão! Vamos considerar isso para melhorar nossos serviços.');
    } else if (state === 'fazendo_pedido') {
        console.log(`Pedido recebido: ${message}`);
        await ctx.reply('Obrigado pelo seu pedido! Entraremos em contato em breve.');
    } else {
        ctx.reply(`Desculpe, não entendi. Você gostaria de fazer um pedido ou tem alguma sugestão?`);
    }

    delete ctx.session.state;

    ctx.reply(`Olá! Como posso ajudar você hoje?`,
        Markup.inlineKeyboard([
            Markup.button.callback(`Fazer um pedido`, 'fazer_pedido'),
            Markup.button.callback(`Deixar uma sugestão`, 'fazer_sugestao')
        ])
    );
});

// Lidar com mensagens não processadas
bot.on('message', (ctx) => {
    ctx.reply(`Desculpe, não entendi. Você gostaria de fazer um pedido ou tem alguma sugestão?`,
        Markup.inlineKeyboard([
            Markup.button.callback(`Fazer um pedido`, 'fazer_pedido'),
            Markup.button.callback(`Deixar uma sugestão`, 'fazer_sugestao')
        ])
    );
});

// Iniciar o bot
bot.launch().then(() => {
    console.log('O bot está funcionando!');
}).catch((err) => {
    console.error('Erro ao iniciar o bot:', err);
});
