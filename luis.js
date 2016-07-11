var restify = require('restify');
var builder = require('botbuilder');
var converse = require('converse');

var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=6bce4284-450b-47f7-acdc-003c95c92f4f&subscription-key=9ceaa7a6ab9d4f11851bd28c80521d71'
var recognizer = new builder.LuisDialog(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Add intent handlers
// First Luis Example is Create Contact
dialog.matches('builtin.intent.createContact', [
	function (session, args, next) {
		var firstName = builder.EntityRecognizer.findEntity(args.entities, 'builtin.createContact.firstName');
		var lastName = builder.EntityRecognizer.findEntity(arg.entities, 'builtin.createContact.lastName');
		var phone = builder.EntityRecognizer.findEntity(arg.entities, 'builtin.createContact.phone');
		var email = builder.EntityRecognizer.findEntity(arg.entities, 'builtin.createContact.email');
		var contact = session.dialogData.contact = {
			firstName: firstName ? firstName.entity: null,
			lastName: lastName ? lastName.entity: null,
			phone: phone ? phone.entity: null,
			email: email ? email.entity: null
		};

		if (!contact.firstName) {
			builder.Prompts.text(session, 'What is the contacts first name?');
		} else {
			next();
		}
	},
	function (session, results, next) {
	 	var firstName = session.dialogData.contact;
	 	if (results.response) {
	 		contact.firstName = results.response;
	 	}
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
        session.dialogData.contact = results.response.entity;
        session.send("Got it... I have created your Contact! ");
    }
]);


var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });
bot.add('/', dialog);

bot.add('/', new builder.LuisDialog('https://api.projectoxford.ai/luis/v1/application?id=6bce4284-450b-47f7-acdc-003c95c92f4f&subscription-key=9ceaa7a6ab9d4f11851bd28c80521d71')
    .on('CreateNDA', '/createNDA')
    .on('CreateMSA', '/createMSA')
    .on('CreateSOW', '/createSOW')
    .on('CreateAccount', '/createAccount')
    .on('CreateOpportunity', '/createOpportunity')
    .on('CreateContact', '/createContact')
    .on('CreateQuote', '/quote')
    .on('CreateAgreement', '/agreement')
    .onDefault(builder.DialogAction.send("I'm sorry. I didn't understand."))
);