"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPassword = exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const JWT_key = config_1.default.JWT_private_key;
function verifyJwt(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_key);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (e) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null,
        };
    }
}
exports.verifyJwt = verifyJwt;
function getPassword(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_key);
        var temp = JSON.parse(JSON.stringify(decoded));
        return temp['password'];
    }
    catch (e) {
        throw e;
    }
}
exports.getPassword = getPassword;
//# sourceMappingURL=jwt.utils.js.map