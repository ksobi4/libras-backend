import Crawler from "../crawler/crawler";
import { db } from "../utils/init_database";
import { getUuid } from "../utils/uuid";
import clientHandler from '../crawler/handler';
import { jwtData } from "../types/jwtData";
import moment from "moment";
import usageConfig from "../config/usage.config";
import { getTime } from "../utils/time";
import {omit}  from 'lodash';


export async  function getAndCreateGradesService(user: jwtData, token:string) {
  try {
    const client:Crawler = await clientHandler.getClient(user, token)
  let json = await client.grades();
  json['timestamp'] = getTime();
  json["userId"] = user.uuid;
  await db.collection('grades').doc(getUuid()).set(json);

  return omit(json, ['userId']);
  } catch (e) {
    throw e;
  }
  
}

export async  function getAndUpdateGradesService(user: jwtData, token:string) {
  try {
    const client:Crawler = await clientHandler.getClient(user, token)
  let json = await client.grades();

  json['timestamp'] = getTime();
  json["userId"] = user.uuid;

  let arr = await db.collection('grades')
    .where('userId', '==', user.uuid).get();
  if(!arr.empty) {
    arr.docs[0].ref.set(json)
  }

  return omit(json, ['userId']);
  } catch (e) {
    throw e;
  }
  
}

