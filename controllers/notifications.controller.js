var admin = require("firebase-admin");
var UserController = require('./user.controller')

var serviceAccount = require('../config/qupidon-838a5-firebase-adminsdk-qo5e9-a720522822.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://prismappfcm.firebaseio.com"
});


async function MessageNotification(message, sender, receiver) {

    var registrationToken = receiver.fcm_token;

    var message = {
        data: {
            contents: message.contents,
            name: 'Sender name'
        },
        token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

exports.MessageNotification = MessageNotification