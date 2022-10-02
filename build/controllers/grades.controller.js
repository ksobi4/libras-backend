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
exports.oneGradeController = exports.gradesController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const handler_1 = __importDefault(require("../crawler/handler"));
function gradesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = res.locals.user;
        const token = res.locals.token;
        try {
            const client = yield handler_1.default.getClient(user, token);
            res.send(yield client.grades());
        }
        catch (e) {
            logger_1.default.error(e);
            res.send(`err :${e}`);
        }
    });
}
exports.gradesController = gradesController;
function oneGradeController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = res.locals.user;
        const token = res.locals.token;
        const gradeId = req.body.grade_id;
        try {
            const client = yield handler_1.default.getClient(user, token);
            res.send(yield client.oneGrade(gradeId));
        }
        catch (e) {
            logger_1.default.error(e);
            res.send(`err :${e}`);
        }
    });
}
exports.oneGradeController = oneGradeController;
//# sourceMappingURL=grades.controller.js.map