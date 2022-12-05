import usageConfig from "../config/usage.config";
import Crawler from "../crawler/crawler";
import { Grades } from "../models/Grades";
import { NotificationGrade } from "../types/notification_grade";
import { gradesDiffs } from "../utils/diffrence";
import { db } from "../utils/init_database";
import logger from "../utils/logger";
import { isTimePassed } from "../utils/time";
import { getGradesCrawler, getGradesDB } from "./grades.service";
import admin from "firebase-admin";


export async function gradesNotifService (crawler: Crawler, userId: string, token:string) {
  let gradesDB: Grades | null = await getGradesDB(userId);

  if(gradesDB != null && 
    isTimePassed(gradesDB.timestamp, usageConfig.notifGradesDataExpired)
    ) {
      let newGrades = await getGradesCrawler(userId, token);
      
      let notificationGradeList:Array<NotificationGrade> = await gradesDiffs(gradesDB, newGrades)
      let deviceList = await getAllUserDeviceTokens(userId);

      logger.info(`new grade list = ${JSON.stringify(notificationGradeList)}`);
      logger.info(`deviceList list = ${JSON.stringify(deviceList)}`);
      notificationGradeList.forEach(grade => {
        sendNotification(deviceList, "Nowa ocena!", `Ocena ${grade.value} z przedmiotu ${grade.subject}`);
      });

  }


  
}

async function getAllUserDeviceTokens(userId:string): Promise<Array<string>> {
  let tokenList = await (await db.collection('users').doc(userId).get()).get('notification_tokens');
  return tokenList;
}

export async function sendNotification(notificationTokenList:Array<string>, title:string, description:string) {
  const payload = {
    notification: {
      title: title,
      body: description,
    },

    tokens: notificationTokenList,
  };



  let out = await admin.messaging().sendMulticast(payload);
  return JSON.stringify(out);
}