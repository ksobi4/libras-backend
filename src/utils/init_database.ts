import admin from 'firebase-admin';
var config  = require('../config/config')

var db : admin.firestore.Firestore; 

export function initDB() {
  admin.initializeApp({
    credential: admin.credential.cert(config.firebaseConfig),
  });
  
  db = admin.firestore();
}

export {db} ;

