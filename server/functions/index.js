// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

// ======= firebase functions setup =======
const functions = require("firebase-functions");

// ======= firebase authentication =======
const fbAuth = require("./util/firebaseAuth");

// ======= firebase admin setup =======
const { db, admin } = require("./util/admin");

// ======= user handlers =======
const {
    signup,
    login
    //     viewUserDashboard
} = require("./handlers/users")

// ======= entry handlers =======
// const {
//     postEntry,
//     entryWeek,
//     entryMonth
// } = require("./handlers/entries");

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

// ======= entry routes =======
// app.post("/entry", fbAuth, postEntry);
// app.get("/entries/week", fbAuth, entryWeek);
// app.get("/entries/month", fbAuth, entryMonth);

// ======= rating routes =======
// app.post("/mood", fbAuth, postEntry);
// app.get("/moods/week", fbAuth, postWeek);
// app.get("/moods/month", fbAuth, postMonth);


// ======= firebase api setup =======
exports.api = functions.https.onRequest(app);