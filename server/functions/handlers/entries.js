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
            console.log(req.user)

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