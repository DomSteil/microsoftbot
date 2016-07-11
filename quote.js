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
        session.dialogData.quoteNumber = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", Which quote would you like to configure?"); 
    },
    function (session, results) {
        session.dialogData.product = results.response;
        builder.Prompts.choice(session, "Which product do you want to add?", bladeServers);
    },
    function (session, results) {
        session.dialogData.quantity = results.response;
        builder.Prompts.number(session, "How many Blade Servers?");
    },
    function (session, results) {
    	session.dialogData.discount = results.response;
    	builder.Prompts.number(session, "What discount?");
    },
    function (session, results) {
    	session.dialogData.confirmation = results.response;
    	builder.Prompts.choice(session, "Do you want to finalize the Cart", ["Finalize", "Add More Products"]);
    },
    function (session, results) {
    	session.dialogData.nameAgain = results.response.entity;
    	session.send("Got it... I have configured your quote! ");
    }
]);
