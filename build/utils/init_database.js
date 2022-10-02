"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
function initDB() {
    const serviceAccount = require('../config/libras-app-7e067-firebase-adminsdk-76c8c-c5f038ff21.json');
    initializeApp({
        credential: cert(serviceAccount)
    });
}
exports.initDB = initDB;
//# sourceMappingURL=init_database.js.map