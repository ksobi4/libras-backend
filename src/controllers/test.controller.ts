import { Response,Request  } from "express";
import { Grades } from "../models/Grades";

import { User } from "../models/User";
import logger from "../utils/logger";




import { jwtData } from "../types/jwtData";
import { checkGettingNotifications, sendNotification } from "../services/test.service";
export async function testController(req:Request, res:Response) {

  const user: jwtData = res.locals.user;
  const token:string = res.locals.token;
  
  try {
 
    
    let data = await checkGettingNotifications(user, token);
    // let data= sendNotification();
    res.json(`done ${data})}`)
    
  } catch (e) {
    logger.error(`er test ${e}`)
    res.send(e)
  }


}