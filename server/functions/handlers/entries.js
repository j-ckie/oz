const { db } = require("../util/admin");

// ======= post gratitude entry =======
exports.postGratitudeEntry = (req, res) => {
    let newEntry = {
        body: req.body.body,
        createdAt: new Date().toISOString()
    };

    db.collection("entries")
        .add(newEntry)
        .then(doc => {
            let resEntry = newEntry;
            resEntry.entryId = doc.id;
            res.json({ resEntry });
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ error: "Something went wrong when adding your new entries" });
        });
};