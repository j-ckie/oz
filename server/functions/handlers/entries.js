const { db } = require("../util/admin");
const admin = require("firebase-admin");

// ======= post gratitude entry =======
exports.postGratitudeEntry = (req, res) => {
    //console.log(req.user)
    // let newEntry = {
    //     body: req.body.body,
    //     email: req.user.email,
    //     createdAt: new Date().toISOString()
    // };

    // db.collection("entries")
    //     .add(newEntry)
    //     .then(doc => {
    //         let resEntry = newEntry;
    //         resEntry.entryId = doc.id;
    //         res.json({ resEntry });
    //     })
    //     .catch(err => {
    //         console.error(err)
    //         res.status(500).json({ error: "Something went wrong when adding your new entries" });
    //     });



    console.log("begin gratitude")
    let idToken;
    // let timeStamp = req.body.timeStamp
    // console.log(timeStamp)

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        console.error("No token found!");
        return response.status(403).json({ error: "Unauthorized" });
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            // console.log(req.user)

            if (req.method !== "POST") return res.status(400).json({ error: "Method not allowed" });

            let newEntry = {
                body: req.body.body,
                email: req.user.email,
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
        })
};

exports.getEntries = (req, res) => {
    let userData = {};

    db.doc(`/entries/${req.user.email}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                userData = doc.data();

                db.collection("entries")
                    .where("email", "==", req.user.email)
                    .get()
                    .then(data => {
                        userData.entries = [];
                        data.forEach(doc => {
                            userData.entries.push({
                                body: doc.data().body,
                                email: doc.data().email,
                                createdAt: doc.data().createdAt
                            });
                        })
                        return res.json(userData);
                    })
            } else {
                return res.json({ message: "No entries yet!" })
            }
        })

}

exports.getMoods = (req, res) => {
    let userData = {};

    console.log(req.user.email)
    db.collection("moods")
        .where("email", "==", req.user.email)
        .orderBy("createdAt", "desc")
        .get()
        .then(data => {
            console.log("=====CollectionData====")
            console.log(data)
            if (data) {
                userData.moods = []
                data.forEach(mood => {
                    console.log("=====moods====")
                    console.log(mood.data())
                    userData.moods.push({
                        mood: mood.data().mood,
                        email: mood.data().email,
                        createdAt: mood.data().createdAt
                    });

                })

                return res.json(userData)
            } else {
                return res.json({ message: "no moods logged" })
            }

        })

    // db.doc(`/moods/${req.user.email}`)
    //     .get()
    //     .then(doc => {
    //         console.log("====================")
    //         console.log(doc)

    //         doc.map(mood => {
    //             console.log("======MOODMAP======")
    //             console.log(mood);
    //         })

    //         userData = doc.data();
    //         console.log("======DOC.DATA======")
    //         console.log(doc.data())
    //         db.collection("moods")
    //             .where("email", "==", req.user.email)
    //             .orderBy("createdAt", "desc")
    //             .get()
    //             .then(data => {
    //                 console.log("======DATA======")
    //                 console.log(data)
    //                 userData.moods = [];

    //                 data.forEach(doc => {
    //                     console.log("======DATA FOR EACH======");
    //                     console.log(doc);

    //                     userData.moods.push({
    //                         mood: doc.data().mood,
    //                         email: doc.data().email,
    //                         createdAt: doc.data().createdAt
    //                     });
    //                 });
    //                 console.log("======USER DATA ======")
    //                 console.log(userData)
    //                 return res.json(userData)
    //             })

    //     })
}

exports.postMood = (req, res) => {
    let idToken;
    // let timeStamp = req.body.timeStamp
    // console.log(timeStamp)

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        console.error("No token found!");
        return response.status(403).json({ error: "Unauthorized" });
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            // console.log(req.user)

            if (req.method !== "POST") return res.status(400).json({ error: "Method not allowed" });

            let newMood = {
                mood: req.body.mood,
                email: req.user.email,
                createdAt: new Date().toISOString()
            }

            db.collection("moods")
                .add(newMood)
                .then(doc => {
                    let resMood = newMood;

                    resMood.moodId = doc.id;
                    res.json({ resMood });
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ error: `Something went wrong when adding the entry` })
                })
        })
}