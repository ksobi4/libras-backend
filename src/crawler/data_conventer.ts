import logger from "../utils/logger";

export function gradesConventer(grades: any): any {
  let list: any[] = [];
  grades.forEach((subject: any) => {
    list.push({
      "name": subject['name'],
      "terms": subject['semester']
    })
  });
  return {"subjects":list};
}

export function oneGradeConvernter(grade: any): any {
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
  }
}

function _ifnull(data:any,isAverage:boolean ) {
  if(isAverage) {
      if(data == null) return false;
      else return data;
  }else {
      if(data == null) return 'brak';
      else return data;
  }
}