import {Express, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

//controllers
import { loginController } from './controllers/login.controller';
import { gradesController, oneGradeController } from './controllers/grades.controller';

//middleware
import validator from './middlewares/validator';
import tokenValidator from './middlewares/token_validator';

//schemas
import {loginSchema} from './schema/login.schema'
import { oneGradeSchema } from './schema/one_grade';

import { getPassword } from './utils/jwt.utils';
import Crawler from './crawler/crawler';
import logger from './utils/logger';
import { testController } from './controllers/test.controller';

function routes(app: Express) {
  app.get('/', (req: Request, res:Response) => res.status(200).send('Hello in Libras api'))

  app.post('/api/login', validator(loginSchema), loginController);

  app.post('/api/grades', tokenValidator, gradesController)

  app.post('/api/one_grade', validator(oneGradeSchema), tokenValidator, oneGradeController)

  app.post('/api/test', tokenValidator, testController)
}

export default routes;