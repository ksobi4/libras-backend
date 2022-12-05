import jwt from 'jsonwebtoken';
import config from '../config/config'
import { LoginAndPassword } from '../types/login_and_password';


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

export function getLoginAndPassword(token:string): LoginAndPassword {
  try {
    const decoded = jwt.verify(token, JWT_key);
    var temp =JSON.parse(JSON.stringify(decoded))
    return {
      password: temp['password'],
      login: temp['login'],
    };

  } catch (e) {
    throw e;
  }
}