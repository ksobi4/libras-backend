"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneGradeConvernter = exports.gradesConventer = void 0;
function gradesConventer(grades) {
    let list = [];
    grades.forEach((subject) => {
        list.push({
            "name": subject['name'],
            "terms": subject['semester']
        });
    });
    return { "subjects": list };
}
exports.gradesConventer = gradesConventer;
function oneGradeConvernter(grade) {
    return {
        value: _ifnull(grade['grade'], false),
        date: _ifnull(grade['date'], false),
        teacher: _ifnull(grade['teacher'], false),
        lesson: _ifnull(grade['lesson'], false),
        inAverage: _ifnull(grade['inAverage'], true),
        multiplier: _ifnull(grade['multiplier'], false),
        user: _ifnull(grade['user'], false),
        comment: _ifnull(grade['comment'], false),
        category: _ifnull(grade['category'], false),
    };
}
exports.oneGradeConvernter = oneGradeConvernter;
function _ifnull(data, isAverage) {
    if (isAverage) {
        if (data == null)
            return false;
        else
            return data;
    }
    else {
        if (data == null)
            return 'brak';
        else
            return data;
    }
}
//# sourceMappingURL=data_conventer.js.map