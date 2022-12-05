import { Response,Request  } from "express";
import { Grades } from "../models/Grades";

import { User } from "../models/User";
import logger from "../utils/logger";
import { diffString, diff } from 'json-diff';
// import { checkGettingNotifications, sendNotification } from "../services/test.service";
import { JwtData } from "../types/jwt_data";
import { checkNotification } from "./notification.controller";


export async function testController(req:Request, res:Response) {

  const jwtData: JwtData = res.locals.jwtData;
  const token:string = res.locals.token;
  
  try {
    await checkNotification();
 
    // logger.info(await sendNotification('','title1', 'desc1'));
    
    //await doChecking();
    //logger.info(await checkGettingNotifications(jwtData, token))

    // let json1 = {
    //   login: ['jeden', 'dwa']
    // }

    // let json2 = {
    //   login: ['jeden', 'cztery', 'trzy']

    // }

    // let diff1 = diff(json1, json2);
    // logger.info(`diff =${JSON.stringify(diff1)}`);

    res.sendStatus(200);
    
  } catch (e) {
    logger.error(`er test ${e}`)
    res.send(e)
  }


}