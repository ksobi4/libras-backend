import {Express, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

//controllers
import { loginController, updateLastLogin } from './controllers/login.controller';
import { gradesController1,  oneGradeController } from './controllers/grades.controller';

//middleware
import validator from './middlewares/validator';
import tokenValidator from './middlewares/token_validator';

//schemas
import {loginSchema} from './schema/login.schema'
import { oneGradeSchema } from './schema/one_grade';

import { testController } from './controllers/test.controller';
import logger from './utils/logger';
import { notificationSendController } from './controllers/notification.controller';
import { notificationSendSchema } from './schema/notification_send.schema';

function routes(app: Express) {
  app.get('/api', (req: Request, res:Response) => res.status(200).send('Hello in Libras api'))

  app.post('/api/login', validator(loginSchema), loginController);

  app.post('/api/grades', tokenValidator, gradesController1)

  app.post('/api/one_grade', validator(oneGradeSchema), tokenValidator, oneGradeController)

  app.post('/api/update_last_login', tokenValidator, updateLastLogin)


  //notification
  app.post('/api/notification/send', validator(notificationSendSchema),tokenValidator, notificationSendController)

  //testing
  app.post('/api/test', tokenValidator, testController)

  app.all('*', (req: Request, res:Response) => {
    logger.info(`url= ${req.url}`);
    res.status(404).json({'error': 'Page not found'})
  })

}

export default routes;