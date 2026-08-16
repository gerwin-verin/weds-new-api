const admin = require("firebase-admin");
// const credentials = require("./key.json");
// const credentials = require(process.env.FIREBASE_SERVICE_ACCOUNT);
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT || "{}";
const credentials = JSON.parse(serviceAccountString);
// const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true });

module.exports = db;