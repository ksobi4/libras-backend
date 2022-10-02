const { initializeApp, applicationDefault, cert 
} = require('firebase-admin/app');


export function initDB() {
  const serviceAccount = require('../config/libras-app-7e067-firebase-adminsdk-76c8c-c5f038ff21.json');

  initializeApp({
    credential: cert(serviceAccount)
  });

}

