import { Response,Request  } from "express";
import { Grades } from "../models/Grades";

import { User } from "../models/User";
import logger from "../utils/logger";


export async function testController(req:Request, res:Response) {

  try {

    let user = User.fromJson({login: "loginval1"}) 

    console.log(user.toJson())

    res.json('done')
    
  } catch (e) {
    logger.error(`er test ${e}`)
    res.send(e)
  }


}