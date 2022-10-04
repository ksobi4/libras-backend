

import moment, {unitOfTime} from 'moment';
import usageConfig from '../config/usage.config';


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