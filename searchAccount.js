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
        session.userData.name = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?"); 
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, "What language do you code Node using?", ["JavaScript", "CoffeeScript", "TypeScript"]);
    },
    function (session, results) {
        session.userData.language = results.response;
        builder.Prompts.text(session, "cool, cool");
    },
    function (session, results) {
    	session.userData.skills = results.response;
    	builder.Prompts.text(session, "What type of skills you got?");
    },
    function (session, results) {
    	session.userData.actually = results.response;
    	builder.Prompts.choice(session, "Can you?", ["Crush it", "Drop the bass"]);
    },
    function (session, results) {
    	session.userData.nameAgain = results.response.entity;
    	session.send("Got it... " + session.userData.name + 
                     " you've been programming for " + session.userData.coding + 
                     " years and use " + session.userData.language + ".");
    }
]);