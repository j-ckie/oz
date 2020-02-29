const admin = require("firebase-admin");
// const cors = require("cors")({ origin: true});
// const functions = require("firebase-functions");
// const serviceAccount = require("../service-account.json");

// admin.initializeApp(functions.config().firebase, {
//     credentials: admin.credential.cert(serviceAccount),
//     databaseURL: "https://the-oz-project.firebaseio.com"
// });

// const { SessionsClient } = require("dialogflow");


const db = admin.firestore();

module.exports = { admin, db };