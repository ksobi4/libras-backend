import express from 'express';

import logger from './utils/logger';
import routes from './routes';
import {initDB} from './utils/init_database';

import config from './config/config'

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());



app.listen(PORT, async () => {
  logger.info(`App runs at http://localhost:${PORT}`);

  routes(app);
  // initDB();


})