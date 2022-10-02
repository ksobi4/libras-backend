import { Response,Request  } from "express";
import Crawler from "../crawler/crawler";
import logger from "../utils/logger";

import clientHandler from '../crawler/handler';
import { jwtData } from "../types/jwtData";



export async function gradesController(req:Request, res:Response) {

  const user: jwtData = res.locals.user;
  const token:string = res.locals.token;

  try {

    const client:Crawler = await clientHandler.getClient(user, token)
    res.send(await client.grades());

  } catch (e) {
    logger.error(e);
    res.send(`err :${e}`)
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