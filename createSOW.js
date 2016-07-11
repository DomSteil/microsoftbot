var restify = require('restify');
var builder = require('../../core/');

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});


// Create bot and add dialogs
var bot = new builder.UniversalBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.accountName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", Which Account?"); 
    },
    function (session, results) {
        session.dialogData.primaryContact = results.response;
        builder.Prompts.text(session, "Who is the Primary Contact?");
    },
    function (session, results) {
        session.dialogData.startDate = results.response;
        builder.Prompts.time(session, "What is the start date?");
    },
    function (session, results) {
        session.dialogData.closeDate = results.response;
        builder.Prompts.time(session, "What is the close date?");
    },
    function (session, results) {
        session.dialogData.nda = results.response.entity;
        session.send("Got it... I have created your SOW! ");
    }
]);
