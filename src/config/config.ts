import * as dotenv from 'dotenv';
import {resolve} from 'path'
import assert = require("assert");

let file:string = `${(process.env.NODE_ENV)?.trim()}.env`

dotenv.config({path: resolve( __dirname, file)});


const {
  PORT,
  JWT_PRIVATE_KEY,
  NODE_ENV,
  DATABASE_URL,
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_URL,
  CLIENT_URL,

} = process.env;


assert(JWT_PRIVATE_KEY, 'jwt private key is required');
assert(PORT, 'port is required');

let firebaseConfig ={
      "type": TYPE,
      "project_id": PROJECT_ID,
      "private_key_id": PRIVATE_KEY_ID,
      "private_key": PRIVATE_KEY,
      "client_email": CLIENT_EMAIL,
      "client_id": CLIENT_ID,
      "auth_uri": AUTH_URI,
      "token_uri": TOKEN_URI,
      "auth_provider_x509_cert_url": AUTH_PROVIDER_URL,
      "client_x509_cert_url": CLIENT_URL,
    }

let port= PORT;
let databaseUrl =DATABASE_URL
let jwt_private_key: string = JWT_PRIVATE_KEY
let env = NODE_ENV;

export {port, databaseUrl, jwt_private_key, env, firebaseConfig}