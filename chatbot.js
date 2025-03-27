const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname.split(" ")[0];
        await client.sendMessage(msg.from, `Olá! ${name}, sou o assistente virtual *Loki* da *C&G Negócios Imobiliários*. Como posso ajudá-lo hoje?\n\n1 - Imóveis disponíveis para locação\n2 - Imóveis disponíveis para venda\n3 - Falar com um especialista\n4 - Sair`);
    }

    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Claro,  ${name}! Estou te mandando o link com todos os nossos imóveis disponíveis para locação: http://www.cegnegociosimobiliarios.imb.br/imovel/locacao`);
    }

    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Claro,  ${name}! Estou te mandando o link com todos os imóveis disponíveis para venda: http://www.cegnegociosimobiliarios.imb.br/imovel/venda`);
    }

    if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Claro,  ${name}! Assim que um de nossos especialistas estiver disponível, ele entrará em contato o mais rápido possível.`);
    }

    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `A *C&G Negócios Imobiliários* agradece seu contato! Se precisar de algo mais, estaremos sempre à disposição. Tenha um ótimo dia!`);
    }
});
