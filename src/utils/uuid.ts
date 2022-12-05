import P from 'pino';
import { v4 as uuidv4 } from 'uuid';
import { string } from 'zod';
import { db } from './init_database';

export function getUuid() {
  return uuidv4();
}

export async function getUserUuid(login: string) {
  let list = await db.collection('users').where('login', '==', login).get()

  if(list.empty) {
    throw 'user with this login dont exist';
  } else {
    return list.docs[0].id;
  }
}
