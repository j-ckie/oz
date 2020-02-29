// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require("express");
const app = express();

const admin = require("firebase-admin");
const cors = require("cors") //({ origin: true });
const functions = require("firebase-functions");
const serviceAccount = require("./dialogflow-service-acc.json");

app.use(cors());

admin.initializeApp({ //functions.config().firebase, 
    credentials: admin.credential.cert(serviceAccount),
    databaseURL: "https://the-oz-project.firebaseio.com"
});

const { SessionsClient } = require("dialogflow");

const { WebhookClient } = require("dialogflow-fulfillment");

const db = admin.firestore();


// ======= firebase authentication =======
const fbAuth = require("./util/firebaseAuth");


// ======= user handlers =======
const {
    signup,
    login,
    getUserDetails
    //     viewUserDashboard
} = require("./handlers/users")

// ======= entry handlers =======
const {
    postGratitudeEntry
    //     entryWeek,
    //     entryMonth
} = require("./handlers/entries");

// ======= rating handlers =======
// const {
//     postRating,
//     postWeek,
//     postMonth
// } = require("./handlers/ratings");


// ======= user routes =======
app.post("/signup", signup);
app.post("/login", login);
// app.get("/user", fbAuth, viewUserDashboard);
app.get("/user", fbAuth, getUserDetails);

// ======= entry routes =======
app.post("/entry", postGratitudeEntry);
// app.get("/entries/week", fbAuth, entryWeek);
// app.get("/entries/month", fbAuth, entryMonth);

// ======= rating routes =======
// app.post("/mood", fbAuth, postEntry);
// app.get("/moods/week", fbAuth, postWeek);
// app.get("/moods/month", fbAuth, postMonth);


// ======= firebase api setup =======
exports.api = functions.https.onRequest(app);

exports.dialogflowGateway = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const { queryInput, sessionId } = request.body;

        const sessionClient = new SessionsClient({ credentials: serviceAccount });

        const session = sessionClient.sessionPath("the-oz-project", sessionId);

        const responses = await sessionClient.detectIntent({ session, queryInput });

        const result = responses[0].queryResult;


        // result.fulfillmentText

        response.send(result);
    })
})


exports.dialogflowWebhook = functions.https.onRequest(async (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log("req.body")
    console.log(JSON.stringify(request.body));

    const result = request.body.queryResult;

    function welcome(agent) {
        agent.add("Welcome to my agent!");
    }

    function fallback(agent) {
        agent.add("Sorry, can you try again?");
    }

    async function userOnboardingHandler(agent) {
        let userSession = request.body.session;
        let userEmail = userSession.split("/").pop();
        const profile = db.collection("users").doc(userEmail);

        const { name, color } = result.parameters;

        await profile.set({ name, color });
        agent.add("WELCOME FUCK FACE")
    }


    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    intentMap.set("UpdateProfile", userOnboardingHandler);

    agent.handleRequest(intentMap);

})