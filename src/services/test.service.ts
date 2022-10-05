import admin from "firebase-admin";
import Crawler from "../crawler/crawler";
import clientHandler from "../crawler/handler";
import { jwtData } from "../types/jwtData";

export async function sendNotification() {
  
    const firebaseToken = 'dD4cPCyiT9iCAyy4v_95-S:APA91bHuhJIY1pE9qBjmN9r5yDNgaP-1x1Yc3e7ni6CmRYrgwXcWvcy2vmNc8GBTmeJ-9HcVJc8f-z3EaYn0sVKZ4YrjtQJRKR2uwThaaLQhC9U6Q3GorY8U4h9OhbmRhJF3ChmOJEIX';
  
    const payload = {
      notification: {
        title: '`title 1 ',
        body: 'Body data dflsjifsdksfnsielsdkfdata dflsjifsdksfnsielsdkfdata dflsjifsdksfnsielsdkfdata dflsjifsdksfnsielsdkfdata dflsjifsdksfnsielsdkfdata dflsjifsdksfnsielsdkfdata dflsjifsdksfnsielsdkf'
      },
      android: {
        notification: {
          icon: 'stock_ticker_update',
          color: '#7e55c3'
        }
      },
      token: firebaseToken,
    };
  

  
    let out = await admin.messaging().send(payload);
    return JSON.stringify(out);
}

export async function checkGettingNotifications(user: jwtData, token:string) {
  try {
    const client:Crawler = await clientHandler.getClient(user, token)
  let json = await client.notifications();

  return JSON.stringify(json);
    
  } catch (e) {
    
  }
  

}