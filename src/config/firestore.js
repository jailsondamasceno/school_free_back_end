var admin = require("firebase-admin");

var serviceAccount = require("../../eduxe-light-firebase-adminsdk-0lp3z-edfffbab96.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eduxe-light.firebaseio.com"
});


  const settings = { timestampsInSnapshots: true};

var db = admin.firestore()
  db.settings(settings)

module.exports = db;