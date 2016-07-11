var restify = require('restify');
var builder = require('botbuilder');

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });


//Future State for a Catalog Card 
bot.dialog('/catalog', [
    function (session) {
        session.send("You can pass a custom message to Prompts.choice() that will present the user with a carousel of cards to select from. Each card can even support multiple actions.");
        
        // Ask the user to select an item from a carousel.
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.catalog)
            .attachments([
                new builder.HeroCard(session)
                    .title("WS460c Gen8 Graphics Server Blade")
                    .text("Product Code: HW-BL003")
                    .images([
                        builder.CardImage.create(session, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSIhgmREbJQpZnqBsFVL_3PBgZieXqZLNTpEuwHxj5CTEgZL4")
                            .tap(builder.CardAction.showImage(session, "")),
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, ""),
                        builder.CardAction.imBack(session, "select:WS460c Gen8 Graphics Server Blade", "Select")
                    ]),
                new builder.HeroCard(session)
                    .title("BL660c Gen8 Server Blade")
                    .text("Product Code: HW-BL004")
                    .images([
                        builder.CardImage.create(session, "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqk-5LjSdH2qr0Ne4ba0_6ILR5HjBRvws9Sit4yhOsyfGbYGC8GA")
                            .tap(builder.CardAction.showImage(session, "")),
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, ""),
                        builder.CardAction.imBack(session, "select:BL660c Gen8 Server Blade", "Select")
                    ]),
                new builder.HeroCard(session)
                    .title("BL460c Gen8 Server Blade")
                    .text("Product Code: HW-BL002")
                    .images([
                        builder.CardImage.create(session, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACAAbSbBjkLPKwl_VFKGlp9ETasobKRjsTkQaBFv820uJLbtV")
                            .tap(builder.CardAction.showImage(session, ""))
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/EMP_Museum", "Wikipedia"),
                        builder.CardAction.imBack(session, "select:102", "Select")
                    ])
            ]);
        builder.Prompts.choice(session, msg, "select:WS460c Gen8 Graphics Server Blade|select:BL660c Gen8 Server Blade|select:BL460c Gen8 Server Blade");
    },
    function (session, results) {
        if (results.response) {
            var action, item;
            var kvPair = results.response.entity.split(':');
            switch (kvPair[0]) {
                case 'select':
                    action = 'selected';
                    break;
            }
            switch (kvPair[1]) {
                case 'WS460c Gen8 Graphics Server Blade':
                    item = "the <b>WS460c Gen8 Graphics Server Blade</b>";
                    break;
                case 'BL660c Gen8 Server Blade':
                    item = "<b>BL660c Gen8 Server Blade</b>";
                    break;
                case 'BL460c Gen8 Server Blade':
                    item = "the <b>BL460c Gen8 Server Blade</b>";
                    break;
            }
            session.endDialog('You %s "%s"', action, item);
        } else {
            session.endDialog("You canceled.");
        }
    }    
]);


// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});

