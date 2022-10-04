import admin from 'firebase-admin';
var serviceAcc = require('../config/db.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAcc)
});

const db = admin.firestore();
export {db} ;

