var restify = require('restify');
var builder = require('botbuilder');

// Create bot and add dialogs
var bot = new builder.UniversalBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });
bot.dialog('/', [
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
        session.userData.name = results.response;
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
