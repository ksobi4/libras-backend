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
const jwt_utils_1 = require("../utils/jwt.utils");
const crawler_1 = __importDefault(require("./crawler"));
var clientHandler = {
    list: [],
    addClient: function (client) {
        this.list.push(client);
    },
    getClient: function (user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.list.forEach((client) => {
                    if (client.userUuid = user.uuid)
                        return client;
                });
                const tempClient = new crawler_1.default();
                const password = (0, jwt_utils_1.getPassword)(token);
                yield tempClient.auth(user.login, password);
                this.addClient(tempClient);
                return tempClient;
            }
            catch (e) {
                throw e;
            }
        });
    }
};
exports.default = clientHandler;
//# sourceMappingURL=handler.js.map