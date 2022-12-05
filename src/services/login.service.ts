import admin  from 'firebase-admin';
import jwt  from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import clientHandler from '../crawler/handler';
import config from '../config/config'
import Crawler from '../crawler/crawler';
import { db } from '../utils/init_database';
import { getTime, getTimeStamp } from '../utils/time';
import logger from '../utils/logger';
import { User } from '../models/User';
import { JwtData } from '../types/jwt_data';
import { boolean } from 'zod';
import { createTypePredicateNodeWithModifier } from 'typescript';
// import { JwtData } from '../types/jwtData';
// import { JwtData } from '../types/jwtData';
// import { JwtData } from '../types/jwtData';

const jwtKey = config.JWT_private_key;

export async function getToken(login: string, password:string): Promise<string>{
  
  try {
    const tempClient:Crawler = new Crawler();
    await tempClient.auth(login, password);
    clientHandler.addClient(tempClient);


    let userList = await db.collection('users')
                .where('login','==', login)
                .get();

    var jwtData1:JwtData = {
      login: login, 
      password: password, 
      userId:  userList.empty ? uuidv4() : userList.docs[0].id
    };


    const token:string = await jwt.sign(
      jwtData1, 
      jwtKey, {  expiresIn:'30d' }
    )
    if(userList.empty) {

      let user = new User(login, token)
      let json = user.toJson();
      await db.collection('users').doc(jwtData1.userId).set(json);

    }  else {
      await db.collection('users').doc(jwtData1.userId).update({'token': token});
    }

    return token;


  } catch (e) {
    throw e;
  }
}

export async function addNotificationToken(notificationToken: string, token:string): Promise<void> {
  let userList = await db.collection('users').where('token','==', token).get();

  
  let notificationTokenList: Array<string> = userList.docs[0].get('notification_tokens');
  let userId:string =userList.docs[0].id;

  if(notificationTokenList == undefined) notificationTokenList = [];


  let isTokenAlready:boolean = false;
  notificationTokenList.forEach((token1: string) => {
    if(token1 == notificationToken) isTokenAlready = true;
  });

  if(isTokenAlready == false) {
    notificationTokenList.push(notificationToken);
    await db.collection('users').doc(userId).update({'notification_tokens': notificationTokenList});
  }
}

export async function updateLastLoginService(userId:string) {
  await db.collection('users').doc(userId).update({'lastlogin': getTimeStamp()});
}

