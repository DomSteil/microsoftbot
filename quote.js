var restify = require('restify');
var builder = require('botbuilder');


var bladeServers = {
    "WS460c Gen8 Graphics Server Blade": {
        ProductCode: WL460c,
        ListPrice:'$2,450'
    },
    "BL660c Gen8 Server Blade": {
        ProductCode: BL660c,
        ListPrice: '3,500'
    }
};


// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });
bot.add('/', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.userData.quoteNumber = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", Which quote would you like to configure?"); 
    },
    function (session, results) {
        session.userData.product = results.response;
        builder.Prompts.choice(session, "Which product do you want to add?", bladeServers);
    },
    function (session, results) {
        session.userData.quantity = results.response;
        builder.Prompts.number(session, "How many Blade Servers?");
    },
    function (session, results) {
    	session.userData.discount = results.response;
    	builder.Prompts.number(session, "What discount?");
    },
    function (session, results) {
    	session.userData.confirmation = results.response;
    	builder.Prompts.choice(session, "Do you want to finalize the Cart", ["Finalize", "Add More Products"]);
    },
    function (session, results) {
    	session.userData.nameAgain = results.response.entity;
    	session.send("Got it... I have configured your quote! ");
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
        session.userData.quoteNumber = results.response;
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
