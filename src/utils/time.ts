

import moment, {unitOfTime} from 'moment';
import usageConfig from '../config/usage.config';
import admin from 'firebase-admin';
import logger from './logger';


export function timeDiff(timestamp: string, typ: unitOfTime.Diff) {
  let then = moment(timestamp, usageConfig.moment_data_format) 
  var now  = moment(moment().locale('pl')
    .format(usageConfig.moment_data_format), usageConfig.moment_data_format)
  let diff = now.diff(then, typ)
  return diff;
}

export function getTime(): string {
  return moment().locale('pl').format(usageConfig.moment_data_format);
}

export function getTimeStamp() :admin.firestore.Timestamp{
  let temp: Date = moment().locale('pl').toDate();
  return admin.firestore.Timestamp.fromDate(temp);
}

export function isTimePassed(timestamp: admin.firestore.Timestamp, timeExpiredInMinutes: number): boolean {
  let date1 =new Date(timestamp.seconds*1000);
  let dateNow = new Date();

  let timediff = dateNow.getTime() - date1.getTime() ;
  timediff = timediff / (1000*60)

  return timediff > timeExpiredInMinutes;

}