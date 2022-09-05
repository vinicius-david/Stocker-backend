import {
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import 'express-async-errors';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import AppError from '../errors/AppError';

const routes: Router = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

export default routes;
