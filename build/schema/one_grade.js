"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneGradeSchema = void 0;
const zod_1 = require("zod");
exports.oneGradeSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        grade_id: (0, zod_1.string)({ required_error: "grade is is required" }),
    }),
});
//# sourceMappingURL=one_grade.js.map