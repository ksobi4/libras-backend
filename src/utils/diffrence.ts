import { diffString, diff, DiffOptions } from "json-diff";
// import change from 'json-diff-ts';
import { Grades } from "../models/Grades";
import { NotificationGrade } from "../types/notification_grade";
import logger from './logger';
// var change = require('json-diff-ts');


export async function gradesDiffs(oldGrades:Grades, newGrades:Grades): Promise<any> {
  let oldJson = oldGrades.toJson();
  let newJson = newGrades.toJson();

  
  

  let opt: DiffOptions = {
    full:true
  }
  
  let diffsData = diff(oldJson.subjects, newJson.subjects, opt);
  getAllChangedGrades(diffsData);


  return getAllChangedGrades(diffsData);

}

function getAllChangedGrades(json:any) {

  let newGrades:Array<NotificationGrade> =[];
  try {
  
    json.forEach((subject:any) => {
      if(subject[0] != " ") {
        subject[1].terms.forEach((term:any) => {
          if(term[0] != " ") {
            term[1].grades.forEach((grade:any) => {
              if(grade[0] != " ") {
                newGrades.push({
                  "id": grade[1].id,
                  "value": grade[1].value,
                  "subject": subject[1].name
                })
              }
            });
          }
        });
      }
    });
  } catch (err) {
    logger.error(`err ${JSON.stringify(json, null, 2)}`)
  }
  

  return newGrades
}