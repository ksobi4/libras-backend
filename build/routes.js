"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//controllers
const login_controller_1 = require("./controllers/login.controller");
const grades_controller_1 = require("./controllers/grades.controller");
//middleware
const validator_1 = __importDefault(require("./middlewares/validator"));
const token_validator_1 = __importDefault(require("./middlewares/token_validator"));
//schemas
const login_schema_1 = require("./schema/login.schema");
const one_grade_1 = require("./schema/one_grade");
const test_controller_1 = require("./controllers/test.controller");
function routes(app) {
    app.get('/', (req, res) => res.status(200).send('Hello in Libras api'));
    app.post('/api/login', (0, validator_1.default)(login_schema_1.loginSchema), login_controller_1.loginController);
    app.post('/api/grades', token_validator_1.default, grades_controller_1.gradesController);
    app.post('/api/one_grade', (0, validator_1.default)(one_grade_1.oneGradeSchema), token_validator_1.default, grades_controller_1.oneGradeController);
    app.post('/api/test', token_validator_1.default, test_controller_1.testController);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map