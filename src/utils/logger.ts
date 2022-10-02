import logger from 'pino'
import dayjs from 'dayjs' 
import pretty from 'pino-pretty'
import { pid } from 'process'
import { timeStamp } from 'console'

const stream = pretty({
  colorize: true,
  customPrettifiers: {
    pid: pid => 'false',
    time: timestamp => `"time":"${dayjs().format()}"`
  }
})

const log = logger({
  transport: {
    target: 'pino-pretty'
  },
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}"`
})

export default log;