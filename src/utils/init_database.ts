import admin from 'firebase-admin';
var serviceAcc = require('../config/db.json')

var db : admin.firestore.Firestore; 

export function initDB() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAcc),
    databaseURL: "https://libras-app-7e067-default-rtdb.europe-west1.firebasedatabase.app"
  });
  
  db = admin.firestore();
}

export {db} ;

