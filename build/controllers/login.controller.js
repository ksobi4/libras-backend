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
exports.loginController = void 0;
const login_service_1 = require("../services/login.service");
const logger_1 = __importDefault(require("../utils/logger"));
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { login, password } = req.body;
        try {
            const token = yield (0, login_service_1.getToken)(login, password);
            res.json({ token: token });
        }
        catch (e) {
            logger_1.default.error(e);
            res.send(`err :${e}`);
        }
    });
}
exports.loginController = loginController;
//# sourceMappingURL=login.controller.js.map