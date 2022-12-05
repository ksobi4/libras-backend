
import { NextFunction,Request, Response  } from "express"
import {get} from 'lodash'
import { nextTick } from "process";
import { db } from "../utils/init_database";

import {verifyJwt} from '../utils/jwt.utils';

const tokenValidator = async (req:Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, '')

  if(!accessToken) {
    res.json({'error': 'no token passed in header'});
    return;
  }

  const {valid, expired, decoded} = verifyJwt(accessToken);

  if(valid) {
    var json = JSON.parse(JSON.stringify(decoded));

    let list = await db.collection('users').where('login', '==', json['login']).get();

    if(list.empty == false ) {
      json['uuid'] = list.docs[0].ref.id;
    } else {
      throw 'no used in database'
    }


    res.locals.jwtData = {
      login: json['login'],
      password: json['password'],
      userId: json['uuid']
    }
    res.locals.token = accessToken;

    return next();
  } else if(expired){
    res.json({'error': 'token expired'});
  } else {
    res.json({'error': 'bad token'});
  }

}

export default tokenValidator;