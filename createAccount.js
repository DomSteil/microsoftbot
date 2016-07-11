var restify = require('restify');
var builder = require('../../core/');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});


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

//Create Dialog
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.accountName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", What is the Account's Name?"); 
    },
    function (session, results) {
        session.dialogData.type = results.response;
        builder.Prompts.text(session, "What is the Relationship Type?");
    },
    function (session, results) {
        session.dialogData.revenue = results.response;
        builder.Prompts.number(session, "What is the Annual Revenue?");
    },
    function (session, results) {
        session.dialogData.employees = results.response;
        builder.Prompts.number(session, "How many employees?");
    },
    function (session, results) {
        session.dialogData.account = results.response.entity;
        session.send("Got it... I have created your Account! ");
        if (session.dialogData.accountName && session.dialogData.type && session.dialogData.revenue && session.dialogData.employees) {
            session.endDialogWithResult({
                response: { Account Name: session.dialogData.accountName, Type: session.dialogData.type, Revenue: session.dialogData.revenue, Employees: session.dialogData.employees }
            });
        }
    }
]);