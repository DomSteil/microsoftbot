var restify = require('restify');
var builder = require('botbuilder');
var converse = require('converse');

var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=6bce4284-450b-47f7-acdc-003c95c92f4f&subscription-key=9ceaa7a6ab9d4f11851bd28c80521d71'

var dialog = new builder.LuisDialog(model);
model.exports = dialog;

var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });
bot.add('/', dialog);

bot.add('/', new builder.LuisDialog('https://api.projectoxford.ai/luis/v1/application?id=6bce4284-450b-47f7-acdc-003c95c92f4f&subscription-key=9ceaa7a6ab9d4f11851bd28c80521d71')
    .on('CreateNDA', '/createNDA')
    .on('CreateMSA', '/createMSA')
    .on('CreateSOW', '/createSOW')
    .on('CreateAccount', '/createAccount')
    .on('CreateOpportunity', '/createOpportunity')
    .on('CreateContact', '/createContact')
    .on('CreateQuote', '/quote')
    .on('CreateAgreement', '/agreement')
    .onDefault(builder.DialogAction.send("I'm sorry. I didn't understand."))
);