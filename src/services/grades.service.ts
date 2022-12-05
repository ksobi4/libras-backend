import Crawler from "../crawler/crawler";
import { db } from "../utils/init_database";
import { getUuid } from "../utils/uuid";
import clientHandler from '../crawler/handler';
import { Grades } from "../models/Grades";
import { getTimeStamp } from "../utils/time";

export async function getGradesCrawler(userId:string, token:string): Promise<Grades> {
  try {
    const client:Crawler = await clientHandler.getClient(userId, token)
    let json = await client.grades();

    json['userId'] = userId;
    json['timestamp'] = getTimeStamp();
    
    let grades = Grades.fromJson(json) as Grades;
    return grades;
  } catch (e) {
    throw e;
  }
}

export async function getGradesDB(userId: string): Promise<Grades | null> {
  let data = await db.collection('grades').where('userId', '==', userId).get();

  if(data.empty) {
    return null;
  } else {
    let gradesJson = data.docs[0].data()
    return Grades.fromJson(gradesJson) as Grades;
  }
}

export async function updateOrAddGradesToDB(grades:Grades, userId:string) {
  try {
    let userList = await db.collection('grades').where('userId', '==', userId).get();
    if(userList.empty) {
      db.collection('grades').doc(getUuid()).set(grades.toJson())
    } else {
      userList.docs[0].ref.set(grades.toJson());
    }
  } catch (e) {
    throw e;
  }
}
