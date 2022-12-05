import { Response,Request  } from "express";
import Crawler from "../crawler/crawler";
import logger from "../utils/logger";

import clientHandler from '../crawler/handler';
import { db } from "../utils/init_database";
import { Grades } from "../models/Grades";
import {  getGradesCrawler, getGradesDB, updateOrAddGradesToDB } from "../services/grades.service";
import { getTime, isTimePassed, timeDiff } from "../utils/time";
import usageConfig from '../config/usage.config'
import { JwtData } from "../types/jwtData";


export async function gradesController1(req:Request, res:Response) {
  logger.info(`${getTime()} /api/grades body=${JSON.stringify(req.body)}`);
  const jwtData:JwtData= res.locals.jwtData;
  const userId:string = jwtData.userId;
  const token:string = res.locals.token;

  try {
    let grades: Grades | null = await getGradesDB(userId);

    //nie ma w bazie
    if(grades == null) {
      let newGrades: Grades = await getGradesCrawler(userId, token);
      await updateOrAddGradesToDB(newGrades, userId);

      res.json(newGrades.toJson());
      return;
    }

    //czas nmnął
    if(isTimePassed(grades.timestamp, usageConfig.gradesExpireTime)) {
      let newGrades: Grades = await getGradesCrawler(userId, token);
      await updateOrAddGradesToDB(newGrades, userId);
      
      res.json(newGrades.toJson());
    } else { //czas nie minął
      res.json(grades.toJson());
    }

  } catch (e) {
    logger.error(`Grades controller ERR:${e}`);
    res.send(`Grades controller ERR:${e}`)
  }

}

export async function oneGradeController(req:Request, res:Response) {
  logger.info(`${getTime()} /api/one_grades body=${JSON.stringify(req.body)}`);
  const token:string = res.locals.token;
  const userId = res.locals.userId
  const gradeId = req.body.grade_id;

  try {

    const client:Crawler = await clientHandler.getClient(userId, token)
    res.send(await client.oneGrade(gradeId));

  } catch (e) {
    logger.error(e);
    res.send(`err :${e}`)
  }
  
}