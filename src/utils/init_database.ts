import admin from 'firebase-admin';
import logger from './logger';
var config  = require('../config/config')

var db : admin.firestore.Firestore; 

export function initDB() {

  try {
    //console.log(`json = ${JSON.stringify(config.firebaseConfig,null, 2)}`)
    admin.initializeApp({
      credential: admin.credential.cert(config.firebaseConfig),
    });
    
    db = admin.firestore();
  } catch (error) {
    logger.error(error)
  }

  
}

export {db} ;

