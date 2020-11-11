const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createUser = functions.auth.user()
.onCreate((user)=>{
    const userProfile = {
        displayName: user.displayName,
        email: user.email,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    } 
    return addUser(userProfile);
})

const addUser = (userInfo)=>{
    return admin.firestore().collection("users")
    .add(userInfo)
    .then(doc => console.log("User Profile has been created", doc) )
}

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, { admin: true });
      })
      .then(() => {
        return { message: `Success! ${data.email} was been made an admin` };
      })
      .catch((err) => {
        return err;
      });
  });