import admin from 'firebase-admin';
var serviceAcc = require('../config/db.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAcc),
  databaseURL: "https://libras-app-7e067-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore();
export {db} ;

