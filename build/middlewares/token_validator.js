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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
const tokenValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, '');
    if (!accessToken) {
        res.json({ 'error': 'no token passed in header' });
        return;
    }
    const { valid, expired, decoded } = (0, jwt_utils_1.verifyJwt)(accessToken);
    if (valid) {
        var json = JSON.parse(JSON.stringify(decoded));
        const data = {
            login: json['login'],
            password: json['password'],
            uuid: json['uuid'],
        };
        res.locals.user = data;
        res.locals.token = accessToken;
        return next();
    }
    else if (expired) {
        res.json({ 'error': 'token expired' });
    }
    else {
        res.json({ 'error': 'bad token' });
    }
});
exports.default = tokenValidator;
//# sourceMappingURL=token_validator.js.map