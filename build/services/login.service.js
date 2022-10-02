"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const handler_1 = __importDefault(require("../crawler/handler"));
const config_1 = __importDefault(require("../config/config"));
const crawler_1 = __importDefault(require("../crawler/crawler"));
const jwtKey = config_1.default.JWT_private_key;
function getToken(login, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tempClient = new crawler_1.default();
            yield tempClient.auth(login, password);
            handler_1.default.addClient(tempClient);
            const uuid = (0, uuid_1.v4)();
            var data = { login: login, password: password, uuid: uuid };
            const token = yield jsonwebtoken_1.default.sign(data, jwtKey, { expiresIn: '30d' });
            return token;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.getToken = getToken;
//# sourceMappingURL=login.service.js.map