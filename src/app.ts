import express from 'express';

import logger from './utils/logger';
import routes from './routes';
import { initDB } from './utils/init_database';


const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());


async function main() {
  await app.listen(PORT)
  logger.info(`App runs at http://localhost:${PORT}`);
  await routes(app);  
  await initDB();

  // timeChecker();

}

main();