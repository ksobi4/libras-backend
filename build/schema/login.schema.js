"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        login: (0, zod_1.string)({ required_error: "Login is required" }),
        password: (0, zod_1.string)({ required_error: "Password is required" }),
    }),
});
//# sourceMappingURL=login.schema.js.map