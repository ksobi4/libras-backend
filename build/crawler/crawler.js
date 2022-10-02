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
//@ts-ignore
const librus_api_1 = __importDefault(require("librus-api"));
const data_conventer_1 = require("./data_conventer");
class Crawler {
    constructor() {
        this.client = new librus_api_1.default();
        this.userUuid = '';
    }
    setUuid(uuid) {
        this.userUuid = uuid;
    }
    auth(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('Timeout 20s');
                }, 20 * 1000);
                this.client.authorize(login, password)
                    .catch((err) => reject('Some error in login' + err))
                    .then(() => {
                    this.client.info.getAccountInfo()
                        .then((data) => {
                        if (data['account']['login'] == '')
                            reject('Bad login or password');
                        else
                            resolve('');
                    });
                });
            });
        });
    }
    grades() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('Timeout 20s');
                }, 20 * 1000);
                this.client.info.getGrades()
                    .catch((err) => reject('grades err:' + err))
                    .then((data) => {
                    resolve((0, data_conventer_1.gradesConventer)(data));
                });
            });
        });
    }
    oneGrade(gradeId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('Timeout 20s');
            }, 20 * 1000);
            this.client.info.getGrade(parseInt(gradeId))
                .catch((err) => reject('oneGrade err:' + err))
                .then((data) => {
                resolve((0, data_conventer_1.oneGradeConvernter)(data));
            });
        });
    }
}
exports.default = Crawler;
//# sourceMappingURL=crawler.js.map