import { Response,Request  } from "express";
import { getToken } from "../services/login.service";
import logger from "../utils/logger";


export async function loginController(req:Request, res:Response) {

  const {login, password} = req.body;

  try {
    const token: string = await getToken(login, password);
    res.json({token: token});
  } catch (e) {
    logger.error(e);
    res.send(`err :${e}`)
  }
}