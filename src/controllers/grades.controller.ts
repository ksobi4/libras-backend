import { Response,Request  } from "express";
import Crawler from "../crawler/crawler";
import logger from "../utils/logger";

import clientHandler from '../crawler/handler';
import { jwtData } from "../types/jwtData";
import { db } from "../utils/init_database";
import { Grades } from "../models/Grades";
import { getAndCreateGradesService, getAndUpdateGradesService } from "../services/grades.service";
import { getTime, timeDiff } from "../utils/time";
import usageConfig from '../config/usage.config'
import {omit}  from 'lodash';




export async function gradesController(req:Request, res:Response) {

  logger.info(`${getTime()} /api/grades body=${JSON.stringify(req.body)}`);

  const user: jwtData = res.locals.user;
  const token:string = res.locals.token;

  try {
      var data = await db.collection('grades').where('userId', '==', user.uuid).get()

      if(data.empty) {
        logger.info('Nie ma w bazie więc pobieram')
        let json = await getAndCreateGradesService(user, token)
        res.send(json);
      } else {
        let json = data.docs[0].data()
        let grades: Grades = Grades.fromJson(json);
        
        if(timeDiff(grades.timestamp, 'minutes') > usageConfig.gradesExpireTime) {
          logger.info('jest w bazie  minał czas, więc pobieram')
          let json = await getAndUpdateGradesService(user, token)
          res.send(json);
        } else {
          logger.info('jest w bazie NIE minał czas, więc NIE pobieram')
          res.send(omit(json, 'userId'));
          return data;
        }




      }
    


    res.send();

  } catch (e) {
    logger.error(e);
    res.send(`Grades controller ERR:${e}`)
  }
}

export async function oneGradeController(req:Request, res:Response) {
  const user: jwtData = res.locals.user;
  const token:string = res.locals.token;
  const gradeId = req.body.grade_id;

  try {

    const client:Crawler = await clientHandler.getClient(user, token)
    res.send(await client.oneGrade(gradeId));

  } catch (e) {
    logger.error(e);
    res.send(`err :${e}`)
  }
  
}