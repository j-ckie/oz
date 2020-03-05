// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require("express");
const app = express();

const admin = require("firebase-admin");
const cors = require("cors");//({ origin: true });
const functions = require("firebase-functions");
const serviceAccount = require("./dialogflow-service-acc.json");

var allowedOrigins = ['http://localhost:3000',
    'https://us-central1-the-oz-project.cloudfunctions.net',
    '*'];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

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
    // getUserDetails,
    viewUserDashboard
} = require("./handlers/users")

// ======= entry handlers =======
const {
    postGratitudeEntry,
    getEntries
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
app.get("/user", fbAuth, viewUserDashboard);
// app.get("/user", fbAuth, getUserDetails);

// ======= entry routes =======
app.post("/entry", postGratitudeEntry);
app.get("/entries", fbAuth, getEntries);
// app.get("/entries/week", fbAuth, entryWeek);
// app.get("/entries/month", fbAuth, entryMonth);

// ======= rating routes =======
// app.post("/mood", fbAuth, postEntry);
// app.get("/moods/week", fbAuth, postWeek);
// app.get("/moods/month", fbAuth, postMonth);


// ======= firebase api setup =======
exports.api = functions.https.onRequest(app);

// ======= DIALOGFLOW ITEMS =======
exports.dialogflowGateway = functions.https.onRequest((request, response) => {
    //cors(request, response, () => {
    console.log("begin gateway")
    let idToken;
    let timeStamp = request.body.queryInput.timeStamp


    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer ")) {
        idToken = request.headers.authorization.split("Bearer ")[1];
    } else {
        console.error("No token found!");
        return response.status(403).json({ error: "Unauthorized" });
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            request.user = decodedToken;

            db.collection("users")
                .where("userId", "==", request.user.uid)
                .limit(1)
                .get()
                .then(res => {
                    console.log("user")

                    let sessionId = request.user.email + ":::" + timeStamp
                    console.log(sessionId)

                    const { queryInput } = request.body;

                    const sessionClient = new SessionsClient({ credentials: serviceAccount });

                    const session = sessionClient.sessionPath("the-oz-project", sessionId);

                    sessionClient.detectIntent({ session, queryInput }).then(responses => {

                        const result = responses[0].queryResult;
                        response.send(result);
                    })


                })


        })
        .then(data => {
            console.log(data)
            request.user.name = data.docs[0].data().name;
            request.user.imageUrl = data.docs[0].data().imageUrl;
        })
        .catch(err => console.error(err));


    //})
})


exports.dialogflowWebhook = functions.https.onRequest(async (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log("req.body")
    console.log(JSON.stringify(request.body));

    const result = request.body.queryResult;

    function addGratitudeEntry(entry, userEmail) {
        let newEntry = {
            body: entry,
            email: userEmail,
            createdAt: new Date().toISOString()
        }

        db.collection("entries")
            .add(newEntry)
            .then(doc => {
                let resEntry = newEntry;

                resEntry.entryId = doc.id;
                res.json({ resEntry });
            })
            .catch(err => {
                console.error(err)
                res.status(500).json({ error: `Something went wrong when adding the entry` })
            })
    }

    function addMoodEntry(entry, userEmail) {
        let newEntry = {
            mood: entry,
            email: userEmail,
            createdAt: new Date().toISOString()
        }

        db.collection("moods")
            .add(newEntry)
            .then(doc => {
                let resEntry = newEntry;

                resEntry.entryId = doc.id;
                res.json({ resEntry });
            })
            .catch(err => {
                console.error(err)
                res.status(500).json({ error: `Something went wrong when adding the entry` })
            })
    }

    function welcome(agent) {
        agent.add("Welcome to my agent!");
    }

    function fallback(agent) {
        agent.add("Sorry, can you try again?");
    }

    async function userOnboardingHandler(agent) {
        let userSession = request.body.session;
        let timeStamp = userSession.split(":::").pop();
        let userEmail = userSession.split(":::").shift().split("/").pop();
        console.log("timeStamp & User Email")
        console.log(timeStamp)
        console.log(userEmail)
        const profile = db.collection("users").doc(userEmail);

        const { name } = result.parameters;

        await profile.set({ name }, { merge: true });

        agent.add("Profile updated!")
    }

    async function logGratitude(agent) {
        let userSession = request.body.session;
        let timeStamp = userSession.split(":::").pop();
        let userEmail = userSession.split(":::").shift().split("/").pop();


        const { Gratitude } = result.parameters;
        console.log(result.parameters)

        addGratitudeEntry(Gratitude, userEmail);

        // let newEntry = {
        //     body: Gratitude,
        //     email: userEmail,
        //     createdAt: new Date().toISOString()
        // }

        // db.collection("entries")
        //     .add(newEntry)
        //     .then(doc => {
        //         let resEntry = newEntry;

        //         resEntry.entryId = doc.id;
        //         res.json({ resEntry });
        //     })
        //     .catch(err => {
        //         console.error(err)
        //         res.status(500).json({ error: `Something went wrong when adding the entry` })
        //     })



        agent.add("Gratitude Logged!")
    }
    async function logMood(agent) {
        let userSession = request.body.session;
        let timeStamp = userSession.split(":::").pop();
        let userEmail = userSession.split(":::").shift().split("/").pop();


        const { mood } = result.parameters;
        console.log(result.parameters);

        addMoodEntry(mood, userEmail);

        // let newEntry = {
        //     mood: mood,
        //     email: userEmail,
        //     createdAt: new Date().toISOString()
        // }

        // db.collection("entries")
        //     .add(newEntry)
        //     .then(doc => {
        //         let resEntry = newEntry;

        //         resEntry.entryId = doc.id;
        //         res.json({ resEntry });
        //     })
        //     .catch(err => {
        //         console.error(err)
        //         res.status(500).json({ error: `Something went wrong when adding the entry` })
        //     })

        // agent.add("Mood Logged!")
    }


    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    intentMap.set("UpdateProfile", userOnboardingHandler);
    intentMap.set("LogGratitude", logGratitude);
    intentMap.set("LogMood", logMood);

    agent.handleRequest(intentMap);

})

// sunday: 
// USER EMAIL SHIT