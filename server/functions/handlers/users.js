const { admin, db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");

firebase.initializeApp(config);

const {
    validateSignupData,
    validateLoginData
} = require("../util/validators");

// ======= user signup =======
exports.signup = (req, res) => {
    let newUser = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    const { valid, errors } = validateSignupData(newUser);
    if (!valid) return res.status(400).json(errors);

    const defAvatar = "default-oz.png";

    let token, userId;

    db.doc(`/users/${newUser.email}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ email: "This email is already taken" });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);

            };
        })
        .then(data => {
            console.log(data.user.uid);
            userId = data.user.uid
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;

            let userCreds = {
                name: newUser.name,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                // imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                userId
            };

            db.doc(`/users/${newUser.email}`).set(userCreds);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ general: "Something went wrong, please try again" });
        });
};

// ======= user login =======
exports.login = (req, res) => {
    let user = {
        email: req.body.email,
        password: req.body.password
    }

    const { valid, errors } = validateLoginData(user);
    if (!valid) return res.status(400).json(errors);

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token });
        })
        .catch(err => {
            console.log(err);
            return res.status(403).json({ general: "Wrong credentials, please try again" });
        });
};