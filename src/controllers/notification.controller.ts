
import { Response,Request  } from "express";
import moment from "moment";
import usageConfig from "../config/usage.config";
import Crawler from "../crawler/crawler";
import { User } from "../models/User";
import logger from "../utils/logger";
import { db } from "../utils/init_database";
import { getUserUuid } from "../utils/uuid";
import clientHandler from "../crawler/handler";
import { gradesNotifService, sendNotification } from "../services/notification.service";
import { getTime } from "../utils/time";


let minutes = usageConfig.timeChecker * 60 * 1000;

export function notificationChecker() {
  setInterval(function() {
    logger.info('TIME CHECKER')
    checkNotification();
    
  }, minutes)
}


export async function checkNotification() {
  try {
    let date = moment().subtract(usageConfig.toCheckNotoficationForUser, 'days').toDate();

    let list= await db.collection('users').where('lastlogin', '>', date).get();

    await list.docs.forEach( async (el) => {
      let user: User = User.fromJson(el.data());
      let userUuid = await getUserUuid(user.login);

      const client:Crawler = await clientHandler.getClient(user, user.token);

      //parts on notification
      await gradesNotifService(client, userUuid, user.token);
      

    })
  } catch (err) {
    logger.error(`ERROR notification controller: ${err}`);
  }
  
}



export async function notificationSendController(req:Request, res:Response) {

  logger.info(`${getTime()} /api/notification/send body=${JSON.stringify(req.body)}`);

  const {title, description, token} = req.body;

  



  try {
    let out = await sendNotification([token], title, description);
    logger.info(`out = ${out}`);
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    res.send(`err :${e}`)
  }
}

