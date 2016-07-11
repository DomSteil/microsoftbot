var restify = require('restify');
var builder = require('../../core/');


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
        session.dialogData.opportunityName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", What is the Opportunity's Name?"); 
    },
    function (session, results) {
        session.dialogData.account = results.response;
        builder.Prompts.text(session, "Which account is it associated to?");
    },
    function (session, results) {
        session.dialogData.revenue = results.response;
        builder.Prompts.text(session, "What is the Pricelist?");
    },
    function (session, results) {
        session.dialogData.currency = results.response;
        builder.Prompts.number(session, "What is the Currency?");
    },
    function (session, results) {
        session.dialogData.closeDate = results.response;
        builder.Prompts.date(session, "What is the Close Date");
    },
    function (session, results) {
        session.dialogData.type = results.response.entity;
        session.send("Got it... I have created your Opportunity! ");
    }
]);




/*
// Get secrets from server environment
var botConnectorOptions = { 
    appId: process.env.BOTFRAMEWORK_APPID, 
    appSecret: process.env.BOTFRAMEWORK_APPSECRET 
};

// Create bot and add dialogs
var bot = new builder.TextBot();
bot.add('/', [
    function (session) {
        builder.Prompts.text(session, "Hello... What's your name?");
    },
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?"); 
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, "What language do you code Node using?", ["JavaScript", "CoffeeScript", "TypeScript"]);
    },
    function (session, results) {
        session.userData.language = results.response.entity;
        session.send("Got it... " + session.userData.name + 
                     " you've been programming for " + session.userData.coding + 
                     " years and use " + session.userData.language + ".");
    }
]);

bot.listenStdin();


// Setup Restify Server
var server = restify.createServer();



//Handle Bot Framework messages
// server.post('/api/messages', bot.verifyBotFramework(), bot.listen());


//Serve a static web page
server.get(/., restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));


server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
*/
