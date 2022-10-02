import { Response,Request  } from "express";
import logger from "../utils/logger";



export async function testController(req:Request, res:Response) {

  try {
    var data = 'nothing'
    res.json(data)
    
  } catch (e) {
    logger.error(`er test ${e}`)
    res.send(e)
  }


}