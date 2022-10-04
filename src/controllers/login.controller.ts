import { Response,Request  } from "express";
import { getToken } from "../services/login.service";
import logger from "../utils/logger";
import { getTime } from "../utils/time";


export async function loginController(req:Request, res:Response) {

  logger.info(`${getTime()} /api/login body=${JSON.stringify(req.body)}`);

  const {login, password} = req.body;

  try {
    const token: string = await getToken(login, password);
    res.json({token: token});
  } catch (e) {
    logger.error(e);
    res.send(`err :${e}`)
  }
}