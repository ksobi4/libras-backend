import jwt from 'jsonwebtoken';
import {jwt_private_key} from '../config/config'
import { LoginAndPassword } from '../types/login_and_password';




export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, jwt_private_key)

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

export function getLoginAndPassword(token:string): LoginAndPassword {
  try {
    const decoded = jwt.verify(token, jwt_private_key);
    var temp =JSON.parse(JSON.stringify(decoded))
    return {
      password: temp['password'],
      login: temp['login'],
    };

  } catch (e) {
    throw e;
  }
}