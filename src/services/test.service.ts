import admin from "firebase-admin";
import Crawler from "../crawler/crawler";
import clientHandler from "../crawler/handler";
import { JwtData } from "../types/jwt_data";



export async function checkGettingNotifications(user: JwtData, token:string) {
  try {
    const client:Crawler = await clientHandler.getClient(user, token)
  let json = await client.notifications();

  return JSON.stringify(json);
    
  } catch (e) {
    
  }
  

}