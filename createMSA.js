var restify = require('restify');
var builder = require('botbuilder');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});


// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

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
        session.send("Got it... I have created your MSA! ");
    }
]);