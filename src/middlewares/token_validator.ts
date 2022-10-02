
import { NextFunction,Request, Response  } from "express"
import {get} from 'lodash'
import { nextTick } from "process";
import { jwtData } from "../types/jwtData";

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


    const data: jwtData = {
      login: json['login'],
      password: json['password'],
      uuid: json['uuid'],
    }

    res.locals.user = data
    res.locals.token = accessToken;
    return next();
  } else if(expired){
    res.json({'error': 'token expired'});
  } else {
    res.json({'error': 'bad token'});
  }

}

export default tokenValidator;