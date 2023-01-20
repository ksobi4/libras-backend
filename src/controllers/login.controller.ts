import { Response,Request  } from "express";
import { addNotificationToken, getToken, updateLastLoginService } from "../services/login.service";
import { JwtData } from "../types/jwt_data";
import logger from "../utils/logger";
import { getTime } from "../utils/time";


export async function loginController(req:Request, res:Response) {

  logger.info(`${getTime()} /api/login body= ### LOGIN PASSWORD ###`);

  const {login, password, notification_token} = req.body;

  try {
    const token: string = await getToken(login, password);
    await addNotificationToken(notification_token, token);

    res.json({token: token});
  } catch (e) {
    logger.error(e);
    res.status(401).send(`err :${e}`)
  }
}

export async function updateLastLogin(req:Request, res:Response ) {
  logger.info(`${getTime()} /api/update_last_login body=${JSON.stringify(req.body)}`);

  const jwtData: JwtData = res.locals.jwtData;

  try {
    await updateLastLoginService(jwtData.userId);
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    res.send(`err :${e}`)
  }
}