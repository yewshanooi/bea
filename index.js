const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
    dotenv.config();

const client = new Telegraf(process.env.TOKEN);

client.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start
    console.log('Response time: %sms', ms);
});


client.start((ctx) => ctx.reply('Welcome! Use /help to see all the commands that I can do :/'));
client.help((ctx) => ctx.reply('Here are all my commands:\n/8ball\n/catfact'));


client.command('8ball', (ctx) => {
    const answerArray = [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes - definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        'Don\'t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
    ];

    ctx.reply(`${answerArray[Math.floor(Math.random() * answerArray.length)]}`);
});


client.command('catfact', async (ctx) => {
    const Fact = await fetch('https://catfact.ninja/fact')
        .then(res => res.json());

    ctx.reply(`${Fact.fact}`);
});



// client.on('photo', (ctx) => {
//     const chatId = ctx.message.chat.id;

//     ctx.telegram.sendMessage(chatId, `I\'ve received your photo!`)
//     ctx.telegram.sendPhoto(chatId, `https://as2.ftcdn.net/v2/jpg/03/66/78/13/1000_F_366781345_oEr9wc8yWhYRPZe6CGyFWS6QolZIf2fJ.jpg`)
// });

// client.on('text', (ctx) => {
//     const chatId = ctx.message.chat.id;

//     ctx.telegram.sendMessage(chatId, `Hello ${ctx.message.from.username}!`)
//     // ctx.reply(`Hello ${ctx.message.from.username}!`)
// });

// client.on('sticker', (ctx) => {
//     const chatId = ctx.message.chat.id;

//     ctx.telegram.sendMessage(chatId, `I\'ve received your sticker!`)
//     // ctx.reply(`I received your sticker!`)
// });


client.catch((err, ctx) => {
    console.log(`Oops, encountered an error for ${ctx.updateType}`, err);
});


client.launch();

process.once('SIGINT', () => client.stop('SIGINT'));
process.once('SIGTERM', () => client.stop('SIGTERM'));