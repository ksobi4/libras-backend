import express from 'express';


import logger from './utils/logger';
import routes from './routes';
import { initDB } from './utils/init_database';
import { antiSleeper } from './utils/anti_sleeper';
import { notificationIntervalChecker } from './controllers/notification.controller';
import {port, env}  from './config/config'

const app = express();


app.use(express.json());


async function main() {

  await app.listen(port)
  logger.info(`App runs at http://localhost:${port} at ENV= ${env}`);
  await routes(app);
  await initDB();


  

  antiSleeper();
  // notificationIntervalChecker();

  
}

main();