import jwt from 'jsonwebtoken';
import config from '../config/config'
import { jwtData } from '../types/jwtData';
import logger from './logger';


const JWT_key = config.JWT_private_key;


export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_key)

    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    }
  }
}

export function getPassword(token:string) {
  try {
    const decoded = jwt.verify(token, JWT_key);
    var temp =JSON.parse(JSON.stringify(decoded))
    return temp['password'];

  } catch (e) {
    throw e;
  }
}