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
        session.dialogData.firstName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", What is the Contact's First Name?"); 
    },
    function (session, results) {
        session.dialogData.lastName = results.response;
        builder.Prompts.text(session, "What is the Contact's Last Name?");
    },
    function (session, results) {
        session.dialogData.phone = results.response;
        builder.Prompts.number(session, "What is the Phone Number?");
    },
    function (session, results) {
        session.dialogData.email = results.response;
        builder.Prompts.text(session, "What is the Email?");
    },
    function (session, results) {
        session.dialogData.type = results.response.entity;
        session.send("Got it... I have created your Contact! ");
    }
]);


// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
