import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';



@jsonObject
export class User {

  @jsonMember(String)
  login: string;
  
  constructor(login: string) {
    this.login = login;
  }

  public print() {
    console.log(`print usre = ${this.login}`);
  }
  
  public static fromJson(obj: Object): User{
    return serializer.parse(obj) as User;
  }

  public toJson(): any {
    return serializer.stringify(this);
  }
}


const serializer = new TypedJSON(User); 