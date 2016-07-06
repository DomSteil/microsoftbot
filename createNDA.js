var restify = require('restify');
var builder = require('botbuilder');

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });
bot.add('/', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.userData.accountName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", Which Account?"); 
    },
    function (session, results) {
        session.userData.primaryContact = results.response;
        builder.Prompts.text(session, "Who is the Primary Contact?");
    },
    function (session, results) {
        session.userData.startDate = results.response;
        builder.Prompts.time(session, "What is the start date?");
    },
    function (session, results) {
        session.userData.closeDate = results.response;
        builder.Prompts.time(session, "What is the close date?");
    },
    function (session, results) {
        session.userData.nda = results.response.entity;
        session.send("Got it... I have created your NDA! ");
    }
]);


var helloBot = new builder.TextBot();
helloBot.add('/', function (session) {
    if (!session.userData.name) {
        session.beginDialog('/profile');
    } else {
        session.send('Hello %s!', session.userData.name);
    }
});
helloBot.add('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.firstName = results.response;
        session.endDialog();
    }
]);

helloBot.listenStdin();


// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
