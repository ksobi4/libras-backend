import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';
import admin from 'firebase-admin';
import { getTimeStamp } from '../utils/time';
import { db } from '../utils/init_database';



@jsonObject
export class User {

  @jsonMember(String)
  login: string;
  @jsonMember(String)
  token: string;

  @jsonMember(admin.firestore.Timestamp)
  lastlogin: admin.firestore.Timestamp;
  
  constructor(login: string, token:string) {
    this.login = login;
    this.token = token;
    this.lastlogin = getTimeStamp()
  }

  public static fromJson(obj: Object): User{
    return serializer.parse(obj) as User;
  }

  public toJson(): any {
    let json =  JSON.parse(serializer.stringify(this));
    json['lastlogin'] = this.lastlogin;
    return json;
  }
}


const serializer = new TypedJSON(User); 